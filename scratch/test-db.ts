import 'dotenv/config';
import { db } from '../src/db/index.server';
import { competitions } from '../src/db/schema';

async function test() {
  console.log('Testing DB connection...');
  try {
    const result = await db.select().from(competitions).limit(1);
    console.log('Connection successful! Found:', result.length, 'competitions.');
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:', err);
    process.exit(1);
  }
}

test();
