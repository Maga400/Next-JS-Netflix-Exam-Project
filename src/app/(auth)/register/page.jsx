"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LanguageSelector from "@/components/LanguageSelector";
import { toast } from "react-hot-toast";
import ThemeToggle from "@/components/ThemeToggle";
import { useThemeStore } from "../../../../store/themeStore";

const Register = () => {
  const router = useRouter();
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const theme = useThemeStore((state) => state.theme);

  const register = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const resData = await response.json();

      if (response.ok) {
        router.push("/login");
      } else {
        toast.error(resData.message || "Something Went Wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`${
        theme ? "bg-black text-white" : "bg-white text-black"
      } w-full h-screen`}
    >
      <div className="relative flex flex-col justify-start items-start md:justify-center md:items-center">
        <img
          src="/images/login-bg.jpg"
          alt="login-bg"
          className="w-full h-[750px] object-cover hidden md:block"
        />
        <div
          className={`${
            theme ? "bg-[#000000B2]" : "bg-[#666666]"
          } opacity-[50%] w-full h-[750px] absolute hidden md:block`}
        ></div>
        <div className="w-full absolute top-[25px] px-[25px] xl:px-[160px] flex flex-row justify-between items-center">
          <img
            src="/icons/netflix-logo.png"
            alt="netflix-logo"
            className="w-[90px] h-[25px] xl:w-[150px] xl:h-[40px]"
          />
          <div className="flex flex-row justify-between items-center">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
        <div
          className={`w-full md:w-[460px] ${
            theme ? "md:bg-[#000000B2]" : "md:bg-[#FFFFFFB2]"
          } absolute top-0 mt-[100px] md:mt-[110px] xl:mt-[160px] px-[20px] py-[0px] md:px-[70px] md:py-[50px]`}
        >
          <h2 className="text-[32px] font-bold leading-[100%]">Sign Up</h2>
          <div className="flex flex-col">
            <input
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              type="text"
              placeholder="Username"
              className={`w-full md:w-[320px] mt-[30px] border-[1px] px-[15px] py-[20px] rounded-[5px] text-[16px]
              ${
                theme
                  ? "bg-[#161616B2] border-[#808080B2] text-white placeholder:text-white"
                  : "bg-[#FFFFFFB2] border-[#00000066] text-black placeholder:text-black"
              }`}
            />
            <input
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="email"
              placeholder="Email"
              className={`w-full md:w-[320px] mt-[15px] border-[1px] px-[15px] py-[20px] rounded-[5px] text-[16px]
              ${
                theme
                  ? "bg-[#161616B2] border-[#808080B2] text-white placeholder:text-white"
                  : "bg-[#FFFFFFB2] border-[#00000066] text-black placeholder:text-black"
              }`}
            />
            <input
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              placeholder="Password"
              className={`w-full md:w-[320px] mt-[15px] border-[1px] px-[15px] py-[20px] rounded-[5px] text-[16px]
              ${
                theme
                  ? "bg-[#161616B2] border-[#808080B2] text-white placeholder:text-white"
                  : "bg-[#FFFFFFB2] border-[#00000066] text-black placeholder:text-black"
              }`}
            />
          </div>
          <button
            onClick={register}
            className="w-full md:w-[320px] mt-[15px] bg-[#E50914] rounded-[5px] py-[10px] text-center text-[16px] leading-[16px] font-medium text-white hover:cursor-pointer"
          >
            Sign Up
          </button>
          <div
            onClick={() => router.push("/login")}
            className="flex flex-row justify-center mt-[30px] hover:cursor-pointer"
          >
            <h3
              className={`${
                theme ? "text-[#FFFFFFB2]" : "text-gray-700"
              } font-normal text-[16px] leading-[100%]`}
            >
              Already have an account?
            </h3>
            <h2
              className={`${
                theme ? "text-white" : "text-black"
              } ml-[5px] font-medium text-[16px] leading-[100%]`}
            >
              Sign in
            </h2>
          </div>
        </div>
        <div
          className={`w-full absolute bottom-[0px] h-[50px] ${
            theme ? "bg-[#000000B2]" : "bg-[#FFFFFFB2]"
          }`}
        ></div>
      </div>

      {/* Footer */}
      <div
        className={`${
          theme ? "bg-black text-white" : "bg-white text-black"
        } w-full absolute md:relative bottom-[-240px] md:bottom-auto`}
      >
        <hr className="block md:hidden" />
        <div
          className={`grid grid-cols-2 xl:grid-cols-4 px-[20px] py-[30px] xl:pt-[50px] xl:px-[170px] xl:pb-[70px] ${
            theme ? "text-[#FFFFFFB2]" : "text-black"
          }`}
        >
          <div className="flex flex-col">
            <div className="flex flex-row">
              <h3 className="text-[14px] leading-[100%] font-normal ">
                Questions? Call
              </h3>
              <h3 className="text-[14px] leading-[100%] font-normal">
                1-844-505-2993
              </h3>
            </div>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              FAQ
            </h3>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              Privacy
            </h3>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              Ad Choices
            </h3>
          </div>

          <div className="mt-[15px] xl:mt-[20px] flex flex-col">
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              Help Center
            </h3>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              Cookie Preferences
            </h3>
          </div>

          <div className="mt-[0px] xl:mt-[20px] flex flex-col">
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              Netflix Shop
            </h3>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              Corporate Information
            </h3>
          </div>

          <div className="mt-[-40px] xl:mt-[20px] flex flex-col">
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              Terms of Use
            </h3>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              Do Not Sell or Share My Personal Information
            </h3>
          </div>
          <div
            className={`w-fit mt-[40px] py-[5px] px-[30px] border-[1px] ${
              theme ? "border-[#808080B2]" : "border-black"
            }`}
          >
            <h3 className="text-[16px] leading-[24px] font-normal">English</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
