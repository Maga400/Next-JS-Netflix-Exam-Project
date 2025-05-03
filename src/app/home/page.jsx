"use client";
import React from "react";
import Header from "@/components/Header";
import { useThemeStore } from "../../../store/themeStore";

const Home = () => {
  const theme = useThemeStore((state) => state.theme); // true: dark, false: light

  const isDark = theme;

  return (
    <div className={`relative w-full h-screen ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <img
        src="/images/home-bg.jpg"
        alt="home background"
        className="w-full h-full object-fill absolute"
      />
      {/* Overlay */}
      <div
        className={`w-full h-full absolute top-0 ${
          isDark ? "bg-black/50" : "bg-white/70"
        }`}
      ></div>

      {/* İçerik */}
      <div
        className={`
          absolute top-0 w-full 
          px-4 py-6 
          sm:px-6 sm:py-8 
          md:px-12 md:py-10 
          lg:px-20 lg:py-12 
          xl:px-[90px] xl:py-[30px] 
          flex flex-col
        `}
      >
        <Header />

        <h1
          className={`
            mt-20 
            font-bold 
            text-3xl leading-tight
            sm:text-4xl sm:leading-[44px] 
            md:text-5xl md:leading-[56px]
            lg:text-6xl lg:leading-[64px]
            xl:text-[72px] xl:leading-[72px]
            max-w-[90%] sm:max-w-[420px]
            ${isDark ? "text-white" : "text-black"}
          `}
        >
          You're Cordially Invited
        </h1>

        <div className="flex items-center mt-4 sm:mt-6">
          <img
            src="/icons/top.svg"
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            alt="ranking icon"
          />
          <h3
            className={`
              ml-2 
              font-bold 
              text-base sm:text-lg md:text-xl lg:text-2xl
              ${isDark ? "text-white" : "text-black"}
            `}
          >
            #1 in Movies Today
          </h3>
        </div>

        <p
          className={`
            mt-4 font-normal 
            text-sm sm:text-base md:text-lg 
            leading-relaxed
            max-w-[90%] sm:max-w-[420px]
            ${isDark ? "text-white/90" : "text-black/80"}
          `}
        >
          When two weddings are accidentally booked on the same day at the same
          venue, each bridal party is challenged with preserving their family's
          special mo...
        </p>

        <div className="flex flex-col sm:flex-row mt-6 gap-3 sm:gap-4">
          <button
            className={`
              rounded-md py-3 px-6 
              font-bold 
              text-sm sm:text-base
              ${isDark ? "bg-white text-black" : "bg-black text-white"}
            `}
          >
            Play
          </button>
          <button
            className={`
              rounded-md py-3 px-6 
              font-bold 
              text-sm sm:text-base
              ${isDark ? "bg-[#515451] text-white" : "bg-gray-200 text-black"}
            `}
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
