// ScrollToTop.js
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-7 right-7 bg-blue-5 text-white rounded-3xl p-2 transition-all duration-300 cursor-pointer 
                        ${
                          isVisible
                            ? "opacity-100 scale-120"
                            : "opacity-0 scale-5 pointer-events-none"
                        }
                        hover:scale-110 hover:bg-blue-6 z-10
                        md:bg-green-5 md:hover:bg-green-6 md:scale-105 lg:bg-red-5 lg:hover:bg-red-6 lg:scale-90`}
      aria-label="Scroll to top"
    >
      <svg
        className="w-4 h-4 ml-1 transition-transform duration-300 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 25V6m0 0l-8 7m7-7l7 7"
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;
