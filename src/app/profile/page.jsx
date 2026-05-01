"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // If a user manually types /profile in the URL without logging in, kick them back to login
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-xl">
                <img
                  src={
                    user.image ||
                    `https://ui-avatars.com/api/?name=${user.name}&background=random&size=200`
                  }
                  alt="Profile"
                />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-heading font-extrabold mb-2">
                My Profile
              </h1>
              <p className="text-base-content/70">
                Manage your account information and view your details.
              </p>
            </div>
          </div>

          {/* THE NEW UPDATE BUTTON */}
          <Link
            href="/profile/update"
            className="btn btn-primary rounded-xl text-white shadow-md"
          >
            Update Information
          </Link>
        </div>

        {/* Information Table Card */}
        <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full text-base">
                <tbody>
                  {/* Row 1: Full Name */}
                  <tr>
                    <td className="font-semibold text-base-content/70 w-1/3 py-5 pl-8">
                      Full Name
                    </td>
                    <td className="font-medium py-5">{user.name}</td>
                  </tr>

                  {/* Row 2: Email Address */}
                  <tr>
                    <td className="font-semibold text-base-content/70 py-5 pl-8">
                      Email Address
                    </td>
                    <td className="font-medium py-5">{user.email}</td>
                  </tr>

                  {/* Row 3: Account ID */}
                  <tr>
                    <td className="font-semibold text-base-content/70 py-5 pl-8">
                      Account ID
                    </td>
                    <td className="font-mono text-sm py-5">{user.id}</td>
                  </tr>

                  {/* Row 4: Account Status */}
                  <tr>
                    <td className="font-semibold text-base-content/70 py-5 pl-8">
                      Status
                    </td>
                    <td className="py-5">
                      <div className="badge badge-success gap-2 text-white font-bold p-3">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        Active
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
