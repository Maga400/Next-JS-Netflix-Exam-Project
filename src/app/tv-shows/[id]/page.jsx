"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const TvShow = ({ params }) => {
  const { id } = React.use(params);
  const [tvShow, setTvShow] = useState({});
  const [genres, setGenres] = useState([]);
  const [similars, setSimilars] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const [similarLoading, setSimilarLoading] = useState(false);
  const router = useRouter();

  const getTvShow = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/tv/${id}/details?lang=en`
      );

      if (response.ok) {
        const resData = await response.json();
        console.log(resData.content);
        setTvShow(resData.content);
        setGenres(resData.content.genres);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTrailer = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/tv/${id}/trailers?lang=en`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const resData = await response.json();
        resData.trailers.forEach((trailer) => {
          setTrailerKey(trailer.key);
          return;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSimilar = async () => {
    try {
      setSimilarLoading(true);
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/tv/${id}/similar?lang=en&count=7`,
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
    getTvShow();
    getTrailer();
    getSimilar();
  }, []);

  return (
    <div className="bg-black w-full min-h-screen">
      <div className="pt-[30px] ml-[40px]">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-[#1F1F1F] hover:bg-[#2a2a2a] text-white px-4 py-2 rounded-full shadow-md transition-all duration-200"
        >
          <ArrowLeft size={20} />
          <span className="text-[14px]">Go Back</span>
        </button>
      </div>
      <div className="px-[320px] pt-[10px] w-full h-fit">
        {trailerKey && (
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
        )}
      </div>
      <div className="px-[40px] py-[20px]">
        {tvShow?.name && (
          <h1 className="text-[36px] leading-[40px] text-white font-normal">
            {tvShow?.name}
          </h1>
        )}
        <div className="flex flex-row justify-start items-center gap-[10px] mt-[20px]">
          {genres?.map(
            (genre) =>
              genre && (
                <div
                  key={genre?.id}
                  className="bg-[#27272A] rounded-[5px] py-[14px] px-[25px]"
                >
                  <h4 className="text-[16px] leading-[24px] text-white font-normal">
                    {genre?.name}
                  </h4>
                </div>
              )
          )}
        </div>
        {tvShow?.overview && (
          <p className="mt-[20px] font-normal text-white text-[16px] leading-[24px]">
            {tvShow?.overview}
          </p>
        )}
        {similars && similars?.length > 0 && (
          <h2 className="font-normal text-[24px] leading-[32px] text-white mt-[40px]">
            Similar Tv Shows
          </h2>
        )}
        <div className="grid grid-cols-7 gap-[15px] mt-[10px] w-full h-fit">
          {similars?.map(
            (similar) =>
              similar && (
                <div
                  key={similar?.id}
                  onClick={() => router.push(`/movies/${similar?.id}`)}
                >
                  <img
                    src={
                      similar?.poster_path
                        ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${similar?.poster_path}}`
                        : "/images/defaultPoster.png"
                    }
                    alt={similar?.title}
                    className="w-full h-full object-cover rounded-[10px] border-[1px] border-[white]"
                  />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default TvShow;
