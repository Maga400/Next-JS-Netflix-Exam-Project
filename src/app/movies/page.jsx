"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { useThemeStore } from "../../../store/themeStore";

const Movies = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const theme = useThemeStore((state) => state.theme);

  const getAllMovies = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/movie/allMovies/${page}?lang=en&count=10`
      );

      setMovies([]);

      if (response.ok) {
        const data = await response.json();
        setMovies(data.movies);
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
    getAllMovies(page);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen px-[90px] py-[30px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div
      className={`${
        theme ? "bg-black text-white" : "bg-white text-black"
      } w-full min-h-screen px-4 py-6 
          sm:px-6 sm:py-8 
          md:px-12 md:py-10 
          lg:px-20 lg:py-12 
          xl:px-[90px] xl:py-[30px] `}
    >
      <Header />
      <div className="grid grid-cols-5 gap-[50px] mt-[50px] w-full h-fit">
        {movies?.map(
          (movie) =>
            movie && (
              <div
                onClick={() => router.push(`/movies/${movie?.id}`)}
                key={movie?.id}
              >
                <img
                  src={
                    movie?.poster_path
                      ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movie?.poster_path}`
                      : "/images/defaultPoster.png"
                  }
                  alt={movie?.title}
                  className="w-full h-full object-cover rounded-[10px] border-[1px] border-[white]"
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Movies;
