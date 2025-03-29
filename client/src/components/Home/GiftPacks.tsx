import { useState, useEffect, useRef } from "react";
import ProductCard from "../card/ProductCard";
import { GetProduct } from "@/lib/types";
import { Link } from "react-router";

export const GiftPacks = ({
  setProduct,
  setIsQuickView,
  setShow,
  data,
}: {
  data: GetProduct[];
  setProduct: (e: GetProduct) => void;
  setIsQuickView: (e: boolean) => void;
  setShow: (e: boolean) => void;
}) => {
  // State to track the current page and total pages
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Reference to the scroll container
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Calculate total pages based on the width of each product card
    const updatePageIndicator = () => {
      if (scrollRef.current) {
        const containerWidth = scrollRef.current.clientWidth;
        const totalItems = data.length;
        const itemsPerPage = Math.floor(containerWidth / 250); // Assuming each card is ~250px wide
        const pages = Math.ceil(totalItems / itemsPerPage);

        setTotalPages(pages);

        // Calculate the current page based on scroll position
        const scrollLeft = scrollRef.current.scrollLeft;
        const page = Math.floor(scrollLeft / (containerWidth / pages)) + 1;
        setCurrentPage(page);
      }
    };

    // Listen for scroll events to update the page indicator
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updatePageIndicator);
      // Update the page indicator on mount
      updatePageIndicator();
    }

    // Cleanup the event listener on unmount
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", updatePageIndicator);
      }
    };
  }, [data.length]);

  return (
    <>
      <div className="w-full px-4 md:px-6 mt-20 pb-8">
        <div className="flex justify-between mt-3 items-center mb-10 ">
          <h2 className="text-3xl font-semibold">Gift Packs</h2>
          <Link
            role="button"
            className="group relative inline-flex items-center justify-center text-base rounded-xl bg-black px-4 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-gray-8 hover:shadow-sm hover:shadow-gray-6/30"
            title="login"
            to="/category/cm8ofllb000031fpp95ukmnud"
          >
            View More
            <svg
              aria-hidden="true"
              viewBox="0 0 10 10"
              height="10"
              width="10"
              fill="none"
              className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
            >
              <path
                d="M0 5h7"
                className="transition opacity-0 group-hover:opacity-100"
              ></path>
              <path
                d="M1 1l4 4-4 4"
                className="transition group-hover:translate-x-[3px]"
              ></path>
            </svg>
          </Link>
        </div>

        {/* Scrollable product cards */}
        <div
          ref={scrollRef}
          className="scale-100 flex flex-nowrap overflow-x-scroll pb-3
          overflow-hidden h-full space-x-4 md:space-x-6 [&::-webkit-scrollbar]:hidden"
        >
          {data.map((product, id) => (
            <ProductCard
              data={product}
              setIsQuickView={setIsQuickView}
              setProduct={setProduct}
              setShow={setShow}
              key={id}
              gift
            />
          ))}
        </div>

        {/* Dot Page Indicator */}
        <div className="mt-4 flex justify-center items-center space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                currentPage === index + 1
                  ? "bg-black"
                  : "bg-gray-4 hover:bg-gray-5"
              }`}
              onClick={() => {
                const container = scrollRef.current;
                if (container) {
                  const scrollPosition =
                    (container.clientWidth / totalPages) * (index + 1);
                  container.scrollTo({
                    left: scrollPosition,
                    behavior: "smooth",
                  });
                }
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};
