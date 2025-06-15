"use client";
import { useRouter, useSearchParams } from "next/navigation";
import LanguageSelector from "@/components/LanguageSelector";
import { toast } from "react-hot-toast";
import ThemeToggle from "@/components/ThemeToggle";
import { useThemeStore } from "../../../../../store/themeStore";
import { useTranslations, useLocale } from "next-intl";
import Loading from "@/components/Loading2";
import { useRef, useState } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import Cookie from "js-cookie";

const getFullLanguageName = (locale) => {
  return new Intl.DisplayNames([locale], { type: "language" }).of(locale);
};

const Register = () => {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");
  const t = useTranslations("Auth");
  const locale = useLocale();
  const fullName = getFullLanguageName(locale);
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    email: emailParam || "",
    password: "",
    imagePath: "",
    role: "user",
  });
  const theme = useThemeStore((state) => state.theme);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  const validate = async () => {
    const { username, email, password, imagePath } = data;

    if (!imagePath) {
      toast.error(t("image_required"));
      return false;
    }

    if (!username.trim()) {
      toast.error(t("username_required"));
      return false;
    }

    if (!email.trim()) {
      toast.error(t("email_required"));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t("invalid_email"));
      return false;
    }

    const userNotExists = await checkUser();
    if (!userNotExists) {
      return false;
    }

    if (password.length < 8) {
      toast.error(t("password_min_length"));
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(t("password_complexity"));
      return false;
    }

    return true;
  };

  const checkUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/Auth/existUser?email=${data.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const resData = await response.json();
        toast.error(resData.message);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error checking user existence:", error);
      toast.error(t("something_went_wrong"));
      return false;
    }
  };

  const register = async () => {
    const isValid = await validate();
    if (!isValid) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/Email/emailVerificationCode`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        }
      );

      const resData = await response.json();

      if (response.ok) {
        Cookie.set("code", resData.code);
        localStorage.setItem("registerData", JSON.stringify(data));
        router.push(`/${locale}/verification`);
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast.error(t("something_went_wrong"));
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);

      await uploadImageCloud(file);
    }
  };

  const uploadImageCloud = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_IP_URL}/Image`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setData((prev) => ({
          ...prev,
          imagePath: result.imagePath,
        }));
      } else {
        toast.error(result.message || "Image upload failed!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong while uploading the image.");
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
              <Loading bg="border-white" />
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
          className={`w-full md:w-[460px] ${
            theme ? "md:bg-[#000000B2]" : "md:bg-[#E5E5E5B2]"
          } absolute top-0 mt-[80px] md:mt-[90px] xl:mt-[80px] px-[20px] py-[0px] md:px-[70px] md:py-[30px]`}
        >
          <h2 className="text-[24px] md:text-[28px] xl:text-[32px] font-bold leading-[100%]">
            {t("sign_up")}
          </h2>
          <div className="flex flex-col">
            <div className="relative w-30 h-30 md:w-35 md:h-35 xl:w-40 xl:h-40 flex justify-center items-center m-auto mt-[15px]">
              <Image
                src={imageUrl || "/default-profile.png"}
                alt=""
                width={100}
                height={100}
                className="rounded-full object-cover border-4 border-white shadow-md w-full h-full m-auto"
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full border-2 border-white shadow-lg"
              >
                <Pencil size={18} />
              </button>
            </div>

            <input
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              type="text"
              placeholder={t("username")}
              className={`w-full md:w-[320px] mt-[15px] border-[1px] px-[15px] py-[20px] rounded-[5px] text-[16px]
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
              placeholder={t("email")}
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
              placeholder={t("password")}
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
            {loading ? (
              <div className="flex justify-center items-center">
                <Loading bg="border-white" />
              </div>
            ) : (
              t("sign_up")
            )}
          </button>
          <div
            onClick={() => {
              setLoading2(true);
              router.push(`/${locale}/login`);
            }}
            className="flex flex-row justify-center mt-[20px] hover:cursor-pointer"
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
                  } font-normal text-[16px] leading-[100%]`}
                >
                  {t("already_have_an_account")}
                </h3>
                <h2
                  className={`${
                    theme ? "text-white" : "text-black"
                  } ml-[5px] font-medium text-[16px] leading-[100%]`}
                >
                  {t("sign_in")}
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

export default Register;
