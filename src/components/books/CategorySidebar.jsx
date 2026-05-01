"use client";

import { FiFilter } from "react-icons/fi";

// Receive the data and state functions as props
export default function CategorySidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-base-100 rounded-3xl p-6 border border-base-200 shadow-sm sticky top-24">
        <div className="flex items-center gap-3 mb-6 border-b border-base-200 pb-4">
          <FiFilter className="text-primary text-xl" />
          <h2 className="text-xl font-heading font-bold">Categories</h2>
        </div>

        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
                }`}
              >
                {category}
                {selectedCategory === category && (
                  <span className="float-right bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    Active
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
