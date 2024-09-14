DO $$ BEGIN
 CREATE TYPE "public"."employment_status" AS ENUM('EMPLOYED', 'SELF_EMPLOYED', 'UNEMPLOYED', 'RETIRED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."gender" AS ENUM('MALE', 'FEMALE', 'OTHER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."income_cycle" AS ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."loan_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'CLOSED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."marital_status" AS ENUM('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."payment_method" AS ENUM('BANK_TRANSFER', 'MOBILE_MONEY', 'CASH');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."transaction_status" AS ENUM('PENDING', 'COMPLETED', 'FAILED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."transaction_type" AS ENUM('DISBURSEMENT', 'REPAYMENT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('USER', 'MEMBER', 'ADMIN', 'SUPER_ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "credit-cloud_loan_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_date" timestamp with time zone DEFAULT now(),
	"approved_at" timestamp with time zone,
	"device" varchar(256) NOT NULL,
	"principal" integer NOT NULL,
	"start_date" date NOT NULL,
	"status" "loan_status" NOT NULL,
	"tenor" integer NOT NULL,
	"applicant_id" uuid NOT NULL,
	"approved_by_id" uuid,
	"loan_type_id" integer NOT NULL,
	"running_loan_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "credit-cloud_loan_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "credit-cloud_loan_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"running_loan_id" uuid,
	"amount" integer NOT NULL,
	"transaction_type" "transaction_type" NOT NULL,
	"payment_method" "payment_method" NOT NULL,
	"transaction_id" varchar(256) NOT NULL,
	"status" "transaction_status" DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "credit-cloud_loan_transactions_transaction_id_unique" UNIQUE("transaction_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "credit-cloud_loan_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"interest" integer NOT NULL,
	"loan_category_id" integer NOT NULL,
	"loan_name" varchar(256) NOT NULL,
	"period_from" integer NOT NULL,
	"period_to" integer NOT NULL,
	"principal_max" integer NOT NULL,
	"principal_min" integer NOT NULL,
	"status" varchar(256) DEFAULT 'DRAFT' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "credit-cloud_membership_approval_steps" (
	"id" serial PRIMARY KEY NOT NULL,
	"step_name" varchar(256) NOT NULL,
	"sequence" integer NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "credit-cloud_membership_approval_steps_sequence_unique" UNIQUE("sequence")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "credit-cloud_membership_approvals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"step_id" integer NOT NULL,
	"status" varchar(256) NOT NULL,
	"comments" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	"approved_by_id" uuid,
	"reference_id" varchar(256) NOT NULL,
	CONSTRAINT "credit-cloud_membership_approvals_reference_id_unique" UNIQUE("reference_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "credit-cloud_running_loans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"principal" integer NOT NULL,
	"term_months" integer NOT NULL,
	"interest_rate" integer NOT NULL,
	"status" "loan_status" DEFAULT 'ACTIVE' NOT NULL,
	"disbursed_amount" integer,
	"disbursement_date" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"disbursement_status" varchar(256) DEFAULT 'PENDING' NOT NULL,
	"total_repaid" integer DEFAULT 0,
	"next_payment_due_date" date,
	"next_payment_amount" integer,
	"user_id" uuid NOT NULL,
	"disbursed_by_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "credit-cloud_user_kyc_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date_of_birth" date NOT NULL,
	"gender" "gender" NOT NULL,
	"marital_status" "marital_status" NOT NULL,
	"residential_address" text NOT NULL,
	"region" varchar(256) NOT NULL,
	"community" varchar(256) NOT NULL,
	"nationality" varchar(256) NOT NULL,
	"place_of_birth" varchar(256) NOT NULL,
	"id_types" text[] NOT NULL,
	"id_front_url" varchar(256) NOT NULL,
	"id_back_url" varchar(256) NOT NULL,
	"id_number" varchar(256) NOT NULL,
	"id_expiry" varchar(256) NOT NULL,
	"employer_name" varchar(256) NOT NULL,
	"employer_address" text NOT NULL,
	"occupation_title" varchar(256) NOT NULL,
	"employment_status" "employment_status" NOT NULL,
	"date_of_employment" date NOT NULL,
	"income_cycle" "income_cycle" NOT NULL,
	"beneficiary_name" varchar(256) NOT NULL,
	"beneficiary_address" text NOT NULL,
	"relationship_to_member" varchar(256) NOT NULL,
	"beneficiary_contact" varchar(256) NOT NULL,
	"user_id" uuid NOT NULL,
	"selfie" varchar(256),
	"screened_un" boolean DEFAULT false NOT NULL,
	"screened_tt" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "credit-cloud_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" varchar(256) NOT NULL,
	"display_name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"phone" varchar(256) NOT NULL,
	"role" "user_role" DEFAULT 'USER' NOT NULL,
	"username" varchar(256) NOT NULL,
	"balance" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
