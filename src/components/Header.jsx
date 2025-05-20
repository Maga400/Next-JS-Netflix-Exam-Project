"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useThemeStore } from "../../store/themeStore";
import { useTranslations, useLocale } from "next-intl";
import Loading from "./Loading2";

const Header = () => {
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const theme = useThemeStore((state) => state.theme);
  const locale = useLocale();

  // "/tr/movies" -> "/movies"
  const normalize = (url) => decodeURIComponent(url.replace(`/${locale}`, ""));
  const currentPath = normalize(pathname);

  // spinner'ı hangi öğede göstereceğiz: "logo" | "home" | "movies" | "tv_shows" | null
  const [activeNav, setActiveNav] = useState(null);

  // rota değiştiğinde (navigasyon tamamlandığında) spinner'ı temizle
  useEffect(() => {
    setActiveNav(null);
  }, [currentPath]);

  // aktif link için stil: light/dark modda farklı renk ve kalın font
  const isActiveClass = (path) =>
    currentPath === path
      ? theme
        ? "text-white font-bold"
        : "text-black font-bold"
      : theme
      ? "text-[#D4D4D8]"
      : "text-gray-500";

  // navigasyon ve spinner tetikleme
  const navigate = (url, key,check) => {
    const target = normalize(url);
    // alert(url);
    // alert(target);
    // alert(currentPath);
    if (check === currentPath) return;    // aynı sayfadaysa spinner gösterme
    setActiveNav(key);
    router.push(url);
  };

  return (
    <div className="flex justify-between items-center">
      {/* Sol taraf: Logo + Menüler */}
      <div className="flex items-center">
        {/* Logo */}
        <div
          className="relative w-[60px] sm:w-[100px] md:w-[130px] xl:w-[140px] h-[20px] sm:h-[25px] md:h-[30px] xl:h-[40px] cursor-pointer"
          onClick={() => navigate(`/${locale}`, "logo",t("/home"))}
        >
          {activeNav === "logo" ? (
            <div className="absolute inset-0 flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <img
              src="/icons/netflix-logo.png"
              alt="netflix-logo"
              className="w-full h-full"
            />
          )}
        </div>

        {/* Home */}
        <h2
          className={`relative ml-[10px] sm:ml-[20px] md:ml-[40px] xl:ml-[60px] text-[14px] sm:text-[16px] md:text-[19px] xl:text-[22px] leading-[24px] sm:leading-[26px] md:leading-[28px] xl:leading-[33px] cursor-pointer ${isActiveClass(
            t("/home")
          )}`}
          onClick={() => navigate(`/${locale}/home`, "home",t("/home"))}
        >
          {activeNav === "home" ? <Loading /> : t("home")}
        </h2>

        {/* Movies */}
        <h2
          className={`relative ml-[10px] sm:ml-[15px] md:ml-[20px] xl:ml-[25px] text-[14px] sm:text-[16px] md:text-[19px] xl:text-[22px] leading-[24px] sm:leading-[26px] md:leading-[28px] xl:leading-[33px] cursor-pointer ${isActiveClass(
            t("/movies")
          )}`}
          onClick={() => navigate(`/${locale}/movies`, "movies",t("/movies"))}
        >
          {activeNav === "movies" ? <Loading /> : t("movies")}
        </h2>

        {/* TV Shows */}
        <h2
          className={`relative ml-[10px] sm:ml-[15px] md:ml-[20px] xl:ml-[25px] text-[14px] sm:text-[16px] md:text-[19px] xl:text-[22px] leading-[24px] sm:leading-[26px] md:leading-[28px] xl:leading-[33px] cursor-pointer ${isActiveClass(
            t("/tv_shows")
          )}`}
          onClick={() => navigate(`/${locale}/tv-shows`, "tv_shows",t("/tv_shows"))}
        >
          {activeNav === "tv_shows" ? <Loading /> : t("tv_shows")}
        </h2>
      </div>

      {/* Sağ taraf: Theme + Language */}
      <div className="flex items-center">
        <ThemeToggle />
        <LanguageSelector />
      </div>
    </div>
  );
};

export default Header;
