import {
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  uuid,
  text,
  foreignKey,
  boolean,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `credit-cloud_${name}`);

// Enums
export const loanStatusEnum = pgEnum("loan_status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "ACTIVE",
  "CLOSED",
]);
export const transactionTypeEnum = pgEnum("transaction_type", [
  "DISBURSEMENT",
  "REPAYMENT",
]);
export const paymentMethodEnum = pgEnum("payment_method", [
  "BANK_TRANSFER",
  "MOBILE_MONEY",
  "CASH",
]);
export const transactionStatusEnum = pgEnum("transaction_status", [
  "PENDING",
  "COMPLETED",
  "FAILED",
]);
export const userRoleEnum = pgEnum("user_role", [
  "USER",
  "MEMBER",
  "ADMIN",
  "SUPER_ADMIN",
]);
export const genderEnum = pgEnum("gender", ["MALE", "FEMALE", "OTHER"]);
export const maritalStatusEnum = pgEnum("marital_status", [
  "SINGLE",
  "MARRIED",
  "DIVORCED",
  "WIDOWED",
]);
export const employmentStatusEnum = pgEnum("employment_status", [
  "EMPLOYED",
  "SELF_EMPLOYED",
  "UNEMPLOYED",
  "RETIRED",
]);
export const incomeCycleEnum = pgEnum("income_cycle", [
  "DAILY",
  "WEEKLY",
  "MONTHLY",
  "YEARLY",
]);

export const loanApplications = createTable("loan_applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  applicationDate: timestamp("application_date", {
    withTimezone: true,
  }).defaultNow(),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
  device: varchar("device", { length: 256 }).notNull(),
  principal: integer("principal").notNull(),
  startDate: date("start_date").notNull(),
  status: loanStatusEnum("status").notNull(),
  tenor: integer("tenor").notNull(),
  applicantId: uuid("applicant_id").notNull(),
  approvedById: uuid("approved_by_id"),
  loanTypeId: integer("loan_type_id").notNull(),
  runningLoanId: uuid("running_loan_id"),
});

export const loanCategories = createTable("loan_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const loanTransactions = createTable("loan_transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  runningLoanId: uuid("running_loan_id"),
  amount: integer("amount").notNull(),
  transactionType: transactionTypeEnum("transaction_type").notNull(),
  paymentMethod: paymentMethodEnum("payment_method").notNull(),
  transactionId: varchar("transaction_id", { length: 256 }).unique().notNull(),
  status: transactionStatusEnum("status").default("PENDING").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const loanTypes = createTable("loan_types", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  interest: integer("interest").notNull(),
  loanCategoryId: integer("loan_category_id").notNull(),
  loanName: varchar("loan_name", { length: 256 }).notNull(),
  periodFrom: integer("period_from").notNull(),
  periodTo: integer("period_to").notNull(),
  principalMax: integer("principal_max").notNull(),
  principalMin: integer("principal_min").notNull(),
  status: varchar("status", { length: 256 }).default("DRAFT").notNull(),
});

export const membershipApprovalSteps = createTable(
  "membership_approval_steps",
  {
    id: serial("id").primaryKey(),
    stepName: varchar("step_name", { length: 256 }).notNull(),
    sequence: integer("sequence").unique().notNull(),
    description: text("description").notNull(),
  },
);

