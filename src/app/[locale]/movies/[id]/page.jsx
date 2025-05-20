"use client";

import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRightCircle, ArrowLeftCircle } from "lucide-react";
import Loading from "@/components/Loading";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import { useThemeStore } from "../../../../../store/themeStore";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

const Movie = ({ params }) => {
  const t = useTranslations("Movies");
  const locale = useLocale();
  const { id } = React.use(params);
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);
  const [similars, setSimilars] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const [similarLoading, setSimilarLoading] = useState(false);
  const [movieLoading, setMovieLoading] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const router = useRouter();
  const scrollRef = useRef(null);
  const theme = useThemeStore((state) => state.theme);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const getMovie = async () => {
    setMovieLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/Movie/${id}/details?lang=${locale}`
      );
      if (response.ok) {
        const resData = await response.json();
        setMovie(resData.content);
        setGenres(resData.content.genres);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setMovieLoading(false);
    }
  };

  const getTrailer = async () => {
    setTrailerLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/Movie/${id}/trailers?lang=${locale}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const resData = await response.json();
        if (resData.trailers.length > 0) {
          setTrailerKey(resData.trailers[0].key);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTrailerLoading(false);
    }
  };

  const getSimilar = async () => {
    setSimilarLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/Movie/${id}/similar?lang=${locale}&count=7`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const resData = await response.json();
        setSimilars(resData.similar);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSimilarLoading(false);
    }
  };

  useEffect(() => {
    getMovie();
    getTrailer();
    getSimilar();
  }, []);

  return (
    <div
      className={`${
        theme ? "bg-black text-white" : "bg-white text-black"
      } w-full min-h-screen`}
    >
      <div className="flex flex-row justify-between pt-[20px] md:pt-[25px] xl:pt-[30px] mx-[20px] md:mx-[60px] xl:mx-[40px]">
        <button
          onClick={() => router.push(`/${locale}/movies`)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all duration-200 hover:cursor-pointer ${
            theme
              ? "bg-[#1F1F1F] hover:bg-[#2a2a2a] text-white"
              : "bg-gray-200 hover:bg-gray-300 text-black"
          }`}
        >
          <ArrowLeft size={20} />
          <span className="text-[14px] md:text-[16px]">{t("go_back")}</span>
        </button>
        <div className="flex flex-row justify-between items-center">
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </div>

      <div className="px-[20px] md:px-[60px] xl:px-[320px] pt-[10px] w-full h-fit">
        {trailerLoading ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            <Loading />
          </div>
        ) : trailerKey ? (
          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full rounded-[10px] border-[1px]"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : null}
      </div>

      {/* Movie Info */}
      <div className="px-[20px] md:px-[60px] xl:px-[40px] py-[20px]">
        {movieLoading ? (
          <div className="w-full h-[200px] flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            {movie?.title && (
              <h1 className="text-[26px] md:text-[32px] xl:text-[36px] font-normal">
                {movie?.title}
              </h1>
            )}

            <div className="flex flex-row flex-wrap gap-[10px] mt-[20px]">
              {genres?.map(
                (genre) =>
                  genre && (
                    <div
                      key={genre?.id}
                      className={`rounded-[5px] py-[10px] md:py-[12px] px-[15px] md:px-[20px] ${
                        theme
                          ? "bg-[#27272A] text-white"
                          : "bg-[#e4e4e7] text-black"
                      }`}
                    >
                      <h4 className="text-[14px] md:text-[16px] font-normal">
                        {genre?.name}
                      </h4>
                    </div>
                  )
              )}
            </div>

            {movie?.overview && (
              <p className="mt-[20px] text-[15px] md:text-[16px] leading-[24px] font-normal">
                {movie?.overview}
              </p>
            )}
          </>
        )}

        {/* Similar Movies */}
        <div className="mt-[40px]">
          <h2 className="text-[20px] md:text-[22px] xl:text-[24px] font-normal mb-3">
            {t("similar_movies")}
          </h2>

          {similarLoading ? (
            <div className="w-full h-[150px] flex items-center justify-center">
              <Loading />
            </div>
          ) : similars && similars.length > 0 ? (
            <>
              <div className="hidden xl:grid xl:grid-cols-7 gap-[15px] w-full h-full">
                {similars.map((similar) => (
                  <div
                    key={similar.id}
                    onClick={() =>
                      router.push(`/${locale}/movies/${similar.id}`)
                    }
                    className="relative cursor-pointer w-full h-[300px]"
                  >
                    <Image
                      src={
                        similar.poster_path
                          ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${similar.poster_path}`
                          : "/images/defaultPoster.png"
                      }
                      alt={similar.title}
                      className={`w-full h-full object-cover rounded-[10px] border-[1px] ${
                        theme ? "border-white" : "border-gray-700"
                      }`}
                      fill
                    />
                  </div>
                ))}
              </div>

              <div
                ref={scrollRef}
                className={`custom-scroll xl:hidden flex gap-[15px] md:gap-[20px] overflow-x-auto whitespace-nowrap scroll-smooth ${
                  theme ? "bg-black" : "bg-white"
                }`}
              >
                {similars.map((similar) => (
                  <div
                    key={similar.id}
                    className={`relative flex-shrink-0 w-[160px] md:w-[200px] h-[240px] md:h-[250px] cursor-pointer rounded-[10px] border-[1px] ${
                      theme
                        ? "bg-[#1F1F1F] border-white"
                        : "bg-[#F4F4F5] border-gray-700"
                    }`}
                    onClick={() =>
                      router.push(`/${locale}/movies/${similar.id}`)
                    }
                  >
                    <Image
                      src={
                        similar.poster_path
                          ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${similar.poster_path}`
                          : "/images/defaultPoster.png"
                      }
                      alt={similar.title}
                      className="w-full h-full object-cover rounded-[10px]"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex xl:hidden justify-between items-center mt-[20px]">
                <button onClick={scrollLeft}>
                  <ArrowLeftCircle size={32} />
                </button>
                <button onClick={scrollRight}>
                  <ArrowRightCircle size={32} />
                </button>
              </div>
            </>
          ) : (
            <p className="text-[16px] mt-2">{t("no_similar_movies_found")}</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: ${theme ? "#ffffff33" : "#00000033"} transparent;
        }
        .custom-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: ${theme ? "#ffffff33" : "#00000033"};
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background-color: ${theme ? "#ffffff55" : "#00000055"};
        }
      `}</style>
    </div>
  );
};

export default Movie;
