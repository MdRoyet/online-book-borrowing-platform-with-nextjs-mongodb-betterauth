import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Export the hooks we need for our UI
export const { signIn, signUp, useSession, signOut } = authClient;
