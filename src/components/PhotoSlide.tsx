import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import giftImg1 from "../images/OnboardingImg1.svg";
import giftImg2 from "../images/OnboardingImg2.svg";
import giftImg3 from "../images/OnboardingImg3.svg";

const PhotoSlide: React.FC = () => {
  const images = [giftImg1, giftImg2, giftImg3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval); 
  }, [images.length]);

  return (
    <div className="relative w-full">
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-auto max-h-[550px] object-cover transition-all duration-300 rounded-2xl"
      />

      {/* Arrows and Pagination */}
      <div className="flex justify-between items-center absolute bottom-[38px] left-[75px] w-[80%]">
        {/* Pagination Dots */}
        <div className="flex space-x-2">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-[4px] w-[32px] rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-white" : "bg-gray-400 opacity-70"
              }`}
            ></span>
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-4">
          <button
            onClick={prevSlide}
            className="bg-gray-400/50 hover:bg-gray-500/70 text-white p-1.5 rounded-full backdrop-blur-sm"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="bg-gray-400/50 hover:bg-gray-500/70 text-white p-1.5 rounded-full backdrop-blur-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoSlide;
