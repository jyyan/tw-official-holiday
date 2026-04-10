import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const API_BASE = 'https://data.ntpc.gov.tw/api/datasets/308dcd75-6434-45bc-a95f-584da4fed251/json';
const PAGE_SIZE = 1000;
const PUBLISH_DIR = join(import.meta.dirname, 'publish', 'json');

async function fetchPage(page) {
  const url = `${API_BASE}?page=${page}&size=${PAGE_SIZE}`;
  console.log(`Fetching page ${page}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} on page ${page}`);
  return res.json();
}

async function fetchAll() {
  const allRecords = [];
  let page = 0;

  while (true) {
    const records = await fetchPage(page);
    if (!records.length) break;
    allRecords.push(...records);
    if (records.length < PAGE_SIZE) break;
    page++;
  }

  console.log(`Total records fetched: ${allRecords.length}`);
  return allRecords;
}

function groupByYearMonth(records) {
  const grouped = {};

  for (const record of records) {
    const dateStr = record.date; // "YYYYMMDD"
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);

    grouped[year] ??= {};
    grouped[year][month] ??= [];
    grouped[year][month].push(record);
  }

  return grouped;
}

async function main() {
  const records = await fetchAll();
  const grouped = groupByYearMonth(records);

  for (const [year, months] of Object.entries(grouped).sort()) {
    for (const [month, data] of Object.entries(months).sort()) {
      const dir = join(PUBLISH_DIR, year);
      mkdirSync(dir, { recursive: true });

      const filePath = join(dir, `${month}.json`);
      writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
      console.log(`Written ${filePath} (${data.length} records)`);
    }
  }

  console.log('Done!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
