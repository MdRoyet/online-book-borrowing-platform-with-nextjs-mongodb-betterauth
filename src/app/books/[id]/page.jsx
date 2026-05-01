"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { FiArrowLeft, FiCheckCircle, FiXCircle } from "react-icons/fi";
// Import the session hook to make this a Private Route
import { useSession } from "@/lib/auth-client";
// Import your local JSON data (adjust the path if needed)
import booksData from "../../../../public/data.json";

export default function SingleBookDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [book, setBook] = useState(null);
  const [isBorrowing, setIsBorrowing] = useState(false);

  // 1. Fetch the book and protect the route
  useEffect(() => {
    // If auth check is done and there is no user, kick them to login
    if (!isPending && !session) {
      toast.warning("You must be logged in to view book details.", {
        toastId: "auth-warning-toast",
      });
      router.push("/login");
      return;
    }

    // Find the specific book based on the URL parameter
    if (id) {
      const foundBook = booksData.find((b) => b.id.toString() === id);
      setBook(foundBook);
    }
  }, [id, session, isPending, router]);

  // Handle the Borrow Action
  const handleBorrow = () => {
    setIsBorrowing(true);

    // Simulate an API call delay
    setTimeout(() => {
      toast.success(`You have successfully borrowed "${book.title}"!`);
      setIsBorrowing(false);
      // Later, you can redirect them to a "My Borrowed Books" page here
    }, 1000);
  };

  // Loading States
  if (isPending) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // If the user isn't loaded yet, or the route is redirecting, render nothing
  if (!session) return null;

  // If the book doesn't exist in the JSON
  if (!book && id) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Book Not Found</h2>
        <p className="text-base-content/60 mb-6">
          The book you are looking for does not exist in our library.
        </p>
        <Link href="/books" className="btn btn-primary rounded-xl text-white">
          Return to Library
        </Link>
      </div>
    );
  }

  // Fallback data in case your JSON doesn't have these fields yet
  const description =
    book?.description ||
    "A fascinating deep dive into a captivating subject. This book offers profound insights and a beautifully crafted narrative that will keep you engaged from cover to cover.";
  const availableQuantity = book?.quantity !== undefined ? book.quantity : 5; // Default to 5 if missing

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      {/* Back Button */}
      <Link
        href="/books"
        className="btn btn-ghost mb-8 hover:bg-base-200 gap-2"
      >
        <FiArrowLeft /> Back to All Books
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* LEFT COLUMN: Large Book Cover */}
        <div className="lg:col-span-5 relative group perspective-1000">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-base-200 transition-transform duration-500 group-hover:scale-[1.02]">
            <img
              src={book?.image_url}
              alt={book?.title}
              className="w-full h-auto object-cover aspect-[3/4]"
            />
            {/* Category Badge overlay on image */}
            <div className="absolute top-4 left-4 bg-base-100/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              {book?.category}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Book Details & Actions */}
        <div className="lg:col-span-7 flex flex-col pt-2 lg:pt-8">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-3 leading-tight">
            {book?.title}
          </h1>

          <h2 className="text-xl md:text-2xl font-medium text-base-content/70 mb-8">
            By <span className="text-primary font-bold">{book?.author}</span>
          </h2>

          {/* Description */}
          <div className="prose prose-lg max-w-none text-base-content/80 mb-10">
            <h3 className="text-lg font-bold mb-2">About this book</h3>
            <p className="leading-relaxed">{description}</p>
          </div>

          <div className="divider mb-8"></div>

          {/* Status & Action Section */}
          <div className="bg-base-200/50 rounded-3xl p-8 border border-base-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Availability Indicator */}
            <div className="flex items-center gap-3">
              {availableQuantity > 0 ? (
                <>
                  <div className="bg-success/20 p-3 rounded-full text-success">
                    <FiCheckCircle className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60 font-semibold uppercase tracking-wider">
                      Status
                    </p>
                    <p className="text-lg font-bold text-success">
                      {availableQuantity} copies left
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-error/20 p-3 rounded-full text-error">
                    <FiXCircle className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60 font-semibold uppercase tracking-wider">
                      Status
                    </p>
                    <p className="text-lg font-bold text-error">Out of Stock</p>
                  </div>
                </>
              )}
            </div>

            {/* The Action Button */}
            <button
              onClick={handleBorrow}
              disabled={availableQuantity === 0 || isBorrowing}
              className={`btn btn-lg rounded-xl text-white shadow-xl min-w-[200px] ${
                availableQuantity > 0
                  ? "btn-primary hover:shadow-primary/40 hover:-translate-y-1 transition-all"
                  : "btn-disabled"
              }`}
            >
              {isBorrowing ? (
                <span className="loading loading-spinner"></span>
              ) : availableQuantity > 0 ? (
                "Borrow This Book"
              ) : (
                "Currently Unavailable"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
