import type { AdapterAccount } from "@auth/core/adapters";
import {
    blob,
    integer,
    primaryKey,
    sqliteTable,
    text
} from "drizzle-orm/sqlite-core";
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = sqliteTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
    image: text("image"),
});

const insertUserSchema = createInsertSchema(users);
export const updateUserSchema = insertUserSchema.pick({ name: true })


export const accounts = sqliteTable("account", {
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
},
    (account) => ({
        compoundKey: primaryKey(account.provider, account.providerAccountId),
    })
);

export const sessions = sqliteTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable("verificationToken", {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
},
    (vt) => ({
        compoundKey: primaryKey(vt.identifier, vt.token),
    })
);

export const locationSchema = z.object({
    address: z.string(),
    coordinates: z.object({
        lat: z.number(),
        lng: z.number()
    })
});

export const problemSchema = z.object({
    depot: locationSchema,
    customers: z.object({
        name: z.string(),
        location: locationSchema,
    }).array(),
});

export type ProblemData = z.infer<typeof problemSchema>;

export const routingProblems = sqliteTable("routingProblem", {
    id: blob("id").primaryKey(),
    problem: text('problem', { mode: 'json' }).notNull().$type<ProblemData>(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
});
