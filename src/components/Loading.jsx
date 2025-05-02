import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-fit h-fit flex flex-col items-center justify-center">
      <img className="size-10 text-[#E50914]" fill="#E50914" stroke="#E50914" src="/icons/loading.webp" alt="loading.gif" />
      <p className="text-xl font-semibold text-[#E50914]">Loading...</p>
    </div>
  );
};

export default Loading;