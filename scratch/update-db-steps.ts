import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

async function updateSteps() {
  const sql = neon(process.env.DATABASE_URL!);
  
  console.log('Updating competition steps in the database...');
  
  try {
    // We want to replace "Register & pay" with "Register" and "Fill the form, pay the entry fee." with "Fill the form."
    // This is a bit tricky with JSONB in raw SQL if we don't know the exact structure of all rows, 
    // but we can fetch, modify, and update.
    
    const rows = await sql`SELECT id, steps FROM competitions`;
    
    for (const row of rows) {
      if (!row.steps) continue;
      
      const steps = typeof row.steps === 'string' ? JSON.parse(row.steps) : row.steps;
      
      const newSteps = steps.map((step: any) => ({
        ...step,
        title: step.title.replace('Register & pay', 'Register'),
        description: step.description.replace('Fill the form, pay the entry fee.', 'Fill the form. Register and pay later or now.')
      }));
      
      await sql`UPDATE competitions SET steps = ${JSON.stringify(newSteps)} WHERE id = ${row.id}`;
      console.log(`Updated steps for competition ID: ${row.id}`);
    }
    
    console.log('Database steps updated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Update failed:', err);
    process.exit(1);
  }
}

updateSteps();
