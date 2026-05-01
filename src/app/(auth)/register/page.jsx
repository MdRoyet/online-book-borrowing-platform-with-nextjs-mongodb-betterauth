"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
// Import the SocialLogin component we just created
import SocialLogin from "@/components/auth/SocialLogin";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();

    // Validation: Ensure required fields are not empty
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Success logic mock
    console.log("Registering user:", formData);
    toast.success("Account created successfully! Please log in.");

    // Redirect to login page after successful registration
    router.push("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-base-100 rounded-3xl shadow-2xl border border-base-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-extrabold mb-2">
            Create Account
          </h1>
          <p className="text-base-content/60">
            Join the BookedBorrow community
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Full Name *</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="input input-bordered w-full rounded-xl focus:input-primary"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Email Address *</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              className="input input-bordered w-full rounded-xl focus:input-primary"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          {/* Photo URL Field (Optional) */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Photo URL</span>
            </label>
            <input
              type="url"
              name="photoUrl"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full rounded-xl focus:input-primary"
              onChange={handleChange}
              value={formData.photoUrl}
            />
          </div>

          {/* Password Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Password *</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="input input-bordered w-full rounded-xl focus:input-primary"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full rounded-xl text-white mt-6 shadow-lg shadow-primary/20"
          >
            Register
          </button>
        </form>

        {/* Social Login (Google) */}
        <div className="mt-4">
          <SocialLogin />
        </div>

        {/* Link back to Login */}
        <p className="text-center mt-8 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline underline-offset-4"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
