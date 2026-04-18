import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

async function migrateCollaboration() {
  const sql = neon(process.env.DATABASE_URL!);
  
  console.log('Updating competition steps to collaboration workflow...');
  
  try {
    const steps = JSON.stringify([
      { 
        title: 'Register', 
        description: 'Fill the form and lock your season entry.',
        bullets: ['Complete the profile', 'Verify your payment status']
      },
      { 
        title: 'Post Reels', 
        description: 'Create and post your best work on Instagram.',
        bullets: ['Use the official #PhotoGigsChallenge hashtag', 'Video must be an Instagram Reel']
      },
      { 
        title: 'Collaborate', 
        description: 'Invite PhotoGigs as a collaborator on your Reel.',
        bullets: ['Tag @photogigs as collaborator', 'Your entry appears on our live wall']
      }
    ]);
    
    await sql`
      UPDATE competitions 
      SET 
        steps = ${steps}
      WHERE id = 1
    `;
    
    console.log('Database updated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrateCollaboration();
