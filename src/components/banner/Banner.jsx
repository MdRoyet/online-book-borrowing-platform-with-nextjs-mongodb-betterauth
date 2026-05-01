import Link from "next/link";

export default function Banner() {
  return (
    <div className="relative bg-base-200 overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 shadow-sm border border-base-300">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[130%] bg-gradient-to-b from-primary/10 to-secondary/10 blur-3xl rounded-full mix-blend-multiply opacity-70"></div>
        <div className="absolute -bottom-[30%] -left-[10%] w-[50%] h-[100%] bg-gradient-to-t from-purple-500/10 to-primary/10 blur-3xl rounded-full mix-blend-multiply opacity-70"></div>
      </div>

      <div className="hero min-h-[60vh] relative z-10">
        <div className="hero-content text-center px-4 sm:px-10 lg:px-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight mb-6">
              Find Your{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                Next Read
              </span>
            </h1>
            <p className="py-6 text-lg md:text-xl text-base-content/80 max-w-2xl mx-auto leading-relaxed">
              Step into the future of reading. Explore our vast, curated
              collection of physical and digital titles, from timeless stories
              to cutting-edge tech.
            </p>
            <Link
              href="/books"
              className="btn btn-primary btn-lg rounded-full px-10 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 border-none text-white mt-4"
            >
              Browse Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
