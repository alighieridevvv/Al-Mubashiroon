const QURAN_COM_BASE = 'https://api.quran.com/api/v4';
const CACHE_PREFIX = 'almubashshireen_tafsir';

const TAFSIR_ID = 169; // Ibn Kathir (English)
const SCHOLAR_NAME = 'Ibn Kathir';

interface TafsirAyah {
  verseKey: string;
  scholarName: string;
  text: string;
}

interface TafsirSurahCache {
  surahNumber: number;
  ayahs: TafsirAyah[];
  fetchedAt: number;
}

const stripHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const getCacheKey = (surahNumber: number): string =>
  `${CACHE_PREFIX}_surah_${surahNumber}`;

const getFromCache = (surahNumber: number): TafsirSurahCache | null => {
  try {
    const cached = localStorage.getItem(getCacheKey(surahNumber));
    if (!cached) return null;
    const parsed: TafsirSurahCache = JSON.parse(cached);
    const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - parsed.fetchedAt > ONE_WEEK) {
      localStorage.removeItem(getCacheKey(surahNumber));
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

const saveToCache = (data: TafsirSurahCache): void => {
  try {
    localStorage.setItem(getCacheKey(data.surahNumber), JSON.stringify(data));
  } catch {
    // localStorage may be full — fail silently, content still displays
  }
};

export const fetchTafsirForSurah = async (surahNumber: number): Promise<TafsirAyah[]> => {
  const cached = getFromCache(surahNumber);
  if (cached) return cached.ayahs;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(
      `${QURAN_COM_BASE}/tafsirs/${TAFSIR_ID}/by_chapter/${surahNumber}`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`API returned ${response.status}`);

    const data = await response.json();

    const ayahs: TafsirAyah[] = data.tafsirs.map((t: any) => ({
      verseKey: t.verse_key,
      scholarName: SCHOLAR_NAME,
      text: stripHtml(t.text)
    }));

    saveToCache({
      surahNumber,
      ayahs,
      fetchedAt: Date.now()
    });

    return ayahs;

  } catch (error) {
    clearTimeout(timeout);
    throw new Error('Could not load Ibn Kathir Tafsir. Please check your connection.');
  }
};

export const fetchTafsirForAyah = async (
  surahNumber: number,
  ayahNumber: number
): Promise<TafsirAyah | null> => {
  // First check if surah is already cached
  const cached = getFromCache(surahNumber);
  if (cached) {
    const ayah = cached.ayahs.find(a => a.verseKey === `${surahNumber}:${ayahNumber}`);
    return ayah || null;
  }

  // Otherwise fetch single ayah
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(
      `${QURAN_COM_BASE}/tafsirs/${TAFSIR_ID}/by_ayah/${surahNumber}:${ayahNumber}`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);
    if (!response.ok) throw new Error(`API returned ${response.status}`);
    const data = await response.json();
    return {
      verseKey: `${surahNumber}:${ayahNumber}`,
      scholarName: SCHOLAR_NAME,
      text: stripHtml(data.tafsirs?.[0]?.text || '')
    };
  } catch {
    clearTimeout(timeout);
    return null;
  }
};

export { SCHOLAR_NAME };
export type { TafsirAyah };
