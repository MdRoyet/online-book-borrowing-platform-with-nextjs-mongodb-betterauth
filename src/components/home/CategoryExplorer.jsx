"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiBookOpen, FiArrowRight } from "react-icons/fi";
// Import your local JSON data
import booksData from "../../../public/data.json";

const categories = ["Story", "Tech", "Science"];

export default function CategoryExplorer() {
  // Set the default active tab to 'Story'
  const [activeTab, setActiveTab] = useState("Story");

  // Dynamically filter the books based on the active tab and grab the top 3
  const filteredBooks = booksData
    .filter((book) => book.category === activeTab)
    .slice(0, 3);

  // Animation variants for the cross-fade effect
  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-base-200/30 rounded-3xl p-6 md:p-12 border border-base-200">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold flex items-center gap-3">
              <FiBookOpen className="text-primary" />
              Explore Collections
            </h2>
            <p className="text-base-content/70 mt-2">
              Dive deep into our curated categories.
            </p>
          </div>

          {/* The Interactive Tabs */}
          <div className="flex bg-base-100 p-1.5 rounded-full shadow-sm border border-base-200 w-full md:w-auto overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === category
                    ? "bg-primary text-white shadow-md"
                    : "text-base-content/70 hover:text-primary hover:bg-base-200/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* The Dynamic Book Grid */}
        <div className="relative min-h-[400px]">
          {/* mode="wait" ensures the old books fade out BEFORE the new ones fade in */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab} // Changing the key triggers the animation
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="group bg-base-100 rounded-2xl p-4 border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative h-48 rounded-xl overflow-hidden mb-5">
                    <img
                      src={book.image_url}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-base-100/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold shadow-sm">
                      {book.available_quantity} Left
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-heading font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-sm font-medium text-base-content/60 mb-3">
                      By {book.author}
                    </p>
                    <p className="text-sm text-base-content/80 line-clamp-2 mb-6 flex-grow">
                      {book.description}
                    </p>

                    <Link
                      href={`/books/${book.id}`}
                      className="btn btn-outline btn-primary btn-sm w-full rounded-xl group-hover:bg-primary group-hover:text-white transition-all"
                    >
                      View Details <FiArrowRight className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
