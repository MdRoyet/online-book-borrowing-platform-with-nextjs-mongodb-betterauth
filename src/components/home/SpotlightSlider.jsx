"use client";

import Link from "next/link";
import { FiEye } from "react-icons/fi";
// Import Swiper React components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Import local data
import booksData from "../../../public/data.json";

export default function SpotlightSlider() {
  // Grab the last 6 books to simulate "New Arrivals"
  const spotlightBooks = booksData.slice(-6).reverse();

  return (
    <section className="container mx-auto px-4 py-16 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">
          Library{" "}
          <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Spotlight
          </span>
        </h2>
        <p className="text-base-content/70 text-lg">
          Swipe through our most anticipated arrivals.
        </p>
      </div>

      <div className="max-w-5xl mx-auto relative px-4 sm:px-10">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 30, // 3D rotation angle
            stretch: 0,
            depth: 150, // Depth of the 3D effect
            modifier: 1.5,
            slideShadows: true, // Adds realistic shadows between slides
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="w-full py-10"
        >
          {spotlightBooks.map((book) => (
            <SwiperSlide
              key={book.id}
              className="max-w-[300px] sm:max-w-[350px]"
            >
              <div className="bg-base-100 rounded-3xl overflow-hidden shadow-2xl border border-base-200 group relative flex flex-col h-[450px]">
                {/* Book Image */}
                <div className="h-[60%] w-full relative">
                  <img
                    src={book.image_url}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Category overlay */}
                  <div className="absolute top-4 right-4 bg-base-100/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    {book.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-heading font-bold line-clamp-1 mb-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-base-content/60 font-medium">
                      By {book.author}
                    </p>
                  </div>

                  <Link
                    href={`/books/${book.id}`}
                    className="btn btn-outline btn-primary w-full rounded-xl hover:text-white transition-all group-hover:bg-primary"
                  >
                    <FiEye className="mr-2 text-lg" /> Inspect Book
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
