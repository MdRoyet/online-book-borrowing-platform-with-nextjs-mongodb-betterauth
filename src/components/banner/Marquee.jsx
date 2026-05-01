// Importing the JSON data directly.
// Adjust the relative path depending on where your data.json is located!
import booksData from "../../../public/data.json";

export default function Marquee() {
  // Fetching the first two books to feature in the marquee dynamically
  const featuredBook1 = booksData[0]?.title || "The Silent Cosmos";
  const featuredBook2 = booksData[1]?.title || "Modern Web Architecture";

  return (
    <div className="bg-primary text-primary-content py-3 mt-8 overflow-hidden relative shadow-md flex">
      {/* Medium speed animation: 40s linear infinite. 
        We duplicate the content blocks to create a seamless infinite scroll effect.
      */}
      <div className="whitespace-nowrap flex items-center animate-[marquee_40s_linear_infinite]">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `,
          }}
        />

        {/* Block 1 */}
        <div className="flex items-center gap-8 px-4">
          <span className="font-medium text-sm md:text-base tracking-wide flex items-center gap-2">
            <span className="badge badge-secondary badge-sm animate-pulse shadow-sm">
              NEW
            </span>
            New Arrivals: {featuredBook1} |
          </span>
          <span className="font-medium text-sm md:text-base tracking-wide flex items-center gap-2">
            <span className="badge badge-accent badge-sm shadow-sm">DEAL</span>
            Special Discount on Memberships - Join Today! |
          </span>
          <span className="font-medium text-sm md:text-base tracking-wide flex items-center gap-2">
            <span className="badge badge-secondary badge-sm animate-pulse shadow-sm">
              NEW
            </span>
            New Arrivals: {featuredBook2} |
          </span>
          <span className="font-medium text-sm md:text-base tracking-wide flex items-center gap-2">
            <span className="badge badge-accent badge-sm shadow-sm">DEAL</span>
            Borrow 3 books, get the 4th extended! |
          </span>
        </div>

        {/* Block 2 (Exact Duplicate of Block 1 for seamless looping) */}
        <div className="flex items-center gap-8 px-4">
          <span className="font-medium text-sm md:text-base tracking-wide flex items-center gap-2">
            <span className="badge badge-secondary badge-sm animate-pulse shadow-sm">
              NEW
            </span>
            New Arrivals: {featuredBook1} |
          </span>
          <span className="font-medium text-sm md:text-base tracking-wide flex items-center gap-2">
            <span className="badge badge-accent badge-sm shadow-sm">DEAL</span>
            Special Discount on Memberships - Join Today! |
          </span>
          <span className="font-medium text-sm md:text-base tracking-wide flex items-center gap-2">
            <span className="badge badge-secondary badge-sm animate-pulse shadow-sm">
              NEW
            </span>
            New Arrivals: {featuredBook2} |
          </span>
          <span className="font-medium text-sm md:text-base tracking-wide flex items-center gap-2">
            <span className="badge badge-accent badge-sm shadow-sm">DEAL</span>
            Borrow 3 books, get the 4th extended! |
          </span>
        </div>
      </div>
    </div>
  );
}
