import 'dotenv/config';
import postgres from 'postgres';

async function migrate() {
  const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });
  
  console.log('Running manual migrations...');
  
  try {
    // Add columns to competitions
    await sql`ALTER TABLE competitions ADD COLUMN IF NOT EXISTS hero_video_url TEXT`;
    await sql`ALTER TABLE competitions ADD COLUMN IF NOT EXISTS hero_poster_url TEXT`;
    await sql`ALTER TABLE competitions ADD COLUMN IF NOT EXISTS upi_id TEXT`;
    
    // Add columns to registrations
    await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS transaction_id TEXT`;
    
    console.log('Manual migrations completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
