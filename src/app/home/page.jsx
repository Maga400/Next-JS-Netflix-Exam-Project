"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/Header";

const Home = () => {
  // const router = useRouter();
  // const pathname = usePathname();

  // const isActive = (path) =>
  //   pathname === path ? "text-white font-bold" : "text-[#D4D4D8]";

  return (
    <div className="w-full h-screen relative">
      <img
        src="/images/home-bg.jpg"
        alt="home background"
        className="w-full h-full bg-no-repeat object-fill absolute"
      />
      <div className="bg-[#00000080] w-full h-full absolute top-[0px]"></div>
      <div className="px-[90px] py-[30px] flex flex-col absolute top-[0px]">
        <Header />
        <h1 className="w-[280px] mt-[140px] text-[72px] leading-[72px] font-bold text-white">
          You're Cordially Invited
        </h1>
        <div className="flex flex-row items-center mt-[20px]">
          <img src="/icons/top.svg" className="w-[35px] h-[35px]" />
          <h3 className="ml-[10px] text-[24px] leading-[32px] font-bold text-white">
            #1 in Movies Today
          </h3>
        </div>
        <p className="w-[340px] mt-[20px] font-normal text-white text-[16px] leading-[24px]">
          When two weddings are accidentally booked on the same day at the same
          venue, each bridal party is challenged with preserving their family's
          special mo...
        </p>
        <div className="flex flex-row mt-[20px]">
          <button className="bg-white text-black rounded-[5px] py-[13px] px-[24px] font-bold text-[16px] leading-[24px]">Play</button>
          <button className="ml-[10px] bg-[#515451] text-white rounded-[5px] py-[13px] px-[24px] font-bold text-[16px] leading-[24px]">More Info</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
