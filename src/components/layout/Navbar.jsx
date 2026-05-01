"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  // TODO: We will replace this with BetterAuth's useSession hook later!
  // Change to `{ name: "Alex" }` to see the logged-in state.
  const [user, setUser] = useState(null);

  // We define links here so we can reuse them in mobile and desktop views
  const navLinks = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/books">All Books</Link>
      </li>
      {/* My Profile is a private route, so it's best UX to only show it if logged in */}
      {user && (
        <li>
          <Link href="/profile">My Profile</Link>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      {/* LEFT: Logo & Mobile Menu */}
      <div className="navbar-start">
        {/* Mobile Dropdown Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        {/* Website Logo */}
        <Link
          href="/"
          className="btn btn-ghost text-2xl font-heading font-bold text-primary"
        >
          Mango
        </Link>
      </div>

      {/* CENTER: Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">{navLinks}</ul>
      </div>

      {/* RIGHT: Conditional Authentication */}
      <div className="navbar-end gap-3">
        {user ? (
          <>
            <span className="hidden sm:inline font-medium text-sm">
              Hello, <span className="text-primary">{user.name}</span>
            </span>
            <button
              onClick={() => setUser(null)} // Mock logout action
              className="btn btn-outline btn-error btn-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm px-6">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
