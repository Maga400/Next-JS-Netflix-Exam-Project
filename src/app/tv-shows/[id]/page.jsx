"use client";

import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowLeftCircle,
  ArrowRightCircle,
} from "lucide-react";
import Loading from "@/components/Loading";

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
    <div className="bg-black w-full min-h-screen">
      <div className="pt-[20px] md:pt-[25px] xl:pt-[30px] ml-[20px] md:ml-[60px] xl:ml-[40px]">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-[#1F1F1F] hover:bg-[#2a2a2a] text-white px-4 py-2 rounded-full shadow-md transition-all duration-200"
        >
          <ArrowLeft size={20} />
          <span className="text-[14px] md:text-[16px]">Go Back</span>
        </button>
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
              <h1 className="text-[26px] md:text-[32px] xl:text-[36px] text-white font-normal">
                {tvShow?.name}
              </h1>
            )}

            <div className="flex flex-row flex-wrap gap-[10px] mt-[20px]">
              {genres?.map(
                (genre) =>
                  genre && (
                    <div
                      key={genre?.id}
                      className="bg-[#27272A] rounded-[5px] py-[10px] md:py-[12px] px-[15px] md:px-[20px]"
                    >
                      <h4 className="text-[14px] md:text-[16px] text-white font-normal">
                        {genre?.name}
                      </h4>
                    </div>
                  )
              )}
            </div>

            {tvShow?.overview && (
              <p className="mt-[20px] text-white text-[15px] md:text-[16px] leading-[24px] font-normal">
                {tvShow?.overview}
              </p>
            )}
          </>
        )}

        {/* Similar Shows */}
        <div className="mt-[40px]">
          <h2 className="text-white text-[20px] md:text-[22px] xl:text-[24px] font-normal mb-3">
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
                  <ArrowLeftCircle size={32} className="text-white" />
                </button>
                <button onClick={scrollRight}>
                  <ArrowRightCircle size={32} className="text-white" />
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
                      className="w-full h-full object-cover rounded-[10px] border-[1px] border-white"
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
                    className="flex-shrink-0 w-[160px] md:w-[200px] h-[240px] md:h-[250px] "
                    onClick={() => router.push(`/tv-shows/${similar.id}`)}
                  >
                    <img
                      src={
                        similar.poster_path
                          ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${similar.poster_path}`
                          : "/images/defaultPoster.png"
                      }
                      alt={similar.name}
                      className="w-full h-full object-cover rounded-[10px] border-[1px] border-white"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-white text-[16px] mt-2">
              No similar TV shows found.
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #ffffff33 transparent;
        }
        .custom-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #ffffff33;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #ffffff55;
        }
      `}</style>
    </div>
  );
};

export default TvShow;
