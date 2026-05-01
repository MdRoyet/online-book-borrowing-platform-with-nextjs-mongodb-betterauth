"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
// 1. Import the signIn hook from your Better Auth client
import { signIn } from "@/lib/auth-client";

export default function SocialLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // 2. Call Better Auth's social login method
      const { data, error } = await signIn.social({
        provider: "google",
        callbackURL: "/", // Where to send the user after successful login
      });

      if (error) {
        toast.error(error.message || "Failed to authenticate with Google.");
        setIsLoading(false); // Only reset loading if there's an error (redirect handles success)
      }
    } catch (err) {
      toast.error("Something went wrong during Google Login.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Decorative Divider */}
      <div className="divider text-xs text-base-content/50 uppercase tracking-widest my-6">
        Or continue with
      </div>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="btn btn-outline w-full rounded-xl border-base-300 hover:bg-base-200 hover:border-base-400 hover:text-base-content flex items-center justify-center gap-3 transition-all duration-300 shadow-sm"
      >
        {isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <FcGoogle className="text-2xl" />
        )}
        <span className="font-semibold">
          {isLoading ? "Redirecting..." : "Sign in with Google"}
        </span>
      </button>
    </div>
  );
}
