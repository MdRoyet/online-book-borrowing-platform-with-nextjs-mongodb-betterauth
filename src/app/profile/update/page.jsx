"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
// Import useSession to pre-fill data, and updateUser to save it!
import { useSession, updateUser } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill the form with the user's current data once the session loads
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  // Protect the route from logged-out users
  if (isPending)
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  if (!session) {
    router.push("/login");
    return null;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Better Auth handles the database update automatically!
      const { data, error } = await updateUser({
        name: name,
        image: image,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile.");
      } else {
        toast.success("Information updated successfully!");
        router.push("/profile"); // Send them back to the profile page
      }
    } catch (err) {
      toast.error("Something went wrong on the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh] flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-base-100 rounded-3xl shadow-2xl border border-base-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-extrabold mb-2">
            Update Info
          </h1>
          <p className="text-base-content/60">
            Change your public profile details
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Input 1: Name */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Display Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full rounded-xl focus:input-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Input 2: Image URL */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">
                Profile Image URL
              </span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full rounded-xl focus:input-primary"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <label className="label">
              <span className="label-text-alt text-base-content/50">
                Leave empty to use a default avatar.
              </span>
            </label>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full rounded-xl text-white shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Update Information"
              )}
            </button>

            <Link href="/profile" className="btn btn-ghost w-full rounded-xl">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
