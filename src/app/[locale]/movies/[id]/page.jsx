"use client";

import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, ArrowRightCircle, ArrowLeftCircle } from "lucide-react";
import Loading from "@/components/Loading";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import { useThemeStore } from "../../../../../store/themeStore";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Loading2 from "../../../../components/Loading2";
import {useGoBackStore} from "../../../../../store/goBackStore";

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
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [activeLoadingId, setActiveLoadingId] = useState(null);
  const { addId, removeLastId, getLastId, ids,getPreviousToLastId } = useGoBackStore.getState();

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

  const handleMovieClick = (id) => {
    setActiveLoadingId(id);
    addId(id);
    const params = searchParams.toString();
    router.push(`/${locale}/movies/${id}?${params}`);
  };

  const goBack = () => {
    setLoading(true);
    const params = searchParams.toString();
    const id = getPreviousToLastId();
    const lastId = getLastId();
    if(id){
      router.push(`/${locale}/movies/${id}?${params}`);
      removeLastId();
    }
    else if (!from) {
      router.push(`/${locale}/movies`);
      removeLastId();
    }
    else if (from === "home") {
      router.push(`/${locale}/home`);
      removeLastId();
    }
    else if (from === "genre") {
      router.push(`/${locale}/movies/genre`);
      removeLastId();
    }
    else if (from === "category") {
      router.push(`/${locale}/movies/category`);
      removeLastId();
    }
  };

  return (
    <div
      className={`${
        theme ? "bg-black text-white" : "bg-white text-black"
      } w-full min-h-screen`}
    >
      <div className="flex flex-row justify-between pt-[20px] md:pt-[25px] xl:pt-[30px] mx-[20px] md:mx-[60px] xl:mx-[40px]">
        <button
          onClick={goBack}
          className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all duration-200 hover:cursor-pointer ${
            theme
              ? "bg-[#1F1F1F] hover:bg-[#2a2a2a] text-white"
              : "bg-gray-200 hover:bg-gray-300 text-black"
          }`}
        >
          <ArrowLeft size={20} />
          {loading ? (
            <Loading2 />
          ) : (
            <span className="text-[14px] md:text-[16px]">{t("go_back")}</span>
          )}
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

            {movie?.id && (
              <div className="flex justify-center mt-6 px-4 sm:px-0">
                <button
                  onClick={() => {
                    setLoading2(true);
                    router.push(`/${locale}/movies/${movie?.id}/more-info`);
                  }}
                  className="hover:cursor-pointer rounded-md group relative inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-3 text-xs sm:text-sm lg:text-baserounded-full font-medium transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-xl"
                >
                  <span className="z-10">{t("more_info")}</span>
                  {loading2 ? (
                    <Loading2 />
                  ) : (
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        <div className="mt-[40px]">
          <h2 className="text-[20px] md:text-[22px] xl:text-[24px] font-normal mb-3">
            {t("similar_movies")}
          </h2>

          {similarLoading ? (
            <div className="w-full h-[150px] flex items-center justify-center">
              <Loading />
            </div>
          ) : similars && similars?.length > 0 ? (
            <>
              <div className="hidden xl:grid xl:grid-cols-7 gap-[15px] w-full h-full">
                {similars?.map((similar) => (
                  <div
                    key={similar?.id}
                    onClick={() => handleMovieClick(similar?.id)}
                    className="relative cursor-pointer w-full h-[300px]"
                  >
                    <Image
                      src={
                        similar?.poster_path
                          ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${similar?.poster_path}`
                          : "/images/defaultPoster.png"
                      }
                      alt={similar?.title || "Similar Movie"}
                      className={`w-full h-full object-cover rounded-[10px] border-[1px] ${
                        theme ? "border-white" : "border-gray-700"
                      }`}
                      fill
                    />
                    {activeLoadingId === similar?.id && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-[10px]">
                        <Loading2 bg="border-white" />
                      </div>
                    )}
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
                    key={similar?.id}
                    className={`relative flex-shrink-0 w-[160px] md:w-[200px] h-[240px] md:h-[250px] cursor-pointer rounded-[10px] border-[1px] ${
                      theme
                        ? "bg-[#1F1F1F] border-white"
                        : "bg-[#F4F4F5] border-gray-700"
                    }`}
                    onClick={() => handleMovieClick(similar?.id)}
                  >
                    <Image
                      src={
                        similar?.poster_path
                          ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${similar?.poster_path}`
                          : "/images/defaultPoster.png"
                      }
                      alt={similar?.title || "Similar Movie"}
                      className="w-full h-full object-cover rounded-[10px]"
                      layout="fill"
                      objectFit="cover"
                    />
                    {activeLoadingId === similar?.id && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-[10px]">
                        <Loading2 bg="border-white" />
                      </div>
                    )}
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