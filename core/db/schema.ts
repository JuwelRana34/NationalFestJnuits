import { generateUniqueCode } from "@/lib/UniqueCodeGenarator";
import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";

// ==========================
// Auth & User Tables
// ==========================
export const user = sqliteTable("user", {
  id: t.text("id").primaryKey(),
  festId: t
    .text("fest_id")
    .unique()
    .$defaultFn(() => generateUniqueCode("JnUITSFest")),
  name: t.text("name").notNull(),
  email: t.text("email").notNull().unique(),
  emailVerified: t
    .integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  image: t.text("image"),

  // Custom Fest Fields Updated
  role: t.text("role", { enum: ["USER", "ADMIN"] }).default("USER"),
  phone: t.text("phone"), // WhatsApp Number হিসেবে ব্যবহৃত হবে
  institution: t.text("institution"), // 'university' এর বদলে 'institution' (School/College কাভার করতে)
  department: t.text("department"),
  studentIdUrl: t.text("student_id_url"), // Student ID Scan Image URL (R2/S3)
  tShirtSize: t.text("tShirtSize", { enum: ["S", "M", "L", "XL", "XXL"] }),
  createdAt: t
    .integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: t
    .integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Session, Account, Verification tables remain exactly the same...
export const session = sqliteTable("session", {
  id: t.text("id").primaryKey(),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: t.text("token").notNull().unique(),
  expiresAt: t.integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  ipAddress: t.text("ip_address"),
  userAgent: t.text("user_agent"),
  createdAt: t.integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: t.integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const account = sqliteTable("account", {
  id: t.text("id").primaryKey(),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: t.text("account_id").notNull(),
  providerId: t.text("provider_id").notNull(),
  accessToken: t.text("access_token"),
  refreshToken: t.text("refresh_token"),
  accessTokenExpiresAt: t.integer("access_token_expires_at", {
    mode: "timestamp_ms",
  }),
  refreshTokenExpiresAt: t.integer("refresh_token_expires_at", {
    mode: "timestamp_ms",
  }),
  scope: t.text("scope"),
  idToken: t.text("id_token"),
  password: t.text("password"),
  createdAt: t.integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: t.integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: t.text("id").primaryKey(),
  identifier: t.text("identifier").notNull(),
  value: t.text("value").notNull(),
  expiresAt: t.integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  createdAt: t.integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: t.integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

// ==========================
// Fest Core Tables (Business)
// ==========================
export const segment = sqliteTable("segment", {
  id: t.text("id").primaryKey(),
  title: t.text("title").notNull(),
  subtitle: t.text("subtitle"),
  type: t.text("type"),
  description: t.text("description").notNull(),
  image: t.text("image"),
  date: t.text("date"),
  time: t.text("time"),
  venue: t.text("venue"),
  extraMemberFee: t.real("extra_member_fee").default(0),
  seatsTotal: t.integer("seatsTotal").default(0),
  seatsFilled: t.integer("seatsFilled").default(0),
  responsible: t.text("responsible", { mode: "json" }),
  isTeamEvent: t.integer("isTeamEvent", { mode: "boolean" }).notNull(),
  minMembers: t.integer("minMembers"),
  maxMembers: t.integer("maxMembers"),
  prizeMoney: t.real("prizeMoney"),
  fee: t.real("fee"),
  createdAt: t
    .integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: t
    .integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const team = sqliteTable("team", {
  id: t.text("id").primaryKey(),
  teamName: t.text("teamName").notNull(),
  teamCode: t
    .text("teamCode")
    .notNull()
    .unique()
    .$defaultFn(() => generateUniqueCode("TEAM")),
  segmentId: t
    .text("segmentId")
    .notNull()
    .references(() => segment.id),
  creatorId: t
    .text("creatorId")
    .notNull()
    .references(() => user.id),
  createdAt: t
    .integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// export const teamMember = sqliteTable("teamMember", {
//   id: t.text("id").primaryKey(),
//   teamId: t
//     .text("teamId")
//     .notNull()
//     .references(() => team.id, { onDelete: "cascade" }),
//   userId: t.text("userId").references(() => user.id, { onDelete: "set null" }),

//   name: t.text("name").notNull(),
//   institution: t.text("institution"),
//   phone: t.text("phone").notNull(),
//   department: t.text("department"),
//   isLeader: t
//     .integer("is_leader", { mode: "boolean" })
//     .notNull()
//     .default(false),
//   createdAt: t
//     .integer("created_at", { mode: "timestamp_ms" })
//     .notNull()
//     .$defaultFn(() => new Date()),
// });

export const announcement = sqliteTable("announcement", {
  id: t.text("id").primaryKey(),
  title: t.text("title").notNull(),
  content: t.text("content").notNull(), // নোটিশের বিস্তারিত
  image: t.text("image"), // নোটিশের সাথে কোনো ব্যানার থাকলে
  isPublished: t
    .integer("is_published", { mode: "boolean" })
    .notNull()
    .default(true), // ড্রাফট করে রাখার জন্য

  // অপশনাল: যদি নির্দিষ্ট কোনো ইভেন্টের নোটিশ হয়, গ্লোবাল নোটিশ হলে এটা null থাকবে
  segmentId: t
    .text("segmentId")
    .references(() => segment.id, { onDelete: "set null" }),

  createdAt: t
    .integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: t
    .integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});


// ==========================
//  Registration Table
// ==========================
export const registration = sqliteTable("registration", {
  id: t.text("id").primaryKey(),
  trackingNumber: t
    .text("tracking_number")
    .notNull()
    .unique()
    .$defaultFn(() => generateUniqueCode("TRK")), // ইউজারের সার্চের জন্য
  segmentId: t
    .text("segmentId")
    .notNull()
    .references(() => segment.id),
  userId: t.text("userId").references(() => user.id), // For Individual Events
  teamId: t.text("teamId").references(() => team.id), // For Team Events

  // Requirements Specific Fields
  category: t.text("category", { enum: ["UNIVERSITY", "SCHOOL_COLLEGE"] }),
  ambassadorCode: t.text("ambassador_code"), // 5% discount tracking
  selectionStatus: t
    .text("selection_status", { enum: ["PENDING", "SELECTED", "REJECTED"] })
    .default("PENDING"), // Selection Status

  // Dynamic data payload for Hackathon Links, IGN, App Abstracts, WPM etc.
  metadata: t.text("metadata", { mode: "json" }),

  couponId: t
    .text("coupon_id")
    .references(() => coupon.id, { onDelete: "set null" }),

  createdAt: t
    .integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ==========================
// Finance & Submissions
// ==========================
export const payments = sqliteTable("payment", {
  id: t.text("id").primaryKey(),
  registrationId: t
    .text("registrationId")
    .notNull()
    .references(() => registration.id),
  transactionId: t.text("transactionId").notNull().unique(), // SSLCommerz tran_id
  baseAmount: t.real("base_amount").notNull(), // মূল ফি
  paidAmount: t.real("paid_amount").notNull(), // ডিসকাউন্ট বাদে যা পেমেন্ট করা হয়েছে
  paymentMethod: t
    .text("paymentMethod")
    .notNull(),
  status: t
    .text("status", { enum: ["PENDING", "SUCCESS", "FAILED"] })
    .notNull(),
  createdAt: t
    .integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const submitData = sqliteTable("submitData", {
  id: t.text("id").primaryKey(),
  userId: t
    .text("userId")
    .notNull()
    .references(() => user.id),
  segmentId: t
    .text("segmentId")
    .notNull()
    .references(() => segment.id),
  description: t.text("description"),
  teamId: t.text("teamId").references(() => team.id),

  fileLink: t.text("fileLink").notNull(),
  createdAt: t
    .integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: t
    .integer("updatedAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const coupon = sqliteTable("coupon", {
  id: t.text("id").primaryKey(),
  code: t.text("code").notNull().unique(), // e.g., "JNUITS5", "CAMPUS26"
  discountPercentage: t.real("discount_percentage").notNull(), // e.g., 5 for 5%
  isActive: t.integer("is_active", { mode: "boolean" }).notNull().default(true),
  maxUses: t.integer("max_uses"), // Null means unlimited
  usedCount: t.integer("used_count").notNull().default(0),
  expiresAt: t.integer("expires_at", { mode: "timestamp_ms" }),
  createdAt: t
    .integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ==========================
// Drizzle Relations
// ==========================

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  sessions: many(session),
  createdTeams: many(team),
  // teamMembers: many(teamMember),
  registrations: many(registration),
  submissions: many(submitData),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const segmentsRelations = relations(segment, ({ many }) => ({
  teams: many(team),
  registrations: many(registration),
  submissions: many(submitData),
}));

export const teamsRelations = relations(team, ({ one, many }) => ({
  segment: one(segment, {
    fields: [team.segmentId],
    references: [segment.id],
  }),
  creator: one(user, {
    fields: [team.creatorId],
    references: [user.id],
  }),
  // members: many(teamMember),
  registrations: many(registration),
  submissions: many(submitData),
}));

// export const teamMembersRelations = relations(teamMember, ({ one }) => ({
//   team: one(team, {
//     fields: [teamMember.teamId],
//     references: [team.id],
//   }),
//   user: one(user, {
//     fields: [teamMember.userId],
//     references: [user.id],
//   }),
// }));

export const registrationsRelations = relations(
  registration,
  ({ one, many }) => ({
    segment: one(segment, {
      fields: [registration.segmentId],
      references: [segment.id],
    }),
    user: one(user, {
      fields: [registration.userId],
      references: [user.id],
    }),
    team: one(team, {
      fields: [registration.teamId],
      references: [team.id],
    }),
    payments: many(payments),

    coupon: one(coupon, {
      fields: [registration.couponId],
      references: [coupon.id],
    }),
  }),
);

export const paymentsRelations = relations(payments, ({ one }) => ({
  registration: one(registration, {
    fields: [payments.registrationId],
    references: [registration.id],
  }),
}));

export const submitDataRelations = relations(submitData, ({ one }) => ({
  user: one(user, {
    fields: [submitData.userId],
    references: [user.id],
  }),
  segment: one(segment, {
    fields: [submitData.segmentId],
    references: [segment.id],
  }),
  team: one(team, {
    fields: [submitData.teamId],
    references: [team.id],
  }),
}));

export const couponRelations = relations(coupon, ({ many }) => ({
  registrations: many(registration),
}));

export const announcementRelations = relations(announcement, ({ one }) => ({
  segment: one(segment, {
    fields: [announcement.segmentId],
    references: [segment.id],
  }),
}));
