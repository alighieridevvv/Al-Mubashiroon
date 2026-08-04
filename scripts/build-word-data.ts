/**
 * One-time script to build complete word-by-word translation dataset from Quran.com API
 * Output: src/data/word-translations.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TypeScript interfaces
interface Word {
  position: number;
  arabic: string;
  translation: string;
}

interface AyahData {
  verseKey: string;
  words: Word[];
}

interface SurahData {
  [ayahNumber: string]: AyahData;
}

interface QuranData {
  [surahNumber: string]: SurahData;
}

interface APIVerse {
  verse_key: string;
  verse_number: number;
  words: APIWord[];
}

interface APIWord {
  position: number;
  char_type_name: string;
  text_uthmani?: string;
  text?: string;
  translation?: {
    text: string;
  };
}

interface APIResponse {
  verses: APIVerse[];
}

// Configuration
const OUTPUT_FILE = path.join(__dirname, '../src/data/word-translations.json');
const BASE_URL = 'https://api.quran.com/api/v4/verses/by_chapter';
const DELAY_MS = 250; // Delay between requests to avoid rate limiting
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

// Expected ayah counts per surah for validation
const SURAH_AYAH_COUNTS: Record<number, number> = {
  1: 7, 2: 286, 3: 200, 4: 176, 5: 120, 6: 165, 7: 206, 8: 75, 9: 129, 10: 109,
  11: 123, 12: 111, 13: 43, 14: 52, 15: 99, 16: 128, 17: 111, 18: 110, 19: 98, 20: 135,
  21: 112, 22: 78, 23: 118, 24: 64, 25: 77, 26: 227, 27: 93, 28: 88, 29: 69, 30: 60,
  31: 34, 32: 30, 33: 73, 34: 54, 35: 45, 36: 83, 37: 182, 38: 88, 39: 75, 40: 85,
  41: 54, 42: 53, 43: 89, 44: 59, 45: 37, 46: 35, 47: 38, 48: 29, 49: 18, 50: 45,
  51: 60, 52: 49, 53: 62, 54: 55, 55: 78, 56: 96, 57: 29, 58: 22, 59: 24, 60: 13,
  61: 14, 62: 11, 63: 11, 64: 18, 65: 12, 66: 12, 67: 30, 68: 52, 69: 52, 70: 44,
  71: 28, 72: 28, 73: 20, 74: 56, 75: 40, 76: 31, 77: 50, 78: 40, 79: 46, 80: 42,
  81: 29, 82: 19, 83: 36, 84: 25, 85: 22, 86: 17, 87: 19, 88: 26, 89: 30, 90: 20,
  91: 15, 92: 21, 93: 11, 94: 8, 95: 8, 96: 19, 97: 5, 98: 8, 99: 8, 100: 11,
  101: 11, 102: 8, 103: 3, 104: 9, 105: 5, 106: 4, 107: 7, 108: 3, 109: 6, 110: 3,
  111: 5, 112: 4, 113: 5, 114: 6
};

// Load existing data if file exists (for resumability)
let existingData: QuranData = {};
if (fs.existsSync(OUTPUT_FILE)) {
  try {
    existingData = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    console.log(`Loaded existing data for ${Object.keys(existingData).length} surahs`);
  } catch (error) {
    console.warn('Failed to load existing data, starting fresh:', (error as Error).message);
  }
}

// Sleep function
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Fetch with retry
async function fetchWithRetry(url: string, retries: number = MAX_RETRIES): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`  Attempt ${i + 1}/${retries} failed:`, (error as Error).message);
      if (i < retries - 1) {
        await sleep(RETRY_DELAY_MS * (i + 1)); // Exponential backoff
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries exceeded');
}

// Process a single surah
async function fetchSurah(surahNumber: number): Promise<SurahData> {
  const url = `${BASE_URL}/${surahNumber}?words=true&word_fields=text_uthmani,translation&per_page=300`;
  
  console.log(`Fetching Surah ${surahNumber}...`);
  
  try {
    const data: APIResponse = await fetchWithRetry(url);
    
    if (!data.verses || !Array.isArray(data.verses)) {
      throw new Error('Invalid response structure: missing verses array');
    }

    // Structure: { "surahNumber": { "ayahNumber": { words: [...] } } }
    const surahData: SurahData = {};
    
    for (const verse of data.verses) {
      const ayahNumber = verse.verse_number;
      const verseKey = verse.verse_key;
      
      if (!verse.words || !Array.isArray(verse.words)) {
        console.warn(`  Warning: Surah ${surahNumber}:${ayahNumber} has no words array`);
        continue;
      }
      
      // Filter out "end" markers (ayah numbers) and keep only actual words
      const words: Word[] = verse.words
        .filter((w: APIWord) => w.char_type_name === 'word')
        .map((w: APIWord) => ({
          position: w.position,
          arabic: w.text_uthmani || w.text || '',
          translation: w.translation?.text || ''
        }));
      
      surahData[ayahNumber] = {
        verseKey,
        words
      };
    }
    
    const ayahCount = Object.keys(surahData).length;
    const expectedCount = SURAH_AYAH_COUNTS[surahNumber];
    
    if (ayahCount !== expectedCount) {
      console.warn(`  ⚠️  Ayah count mismatch: got ${ayahCount}, expected ${expectedCount}`);
    }
    
    const wordCount = Object.values(surahData).reduce((sum: number, a: AyahData) => sum + a.words.length, 0);
    console.log(`  ✓ Fetched ${ayahCount} ayahs, ${wordCount} words`);
    
    return surahData;
    
  } catch (error) {
    console.error(`  ✗ Failed to fetch Surah ${surahNumber}:`, (error as Error).message);
    throw error;
  }
}

// Main execution
async function main() {
  console.log('=== Quran Word Translation Data Builder ===\n');
  console.log(`Output: ${OUTPUT_FILE}`);
  console.log(`Total surahs: 114`);
  console.log(`Delay between requests: ${DELAY_MS}ms\n`);
  
  const startTime = Date.now();
  let successCount = 0;
  let failureCount = 0;
  const failures: { surah: number; error: string }[] = [];
  
  for (let surahNumber = 1; surahNumber <= 114; surahNumber++) {
    // Skip if already fetched
    if (existingData[surahNumber]) {
      console.log(`Skipping Surah ${surahNumber} (already fetched)`);
      successCount++;
      continue;
    }
    
    try {
      const surahData = await fetchSurah(surahNumber);
      existingData[surahNumber] = surahData;
      successCount++;
      
      // Save progress after each surah
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(existingData, null, 2));
      
      // Delay before next request
      if (surahNumber < 114) {
        await sleep(DELAY_MS);
      }
      
    } catch (error) {
      failureCount++;
      failures.push({ surah: surahNumber, error: (error as Error).message });
      console.error(`Failed to process Surah ${surahNumber}, continuing...`);
      
      // Save progress even on failure
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(existingData, null, 2));
      
      await sleep(DELAY_MS);
    }
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  // Calculate statistics
  let totalWords = 0;
  let totalAyahs = 0;
  for (const surahData of Object.values(existingData)) {
    for (const ayahData of Object.values(surahData)) {
      totalWords += ayahData.words.length;
      totalAyahs++;
    }
  }
  
  const fileSizeMB = (fs.statSync(OUTPUT_FILE).size / (1024 * 1024)).toFixed(2);
  
  console.log('\n=== Summary ===');
  console.log(`Duration: ${duration}s`);
  console.log(`Success: ${successCount}/114 surahs`);
  console.log(`Failures: ${failureCount}/114 surahs`);
  console.log(`Total ayahs: ${totalAyahs}`);
  console.log(`Total words: ${totalWords}`);
  console.log(`File size: ${fileSizeMB} MB`);
  console.log(`Output: ${OUTPUT_FILE}`);
  
  if (failures.length > 0) {
    console.log('\n=== Failed Surahs ===');
    failures.forEach(f => console.log(`  Surah ${f.surah}: ${f.error}`));
  }
  
  // Validate against expected counts
  console.log('\n=== Validation ===');
  const validationErrors: string[] = [];
  for (const [surahNum, surahData] of Object.entries(existingData)) {
    const actualCount = Object.keys(surahData).length;
    const expectedCount = SURAH_AYAH_COUNTS[parseInt(surahNum)];
    if (actualCount !== expectedCount) {
      validationErrors.push(`Surah ${surahNum}: ${actualCount} ayahs (expected ${expectedCount})`);
    }
  }
  
  if (validationErrors.length > 0) {
    console.log('Validation errors:');
    validationErrors.forEach(err => console.log(`  ⚠️  ${err}`));
  } else {
    console.log('✓ All surahs have expected ayah counts');
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
