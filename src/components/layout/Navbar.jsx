"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// Import the real auth hooks
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  // Grab the real user session from the database
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.info("Logged out successfully.");
          router.push("/login");
        },
      },
    });
  };

  // CENTER: Navigation links for Home, All Books, and My Profile
  const navLinks = (
    <>
      <li>
        <Link
          href="/"
          className="hover:text-primary transition-colors font-medium"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/books"
          className="hover:text-primary transition-colors font-medium"
        >
          All Books
        </Link>
      </li>

      {/* My Profile link is ONLY shown when the user is logged in */}
      {session && (
        <li>
          <Link
            href="/profile"
            className="hover:text-primary transition-colors font-medium"
          >
            My Profile
          </Link>
        </li>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-base-100/80 backdrop-blur-lg shadow-sm border-b border-base-200">
      <div className="navbar container mx-auto px-4 sm:px-6 lg:px-8">
        {/* LEFT: Website Logo (Links to Home) */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden -ml-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200"
            >
              {navLinks}
            </ul>
          </div>
          <Link
            href="/"
            className="text-2xl font-heading font-extrabold tracking-tight ml-2 lg:ml-0"
          >
            <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent drop-shadow-sm hover:opacity-80 transition-opacity">
              BookedBorrow
            </span>
          </Link>
        </div>

        {/* CENTER: Desktop Navigation  */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>

        {/* RIGHT: Conditional Rendering */}
        <div className="navbar-end gap-3">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-primary"></span>
          ) : session ? (
            <div className="flex items-center gap-3 sm:gap-4">
              {/* NEW: User Avatar added here! */}
              <div className="avatar">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring ring-primary/30 ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      session.user.image ||
                      `https://ui-avatars.com/api/?name=${session.user.name}&background=random`
                    }
                    alt={session.user.name}
                  />
                </div>
              </div>

              {/* Show the User’s Name from the database */}
              <span className="hidden sm:inline font-medium text-sm">
                Hi,{" "}
                <span className="text-primary font-bold">
                  {session.user.name}
                </span>
              </span>

              {/* Show the real Logout button */}
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-error btn-sm rounded-full px-4 sm:px-5 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            // If logged out, show Login
            <Link
              href="/login"
              className="btn btn-primary btn-sm rounded-full px-7 text-white shadow-md hover:shadow-lg transition-shadow"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
