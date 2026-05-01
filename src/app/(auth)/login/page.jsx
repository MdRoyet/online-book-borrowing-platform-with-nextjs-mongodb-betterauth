"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
// Make sure SocialLogin is properly imported!
import SocialLogin from "@/components/auth/SocialLogin";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock validation logic
    if (email === "admin@mango.com" && password === "123456") {
      toast.success("Welcome back! Login successful.");
      router.push("/");
    } else {
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-base-100 rounded-3xl shadow-2xl border border-base-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-extrabold mb-2">Login</h1>
          <p className="text-base-content/60">
            Access your digital library account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Added w-full to form-control and input to force stacking */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full rounded-xl text-white mt-4"
          >
            Login
          </button>
        </form>

        {/* The SocialLogin component correctly called as a JSX element */}
        <div className="mt-6">
          <SocialLogin />
        </div>

        <p className="text-center mt-8 text-sm">
          New here?{" "}
          <Link
            href="/register"
            className="text-primary font-bold hover:underline"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}
