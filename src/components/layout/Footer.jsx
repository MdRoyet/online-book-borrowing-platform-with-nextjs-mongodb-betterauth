import Link from "next/link";
// Importing sleek icons from react-icons
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-base-300 text-base-content border-t border-base-200 mt-16 relative overflow-hidden">
      {/* Decorative background glow to make it "lucrative" */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Branding & Description */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-3xl font-heading font-extrabold tracking-tight inline-block mb-4"
            >
              <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent drop-shadow-sm">
                BookedBorrow
              </span>
            </Link>
            <p className="text-base-content/80 leading-relaxed max-w-md mb-6">
              A seamless and modern web application designed to digitize the
              traditional library experience. Explore vast collections, borrow
              titles digitally, and expand your horizons.
            </p>

            {/* Social Media Links  */}
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center text-base-content/70 hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                <FaFacebookF className="text-lg" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center text-base-content/70 hover:bg-black hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <FaXTwitter className="text-lg" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center text-base-content/70 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center text-base-content/70 hover:bg-blue-600 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-base-content mb-4 tracking-wide uppercase">
              Explore
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/"
                  className="text-base-content/80 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{" "}
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="text-base-content/80 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{" "}
                  All Books
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-base-content/80 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{" "}
                  Member Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-base-content/80 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{" "}
                  Join Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us  */}
          <div>
            <h3 className="text-lg font-bold text-base-content mb-4 tracking-wide uppercase">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="mailto:support@bookedborrow.com"
                  className="group flex items-start gap-3 text-base-content/80 hover:text-primary transition-colors"
                >
                  <FiMail className="text-xl mt-0.5 text-primary group-hover:scale-110 transition-transform" />
                  <span>
                    <span className="block font-medium text-sm text-base-content/50">
                      Email us at
                    </span>
                    support@bookedborrow.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801234567890"
                  className="group flex items-start gap-3 text-base-content/80 hover:text-primary transition-colors"
                >
                  <FiPhone className="text-xl mt-0.5 text-primary group-hover:scale-110 transition-transform" />
                  <span>
                    <span className="block font-medium text-sm text-base-content/50">
                      Call us
                    </span>
                    +880 123 456 7890
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-base-content/80">
                  <FiMapPin className="text-xl mt-0.5 text-primary" />
                  <span>
                    <span className="block font-medium text-sm text-base-content/50">
                      Location
                    </span>
                    Narsingdi, Dhaka, Bangladesh
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Divider */}
        <div className="mt-12 pt-8 border-t border-base-content/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-base-content/60">
            © {new Date().getFullYear()} BookedBorrow Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-base-content/60">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
