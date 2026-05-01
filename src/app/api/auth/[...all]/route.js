import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// This automatically handles all /api/auth/* requests (login, register, session)
export const { GET, POST } = toNextJsHandler(auth);
