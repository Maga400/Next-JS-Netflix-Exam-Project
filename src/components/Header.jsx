import React from "react";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path) =>
    pathname === path ? "text-white font-bold" : "text-[#D4D4D8]";
  return (
    <div className="flex flex-row items-center">
      <img
        src="/icons/netflix-logo.png"
        alt="netflix-logo"
        className="w-[100px] md:w-[130px] xl:w-[140px] h-[30px] md:h-[40px] xl:h-[40px]"
      />
      <h2
        className={`text-[22px] leading-[33px] font-normal cursor-pointer ml-[60px] ${isActive(
          "/home"
        )}`}
        onClick={() => router.push("/home")}
      >
        Home
      </h2>
      <h2
        className={`text-[22px] leading-[33px] font-normal cursor-pointer ml-[25px] ${isActive(
          "/movies"
        )}`}
        onClick={() => router.push("/movies")}
      >
        Movies
      </h2>
      <h2
        className={`text-[22px] leading-[33px] font-normal cursor-pointer ml-[25px] ${isActive(
          "/tv-shows"
        )}`}
        onClick={() => router.push("/tv-shows")}
      >
        Tv Shows
      </h2>
    </div>
  );
};

export default Header;
