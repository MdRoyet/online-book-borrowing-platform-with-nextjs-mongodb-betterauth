"use client";

import Link from "next/link";
import { useSpring, animated, config } from "@react-spring/web";
import { FiHome, FiSearch } from "react-icons/fi";
import "animate.css";

export default function NotFound() {
  // React-Spring: Floating animation for the 404 text
  const floatSpring = useSpring({
    from: { transform: "translateY(0px)" },
    to: async (next) => {
      while (true) {
        await next({ transform: "translateY(-20px)" });
        await next({ transform: "translateY(0px)" });
      }
    },
    config: { duration: 2000 },
  });

  // React-Spring: Smooth fade in for the whole card
  const fadeIn = useSpring({
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    config: config.gentle,
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 overflow-hidden bg-base-100">
      <animated.div style={fadeIn} className="max-w-2xl w-full text-center">
        {/* Animated 404 Text using React-Spring & Animate.css */}
        <animated.div style={floatSpring} className="mb-4">
          <h1 className="text-9xl font-heading font-black text-primary/20 select-none animate__animated animate__zoomIn">
            404
          </h1>
        </animated.div>

        {/* Content Section */}
        <div className="relative -mt-20 z-10">
          <div className="bg-base-100/50 backdrop-blur-sm p-8 rounded-3xl border border-base-200 shadow-2xl animate__animated animate__fadeInUp animate__delay-1s">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full text-primary animate__animated animate__bounceIn animate__delay-2s">
                <FiSearch size={48} />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
              Lost in the <span className="text-primary">Stacks?</span>
            </h2>

            <p className="text-base-content/60 text-lg mb-8 max-w-md mx-auto">
              Oops! It looks like the page you are looking for has been
              misplaced or never existed in our library.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="btn btn-primary rounded-xl text-white px-8 shadow-lg hover:shadow-primary/30 transition-all gap-2"
              >
                <FiHome /> Return Home
              </Link>

              <Link
                href="/books"
                className="btn btn-outline border-base-300 rounded-xl px-8 hover:bg-base-200 gap-2"
              >
                Browse Books
              </Link>
            </div>
          </div>
        </div>

        {/* Background Decorative Elements (Animate.css) */}
        <div className="absolute top-1/4 left-10 w-12 h-12 bg-secondary/10 rounded-full blur-xl animate__animated animate__pulse animate__infinite"></div>
        <div className="absolute bottom-1/4 right-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate__animated animate__pulse animate__infinite animate__slow"></div>
      </animated.div>
    </div>
  );
}
