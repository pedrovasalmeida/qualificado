"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Find the scrollable container
    const container = document.querySelector(
      ".overflow-y-auto",
    ) as HTMLDivElement;
    scrollContainerRef.current = container;

    const toggleVisibility = () => {
      if (container && container.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (container) {
      container.addEventListener("scroll", toggleVisibility);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", toggleVisibility);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Retornar ao topo"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
}
