import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

async function migrateUsers() {
  const sql = neon(process.env.DATABASE_URL!);
  
  console.log('Running migration for users table...');
  
  try {
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name TEXT`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT`;
    
    console.log('Users table migrated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrateUsers();
