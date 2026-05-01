"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiRefreshCw } from "react-icons/fi";
// Import your local JSON data
import booksData from "../../../public/data.json";

export default function MoodMatcher() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({ mood: "", time: "" });
  const [matchedBook, setMatchedBook] = useState(null);

  // The logic engine: mapping user input to specific books
  const handleMatch = (timeSelection) => {
    // 1. Map mood to our data categories
    const categoryMap = {
      Escapism: "Story",
      Knowledge: "Tech",
      Curiosity: "Science",
    };

    const targetCategory = categoryMap[preferences.mood];

    // 2. Filter books by the selected category
    const filteredBooks = booksData.filter(
      (book) => book.category === targetCategory,
    );

    // 3. Pick a book based on time commitment (First for quick, Last for deep dive)
    const selectedBook =
      timeSelection === "Quick Read"
        ? filteredBooks[0]
        : filteredBooks[filteredBooks.length - 1];

    setMatchedBook(selectedBook);
    setStep(3); // Move to final result step
  };

  const resetMatcher = () => {
    setStep(1);
    setPreferences({ mood: "", time: "" });
    setMatchedBook(null);
  };

  // Framer motion variants for smooth sliding transitions
  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto bg-base-200/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-primary/20 relative overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="text-center mb-10 relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-4">
            Not sure what to read?{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Match your mood.
            </span>
          </h2>
          <p className="text-base-content/70">
            Let our AI-inspired engine find the perfect book for your current
            state of mind.
          </p>
        </div>

        {/* The Interactive Quiz Area */}
        <div className="relative min-h-[250px] flex items-center justify-center z-10">
          <AnimatePresence mode="wait">
            {/* STEP 1: MOOD */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full text-center"
              >
                <h3 className="text-2xl font-bold mb-8">
                  What are you looking for today?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {["Escapism", "Knowledge", "Curiosity"].map((mood) => (
                    <button
                      key={mood}
                      onClick={() => {
                        setPreferences({ ...preferences, mood });
                        setStep(2);
                      }}
                      className="btn btn-outline border-base-300 hover:bg-primary hover:border-primary hover:text-white px-8 py-4 h-auto rounded-2xl text-lg transition-all duration-300 shadow-sm"
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: TIME */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full text-center"
              >
                <h3 className="text-2xl font-bold mb-8">
                  How much time do you have?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {["Quick Read", "Deep Dive"].map((time) => (
                    <button
                      key={time}
                      onClick={() => handleMatch(time)}
                      className="btn btn-outline border-base-300 hover:bg-secondary hover:border-secondary hover:text-white px-8 py-4 h-auto rounded-2xl text-lg transition-all duration-300 shadow-sm"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: RESULT */}
            {step === 3 && matchedBook && (
              <motion.div
                key="step3"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-2xl mx-auto bg-base-100 rounded-2xl p-6 shadow-2xl border border-base-200 flex flex-col md:flex-row gap-6 items-center text-left"
              >
                <div className="w-40 h-56 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                  <img
                    src={matchedBook.image_url}
                    alt={matchedBook.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <span className="badge badge-primary badge-sm mb-2">
                    100% Match for "{preferences.mood}"
                  </span>
                  <h3 className="text-2xl font-heading font-bold mb-1">
                    {matchedBook.title}
                  </h3>
                  <p className="text-sm font-medium text-base-content/60 mb-3">
                    By {matchedBook.author}
                  </p>
                  <p className="text-base-content/80 mb-6 text-sm line-clamp-3">
                    {matchedBook.description}
                  </p>

                  <div className="flex gap-3">
                    <Link
                      href={`/books/${matchedBook.id}`}
                      className="btn btn-primary rounded-full shadow-md"
                    >
                      Borrow Now <FiArrowRight />
                    </Link>
                    <button
                      onClick={resetMatcher}
                      className="btn btn-ghost btn-circle"
                      aria-label="Start Over"
                    >
                      <FiRefreshCw className="text-xl" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
