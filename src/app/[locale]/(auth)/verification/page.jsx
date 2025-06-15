"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Cookie from "js-cookie";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import { useThemeStore } from "../../../../../store/themeStore";
import Loading from "@/components/Loading2";

const Verification = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const t = useTranslations("Verification");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const theme = useThemeStore((state) => state.theme);
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    imagePath: "",
    role: "",
  });

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const verificationCode = Cookie.get("code");
    const codeAsString = code.join("");
    const codeAsInt = parseInt(codeAsString, 10);

    if (codeAsString.length < 6) {
      setLoading(false);
      toast.error(t("code_length_error"));
      return;
    }

    if (verificationCode == codeAsInt) {
      setLoading(false);
      await register();
    } else {
      setLoading(false);
      toast.error(t("verification_code"));
      setCode(new Array(6).fill(""));
    }
  };

  const register = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/Auth/register`,
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
        Cookie.remove("code");
        localStorage.removeItem("registerData");
        router.push(`/${locale}/login`);
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    try {
      setResendLoading(true);
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
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast.error(t("something_went_wrong"));
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("registerData"));

    if (savedData) {
      setData(savedData);
    }
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-20 ${
        theme ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="w-full absolute top-6 sm:top-8 px-6 sm:px-10 lg:px-40 flex justify-between items-center">
        <img
          src="/icons/netflix-logo.png"
          alt="netflix-logo"
          className="w-[90px] h-[25px] sm:w-[120px] sm:h-[30px] lg:w-[150px] lg:h-[40px]"
        />
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </div>

      <div
        className={`mt-5 sm:mt-2 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg transition-all duration-300 ${
          theme ? "bg-zinc-900" : "bg-white border border-gray-300"
        }`}
      >
        <h2
          className={`text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-4 ${
            theme ? "text-white" : "text-black"
          }`}
        >
          {t("enter_code")}
        </h2>
        <p
          className={`text-sm sm:text-base text-center mb-6 ${
            theme ? "text-zinc-400" : "text-gray-600"
          }`}
        >
          {t("sent_code")}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 sm:gap-3 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className={`w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl rounded focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200 ${
                  theme
                    ? "text-white bg-zinc-800 border border-zinc-700"
                    : "text-black bg-gray-100 border border-gray-300"
                }`}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold text-sm sm:text-base transition duration-200"
          >
            {loading ? t("verifying") : t("verify")}
          </button>
        </form>

        <div className="flex flex-row justify-center">
          <p
            className={`text-center mt-5 text-sm sm:text-base ${
              theme ? "text-zinc-400" : "text-gray-600"
            }`}
          >
            {t("not_received")}
          </p>
          <button
            className="text-red-500 hover:underline mt-5 ml-[5px]"
            onClick={resend}
          >
            {resendLoading ? (
              <div className="pl-[10px]">
                <Loading />
              </div>
            ) : (
              t("resend")
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;