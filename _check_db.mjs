import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
const result = await sql`SELECT column_name, data_type, udt_name FROM information_schema.columns WHERE table_name = 'registrations' ORDER BY ordinal_position`;
console.log(JSON.stringify(result, null, 2));
