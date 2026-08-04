import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, BookOpen, Save, X } from 'lucide-react';
import { ALL_SURAHS } from '../data/quran-meta';
import { fetchTafsirForSurah, TafsirAyah } from '../services/tafsirService';
import type { TafsirNote } from '../types';

interface AyahData {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  surah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
  };
}

interface TranslationData {
  text: string;
}

export default function TafsirStudy() {
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [selectedAyahKey, setSelectedAyahKey] = useState<string | null>(null);
  const [ayahs, setAyahs] = useState<AyahData[]>([]);
  const [translations, setTranslations] = useState<TranslationData[]>([]);
  const [tafsirAyahs, setTafsirAyahs] = useState<TafsirAyah[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedAyahs, setExpandedAyahs] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, TafsirNote>>({});
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [expandedTafsir, setExpandedTafsir] = useState<Set<string>>(new Set());

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const savedNotes = localStorage.getItem('almubashshireen_tafsir_notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Failed to parse saved notes:', e);
      }
    }

    // Check URL params for deep linking
    const params = new URLSearchParams(window.location.search);
    const surahParam = params.get('surah');
    const ayahParam = params.get('ayah');
    if (surahParam) setSelectedSurah(parseInt(surahParam));
    if (ayahParam) setSelectedAyahKey(`${surahParam}:${ayahParam}`);
  }, []);

  const saveNotes = (newNotes: Record<string, TafsirNote>) => {
    setNotes(newNotes);
    localStorage.setItem('almubashshireen_tafsir_notes', JSON.stringify(newNotes));
  };

  const fetchSurahData = async (surahNumber: number) => {
    setIsLoading(true);
    setError(null);
    setAyahs([]);
    setTranslations([]);
    setTafsirAyahs([]);
    setExpandedAyahs(new Set());
    setExpandedTafsir(new Set());

    try {
      const [arabicResponse, translationResponse] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`),
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.sahih`)
      ]);

      if (!arabicResponse.ok || !translationResponse.ok) {
        throw new Error('Failed to fetch surah data');
      }

      const arabicData = await arabicResponse.json();
      const translationData = await translationResponse.json();

      if (arabicData.code !== 200 || translationData.code !== 200) {
        throw new Error('Invalid API response');
      }

      setAyahs(arabicData.data.ayahs);
      setTranslations(translationData.data.ayahs);

      // Fetch Tafsir for Ibn Kathir
      const tafsirData = await fetchTafsirForSurah(surahNumber);
      setTafsirAyahs(tafsirData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load surah data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSurahData(selectedSurah);
  }, [selectedSurah]);

  const handleSaveNote = (ayahKey: string) => {
    const newNotes = {
      ...notes,
      [ayahKey]: {
        verseKey: ayahKey,
        note: noteText,
        savedAt: Date.now()
      }
    };
    saveNotes(newNotes);
    setEditingNote(null);
    setNoteText('');
  };

  const handleDeleteNote = (ayahKey: string) => {
    const newNotes = { ...notes };
    delete newNotes[ayahKey];
    saveNotes(newNotes);
  };

  const startEditingNote = (ayahKey: string) => {
    setEditingNote(ayahKey);
    setNoteText(notes[ayahKey]?.note || '');
  };

  const toggleExpand = (ayahKey: string) => {
    setExpandedAyahs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(ayahKey)) {
        newSet.delete(ayahKey);
      } else {
        newSet.add(ayahKey);
      }
      return newSet;
    });
  };

  const toggleTafsirExpand = (ayahKey: string) => {
    setExpandedTafsir((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(ayahKey)) {
        newSet.delete(ayahKey);
      } else {
        newSet.add(ayahKey);
      }
      return newSet;
    });
  };

  const getTafsirForAyah = (ayahKey: string): TafsirAyah | undefined => {
    return tafsirAyahs.find(t => t.verseKey === ayahKey);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#150C0C] text-[#EACEAA] p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#D39858] mb-4">
              Tafsir Study
            </h1>
            <p className="text-[#EACEAA]/60">Loading Tafsir of Ibn Kathir...</p>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-[#34150F] rounded-lg p-6" style={{ animation: 'pulse 1.5s infinite', opacity: 0.3 }}>
                <div className="h-6 bg-[#85431E] rounded mb-4" style={{ width: '30%' }} />
                <div className="h-4 bg-[#85431E] rounded mb-2" style={{ width: '80%' }} />
                <div className="h-4 bg-[#85431E] rounded" style={{ width: '60%' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#150C0C] text-[#EACEAA] p-4 md:p-8 flex items-center justify-center">
        <div style={{ textAlign: 'center', padding: 32, color: '#EACEAA' }}>
          <p style={{ color: '#D39858', marginBottom: 16 }}>{error}</p>
          <button
            onClick={() => fetchSurahData(selectedSurah)}
            style={{ background: '#85431E', color: '#EACEAA', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#150C0C] text-[#EACEAA] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#D39858] mb-4">
            Tafsir Study
          </h1>
          
          {/* Surah Selector */}
          <div className="flex items-center gap-4">
            <label className="text-sm text-[#EACEAA]/80">Select Surah:</label>
            <select
              value={selectedSurah}
              onChange={(e) => setSelectedSurah(Number(e.target.value))}
              className="bg-[#34150F] border border-[#D39858]/40 text-[#EACEAA] px-4 py-2 rounded-lg focus:outline-none focus:border-[#D39858]"
            >
              {ALL_SURAHS.map((surah) => (
                <option key={surah.number} value={surah.number}>
                  {surah.number}. {surah.englishName} ({surah.name})
                </option>
              ))}
            </select>
          </div>
        </div>

        {isMobile ? (
          <div className="space-y-4">
            {ayahs.map((ayah, index) => {
              const ayahKey = `${selectedSurah}:${ayah.numberInSurah}`;
              const tafsir = getTafsirForAyah(ayahKey);
              const isExpanded = expandedAyahs.has(ayahKey);
              const isTafsirExpanded = expandedTafsir.has(ayahKey);
              const note = notes[ayahKey];

              return (
                <motion.div
                  key={ayah.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#1E0F0D] border border-[#D39858]/30 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[#D39858] font-serif text-sm">
                      {ayah.numberInSurah}:{ayah.surah.englishName}
                    </span>
                    <button
                      onClick={() => toggleExpand(ayahKey)}
                      className="text-[#D39858] hover:text-[#EACEAA] transition-colors"
                    >
                      {isExpanded ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>

                  <p className="font-arabic text-2xl text-right leading-loose mb-4" dir="rtl" lang="ar">
                    {ayah.text}
                  </p>

                  {translations[index] && (
                    <p className="text-[#EACEAA]/90 text-sm mb-4 leading-relaxed">
                      {translations[index].text}
                    </p>
                  )}

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-[#D39858]/20 pt-4 mt-4"
                      >
                        {tafsir && (
                          <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-serif text-[#D39858] text-sm italic">
                                {tafsir.scholarName} says:
                              </h3>
                              <button
                                onClick={() => toggleTafsirExpand(ayahKey)}
                                className="text-[#D39858] hover:text-[#EACEAA] transition-colors"
                              >
                                {isTafsirExpanded ? <ChevronUp /> : <ChevronDown />}
                              </button>
                            </div>
                            <div className="border-t border-[#85431E]/40 pt-3">
                              {isTafsirExpanded ? (
                                <p className="text-[#EACEAA]/90 text-base leading-relaxed whitespace-pre-line">
                                  {tafsir.text}
                                </p>
                              ) : (
                                <p className="text-[#EACEAA]/90 text-base leading-relaxed">
                                  {tafsir.text.slice(0, 500)}
                                  {tafsir.text.length > 500 && (
                                    <button
                                      onClick={() => toggleTafsirExpand(ayahKey)}
                                      className="text-[#D39858] hover:text-[#EACEAA] ml-2 underline"
                                    >
                                      Read more
                                    </button>
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        <div>
                          <h3 className="font-serif text-[#D39858] text-sm mb-2">Your Notes:</h3>
                          {editingNote === ayahKey ? (
                            <div className="space-y-2">
                              <textarea
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                className="w-full bg-[#34150F] border border-[#D39858]/30 text-[#EACEAA] p-3 rounded-lg text-sm focus:outline-none focus:border-[#D39858]"
                                rows={3}
                                placeholder="Add your personal reflection on this ayah..."
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleSaveNote(ayahKey)}
                                  className="bg-[#85431E] text-[#EACEAA] px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-[#D39858] transition-colors"
                                >
                                  <Save className="h-4 w-4" /> Save
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingNote(null);
                                    setNoteText('');
                                  }}
                                  className="bg-[#34150F] text-[#EACEAA] px-3 py-1 rounded text-sm hover:bg-[#85431E] transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : note ? (
                            <div className="space-y-2">
                              <p className="text-[#EACEAA]/70 text-sm italic">{note.note}</p>
                              <p className="text-[#EACEAA]/40 text-xs">Saved on {new Date(note.savedAt).toLocaleDateString()}</p>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => startEditingNote(ayahKey)}
                                  className="text-[#D39858] text-sm hover:underline"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteNote(ayahKey)}
                                  className="text-red-400 text-sm hover:underline"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => startEditingNote(ayahKey)}
                              className="text-[#D39858] text-sm hover:underline"
                            >
                              + Add Note
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-6">
            <div className="w-[300px] flex-shrink-0">
              <div className="bg-[#1E0F0D] border border-[#D39858]/30 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-[#D39858]/20">
                  <h2 className="font-serif text-[#D39858] text-sm">Ayahs</h2>
                </div>
                <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                  {ayahs.map((ayah) => {
                    const ayahKey = `${selectedSurah}:${ayah.numberInSurah}`;
                    return (
                      <button
                        key={ayah.number}
                        onClick={() => {
                          setSelectedAyahKey(ayahKey);
                          if (!expandedAyahs.has(ayahKey)) {
                            setExpandedAyahs(new Set([ayahKey]));
                          }
                        }}
                        className={`w-full text-left px-4 py-3 border-b border-[#D39858]/10 hover:bg-[#34150F]/50 transition-colors ${
                          selectedAyahKey === ayahKey ? 'bg-[#34150F] border-l-2 border-l-[#D39858]' : ''
                        }`}
                      >
                        <span className="text-[#EACEAA]/80 text-sm">
                          {ayah.numberInSurah}. {ayah.text.slice(0, 30)}...
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex-1">
              {selectedAyahKey && (
                <motion.div
                  key={selectedAyahKey}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#1E0F0D] border border-[#D39858]/30 rounded-lg p-8"
                >
                  {(() => {
                    const ayahIndex = parseInt(selectedAyahKey.split(':')[1]) - 1;
                    const ayah = ayahs[ayahIndex];
                    const translation = translations[ayahIndex];
                    const tafsir = getTafsirForAyah(selectedAyahKey);
                    const isTafsirExpanded = expandedTafsir.has(selectedAyahKey);
                    const note = notes[selectedAyahKey];

                    if (!ayah || !translation) return null;

                    return (
                      <>
                        <div className="mb-6">
                          <span className="text-[#D39858] font-serif text-sm">
                            {ayah.numberInSurah}:{ALL_SURAHS.find(s => s.number === selectedSurah)?.englishName || selectedSurah}
                          </span>
                        </div>

                        <p className="font-arabic text-3xl text-right leading-loose mb-6" dir="rtl" lang="ar">
                          {ayah.text}
                        </p>

                        <p className="text-[#EACEAA]/90 text-base mb-8 leading-relaxed">
                          {translation.text}
                        </p>

                        {tafsir && (
                          <div className="border-t border-[#D39858]/20 pt-6 mb-6">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-serif text-[#D39858] text-base italic">
                                {tafsir.scholarName} says:
                              </h3>
                              <button
                                onClick={() => toggleTafsirExpand(selectedAyahKey)}
                                className="text-[#D39858] hover:text-[#EACEAA] transition-colors"
                              >
                                {isTafsirExpanded ? <ChevronUp /> : <ChevronDown />}
                              </button>
                            </div>
                            <div className="border-t border-[#85431E]/40 pt-3">
                              {isTafsirExpanded ? (
                                <p className="text-[#EACEAA]/90 text-base leading-relaxed whitespace-pre-line">
                                  {tafsir.text}
                                </p>
                              ) : (
                                <p className="text-[#EACEAA]/90 text-base leading-relaxed">
                                  {tafsir.text.slice(0, 500)}
                                  {tafsir.text.length > 500 && (
                                    <button
                                      onClick={() => toggleTafsirExpand(selectedAyahKey)}
                                      className="text-[#D39858] hover:text-[#EACEAA] ml-2 underline"
                                    >
                                      Read more
                                    </button>
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="border-t border-[#D39858]/20 pt-6">
                          <h3 className="font-serif text-[#D39858] text-base mb-3">Your Notes:</h3>
                          {editingNote === selectedAyahKey ? (
                            <div className="space-y-3">
                              <textarea
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                className="w-full bg-[#34150F] border border-[#D39858]/30 text-[#EACEAA] p-4 rounded-lg text-base focus:outline-none focus:border-[#D39858]"
                                rows={4}
                                placeholder="Add your personal reflection on this ayah..."
                              />
                              <div className="flex gap-3">
                                <button
                                  onClick={() => handleSaveNote(selectedAyahKey)}
                                  className="bg-[#85431E] text-[#EACEAA] px-4 py-2 rounded text-base flex items-center gap-2 hover:bg-[#D39858] transition-colors"
                                >
                                  <Save className="h-4 w-4" /> Save Note
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingNote(null);
                                    setNoteText('');
                                  }}
                                  className="bg-[#34150F] text-[#EACEAA] px-4 py-2 rounded text-base hover:bg-[#85431E] transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : note ? (
                            <div className="space-y-3">
                              <p className="text-[#EACEAA]/70 text-base italic">{note.note}</p>
                              <p className="text-[#EACEAA]/40 text-xs">Saved on {new Date(note.savedAt).toLocaleDateString()}</p>
                              <div className="flex gap-3">
                                <button
                                  onClick={() => startEditingNote(selectedAyahKey)}
                                  className="text-[#D39858] text-base hover:underline"
                                >
                                  Edit Note
                                </button>
                                <button
                                  onClick={() => handleDeleteNote(selectedAyahKey)}
                                  className="text-red-400 text-base hover:underline flex items-center gap-1"
                                >
                                  <X className="h-4 w-4" /> Delete
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => startEditingNote(selectedAyahKey)}
                              className="text-[#D39858] text-base hover:underline flex items-center gap-2"
                            >
                              <BookOpen className="h-4 w-4" /> Add Note
                            </button>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
