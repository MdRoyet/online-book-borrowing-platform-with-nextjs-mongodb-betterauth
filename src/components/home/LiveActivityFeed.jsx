"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Import your local JSON data
import booksData from "../../../public/data.json";

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Using randomuser.me for guaranteed distinct, realistic faces
const dummyUsers = [
  { name: "Alex", image: "https://randomuser.me/api/portraits/men/11.jpg" },
  { name: "Sarah", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Jordan", image: "https://randomuser.me/api/portraits/men/33.jpg" },
  { name: "Taylor", image: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Morgan", image: "https://randomuser.me/api/portraits/men/12.jpg" },
  { name: "Sam", image: "https://randomuser.me/api/portraits/women/60.jpg" },
];

const dummyActions = [
  "just borrowed",
  "left a 5-star review for",
  "added to their wishlist:",
  "just reserved",
  "is currently reading",
];

export default function LiveActivityFeed() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Generate a new "toast" activity every 4 seconds
    const interval = setInterval(() => {
      const randomUser = getRandom(dummyUsers);

      const newActivity = {
        id: Date.now().toString(),
        userName: randomUser.name,
        userImage: randomUser.image,
        action: getRandom(dummyActions),
        book: getRandom(booksData).title,
      };

      // Add to the bottom of the stack, keep only the latest 3 active toasts
      setToasts((prev) => [...prev, newActivity].slice(-3));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    /* Fixed position container: 
      It floats at the bottom-right of the viewport.
      pointer-events-none ensures users can still click things underneath the invisible container.
    */
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout // Smoothly adjusts position when other toasts appear/disappear
            initial={{ opacity: 0, x: 100, scale: 0.9 }} // Slides in from the right
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }} // Pops out
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto bg-base-100/95 backdrop-blur-md shadow-2xl border border-base-200/50 rounded-2xl p-3 w-80 flex items-center gap-4"
          >
            {/* Live Indicator Dot */}
            <div className="absolute -top-1 -left-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success border-2 border-base-100"></span>
            </div>

            {/* User Avatar */}
            <div className="flex-shrink-0">
              <img
                src={toast.userImage}
                alt={toast.userName}
                className="w-10 h-10 rounded-full object-cover shadow-sm border border-base-300"
              />
            </div>

            {/* Toast Content */}
            <div className="flex-grow text-sm">
              <p className="text-base-content leading-tight">
                <span className="font-bold">{toast.userName}</span>{" "}
                <span className="text-base-content/70">
                  {toast.action}
                </span>{" "}
              </p>
              <p className="font-semibold text-primary line-clamp-1 mt-0.5">
                {toast.book}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
