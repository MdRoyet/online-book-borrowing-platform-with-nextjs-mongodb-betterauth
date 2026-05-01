import { Inter, Outfit } from "next/font/google";
// Import your layout components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// Initialize the fonts we discussed
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Mango | Online Book Borrowing Platform",
  description:
    "A seamless and modern web application designed to digitize the traditional library experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        // Notice the 'min-h-screen flex flex-col' classes here!
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-base-100 text-base-content min-h-screen flex flex-col`}
      >
        {/* 1. Navbar goes at the very top */}
        <Navbar />

        {/* 2. Main content (children) takes up the remaining vertical space */}
        {/* 'flex-grow' ensures that even if a page has very little content, the footer is still pushed to the very bottom */}
        <main className="flex-grow">{children}</main>

        {/* 3. Footer goes at the very bottom */}
        <Footer />
      </body>
    </html>
  );
}
