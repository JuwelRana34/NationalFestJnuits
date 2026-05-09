import * as schema from "@/core/db/schema";
import { generateUniqueCode } from "@/lib/UniqueCodeGenarator";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";

export const createAuth = () => {
  const { env } = getCloudflareContext();
  const db = drizzle(env.jnu_it_fest_db, { schema });

  return betterAuth({
    database: drizzleAdapter(db, { provider: "sqlite" }),
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,

    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID as string,
        clientSecret: env.GOOGLE_CLIENT_SECRET as string,
      },
    },
    emailAndPassword: {
      enabled: true,
    },

    user: {
      additionalFields: {
        festId: {
          type: "string",
          required: false,
          defaultValue: () => generateUniqueCode("JnUITSFest"),
        },
        role: {
          type: "string",
          required: false,
          defaultValue: "USER",
        },
        phone: {
          type: "string",
          required: false,
        },
        institution: {
          type: "string",
          required: false,
        },
        // studentId: {
        //   type: "string",
        //   required: false,
        // },
        // tShirtSize: {
        //   type: "string",
        //   required: false,
        //   enum: ["S", "M", "L", "XL", "XXL"],
        // },
      },
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // Cache duration in seconds (5 minutes)
      },
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
    },
  });
};
