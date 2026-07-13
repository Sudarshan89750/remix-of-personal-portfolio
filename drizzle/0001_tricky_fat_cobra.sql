CREATE TABLE "winners" (
	"id" serial PRIMARY KEY NOT NULL,
	"competition_id" integer NOT NULL,
	"name" text NOT NULL,
	"instagram_handle" text NOT NULL,
	"image_url" text,
	"prize_amount" integer,
	"rank" integer NOT NULL,
	"title" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "competitions" ADD COLUMN "prize_description" text;--> statement-breakpoint
ALTER TABLE "winners" ADD CONSTRAINT "winners_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "public"."competitions"("id") ON DELETE cascade ON UPDATE no action;