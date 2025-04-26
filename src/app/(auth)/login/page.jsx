"use client";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  return (
    <div className="bg-black w-full h-screen">
      <div className="relative flex flex-col justify-center items-center">
        <img
          src="/images/login-bg.jpg"
          alt="login-bg"
          className="w-full h-[750px] object-cover"
        />
        <div className="bg-[#000000B2] opacity-[50%] w-full h-[750px] absolute"></div>
        <div className="w-full absolute top-[25px] pl-[160px]">
          <img
            src="/icons/netflix-logo.png"
            alt="netflix-logo"
            className="w-[150px] h-[40px]"
          />
        </div>
        <div className="bg-[#000000B2] absolute top-0 mt-[160px] px-[70px] py-[50px]">
          <h2 className="text-[32px] font-bold leading-[100%] text-white">
            Sign In
          </h2>
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="w-[320px] mt-[30px] border-[1px] bg-[#161616B2] border-[#808080B2] text-white text-[16px] leading-[24px] font-normal px-[15px] py-[20px] rounded-[5px]"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-[320px] mt-[15px] border-[1px] bg-[#161616B2] border-[#808080B2] text-white text-[16px] leading-[24px] font-normal px-[15px] py-[20px] rounded-[5px]"
            />
          </div>
          <button className="w-full mt-[15px] bg-[#E50914] rounded-[5px] py-[10px] text-center text-[16px] leading-[16px] font-medium text-white hover:cursor-pointer">
            Sign In
          </button>
          <div
            onClick={() => router.push("/register")}
            className="flex flex-row justify-center mt-[40px] hover:cursor-pointer"
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
      <div className="flex flex-row justify-between bg-[#000000] pt-[50px] px-[170px] pb-[70px]">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <h3 className="text-[16px] leading-[100%] font-normal text-[#FFFFFFB2]">
              Questions? Call{" "}
            </h3>
            <h3 className="text-[16px] leading-[100%] font-normal text-[#FFFFFFB2]">
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

        <div className="mt-[20px] flex flex-col">
          <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal text-[#FFFFFFB2]">
            Help Center
          </h3>
          <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal text-[#FFFFFFB2]">
            Cookie Preferences
          </h3>
        </div>

        <div className="mt-[20px] flex flex-col">
          <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal text-[#FFFFFFB2]">
            Netflix Shop
          </h3>
          <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal text-[#FFFFFFB2]">
            Corporate Information
          </h3>
        </div>

        <div className="mt-[20px] flex flex-col">
          <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal text-[#FFFFFFB2]">
            Terms of Use
          </h3>
          <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal text-[#FFFFFFB2]">
            Do Not Sell or Share My Personal Information
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
