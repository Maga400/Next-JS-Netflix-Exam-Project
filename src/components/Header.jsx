"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useThemeStore } from "../../store/themeStore";
import { useTranslations, useLocale } from "next-intl";
import Loading from "./Loading2";
import Cookie from "js-cookie";

const Header = () => {
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const theme = useThemeStore((state) => state.theme);
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    username: "",
    imagePath: "",
  });

  const normalize = (url) => decodeURIComponent(url.replace(`/${locale}`, ""));
  const currentPath = normalize(pathname);

  const [activeNav, setActiveNav] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setActiveNav(null);
    setMenuOpen(false);
  }, [currentPath]);

  const isActiveClass = (path) =>
    currentPath === path
      ? theme
        ? "text-white font-bold border-b-2 border-red-600"
        : "text-black font-bold border-b-2 border-red-600"
      : theme
      ? "text-[#D4D4D8]"
      : "text-gray-500";

  const navigate = (url, key, check) => {
    const target = normalize(url);
    if (check === currentPath) return;
    setActiveNav(key);
    router.push(url);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    Cookie.set("search", searchTerm.trim(), { expires: 1 });
    if (currentPath === t("/movies") || currentPath === t("/tv_shows")) {
      if (searchTerm == "") {
        router.push(`/${locale}${currentPath}`);
      } else {
        router.push(
          `/${locale}${currentPath}?query=${encodeURIComponent(
            searchTerm.trim()
          )}`
        );
      }
    }
    setMenuOpen(false);
  };

  const getUser = async () => {
    try {
      const token = Cookie.get("token");
      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/Auth/currentUser`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        console.error("Failed to fetch user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let search = Cookie.get("search");
    if(searchTerm == ""){
      setSearchTerm(search || "");
    }
    if (currentPath === t("/movies") || currentPath === t("/tv_shows")) {
      if (search == "") {
        router.push(`/${locale}${currentPath}`);
      } else {
        router.push(
          `/${locale}${currentPath}?query=${encodeURIComponent(search)}`
        );
      }
    }
    getUser();
    const onScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>

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
        <div className="flex items-center gap-4">
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

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`xl:hidden text-3xl select-none ${
              theme ? "text-white" : "text-black"
            } z-60`}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          <nav className="hidden xl:flex gap-8 ml-6 items-center">
            <h2
              className={`cursor-pointer text-base md:text-lg xl:text-xl ${isActiveClass(
                t("/home")
              )}`}
              onClick={() => navigate(`/${locale}/home`, "home", t("/home"))}
            >
              {activeNav === "home" ? <Loading /> : t("home")}
            </h2>
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

        <div className="flex items-center z-60">
          <ThemeToggle />
          <LanguageSelector />
          <div
            onClick={() => {
              navigate(`/${locale}/profile`, "profile", t("/profile"));
            }}
            className="relative ml-[20px] cursor-pointer"
          >
            {activeNav === "profile" ? (
              <Loading />
            ) : (
              <img
                src={user?.imagePath || "/icons/user-icon.svg"}
                alt="Profile"
                className={`object-cover w-[35px] h-[35px] md:w-[40px] md:h-[40px] xl:w-[45px] xl:h-[45px] rounded-full cursor-pointer transition-all duration-300 ${
                  currentPath === t("/profile")
                    ? theme
                      ? "ring-4 ring-red-500 ring-offset-2 animate-pulse"
                      : "ring-4 ring-black ring-offset-2 animate-pulse"
                    : ""
                }`}
              />
            )}
          </div>
        </div>
      </header>

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
