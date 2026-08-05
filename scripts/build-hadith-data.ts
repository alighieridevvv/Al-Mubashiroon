import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Source data URLs (using v1.2.0 for stability)
const SOURCE_BASE_URL = 'https://raw.githubusercontent.com/AhmedBaset/hadith-json/v1.2.0/db/by_book';

const COLLECTIONS = [
  {
    source: 'the_9_books/bukhari.json',
    output: 'bukhari.json',
    collectionName: 'Sahih Al-Bukhari',
    defaultGrade: 'Sahih'
  },
  {
    source: 'the_9_books/muslim.json',
    output: 'muslim.json',
    collectionName: 'Sahih Muslim',
    defaultGrade: 'Sahih'
  },
  {
    source: 'the_9_books/abudawud.json',
    output: 'abudawud.json',
    collectionName: 'Sunan Abi Dawud',
    defaultGrade: 'Ungraded'
  },
  {
    source: 'other_books/riyad_assalihin.json',
    output: 'riyad-assalihin.json',
    collectionName: 'Riyad As-Salihin',
    defaultGrade: 'Sahih'
  },
  {
    source: 'forties/nawawi40.json',
    output: 'arbain-nawawi.json',
    collectionName: 'Arbain An-Nawawi',
    defaultGrade: 'Sahih'
  }
];

interface SourceHadith {
  id: number;
  idInBook: number;
  chapterId: number;
  bookId: number;
  arabic: string;
  english: {
    narrator: string;
    text: string;
  };
}

interface SourceData {
  hadiths: SourceHadith[];
}

interface Hadith {
  id: string;
  collection: string;
  number: string;
  narrator: string;
  arabic: string;
  english: string;
  topic: string;
  grade: string;
}

// Clean narrator text - remove "(ra)", "(may Allah be pleased with him)", etc.
function cleanNarrator(narrator: string): string {
  return narrator
    .replace(/\s*\(ra\)\s*/gi, '')
    .replace(/\s*\(may Allah be pleased with him\)\s*/gi, '')
    .replace(/\s*\(peace and blessings of Allah be upon him\)\s*/gi, '')
    .replace(/\s*\(ﷺ\)\s*/g, '')
    .replace(/\s*\(ﷺ\)\s*/g, '')
    .replace(/\s*\(\)\s*/g, '')
    .replace(/\s*\(\)\s*/g, '')
    .trim();
}

// Transform source hadith to UI format
function transformHadith(source: SourceHadith, collectionName: string, defaultGrade: string): Hadith {
  return {
    id: `${collectionName.replace(/\s+/g, '-').toLowerCase()}_${source.idInBook}`,
    collection: collectionName,
    number: source.idInBook.toString(),
    narrator: cleanNarrator(source.english.narrator),
    arabic: source.arabic.trim(),
    english: source.english.text.trim(),
    topic: 'Uncategorized',
    grade: defaultGrade
  };
}

// Download and process a single collection
async function processCollection(collection: typeof COLLECTIONS[0]): Promise<Hadith[]> {
  const url = `${SOURCE_BASE_URL}/${collection.source}`;
  console.log(`Fetching: ${url}`);
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const sourceData: SourceData = await response.json();
  console.log(`Downloaded ${sourceData.hadiths.length} hadiths from ${collection.collectionName}`);
  
  const transformedHadiths = sourceData.hadiths.map(h => 
    transformHadith(h, collection.collectionName, collection.defaultGrade)
  );
  
  console.log(`Transformed ${transformedHadiths.length} hadiths for ${collection.collectionName}`);
  
  return transformedHadiths;
}

// Main execution
async function main() {
  console.log('Starting hadith data collection...\n');
  
  // Ensure output directory exists
  const outputDir = join(__dirname, '..', 'src', 'data', 'hadith');
  await mkdir(outputDir, { recursive: true });
  console.log(`Output directory: ${outputDir}\n`);
  
  const results: { collection: string; count: number }[] = [];
  
  for (const collection of COLLECTIONS) {
    try {
      console.log(`\n--- Processing ${collection.collectionName} ---`);
      
      const hadiths = await processCollection(collection);
      
      const outputPath = join(outputDir, collection.output);
      await writeFile(outputPath, JSON.stringify(hadiths, null, 2), 'utf-8');
      console.log(`Saved to: ${outputPath}`);
      
      results.push({
        collection: collection.collectionName,
        count: hadiths.length
      });
      
      // Small delay between requests to be respectful
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`Error processing ${collection.collectionName}:`, error);
    }
  }
  
  // Summary
  console.log('\n=== COLLECTION SUMMARY ===');
  let total = 0;
  for (const result of results) {
    console.log(`${result.collection}: ${result.count} hadiths`);
    total += result.count;
  }
  console.log(`\nTOTAL: ${total} hadiths across ${results.length} collections`);
  console.log('\nAttribution: Source: Sunnah.com (via AhmedBaset/hadith-json)');
}

main().catch(console.error);
