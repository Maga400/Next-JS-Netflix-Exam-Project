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

  // hamburger menü açık mı?
  const [menuOpen, setMenuOpen] = useState(false);

  // search input state
  const [searchTerm, setSearchTerm] = useState("");

  // rota değiştiğinde (navigasyon tamamlandığında) spinner'ı temizle, menüyü kapat
  useEffect(() => {
    setActiveNav(null);
    setMenuOpen(false);
  }, [currentPath]);

  // aktif link için stil: light/dark modda farklı renk ve kalın font
  const isActiveClass = (path) =>
    currentPath === path
      ? theme
        ? "text-white font-bold border-b-2 border-red-600" // dark modda kırmızı alt çizgi
        : "text-black font-bold border-b-2 border-red-600" // light modda da kırmızı alt çizgi
      : theme
      ? "text-[#D4D4D8]"
      : "text-gray-500";

  // navigasyon ve spinner tetikleme
  const navigate = (url, key, check) => {
    const target = normalize(url);
    if (check === currentPath) return; // aynı sayfadaysa spinner gösterme
    setActiveNav(key);
    router.push(url);
  };

  // search işlemi enter ile veya ikonla tetiklenir
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    // Örneğin search sayfasına yönlendirelim
    router.push(
      `/${locale}/search?query=${encodeURIComponent(searchTerm.trim())}`
    );
    setSearchTerm("");
    setMenuOpen(false);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ... (başlangıç kısmı aynı kalıyor)

  return (
    <>
      {/* Overlay menü açıkken arka plan koyulaştırma ve tıklayınca menüyü kapatma */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[90px] py-3
        ${
          theme
            ? `bg-zinc-900 ${
                scrolled ? "border-b border-gray-700" : "border-b-0"
              }`
            : `bg-white ${
                scrolled
                  ? "border-b border-gray-400"
                  : "border-b border-gray-300"
              }`
        }
        shadow-md transition-all duration-300
        ${menuOpen ? "pb-60" : "pb-3"}`}
      >
        {/* Sol taraf: Logo + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div
            className="relative w-[80px] h-[30px] sm:w-[100px] sm:h-[40px] cursor-pointer z-60"
            onClick={() => navigate(`/${locale}`, "logo", t("/home"))}
          >
            {activeNav === "logo" ? (
              <div className="absolute inset-0 flex justify-center items-center">
                <Loading />
              </div>
            ) : (
              <img
                src="/icons/netflix-logo.png"
                alt="netflix-logo"
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Hamburger (sadece tablet ve altı: md ve küçük ekranlar için) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`xl:hidden text-3xl select-none ${
              theme ? "text-white" : "text-black"
            } z-60`}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {/* Masaüstü Menü (md ve üzeri) */}
          <nav className="hidden xl:flex gap-8 ml-6 items-center">
            {/* Home */}
            <h2
              className={`cursor-pointer text-base md:text-lg xl:text-xl ${isActiveClass(
                t("/home")
              )}`}
              onClick={() => navigate(`/${locale}/home`, "home", t("/home"))}
            >
              {activeNav === "home" ? <Loading /> : t("home")}
            </h2>
            {/* Movies */}
            <h2
              className={`cursor-pointer text-base md:text-lg xl:text-xl ${isActiveClass(
                t("/movies")
              )}`}
              onClick={() =>
                navigate(`/${locale}/movies`, "movies", t("/movies"))
              }
            >
              {activeNav === "movies" ? <Loading /> : t("movies")}
            </h2>
            {/* TV Shows */}
            <h2
              className={`cursor-pointer text-base md:text-lg xl:text-xl ${isActiveClass(
                t("/tv_shows")
              )}`}
              onClick={() =>
                navigate(`/${locale}/tv-shows`, "tv_shows", t("/tv_shows"))
              }
            >
              {activeNav === "tv_shows" ? <Loading /> : t("tv_shows")}
            </h2>
          </nav>
        </div>

        {/* Arama (md ve üzeri) */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden xl:flex items-center border rounded-md overflow-hidden"
          style={{
            borderColor: theme ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)",
            backgroundColor: theme ? "#333" : "#fff",
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("search_placeholder")}
            className={`px-3 py-1.5 outline-none bg-transparent ${
              theme
                ? "text-white placeholder:text-gray-400"
                : "text-black placeholder:text-gray-500"
            }`}
          />
          <button
            type="submit"
            className={`px-3 ${
              theme
                ? "text-white hover:text-gray-300"
                : "text-black hover:text-gray-700"
            }`}
            aria-label="Search"
          >
            🔍
          </button>
        </form>

        {/* Sağ: Tema ve Dil (her zaman görünür) */}
        <div className="flex items-center z-60">
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </header>

      {/* Mobil Menü (sadece md altı için görünür) */}
      <nav
        className={`xl:hidden fixed top-[56px] left-0 w-64 max-w-[80vw] h-[calc(100vh-56px)] ${
          theme ? "bg-zinc-900" : "bg-white"
        } z-50 shadow-lg flex flex-col gap-6 p-6 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2
          className={`cursor-pointer text-lg ${isActiveClass(t("/home"))}`}
          onClick={() => {
            navigate(`/${locale}/home`, "home", t("/home"));
            setMenuOpen(false);
          }}
        >
          {activeNav === "home" ? <Loading /> : t("home")}
        </h2>

        <h2
          className={`cursor-pointer text-lg ${isActiveClass(t("/movies"))}`}
          onClick={() => {
            navigate(`/${locale}/movies`, "movies", t("/movies"));
            setMenuOpen(false);
          }}
        >
          {activeNav === "movies" ? <Loading /> : t("movies")}
        </h2>

        <h2
          className={`cursor-pointer text-lg ${isActiveClass(t("/tv_shows"))}`}
          onClick={() => {
            navigate(`/${locale}/tv-shows`, "tv_shows", t("/tv_shows"));
            setMenuOpen(false);
          }}
        >
          {activeNav === "tv_shows" ? <Loading /> : t("tv_shows")}
        </h2>

        {/* Mobil arama kutusu */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex border rounded-md overflow-hidden"
          style={{
            borderColor: theme ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)",
            backgroundColor: theme ? "#333" : "#fff",
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("search_placeholder")}
            className={`flex-grow px-3 py-2 outline-none bg-transparent ${
              theme
                ? "text-white placeholder:text-gray-400"
                : "text-black placeholder:text-gray-500"
            }`}
          />
          <button
            type="submit"
            className={`px-3 ${
              theme
                ? "text-white hover:text-gray-300"
                : "text-black hover:text-gray-700"
            }`}
            aria-label="Search"
          >
            🔍
          </button>
        </form>
      </nav>
    </>
  );
};

export default Header;
