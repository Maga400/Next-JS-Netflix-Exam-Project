"use client";
import { useThemeStore } from "../../store/themeStore";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const ThemeToggle = () => {
  const theme = useThemeStore((state) => state.theme);
  const themeToggle = useThemeStore((state) => state.themeToggle);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCircleClick = () => {
    setIsAnimating(true);
    themeToggle();
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div
      className={`relative transition-colors duration-300 rounded-full flex items-center
        ${theme ? "bg-[#4B6BFB]" : "bg-gray-300"}
        w-[60px] h-[30px]
        sm:w-[70px] sm:h-[34px]
        md:w-[80px] md:h-[38px]
        xl:w-[90px] xl:h-[42px]
        shadow-md
      `}
    >
      <div
        onClick={handleCircleClick}
        className={`absolute rounded-full bg-white flex items-center justify-center transition-all duration-300 cursor-pointer
          ${
            theme
              ? "left-[30px] sm:left-[36px] md:left-[42px] xl:left-[48px]"
              : "left-[3px]"
          }
          top-[3px]
          w-[24px] h-[24px]
          sm:w-[28px] sm:h-[28px]
          md:w-[32px] md:h-[32px]
          xl:w-[36px] xl:h-[36px]
          ${isAnimating ? "scale-110" : "scale-100"}
        `}
      >
        <SunIcon
          className={`text-yellow-500 absolute transition-opacity duration-200
            ${!theme ? "opacity-100 scale-100" : "opacity-0 scale-90"}
            w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 xl:w-7 xl:h-7`}
        />
        <MoonIcon
          className={`text-[#4B6BFB] absolute transition-opacity duration-200
            ${theme ? "opacity-100 scale-100" : "opacity-0 scale-90"}
            w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 xl:w-7 xl:h-7`}
        />
      </div>
    </div>
  );
};

export default ThemeToggle;
