"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
// Import your local JSON data
import booksData from "../../../public/data.json";

// Dynamic color mapping for categories to make the cards colorful
const categoryColors = {
  Tech: "from-blue-500 to-cyan-400",
  Science: "from-purple-500 to-pink-500",
  Story: "from-orange-500 to-amber-400",
};

export default function FeaturedBooks() {
  // Fetching only the top 4 books as required
  const featuredBooks = booksData.slice(0, 4);

  // Animation variants for the stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Trending <span className="text-primary">Now</span>
        </h2>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Discover the most popular reads our community is borrowing this week.
        </p>
      </div>

      {/* Grid Container with Framer Motion */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {featuredBooks.map((book) => (
          <motion.div
            key={book.id}
            variants={cardVariants}
            whileHover={{ y: -10 }}
            className="group relative bg-base-100 rounded-3xl overflow-hidden shadow-lg border border-base-200/60 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
          >
            {/* Colorful Glow Effect Behind the Card */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${categoryColors[book.category] || "from-primary to-secondary"} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none z-0`}
            ></div>

            {/* Book Image */}
            <div className="relative h-64 overflow-hidden z-10">
              <img
                src={book.image_url}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              {/* Category Badge overlay */}
              <div
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md bg-gradient-to-r ${categoryColors[book.category] || "from-gray-500 to-gray-400"}`}
              >
                {book.category}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow z-10">
              <h3 className="text-xl font-heading font-bold mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                {book.title}
              </h3>
              <p className="text-sm text-base-content/60 mb-4 font-medium">
                By {book.author}
              </p>

              <p className="text-sm text-base-content/80 line-clamp-3 mb-6 flex-grow">
                {book.description}
              </p>

              {/* View Details Button & Quantity indicator */}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs font-semibold bg-base-200 px-3 py-1.5 rounded-lg text-base-content/70">
                  {book.available_quantity} Left
                </span>

                <Link
                  href={`/books/${book.id}`}
                  className={`btn btn-sm border-none text-white shadow-md hover:shadow-lg transition-all rounded-full px-5 bg-gradient-to-r ${categoryColors[book.category] || "from-primary to-secondary"}`}
                >
                  View Details <FiArrowRight className="ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
