"use client";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { useThemeStore } from "../../../../store/themeStore";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Loading2 from "../../../components/Loading2";

const Movies = () => {
  const t = useTranslations("Other");
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const theme = useThemeStore((state) => state.theme);
  const scrollRef = useRef(null);
  const [activeLoadingId, setActiveLoadingId] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const getAllMovies = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/Movie/allMovies/${page}?lang=${locale}&count=10`
      );
      setMovies([]);
      if (response.ok) {
        const data = await response.json();
        setMovies(data.movies);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
      getAllMovies(newPage);
    }
  };

  const getPaginationGroup = () => {
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  useEffect(() => {
    getAllMovies(page);
  }, []);

  const handleMovieClick = (id) => {
    setActiveLoadingId(id);
    router.push(`/${locale}/movies/${id}`);
  };

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-10 lg:px-20 lg:py-12 xl:px-[90px] xl:py-[30px] 
      ${theme ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <Header />
      {isLoading ? (
        <div className="w-full min-h-screen flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="mt-[70px]">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => { setLoading2(true); router.push(`/${locale}/movies/genre`) }}
              className={`px-4 py-2 rounded-lg font-semibold transition 
      ${theme
                  ? "bg-gray-800 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
            >
              {loading2 ? <Loading2 /> : t("genre")}
            </button>
            <button
              onClick={() => { setLoading3(true); router.push(`/${locale}/movies/category`) }}
              className={`px-4 py-2 rounded-lg font-semibold transition 
      ${theme
                  ? "bg-gray-800 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
            >
              {loading3 ? <Loading2 /> : t("category")}
            </button>
          </div>

          <div
            ref={scrollRef}
            className={`custom-scroll xl:hidden flex gap-[15px] md:gap-[20px] overflow-x-auto whitespace-nowrap scroll-smooth ${theme ? "bg-black" : "bg-white"
              }`}
          >
            {movies?.map((movie) => (
              <div
                key={movie?.id}
                onClick={() => handleMovieClick(movie?.id)}
                className="relative flex-shrink-0 w-[160px] md:w-[200px] h-[240px] md:h-[250px] cursor-pointer"
              >
                {/* Film posteri */}
                <Image
                  src={
                    movie?.poster_path
                      ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movie?.poster_path}`
                      : "/images/defaultPoster.png"
                  }
                  alt={movie?.title}
                  className={`w-full h-full object-cover rounded-[10px] border-[1px] ${theme ? "border-white" : "border-gray-700"
                    }`}
                  layout="fill"
                  objectFit="cover"
                />

                {/* Spinner sadece aktif id eşleştiğinde görünür */}
                {activeLoadingId === movie?.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-[10px]">
                    <Loading2 bg="border-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Arrows for Mobile */}
          <div className="flex xl:hidden justify-between items-center mt-[20px]">
            <button onClick={scrollLeft}>
              <ArrowLeftCircle size={32} />
            </button>
            <button onClick={scrollRight}>
              <ArrowRightCircle size={32} />
            </button>
          </div>

          {/* Desktop Grid */}
          <div className="hidden xl:grid mt-[30px] grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies?.map((movie) => (
              <div
                key={movie?.id}
                onClick={() => handleMovieClick(movie?.id)}
                className="cursor-pointer group relative rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 w-full h-[400px]"
              >
                <Image
                  src={
                    movie?.poster_path
                      ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movie?.poster_path}`
                      : "/images/defaultPoster.png"
                  }
                  alt={movie?.title}
                  fill
                  className="object-cover group-hover:brightness-75 transition duration-300"
                />

                {/* Sadece seçilen filme spinner ekle */}
                {activeLoadingId === movie?.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <Loading2 bg="border-white" />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-3 z-20">
                  <h3 className="text-white text-sm sm:text-base font-semibold truncate">
                    {movie?.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

      {/* Pagination */}
      <div className="flex justify-center items-center mt-12 gap-2 flex-wrap">
        <button
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          className={`px-3 py-2 rounded-lg font-medium transition 
            ${theme
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-200 text-black hover:bg-gray-300"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          «
        </button>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-3 py-2 rounded-lg font-medium transition 
            ${theme
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-200 text-black hover:bg-gray-300"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          ←
        </button>
        {getPaginationGroup().map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`px-4 py-2 rounded-lg font-semibold transition 
              ${page === num
                ? theme
                  ? "bg-white text-black"
                  : "bg-black text-white"
                : theme
                  ? "bg-gray-800 text-white hover:bg-gray-600"
                  : "bg-gray-100 text-black hover:bg-gray-300"
              }`}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-2 rounded-lg font-medium transition 
            ${theme
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-200 text-black hover:bg-gray-300"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          →
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
          className={`px-3 py-2 rounded-lg font-medium transition 
            ${theme
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-200 text-black hover:bg-gray-300"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Movies;
