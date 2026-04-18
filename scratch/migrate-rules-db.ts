import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

async function migrateAndFix() {
  const sql = neon(process.env.DATABASE_URL!);
  
  console.log('Migrating registrations table and updating competition rules...');
  
  try {
    // 1. Fix the registrations table type mismatch
    // We drop the old column and add it back as UUID to be safe if casting is problematic,
    // but ALTER TYPE usually works if the data is compatible.
    // However, if there are existing registrations with integers that don't match UUIDs, we should clear them.
    console.log('Migrating registrations.user_id to UUID...');
    await sql`ALTER TABLE registrations ALTER COLUMN user_id TYPE UUID USING user_id::text::UUID`;
    
    // 2. Update Competition ID 1 rules (Instagram Reels only)
    console.log('Updating competition rules to Instagram only...');
    const platforms = JSON.stringify(['Instagram Reels']);
    const steps = JSON.stringify([
      { title: 'Register', description: 'Fill the form and mention your transaction ID.' },
      { title: 'Create Reel', description: 'Make an Instagram Reel with the hashtag.' },
      { title: 'Submit link', description: 'Paste your Instagram link here.' }
    ]);
    
    await sql`
      UPDATE competitions 
      SET 
        platforms = ${platforms},
        steps = ${steps},
        description = 'A single Instagram Reel. One honest frame of the country you live in. The internet decides who walks away with the prize.'
      WHERE id = 1
    `;
    
    console.log('Database updated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrateAndFix();
