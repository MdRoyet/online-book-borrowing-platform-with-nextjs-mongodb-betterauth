import { Inter, Outfit } from "next/font/google";
import "./globals.css";

// 1. Initialize the fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // We will use this in Tailwind
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Mango Library | Online Book Borrowing",
  description:
    "A seamless and modern web application designed to digitize the traditional library experience.",
};

export default function RootLayout({ children }) {
  return (
    // You can add a default DaisyUI theme here via data-theme
    <html lang="en" data-theme="light">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-base-100 text-base-content`}
      >
        {children}
      </body>
    </html>
  );
}
