CREATE TYPE "public"."org_type" AS ENUM('family', 'office');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'member', 'father', 'mother', 'big_brother', 'big_sister', 'child', 'admin', 'manager', 'employee', 'contractor');--> statement-breakpoint
CREATE TABLE "user_actions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"feature" varchar(50) NOT NULL,
	"data" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"logo_url" text,
	"logo_public_id" text,
	"org_type" "org_type" DEFAULT 'family' NOT NULL,
	"creator_id" uuid NOT NULL,
	"status" varchar(50) DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(255),
	"password_hash" text,
	"auth_provider" varchar(50) DEFAULT 'local' NOT NULL,
	"google_id" varchar(255),
	"profile_picture" jsonb,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"refresh_token" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone"),
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id"),
	CONSTRAINT "email_or_phone_required" CHECK ("email" IS NOT NULL OR "phone" IS NOT NULL)
);
--> statement-breakpoint
ALTER TABLE "user_actions" ADD CONSTRAINT "user_actions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "phone_idx" ON "users" USING btree ("phone");