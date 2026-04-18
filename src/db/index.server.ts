import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const dbUrl = import.meta.env?.DATABASE_URL || process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL is not defined. Please check your .env file.");
}

const sql = neon(dbUrl);
export const db = drizzle(sql, { schema });
