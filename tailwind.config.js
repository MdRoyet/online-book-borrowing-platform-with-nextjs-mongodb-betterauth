/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Sets Inter as the default sans-serif font for the whole app
        sans: ["var(--font-inter)", "sans-serif"],
        // Creates a custom utility class 'font-heading' for your titles
        heading: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // You can pick your favorite themes here
  },
};
