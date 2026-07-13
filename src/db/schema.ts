import { pgTable, serial, text, integer, timestamp, boolean, jsonb, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  fullName: text('full_name'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const competitions = pgTable('competitions', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  season: text('season').notNull(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull(),
  prizeINR: integer('prize_inr').notNull(),
  entryFeeINR: integer('entry_fee_inr').notNull(),
  deadline: timestamp('deadline').notNull(),
  hashtag: text('hashtag').notNull(),
  platforms: jsonb('platforms').notNull(),
  scoring: jsonb('scoring').notNull(),
  steps: jsonb('steps').notNull(),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  heroVideoUrl: text('hero_video_url'),
  heroPosterUrl: text('hero_poster_url'),
  upiId: text('upi_id'),
  prizeDescription: text('prize_description'),
  prizes: jsonb('prizes').default([]),
});

export const registrations = pgTable('registrations', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id'),
  competitionId: integer('competition_id'),
  paymentStatus: text('payment_status').default('pending'),
  instagramHandle: text('instagram_handle'),
  submissionLink: text('submission_link'),
  transactionId: text('transaction_id'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const winners = pgTable('winners', {
  id: serial('id').primaryKey(),
  competitionId: integer('competition_id').notNull(),
  name: text('name').notNull(),
  instagramHandle: text('instagram_handle').notNull(),
  imageUrl: text('image_url'),
  prizeAmount: integer('prize_amount'),
  rank: integer('rank').notNull(),
  title: text('title'),
  prizes: jsonb('prizes').default([]),
  createdAt: timestamp('created_at').defaultNow(),
});
