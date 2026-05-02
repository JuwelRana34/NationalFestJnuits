import * as schema from "@/core/db/schema";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";

const generateFestId = () => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const randomNum = (array[0] % 90000) + 10000;
  return `JnUITSFest-${randomNum}`;
};

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
          defaultValue: () => generateFestId(),
        },
        role:{
          type: "string",
          required: false,
          defaultValue: "USER",
        },
        phone:{
          type: "string",
          required: false,
        },
        university:{
          type: "string",
          required: false,
        },
        studentId:{
          type: "string",
          required: false,
        },
        tShirtSize:{
          type: "string",
          required: false,
          enum: ["S", "M", "L", "XL", "XXL"],
        }
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
    },
  });
};
