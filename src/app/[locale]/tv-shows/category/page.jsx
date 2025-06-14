"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { useThemeStore } from "../../../../../store/themeStore";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Loading2 from "../../../../components/Loading2";
import { ArrowLeft, ArrowRightCircle, ArrowLeftCircle } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import { useGoBackTvStore } from "../../../../../store/goBackTvStore";

const Category = () => {
  const t = useTranslations("Category");
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("top_rated");
  const theme = useThemeStore((state) => state.theme);
  const scrollRef = useRef(null);
  const [activeLoadingId, setActiveLoadingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState(false);
  const selectRef = useRef(null);
  const { addId } = useGoBackTvStore.getState();

  const tvShowCategories = [
    { label: t("top_rated"), value: "top_rated" },
    { label: t("popular"), value: "popular" },
    { label: t("on_the_air"), value: "on_the_air" },
    { label: t("airing_today"), value: "airing_today" },
  ];

  const getAllTvShows = async (category, page = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/Tv/categories?category=${category}&page=${page}&lang=${locale}&count=10`
      );
      if (response.ok) {
        const data = await response.json();
        setTvShows(data.tvShows);
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
    }
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setPage(1);
  };

  useEffect(() => {
    getAllTvShows(selectedCategory, page);
  }, [selectedCategory, page]);

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

  const handleMovieClick = (id) => {
    setActiveLoadingId(id);
    addId(id);
    router.push(`/${locale}/tv-shows/${id}?from=category`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setPath(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-10 lg:px-20 lg:py-12 xl:px-[90px] xl:py-[30px] 
      ${theme ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <div className="flex flex-row justify-between">
        <button
          onClick={() => {
            setLoading(true);
            router.push(`/${locale}/tv-shows`);
          }}
          className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full shadow-md transition-all duration-200 hover:cursor-pointer ${
            theme
              ? "bg-[#1F1F1F] hover:bg-[#2a2a2a] text-white"
              : "bg-gray-200 hover:bg-gray-300 text-black"
          }`}
        >
          <ArrowLeft className="size-[15px] md:size-[20px]" />
          {loading ? (
            <Loading2 />
          ) : (
            <span className="text-[12px] md:text-[16px]">{t("go_back")}</span>
          )}
        </button>

        <div className="flex items-center">
          <ThemeToggle />
          <LanguageSelector />
          <div
            ref={selectRef}
            className="relative w-[140px] md:w-[160px] ml-[10px] md:ml-[15px] xl:ml-[20px]"
          >
            <select
              onClick={() => setPath((prev) => !prev)}
              value={selectedCategory}
              onChange={handleCategoryChange}
              className={`w-full ${
                theme
                  ? "bg-[#27272A] border-[#A1A1AA]"
                  : "bg-[#636366] border-black"
              } text-white appearance-none text-[11px] md:text-[12px] xl:text-[13px] leading-[16px] md:leading-[20px] xl:leading-[24px] border-[1px] py-[5px] md:py-[6px] xl:py-[7px] px-[10px] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            >
              {tvShowCategories?.map((category) => (
                <option key={category?.value} value={category?.value}>
                  {category?.label}
                </option>
              ))}
            </select>

            <img
              src={path ? "/icons/up-chevron.svg" : "/icons/down-chevron.svg"}
              className="w-[13px] h-[11px] md:w-[14px] md:h-[12px] xl:w-[15px] xl:h-[13px] absolute top-[8px] md:top-[12px] xl:top-[14px] right-[6px] md:right-[9px]"
              alt="chevron-icon"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="w-full min-h-screen flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <div
            ref={scrollRef}
            className="custom-scroll xl:hidden flex gap-[15px] md:gap-[20px] overflow-x-auto whitespace-nowrap scroll-smooth mt-10"
          >
            {tvShows?.map((tvShow) => (
              <div
                key={tvShow?.id}
                onClick={() => handleMovieClick(tvShow?.id)}
                className="relative flex-shrink-0 w-[160px] md:w-[200px] h-[240px] md:h-[250px] cursor-pointer"
              >
                <Image
                  src={
                    tvShow?.poster_path
                      ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${tvShow?.poster_path}`
                      : "/images/defaultPoster.png"
                  }
                  alt={tvShow?.name || "image"}
                  className="w-full h-full object-cover rounded-[10px]"
                  layout="fill"
                />
                {activeLoadingId === tvShow?.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-[10px]">
                    <Loading2 bg="border-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex xl:hidden justify-between items-center mt-4">
            <button onClick={scrollLeft}>
              <ArrowLeftCircle size={32} />
            </button>
            <button onClick={scrollRight}>
              <ArrowRightCircle size={32} />
            </button>
          </div>

          <div className="hidden xl:grid mt-[30px] grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {tvShows?.map((tvShow) => (
              <div
                key={tvShow?.id}
                onClick={() => handleMovieClick(tvShow?.id)}
                className="cursor-pointer group relative rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 w-full h-[400px]"
              >
                <Image
                  src={
                    tvShow?.poster_path
                      ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${tvShow?.poster_path}`
                      : "/images/defaultPoster.png"
                  }
                  alt={tvShow?.name || "image"}
                  fill
                  className="object-cover group-hover:brightness-75 transition duration-300"
                />
                {activeLoadingId === tvShow?.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <Loading2 bg="border-white" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-3 z-20">
                  <h3 className="text-white text-sm sm:text-base font-semibold truncate">
                    {tvShow?.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex justify-center items-center mt-12 gap-2 flex-wrap">
        <button
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          className={`px-3 py-2 rounded-lg font-medium transition 
            ${
              theme
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
            ${
              theme
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
              ${
                page === num
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
            ${
              theme
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
            ${
              theme
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-black hover:bg-gray-300"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          »
        </button>
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

export default Category;