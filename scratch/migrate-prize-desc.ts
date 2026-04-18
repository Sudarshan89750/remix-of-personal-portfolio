import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

async function migratePrizes() {
  const sql = neon(process.env.DATABASE_URL!);
  
  console.log('Adding prize_description to competitions table...');
  
  try {
    // 1. Add prize_description column
    await sql`ALTER TABLE competitions ADD COLUMN IF NOT EXISTS prize_description TEXT`;
    
    // 2. Set Example product prize for competition ID 1 if needed (Optional)
    // await sql`UPDATE competitions SET prize_description = 'Photography Accessory Bundle + Lens' WHERE id = 1`;
    
    console.log('Database updated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migratePrizes();