export const membershipApprovals = createTable("membership_approvals", {
  id: uuid("id").primaryKey().defaultRandom(),
  stepId: integer("step_id").notNull(),
  status: varchar("status", { length: 256 }).notNull(),
  comments: text("comments"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  userId: uuid("user_id").notNull(),
  approvedById: uuid("approved_by_id"),
  referenceId: varchar("reference_id", { length: 256 }).unique().notNull(),
});

export const runningLoans = createTable("running_loans", {
  id: uuid("id").primaryKey().defaultRandom(),
  principal: integer("principal").notNull(),
  termMonths: integer("term_months").notNull(),
  interestRate: integer("interest_rate").notNull(),
  status: loanStatusEnum("status").default("ACTIVE").notNull(),
  disbursedAmount: integer("disbursed_amount"),
  disbursementDate: date("disbursement_date"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  disbursementStatus: varchar("disbursement_status", { length: 256 })
    .default("PENDING")
    .notNull(),
  totalRepaid: integer("total_repaid").default(0),
  nextPaymentDueDate: date("next_payment_due_date"),
  nextPaymentAmount: integer("next_payment_amount"),
  userId: uuid("user_id").notNull(),
  disbursedById: uuid("disbursed_by_id"),
});

export const userKycData = createTable("user_kyc_data", {
  id: uuid("id").primaryKey().defaultRandom(),
  dateOfBirth: date("date_of_birth").notNull(),
  gender: genderEnum("gender").notNull(),
  maritalStatus: maritalStatusEnum("marital_status").notNull(),
  residentialAddress: text("residential_address").notNull(),
  region: varchar("region", { length: 256 }).notNull(),
  community: varchar("community", { length: 256 }).notNull(),
  nationality: varchar("nationality", { length: 256 }).notNull(),
  placeOfBirth: varchar("place_of_birth", { length: 256 }).notNull(),
  idTypes: text("id_types").array().notNull(),
  idFrontUrl: varchar("id_front_url", { length: 256 }).notNull(),
  idBackUrl: varchar("id_back_url", { length: 256 }).notNull(),
  idNumber: varchar("id_number", { length: 256 }).notNull(),
  idExpiry: varchar("id_expiry", { length: 256 }).notNull(),
  employerName: varchar("employer_name", { length: 256 }).notNull(),
  employerAddress: text("employer_address").notNull(),
  occupationTitle: varchar("occupation_title", { length: 256 }).notNull(),
  employmentStatus: employmentStatusEnum("employment_status").notNull(),
  dateOfEmployment: date("date_of_employment").notNull(),
  incomeCycle: incomeCycleEnum("income_cycle").notNull(),
  beneficiaryName: varchar("beneficiary_name", { length: 256 }).notNull(),
  beneficiaryAddress: text("beneficiary_address").notNull(),
  relationshipToMember: varchar("relationship_to_member", {
    length: 256,
  }).notNull(),
  beneficiaryContact: varchar("beneficiary_contact", { length: 256 }).notNull(),
  userId: uuid("user_id").notNull(),
  selfie: varchar("selfie", { length: 256 }),
  screenedUn: boolean("screened_un").default(false).notNull(),
  screenedTt: boolean("screened_tt").default(false).notNull(),
});

export const users = createTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  displayName: varchar("display_name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 256 }).notNull(),
  role: userRoleEnum("role").default("USER").notNull(),
  username: varchar("username", { length: 256 }).notNull(),
  balance: integer("balance").default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Relations
export const relations = {
  loanApplications: {
    approvedBy: foreignKey({
      columns: [loanApplications.approvedById],
      foreignColumns: [users.id],
    }),
    loanType: foreignKey({
      columns: [loanApplications.loanTypeId],
      foreignColumns: [loanTypes.id],
    }),
    runningLoan: foreignKey({
      columns: [loanApplications.runningLoanId],
      foreignColumns: [runningLoans.id],
    }),
    applicant: foreignKey({
      columns: [loanApplications.applicantId],
      foreignColumns: [users.id],
    }),
  },
  loanTransactions: {
    runningLoan: foreignKey({
      columns: [loanTransactions.runningLoanId],
      foreignColumns: [runningLoans.id],
    }),
  },
  loanTypes: {
    loanCategory: foreignKey({
      columns: [loanTypes.loanCategoryId],
      foreignColumns: [loanCategories.id],
    }),
  },
  membershipApprovals: {
    approvedBy: foreignKey({
      columns: [membershipApprovals.approvedById],
      foreignColumns: [users.id],
    }),
    step: foreignKey({
      columns: [membershipApprovals.stepId],
      foreignColumns: [membershipApprovalSteps.id],
    }),
  },
  runningLoans: {
    disbursedBy: foreignKey({
      columns: [runningLoans.disbursedById],
      foreignColumns: [users.id],
    }),
    user: foreignKey({
      columns: [runningLoans.userId],
      foreignColumns: [users.id],
    }),
  },
  userKycData: {
    user: foreignKey({
      columns: [userKycData.userId],
      foreignColumns: [users.id],
    }),
  },
};
