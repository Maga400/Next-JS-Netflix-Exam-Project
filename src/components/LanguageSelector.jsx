"use client";
import { useState, useEffect, useRef } from "react";
import { useThemeStore } from "../../store/themeStore";

export default function LanguageSelector() {
  const [language, setLanguage] = useState("en");
  const [path, setPath] = useState(false);
  const selectRef = useRef(null);
  const theme = useThemeStore((state) => state.theme);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
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
    <div ref={selectRef} className="relative ml-[10px] md:ml-[15px] xl:ml-[20px]">
      <img
        src="/icons/lang-icon.svg"
        alt="lang-icon"
        className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] xl:w-[16px] xl:h-[16px] absolute left-[9px] md:left-[11px] xl:left-[13px] top-[7px] md:top-[9px] xl:top-[11px]"
      />

      <select
        value={language}
        onClick={() => setPath((prev) => !prev)}
        onChange={handleLanguageChange}
        className={`w-[120px] md:w-[140px] xl:w-[180px] appearance-none ${theme ? "bg-[#27272A]" : "bg-[#636366]"} text-white text-[10px] md:text-[12px] xl:text-[14px] leading-[16px] md:leading-[20px] xl:leading-[24px] border-[1px] border-[#A1A1AA] py-[5px] md:py-[6px] xl:py-[7px] pl-[25px] md:pl-[30px] xl:pl-[40px] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      >
        <option value="az">Azərbaycan dili</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="es">Español</option>
      </select>

      <img
        src={path ? "/icons/up-chevron.svg" : "/icons/down-chevron.svg"}
        className="w-[13px] h-[11px] md:w-[14px] md:h-[12px] xl:w-[15px] xl:h-[13px] absolute top-[8px] md:top-[12px] xl:top-[14px] right-[7px] md:right-[9px] xl:right-[11px]"
        alt="chevron-icon"
      />
    </div>
  );
}
