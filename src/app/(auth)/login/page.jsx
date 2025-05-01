"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import { toast } from "react-hot-toast";
import Cookie from "js-cookie";

const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });

  const login = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/auth/login`,
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
        Cookie.set("password", resData.password, { expires: 7, path: "/" });
        Cookie.set("token", resData.token, { expires: 7, path: "/" });
        router.push("/home");
      } else {
        toast.error(resData.message || "Something Went Wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-black w-full h-screen">
      <div className="relative flex flex-col justify-start items-start md:justify-center md:items-center">
        <img
          src="/images/login-bg.jpg"
          alt="login-bg"
          className="w-full h-[750px] object-cover hidden md:block"
        />
        <div className="bg-[#000000B2] opacity-[50%] w-full h-[750px] absolute hidden md:block"></div>
        <div className="w-full absolute top-[25px] px-[25px] xl:px-[160px] flex flex-row justify-between items-center">
          <img
            src="/icons/netflix-logo.png"
            alt="netflix-logo"
            className="w-[90px] h-[25px] xl:w-[150px] xl:h-[40px]"
          />
          <LanguageSelector />
        </div>
        <div className="w-full md:w-[460px] bg-black md:bg-[#000000B2] absolute top-0 mt-[100px] md:mt-[110px] xl:mt-[160px] px-[20px] py-[0px] md:px-[70px] md:py-[50px]">
          <h2 className="text-[32px] font-bold leading-[100%] text-white">
            Sign In
          </h2>
          <div className="flex flex-col">
            <input
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="email"
              placeholder="Email"
              className="w-full md:w-[320px] mt-[30px] border-[1px] bg-[#161616B2] border-[#808080B2] text-white text-[16px] leading-[24px] font-normal px-[15px] py-[20px] rounded-[5px]"
            />
            <input
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              placeholder="Password"
              className="w-full md:w-[320px] mt-[15px] border-[1px] bg-[#161616B2] border-[#808080B2] text-white text-[16px] leading-[24px] font-normal px-[15px] py-[20px] rounded-[5px]"
            />
          </div>
          <button
            onClick={login}
            className="w-full md:w-[320px] mt-[15px] bg-[#E50914] rounded-[5px] py-[10px] text-center text-[16px] leading-[16px] font-medium text-white hover:cursor-pointer"
          >
            Sign In
          </button>
          <div
            onClick={() => router.push("/register")}
            className="flex flex-row justify-center mt-[30px] hover:cursor-pointer"
          >
            <h3 className="text-[#FFFFFFB2] font-normal text-[16px] leading-[100%]">
              New to Netflix?
            </h3>
            <h2 className="ml-[5px] font-medium text-[16px] text-white leading-[100%]">
              Sign up now
            </h2>
          </div>
        </div>
        <div className="w-full absolute bottom-[0px] h-[50px] bg-[#000000B2]"></div>
      </div>
      <div className="w-full absolute md:relative bottom-[-240px] md:bottom-auto">
        <hr className="block md:hidden" />
        <div className="grid grid-cols-2 xl:grid-cols-4 bg-[#000000] px-[20px] py-[30px] xl:pt-[50px] xl:px-[170px] xl:pb-[70px]">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <h3 className="text-[14px] leading-[100%] font-normal text-[#FFFFFFB2]">
                Questions? Call
              </h3>
              <h3 className="text-[14px] leading-[100%] font-normal text-[#FFFFFFB2]">
                1-844-505-2993
              </h3>
            </div>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal text-[#FFFFFFB2]">
              FAQ
            </h3>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal text-[#FFFFFFB2]">
              Privacy
            </h3>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal text-[#FFFFFFB2]">
              Ad Choices
            </h3>
          </div>

          <div className="mt-[15px] xl:mt-[20px] flex flex-col">
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal text-[#FFFFFFB2]">
              Help Center
            </h3>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal text-[#FFFFFFB2]">
              Cookie Preferences
            </h3>
          </div>

          <div className="mt-[0px] xl:mt-[20px] flex flex-col">
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal text-[#FFFFFFB2]">
              Netflix Shop
            </h3>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal text-[#FFFFFFB2]">
              Corporate Information
            </h3>
          </div>

          <div className="mt-[-40px] xl:mt-[20px] flex flex-col">
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal text-[#FFFFFFB2]">
              Terms of Use
            </h3>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal text-[#FFFFFFB2]">
              Do Not Sell or Share My Personal Information
            </h3>
          </div>
          <div className="w-fit mt-[40px] py-[5px] px-[30px] border-[1px] border-[#808080B2]">
            <h3 className="text-[16px] leading-[24px] font-normal text-white">
              English
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
