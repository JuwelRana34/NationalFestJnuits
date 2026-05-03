import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";

// Crypto API ব্যবহার করে Unique ID জেনারেট করা
const generateFestId = () => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const randomNum = (array[0] % 90000) + 10000;
  return `JnUITSFest-${randomNum}`;
};

export const user = sqliteTable("user", {
  id: t.text("id").primaryKey(),
  festId: t
    .text("fest_id")
    .unique()
    .$defaultFn(() => generateFestId()),
  name: t.text("name").notNull(),
  email: t.text("email").notNull().unique(),
  emailVerified: t
    .integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  image: t.text("image"),

  // Custom Fest Fields
  role: t.text("role", { enum: ["USER", "ADMIN"] }).default("USER"),
  phone: t.text("phone"),
  university: t.text("university"),
  studentId: t.text("studentId"),
  tShirtSize: t.text("tShirtSize", { enum: ["S", "M", "L", "XL", "XXL"] }),
  createdAt: t.integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: t.integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

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
    // FIXED: Changed user.id to users.id
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
  subtitle: t.text("subtitle"), // নতুন যুক্ত করা হয়েছে
  type: t.text("type"), // নতুন যুক্ত করা হয়েছে (যেমন: "Workshop", "Contest")
  description: t.text("description").notNull(),
  image: t.text("image"),

  // Schedule & Location (নতুন যুক্ত করা হয়েছে)
  date: t.text("date"), // YYYY-MM-DD ফরম্যাটে রাখতে পারেন
  time: t.text("time"), // HH:MM AM/PM ফরম্যাটে রাখতে পারেন
  venue: t.text("venue"), // যেমন: "Central Auditorium"

  // Capacity & Tracking (নতুন যুক্ত করা হয়েছে)
  seatsTotal: t.integer("seatsTotal").default(0),
  seatsFilled: t.integer("seatsFilled").default(0),

  // Management & Rules (আগেরগুলো)
  responsible: t.text("responsible", { mode: "json" }),
  isTeamEvent: t.integer("isTeamEvent", { mode: "boolean" }).notNull(),
  minMembers: t.integer("minMembers"),
  maxMembers: t.integer("maxMembers"),
  prizeMoney: t.real("prizeMoney"),
  fee: t.real("fee"),

  // Timestamps
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
  teamCode: t.text("teamCode").notNull().unique(),
  segmentId: t
    .text("segmentId")
    .notNull()
    .references(() => segment.id),
  creatorId: t
    .text("creatorId")
    .notNull()
    .references(() => user.id),
  submissionInfo: t.text("submissionInfo"),
});

export const teamMember = sqliteTable(
  "teamMember",
  {
    teamId: t
      .text("teamId")
      .notNull()
      .references(() => team.id, { onDelete: "cascade" }),
    userId: t
      .text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  // FIXED: Changed variable name from 't' to 'table' to avoid shadowing, and used t.primaryKey
  (table) => ({
    pk: t.primaryKey({ columns: [table.teamId, table.userId] }),
  }),
);

export const registration = sqliteTable("registration", {
  id: t.text("id").primaryKey(),
  segmentId: t
    .text("segmentId")
    .notNull()
    .references(() => segment.id),
  userId: t.text("userId").references(() => user.id),
  teamId: t.text("teamId").references(() => team.id),
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
  transactionId: t.text("transactionId").notNull().unique(),
  amount: t.real("amount").notNull(),
  paymentMethod: t
    .text("paymentMethod", {
      enum: ["SSLCOMMERZ", "BKASH"],
    })
    .notNull(),
  status: t
    .text("status", { enum: ["PENDING", "SUCCESS", "FAILED"] })
    .notNull(),
  createdAt: t.integer("createdAt", { mode: "timestamp" }).notNull(),
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
  fileLink: t.text("fileLink").notNull(),
  createdAt: t.integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: t.integer("updatedAt", { mode: "timestamp" }).notNull(),
});


// ==========================
// Drizzle Relations
// ==========================

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  sessions: many(session),
  createdTeams: many(team),
  teamMembers: many(teamMember),
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
  members: many(teamMember),
  registrations: many(registration),
}));

export const teamMembersRelations = relations(teamMember, ({ one }) => ({
  team: one(team, {
    fields: [teamMember.teamId],
    references: [team.id],
  }),
  user: one(user, {
    fields: [teamMember.userId],
    references: [user.id],
  }),
}));

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
}));