// components/Loading.js
import React from "react";
import { useThemeStore } from "../../store/themeStore";

const Loading = () => {
  const theme = useThemeStore((state) => state.theme);

  const spinnerColor = theme ? "border-white" : "border-black";
  const spinnerTransparent = theme ? "border-t-transparent" : "border-t-transparent";

  return (
    <div
      className={`w-5 h-5 border-2 ${spinnerColor} ${spinnerTransparent} rounded-full animate-spin`}
    />
  );
};

export default Loading;
