import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";


if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env");
}

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db("EducareDB");


export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
    },
    github: {
      enabled: true,
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    jwt()
  ],

 
  session: {
    cookieCache: {
        enabled: true,
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    
    }
  }
});