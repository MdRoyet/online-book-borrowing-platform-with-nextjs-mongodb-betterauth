"use client";

import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {
  const handleGoogleLogin = () => {
    // This function will connect to your backend/auth provider later
    console.log("Authenticating with Google...");
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
        className="btn btn-outline w-full rounded-xl border-base-300 hover:bg-base-200 hover:border-base-400 hover:text-base-content flex items-center justify-center gap-3 transition-all duration-300 shadow-sm"
      >
        <FcGoogle className="text-2xl" />
        <span className="font-semibold">Sign in with Google</span>
      </button>
    </div>
  );
}
