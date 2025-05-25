"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useThemeStore } from "../../../../store/themeStore";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import Loading2 from "../../../components/Loading2";

const Home = () => {
  const t = useTranslations("Home");
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme;
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [movie, setMovie] = useState({});
  const router = useRouter();

  const getTrendingMovie = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/Movie/trending/1?lang=${locale}&count=1`
      );
      const data = await response.json();
      console.log(data.movies[0]);
      setMovie(data.movies[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrendingMovie();
  }, []);

  return (
    <div
      className={`relative w-full h-screen ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Image
        src={
          movie?.backdrop_path || movie?.poster_path
            ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${
                movie?.backdrop_path || movie?.poster_path
              }`
            : "/images/home-bg.jpg"
        }
        alt="home background"
        layout="fill"
        objectFit="cover"
      />

      <div
        className={`w-full h-full absolute top-0 ${
          isDark ? "bg-black/50" : "bg-white/70"
        }`}
      ></div>

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

        {loading ? (
          <div className="mt-20 flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <h1
              className={`
                mt-20 
                font-bold 
                text-2xl leading-tight
                sm:text-2xl sm:leading-[44px] 
                md:text-4xl md:leading-[56px]
                lg:text-5xl lg:leading-[64px]
                xl:text-[60px] xl:leading-[72px]
                max-w-[90%] sm:max-w-[800px]
                ${isDark ? "text-white" : "text-black"}
              `}
            >
              {movie.title}
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
                {t("movies_today")}
              </h3>
            </div>

            <p
              className={`
                mt-4 font-normal 
                text-sm sm:text-base md:text-[16px]
                leading-relaxed
                max-w-[90%] sm:max-w-[800px]
                ${isDark ? "text-white/90" : "text-black/80"}
              `}
            >
              {movie.overview}
            </p>

            <div className="flex flex-col sm:flex-row mt-6 gap-3 sm:gap-4">
              <button
                onClick={() => {
                  setLoading2(true);
                  router.push(`/${locale}/movies/${movie.id}?from=home`);
                }}
                className={`
      hover:cursor-pointer
      rounded-md py-3 px-6 
      font-bold 
      text-sm sm:text-base
      ${isDark ? "bg-white text-black" : "bg-black text-white"}
    `}
              >
                {loading2 ? <Loading2 bg={theme ? "border-black" : "border-white"} /> : t("play")}
              </button>

              <button
                onClick={() =>{
                  setLoading3(true);
                  router.push(
                    `/${locale}/movies/${movie.id}/more-info?from=home`
                  )
                }}
                className={`
      hover:cursor-pointer
      rounded-md py-3 px-6 
      font-bold 
      text-sm sm:text-base
      ${isDark ? "bg-[#515451] text-white" : "bg-gray-200 text-black"}
    `}
              >
                {loading3 ? <Loading2 /> : t("more_info")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
