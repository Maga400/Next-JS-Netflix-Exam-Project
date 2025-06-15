import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useThemeStore } from "../../store/themeStore";

const Loading = () => {
  const theme = useThemeStore((state) => state.theme);
  const t = useTranslations("Loading");

  return (
    <div className={`w-fit h-fit flex flex-col items-center justify-center`}>
      <img
        className="size-10 text-[#E50914]"
        fill="#E50914"
        stroke="#E50914"
        src="/icons/loading.webp"
        alt="loading.gif"
      />
      <p className="text-xl font-semibold text-[#E50914]">{t("loading")}</p>
    </div>
  );
};

export default Loading;
