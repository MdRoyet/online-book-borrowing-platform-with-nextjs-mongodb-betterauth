import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "BookedBorrow | Digital Library",
  description: "A seamless and modern web application for your reading needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="flex flex-col min-h-screen">
        {/* Navbar shows on every page */}
        <Navbar />

        {/* This is where your individual pages (Home, Login, etc.) get injected */}
        <main className="flex-grow">{children}</main>

        {/* Footer shows on every page */}
        <Footer />

        {/* Toast notifications */}
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </body>
    </html>
  );
}
