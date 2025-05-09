"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { useThemeStore } from "../../../store/themeStore";

const TvShows = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const theme = useThemeStore((state) => state.theme);

  const getAllTvShows = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/tv/allTvShows/${page}?lang=en&count=10`
      );

      setTvShows([]);

      if (response.ok) {
        const data = await response.json();
        setTvShows(data.tvShows);
        setTotalPages(data.totalPages);
        // console.log(datas.movies[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTvShows(page);
  }, []);

  if(isLoading) {
    return (
      <div className="w-full min-h-screen px-[90px] py-[30px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className={`${
      theme ? "bg-black text-white" : "bg-white text-black"
    } w-full min-h-screen px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-10 lg:px-20 lg:py-12 xl:px-[90px] xl:py-[30px] flex flex-col`}>
      <Header />
      <div className="grid grid-cols-5 gap-[50px] mt-[50px] w-full h-fit">
        {tvShows?.map(
          (tvShow) =>
            tvShow && (
              <div
                onClick={() => router.push(`/tv-shows/${tvShow?.id}`)}
                key={tvShow?.id}
              >
                <img
                  src={
                    tvShow?.poster_path
                      ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${tvShow?.poster_path}`
                      : "/images/defaultPoster.png"
                  }
                  alt={tvShow?.title}
                  className="w-full h-full object-cover rounded-[10px] border-[1px] border-[white]"
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default TvShows;
