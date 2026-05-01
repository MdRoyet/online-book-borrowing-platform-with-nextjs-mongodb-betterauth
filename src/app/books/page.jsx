"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
// Import your local JSON data
import booksData from "../../../public/data.json"; // Adjust path if necessary

export default function AllBooksPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamically filter books based on the search query
  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      {/* Page Header & Search Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">
          Library <span className="text-primary">Collection</span>
        </h1>
        <p className="text-base-content/70 mb-8 text-lg">
          Browse our entire catalog. Use the search bar below to find your next
          great read.
        </p>

        {/* Large Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="text-base-content/50 text-xl" />
          </div>
          <input
            type="text"
            placeholder="Search for books by title..."
            className="input input-bordered input-lg w-full pl-12 rounded-2xl shadow-sm focus:shadow-md transition-shadow border-base-300 focus:border-primary focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex justify-between items-center text-base-content/70 font-medium">
        <p>
          Showing {filteredBooks.length}{" "}
          {filteredBooks.length === 1 ? "result" : "results"}
        </p>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredBooks.map((book) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={book.id}
                className="group bg-base-100 rounded-3xl overflow-hidden shadow-sm border border-base-200 hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
              >
                {/* Book Image */}
                <div className="relative h-64 overflow-hidden bg-base-200">
                  <img
                    src={book.image_url}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-base-100/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {book.category}
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-heading font-bold mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm font-medium text-base-content/60 mb-4">
                    By {book.author}
                  </p>

                  {/* Spacer to push button to the bottom */}
                  <div className="flex-grow"></div>

                  {/* Details Button */}
                  <Link
                    href={`/books/${book.id}`}
                    className="btn btn-primary w-full rounded-xl text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    View Details <FiArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-base-200/50 rounded-3xl border border-base-200 border-dashed">
          <FiSearch className="mx-auto text-5xl text-base-content/30 mb-4" />
          <h3 className="text-2xl font-bold mb-2">No books found</h3>
          <p className="text-base-content/60">
            We couldn't find any books matching "{searchQuery}". Try adjusting
            your search.
          </p>
        </div>
      )}
    </div>
  );
}
