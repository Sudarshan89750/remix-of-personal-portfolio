ALTER TABLE "addon_purchases" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "fcm_tokens" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "membership_plans" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "refresh_tokens" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "reviews" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "subscriptions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "addon_purchases" CASCADE;--> statement-breakpoint
DROP TABLE "fcm_tokens" CASCADE;--> statement-breakpoint
DROP TABLE "membership_plans" CASCADE;--> statement-breakpoint
DROP TABLE "refresh_tokens" CASCADE;--> statement-breakpoint
DROP TABLE "reviews" CASCADE;--> statement-breakpoint
DROP TABLE "subscriptions" CASCADE;--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_email_key";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_google_id_key";--> statement-breakpoint
ALTER TABLE "winners" DROP CONSTRAINT "winners_competition_id_fkey";
--> statement-breakpoint
DROP INDEX "idx_users_email";--> statement-breakpoint
DROP INDEX "idx_users_location";--> statement-breakpoint
DROP INDEX "idx_users_rating";--> statement-breakpoint
DROP INDEX "idx_users_skills";--> statement-breakpoint
DROP INDEX "idx_users_status";--> statement-breakpoint
ALTER TABLE "registrations" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "competitions" ADD COLUMN "prizes" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "winners" ADD COLUMN "prizes" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "password_hash";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "google_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "city";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "state";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "country";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "latitude";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "longitude";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "avatar_url";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "bio";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "id_document_url";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "status";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "role";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "skills";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "hourly_rate";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "portfolio_urls";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "average_rating";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "total_reviews";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "last_active_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "membership_tier";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "has_used_trial";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "base_image_limit";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "addon_image_limit";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "used_images";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");--> statement-breakpoint
DROP TYPE "public"."user_role";--> statement-breakpoint
DROP TYPE "public"."user_status";