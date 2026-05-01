"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import booksData from "../../../public/data.json";

import CategorySidebar from "@/components/books/CategorySidebar";

export default function AllBooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const uniqueCategories = new Set(booksData.map((book) => book.category));
    return ["All", ...Array.from(uniqueCategories)];
  }, []);

  const filteredBooks = booksData.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      {/* Header & Search */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">
          Library <span className="text-primary">Collection</span>
        </h1>
        <p className="text-base-content/70 mb-8 text-lg">
          Browse our entire catalog. Use the search bar or filters below to find
          your next great read.
        </p>

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

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* 2. Drop the component here and pass the props! */}
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* RIGHT COLUMN: Book Results */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center text-base-content/70 font-medium">
            <p>
              Showing {filteredBooks.length}{" "}
              {filteredBooks.length === 1 ? "result" : "results"}
              {selectedCategory !== "All" && ` for "${selectedCategory}"`}
            </p>
          </div>

          {filteredBooks.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
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
                    <div className="relative h-56 overflow-hidden bg-base-200">
                      <img
                        src={book.image_url}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-base-100/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                        {book.category}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-heading font-bold mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm font-medium text-base-content/60 mb-4">
                        By {book.author}
                      </p>
                      <div className="flex-grow"></div>
                      <Link
                        href={`/books/${book.id}`}
                        className="btn btn-primary btn-sm w-full rounded-xl text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                      >
                        View Details <FiArrowRight />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-base-200/50 rounded-3xl border border-base-200 border-dashed">
              <FiSearch className="mx-auto text-5xl text-base-content/30 mb-4" />
              <h3 className="text-2xl font-bold mb-2">No books found</h3>
              <p className="text-base-content/60">
                We couldn't find any books matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="btn btn-outline mt-6 rounded-xl"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
