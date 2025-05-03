import React from "react";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { useThemeStore } from "../../store/themeStore";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useThemeStore((state) => state.theme);

  const isActive = (path) =>
    pathname === path ? `${theme ? "text-white" : "text-black"} font-bold` : `${theme ? "text-[#D4D4D8]" : "text-gray-500"}`;
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row justify-between items-center">
        <img
          src="/icons/netflix-logo.png"
          alt="netflix-logo"
          className="w-[60px] sm:w-[100px] md:w-[130px] xl:w-[140px] h-[20px] sm:h-[25px] md:h-[30px] xl:h-[40px]"
        />
        <h2
          className={`text-[14px] sm:text-[16px] md:text-[19px] xl:text-[22px] leading-[24px] sm:leading-[26px] md:leading-[28px] xl:leading-[33px] font-normal cursor-pointer ml-[10px] sm:ml-[20px] md:ml-[40px] xl:ml-[60px] ${isActive(
            "/home"
          )}`}
          onClick={() => router.push("/home")}
        >
          Home
        </h2>
        <h2
          className={`text-[14px] sm:text-[16px] md:text-[19px] xl:text-[22px] leading-[24px] sm:leading-[26px] md:leading-[28px] xl:leading-[33px] font-normal cursor-pointer ml-[10px] sm:ml-[15px] md:ml-[20px] xl:ml-[25px] ${isActive(
            "/movies"
          )}`}
          onClick={() => router.push("/movies")}
        >
          Movies
        </h2>
        <h2
          className={`text-[14px] sm:text-[16px] md:text-[19px] xl:text-[22px] leading-[24px] sm:leading-[26px] md:leading-[28px] xl:leading-[33px] font-normal cursor-pointer ml-[10px] sm:ml-[15px] md:ml-[20px] xl:ml-[25px] ${isActive(
            "/tv-shows"
          )}`}
          onClick={() => router.push("/tv-shows")}
        >
          Tv Shows
        </h2>
      </div>
      <div className="flex flex-row justify-between items-center">
        <ThemeToggle />
        <LanguageSelector />
      </div>
    </div>
  );
};

export default Header;
