"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import { toast } from "react-hot-toast";
import Cookie from "js-cookie";
import ThemeToggle from "@/components/ThemeToggle";
import { useThemeStore } from "../../../../../store/themeStore";
import { useTranslations, useLocale } from "next-intl";
import Loading from "@/components/Loading2";

const getFullLanguageName = (locale) => {
  return new Intl.DisplayNames([locale], { type: "language" }).of(locale);
};

const Login = () => {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const fullName = getFullLanguageName(locale);
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const theme = useThemeStore((state) => state.theme);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const login = async () => {
    setLoading(true);
    if (!data.email) {
      toast.error(t("email_required"));
      setLoading(false);
      return;
    }
    if (!data.password) {
      toast.error(t("password_required"));
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/Auth/login`,
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
        const inThreeHours = new Date(
          new Date().getTime() + 3 * 60 * 60 * 1000
        );
        Cookie.set("token", resData.token, {
          expires: inThreeHours,
          path: "/",
        });
        router.push(`/${locale}/home`);
      } else {
        toast.error(resData.message || t("something_went_wrong"));
      }
    } catch (error) {
      console.error(error);
      toast.error(t("network_error"));
    } finally {
      setLoading(false);
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
            theme ? "bg-[#000000B2]" : "bg-[#4d4d4d]"
          } opacity-[50%] w-full h-[750px] absolute hidden md:block`}
        ></div>
        <div className="w-full absolute top-[25px] px-[25px] xl:px-[160px] flex flex-row justify-between items-center">
          <div
            onClick={() => {
              setLoading3(true);
              router.push(`/${locale}`);
            }}
          >
            {loading3 ? (
              <div className="flex justify-center items-center">
                <Loading bg="border-white" />
              </div>
            ) : (
              <img
                src="/icons/netflix-logo.png"
                alt="netflix-logo"
                className="hover:cursor-pointer w-[90px] h-[25px] xl:w-[150px] xl:h-[40px]"
              />
            )}
          </div>
          <div className="flex flex-row justify-between items-center">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
        <div
          className={`w-full md:w-[480px] ${
            theme ? "md:bg-[#000000B2]" : "md:bg-[#E5E5E5B2]"
          } absolute top-0 mt-[100px] md:mt-[110px] xl:mt-[160px] px-[20px] py-[0px] md:px-[70px] md:py-[50px]`}
        >
          <h2 className="text-[32px] font-bold leading-[100%]">
            {t("sign_in")}
          </h2>
          <div className="flex flex-col">
            <input
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="email"
              placeholder={t("email")}
              className={`w-full md:w-[340px] mt-[30px] border-[1px] px-[15px] py-[20px] rounded-[5px] text-[16px] leading-[24px] font-normal
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
              placeholder={t("password")}
              className={`w-full md:w-[340px] mt-[15px] border-[1px] px-[15px] py-[20px] rounded-[5px] text-[16px] leading-[24px] font-normal
                ${
                  theme
                    ? "bg-[#161616B2] border-[#808080B2] text-white placeholder:text-white"
                    : "bg-[#FFFFFFB2] border-[#00000066] text-black placeholder:text-black"
                }`}
            />
          </div>
          <button
            onClick={login}
            className="w-full md:w-[340px] mt-[15px] bg-[#E50914] rounded-[5px] py-[10px] text-center text-[16px] leading-[16px] font-medium text-white hover:cursor-pointer"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <Loading bg="border-white" />
              </div>
            ) : (
              t("sign_in")
            )}
          </button>
          <div
            onClick={() => {
              setLoading2(true);
              router.push(`/${locale}/register`);
            }}
            className="flex flex-row justify-center mt-[30px] hover:cursor-pointer"
          >
            {loading2 ? (
              <div className="flex justify-center items-center">
                <Loading />
              </div>
            ) : (
              <div className="flex flex-row justify-center">
                <h3
                  className={`${
                    theme ? "text-[#FFFFFFB2]" : "text-gray-700"
                  } font-normal text-[14px] leading-[100%]`}
                >
                  {t("new_to_netflix")}
                </h3>
                <h2
                  className={`${
                    theme ? "text-white" : "text-black"
                  } ml-[5px] font-medium text-[14px] leading-[100%]`}
                >
                  {t("sign_up_now")}
                </h2>
              </div>
            )}
          </div>
        </div>
        <div
          className={`w-full absolute bottom-[0px] h-[50px] ${
            theme ? "bg-[#000000B2]" : "bg-[#E5E5E5B2]"
          }`}
        ></div>
      </div>
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
                {t("questions_call")}
              </h3>
              <h3 className="text-[14px] leading-[100%] font-normal">
                1-844-505-2993
              </h3>
            </div>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              {t("faq")}
            </h3>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              {t("privacy")}
            </h3>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              {t("ad_choices")}
            </h3>
          </div>

          <div className="mt-[15px] xl:mt-[20px] flex flex-col">
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              {t("help_center")}
            </h3>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              {t("cookie_preferences")}
            </h3>
          </div>

          <div className="mt-[0px] xl:mt-[20px] flex flex-col">
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              {t("netflix_shop")}
            </h3>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              {t("corporate_information")}
            </h3>
          </div>

          <div className="mt-[-40px] xl:mt-[20px] flex flex-col">
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              {t("terms_of_use")}
            </h3>
            <h3 className="text-[14px] mt-[25px] underline leading-[100%] font-normal">
              {t("do_not_sell_or_share_my_personal_information")}
            </h3>
          </div>
          <div
            className={`w-fit mt-[40px] py-[5px] px-[30px] border-[1px] ${
              theme ? "border-[#808080B2]" : "border-black"
            }`}
          >
            <h3 className="text-[16px] leading-[24px] font-normal">
              {fullName}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
