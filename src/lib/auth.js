import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dns from "node:dns"; // 1. Import the DNS module

// 2. Set the DNS servers BEFORE establishing the database connection
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// 1. Initialize MongoDB Client
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(); // It will use the database name specified in your MONGODB_URI

// 2. Configure Better Auth
export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true, // Enables standard email/password login
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});
