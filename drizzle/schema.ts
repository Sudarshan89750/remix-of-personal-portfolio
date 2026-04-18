import { pgTable, unique, uuid, varchar, numeric, integer, boolean, timestamp, index, foreignKey, text, check, serial, jsonb, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const userRole = pgEnum("user_role", ['user', 'admin'])
export const userStatus = pgEnum("user_status", ['pending_otp', 'pending_id', 'pending_approval', 'approved', 'blocked'])


export const membershipPlans = pgTable("membership_plans", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	price: numeric({ precision: 10, scale:  2 }).notNull(),
	trialDurationDays: integer("trial_duration_days").default(0),
	isActive: boolean("is_active").default(true),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("membership_plans_name_key").on(table.name),
]);

export const refreshTokens = pgTable("refresh_tokens", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	tokenHash: varchar("token_hash", { length: 255 }).notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_refresh_tokens_user").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "refresh_tokens_user_id_fkey"
		}).onDelete("cascade"),
]);

export const fcmTokens = pgTable("fcm_tokens", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	token: text().notNull(),
	deviceId: varchar("device_id", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_fcm_tokens_user").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "fcm_tokens_user_id_fkey"
		}).onDelete("cascade"),
	unique("fcm_tokens_user_id_device_id_key").on(table.userId, table.deviceId),
]);

export const reviews = pgTable("reviews", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	jobId: varchar("job_id", { length: 255 }).notNull(),
	reviewerId: uuid("reviewer_id").notNull(),
	revieweeId: uuid("reviewee_id").notNull(),
	rating: integer().notNull(),
	comment: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_reviews_job").using("btree", table.jobId.asc().nullsLast().op("text_ops")),
	index("idx_reviews_reviewee").using("btree", table.revieweeId.asc().nullsLast().op("timestamptz_ops"), table.createdAt.desc().nullsFirst().op("timestamptz_ops")),
	index("idx_reviews_reviewer").using("btree", table.reviewerId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.reviewerId],
			foreignColumns: [users.id],
			name: "reviews_reviewer_id_fkey"
		}),
	foreignKey({
			columns: [table.revieweeId],
			foreignColumns: [users.id],
			name: "reviews_reviewee_id_fkey"
		}),
	check("reviews_rating_check", sql`(rating >= 1) AND (rating <= 5)`),
]);

export const addonPurchases = pgTable("addon_purchases", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	quantityGranted: integer("quantity_granted").notNull(),
	phonepeTxnId: varchar("phonepe_txn_id", { length: 255 }).notNull(),
	status: varchar({ length: 50 }).default('pending').notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "addon_purchases_user_id_fkey"
		}).onDelete("cascade"),
	unique("addon_purchases_phonepe_txn_id_key").on(table.phonepeTxnId),
]);

export const subscriptions = pgTable("subscriptions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	planId: uuid("plan_id").notNull(),
	status: varchar({ length: 50 }).notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
	phonepeTxnId: varchar("phonepe_txn_id", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "subscriptions_user_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.planId],
			foreignColumns: [membershipPlans.id],
			name: "subscriptions_plan_id_fkey"
		}),
	check("subscriptions_status_check", sql`(status)::text = ANY ((ARRAY['trialing'::character varying, 'active'::character varying, 'expired'::character varying, 'pending'::character varying, 'failed'::character varying])::text[])`),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }),
	googleId: varchar("google_id", { length: 255 }),
	firstName: varchar("first_name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 100 }).notNull(),
	phone: varchar({ length: 20 }),
	city: varchar({ length: 100 }),
	state: varchar({ length: 100 }),
	country: varchar({ length: 100 }),
	latitude: numeric({ precision: 10, scale:  8 }),
	longitude: numeric({ precision: 11, scale:  8 }),
	avatarUrl: text("avatar_url"),
	bio: text(),
	idDocumentUrl: text("id_document_url"),
	status: userStatus().default('pending_otp').notNull(),
	role: userRole().default('user').notNull(),
	skills: text().array(),
	hourlyRate: numeric("hourly_rate", { precision: 10, scale:  2 }),
	portfolioUrls: text("portfolio_urls").array(),
	averageRating: numeric("average_rating", { precision: 3, scale:  2 }).default('0'),
	totalReviews: integer("total_reviews").default(0),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	lastActiveAt: timestamp("last_active_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	membershipTier: varchar("membership_tier", { length: 20 }).default('free'),
	hasUsedTrial: boolean("has_used_trial").default(false),
	baseImageLimit: integer("base_image_limit").default(0),
	addonImageLimit: integer("addon_image_limit").default(0),
	usedImages: integer("used_images").default(0),
	fullName: text("full_name"),
}, (table) => [
	index("idx_users_email").using("btree", table.email.asc().nullsLast().op("text_ops")),
	index("idx_users_location").using("btree", table.latitude.asc().nullsLast().op("numeric_ops"), table.longitude.asc().nullsLast().op("numeric_ops")).where(sql`(status = 'approved'::user_status)`),
	index("idx_users_rating").using("btree", table.averageRating.desc().nullsFirst().op("numeric_ops")).where(sql`(status = 'approved'::user_status)`),
	index("idx_users_skills").using("gin", table.skills.asc().nullsLast().op("array_ops")),
	index("idx_users_status").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	unique("users_email_key").on(table.email),
	unique("users_google_id_key").on(table.googleId),
]);

export const competitions = pgTable("competitions", {
	id: serial().primaryKey().notNull(),
	slug: text().notNull(),
	season: text().notNull(),
	title: text().notNull(),
	subtitle: text().notNull(),
	description: text().notNull(),
	status: text().notNull(),
	prizeInr: integer("prize_inr").notNull(),
	entryFeeInr: integer("entry_fee_inr").notNull(),
	deadline: timestamp({ mode: 'string' }).notNull(),
	hashtag: text().notNull(),
	platforms: jsonb().notNull(),
	scoring: jsonb().notNull(),
	steps: jsonb().notNull(),
	featured: boolean().default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	heroVideoUrl: text("hero_video_url"),
	heroPosterUrl: text("hero_poster_url"),
	upiId: text("upi_id"),
}, (table) => [
	unique("competitions_slug_unique").on(table.slug),
]);

export const registrations = pgTable("registrations", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id"),
	competitionId: integer("competition_id"),
	paymentStatus: text("payment_status").default('pending'),
	instagramHandle: text("instagram_handle"),
	submissionLink: text("submission_link"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	transactionId: text("transaction_id"),
});
