"use client";

import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Loading from "@/components/Loading";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import { useThemeStore } from "../../../../store/themeStore";

const TvShow = ({ params }) => {
  const { id } = React.use(params);
  const [tvShow, setTvShow] = useState({});
  const [genres, setGenres] = useState([]);
  const [similars, setSimilars] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const [tvShowLoading, setTvShowLoading] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [similarLoading, setSimilarLoading] = useState(false);
  const router = useRouter();
  const scrollRef = useRef(null);
  const theme = useThemeStore((state) => state.theme);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const getTvShow = async () => {
    setTvShowLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/tv/${id}/details?lang=en`
      );
      if (response.ok) {
        const resData = await response.json();
        setTvShow(resData.content);
        setGenres(resData.content.genres);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTvShowLoading(false);
    }
  };

  const getTrailer = async () => {
    setTrailerLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/tv/${id}/trailers?lang=en`,
        {
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
        `${process.env.NEXT_PUBLIC_IP_URL}/tv/${id}/similar?lang=en&count=7`,
        {
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
    getTvShow();
    getTrailer();
    getSimilar();
  }, []);

  return (
    <div
      className={`${
        theme ? "bg-black text-white" : "bg-white text-black"
      } w-full min-h-screen transition-colors duration-300`}
    >
      <div className="flex flex-row justify-between items-center pt-[20px] md:pt-[25px] xl:pt-[30px] mx-[20px] md:mx-[60px] xl:mx-[40px]">
        <button
          onClick={() => router.back()}
          className={`flex items-center gap-2 ${
            theme
              ? "bg-[#1F1F1F] hover:bg-[#2a2a2a] text-white"
              : "bg-gray-200 hover:bg-gray-300 text-black"
          } px-4 py-2 rounded-full shadow-md transition-all duration-200 hover:cursor-pointer`}
        >
          <ArrowLeft size={20} />
          <span className="text-[14px] md:text-[16px]">Go Back</span>
        </button>
        <div className="flex flex-row justify-between items-center">
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </div>

      {/* Trailer */}
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

      {/* TV Show Info */}
      <div className="px-[20px] md:px-[60px] xl:px-[40px] py-[20px]">
        {tvShowLoading ? (
          <div className="w-full h-[200px] flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            {tvShow?.name && (
              <h1 className="text-[26px] md:text-[32px] xl:text-[36px] font-normal">
                {tvShow?.name}
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
                          : "bg-gray-100 text-black"
                      }`}
                    >
                      <h4 className="text-[14px] md:text-[16px] font-normal">
                        {genre?.name}
                      </h4>
                    </div>
                  )
              )}
            </div>

            {tvShow?.overview && (
              <p className="mt-[20px] text-[15px] md:text-[16px] leading-[24px] font-normal">
                {tvShow?.overview}
              </p>
            )}
          </>
        )}

        {/* Similar Shows */}
        <div className="mt-[40px]">
          <h2 className="text-[20px] md:text-[22px] xl:text-[24px] font-normal mb-3">
            Similar TV Shows
          </h2>

          {similarLoading ? (
            <div className="w-full h-[150px] flex items-center justify-center">
              <Loading />
            </div>
          ) : similars && similars.length > 0 ? (
            <>
              <div className="flex xl:hidden justify-between items-center mb-2">
                <button onClick={scrollLeft}>
                  <ArrowLeftCircle size={32} />
                </button>
                <button onClick={scrollRight}>
                  <ArrowRightCircle size={32} />
                </button>
              </div>

              <div className="hidden xl:grid xl:grid-cols-7 gap-[15px]">
                {similars.map((similar) => (
                  <div
                    key={similar.id}
                    onClick={() => router.push(`/tv-shows/${similar.id}`)}
                    className="cursor-pointer"
                  >
                    <img
                      src={
                        similar.poster_path
                          ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${similar.poster_path}`
                          : "/images/defaultPoster.png"
                      }
                      alt={similar.name}
                      className={`w-full h-full object-cover rounded-[10px] border-[1px] ${
                        theme ? "border-white" : "border-gray-700"
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div
                ref={scrollRef}
                className="custom-scroll xl:hidden flex gap-[15px] md:gap-[20px] overflow-x-auto whitespace-nowrap scroll-smooth"
              >
                {similars.map((similar) => (
                  <div
                    key={similar.id}
                    className="flex-shrink-0 w-[160px] md:w-[200px] h-[240px] md:h-[250px]"
                    onClick={() => router.push(`/tv-shows/${similar.id}`)}
                  >
                    <img
                      src={
                        similar.poster_path
                          ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${similar.poster_path}`
                          : "/images/defaultPoster.png"
                      }
                      alt={similar.name}
                      className={`w-full h-full object-cover rounded-[10px] border-[1px] ${
                        theme ? "border-white" : "border-gray-700"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-[16px] mt-2">No similar TV shows found.</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: ${theme
            ? "#ffffff33 transparent"
            : "transparent transparent"};
        }
        .custom-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: ${theme ? "#ffffff33" : "transparent"};
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background-color: ${theme ? "#ffffff55" : "transparent"};
        }
      `}</style>
    </div>
  );
};

export default TvShow;
