// export default function HomePage() {
//   return (
//     <div>
//       <h1>{t('title')}</h1>
//       {/* <Link href="/about">{t('about')}</Link> */}
//     </div>
//   );
// }

"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import LanguageSelector from "@/components/LanguageSelector";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlus, FaTimes } from "react-icons/fa";
import Loading from "../../components/Loading";
import ThemeToggle from "@/components/ThemeToggle";
import { useThemeStore } from "../../../store/themeStore";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { toast } from "react-hot-toast";
import Loading2 from "@/components/Loading2";

const getFullLanguageName = (locale) => {
  return new Intl.DisplayNames([locale], { type: "language" }).of(locale);
};

const Landing = () => {
  const t = useTranslations("Landing");
  const locale = useLocale();
  const fullName = getFullLanguageName(locale);

  const cards = [
    {
      id: 1,
      title: t("enjoy_on_your_tv"),
      description: t("watch"),
      logoPath: "/icons/television.png",
    },
    {
      id: 2,
      title: t("download"),
      description: t("save"),
      logoPath: "/icons/download.png",
    },
    {
      id: 3,
      title: t("watch_everywhere"),
      description: t("stream"),
      logoPath: "/icons/watch.png",
    },
    {
      id: 4,
      title: t("create_profiles_for_kids"),
      description: t("send"),
      logoPath: "/icons/profiles.png",
    },
  ];

  const questions = [
    {
      question: t("what_is_netflix"),
      answer: t("netflix_streaming"),
    },
    {
      question: t("how_much_does_netflix_cost"),
      answer: t("watch_netflix"),
    },
    {
      question: t("where_can_i_watch"),
      answer: t("you_can_watch"),
    },
    {
      question: t("how_do_i_cancel"),
      answer: t("netflix_flexible"),
    },
    {
      question: t("what_can_i_watch_on_netflix"),
      answer: t("netflix_extensive"),
    },
    {
      question: t("is_netflix_good_for_kids"),
      answer: t("netflix_kids"),
    },
    {
      question: t("why_am_i_seeing_this_language"),
      answer: t("your_browser"),
    },
  ];

  const router = useRouter();
  const [type, setType] = useState("movie");
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tvLoading, setTvLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [path, setPath] = useState(false);
  const selectRef = useRef(null);
  const theme = useThemeStore((state) => state.theme);
  const [email, setEmail] = useState("");
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  
  const getTrendingMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/Movie/trending/1?lang=${locale}&count=5`
      );
      const data = await response.json();
      console.log(data.movies);
      setMovies(data.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendingTvShows = async () => {
    setTvLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/Tv/trending/1?lang=${locale}&count=5`
      );
      const data = await response.json();
      console.log(data.tvShows);
      setTvShows(data.tvShows);
    } catch (error) {
      console.error(error);
    } finally {
      setTvLoading(false);
    }
  };

  const getStarted = () => {
    setLoading3(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email !== "" && emailRegex.test(email)) {
      router.push(`/${locale}/register?email=${encodeURIComponent(email)}`);
    } else {
      setLoading3(false);
      toast.error(t("valid_email"));
    }
  };

  const toggle = (i) => {
    setSelected(selected === i ? null : i);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setPath(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (type === "movie") {
      getTrendingMovies();
    } else {
      getTrendingTvShows();
    }
  }, [type, locale]);

  return (
    <div
      className={`${
        theme ? "bg-black text-white" : "bg-white text-black"
      } w-full h-screen`}
    >
      <div className="relative flex flex-col justify-center items-center">
        <img
          src="/images/Background.jpg"
          alt="Background"
          className="w-full h-[700px] object-cover"
        />
        <div
          className={`${
            theme ? "bg-[#000000B2]" : "bg-[#00000080]"
          } w-full h-[700px] absolute`}
        ></div>
        <div className="w-full flex flex-row justify-between items-center absolute top-[20px] px-[20px] md:px-[50px] xl:px-[140px]">
          <img
            src="/icons/netflix-logo.png"
            alt="netflix-logo"
            className="w-[100px] md:w-[130px] xl:w-[160px] h-[30px] md:h-[40px] xl:h-[50px]"
          />

          <div className="xl:mt-[10px] flex flex-row justify-between items-center">
            <ThemeToggle />
            <LanguageSelector />
            <button
              onClick={() => {
                setLoading2(true);
                router.push(`/${locale}/login`);
              }}
              className="w-fit h-fit bg-[#E50914] ml-[10px] rounded-[5px] py-[5px] md:py-[8px] xl:py-[9px] px-[15px] md:px-[18px] xl:px-[20px] text-[11px] md:text-[13px] xl:text-[14px] leading-[18px] xl:leading-[20px] font-medium xl:font-semibold text-white hover:cursor-pointer"
            >
              {loading2 ? (
                <div className="flex justify-center items-center">
                  <Loading2 bg="border-white" />
                </div>
              ) : (
                t("sign_in")
              )}
            </button>
          </div>
        </div>
        <div className="absolute top-[0px] mt-[140px] xl:mt-[210px] px-[20px] xl:px-[0px] w-full md:w-[600px] xl:w-[700px] flex flex-col items-center">
          <div className="w-full md:w-full xl:w-[610px]">
            <h1 className="font-semibold xl:font-bold text-[30px] xl:text-[60px] leading-[35px] xl:leading-[65px] text-white text-center">
              {t("unlimited")}
            </h1>
            <h2 className="font-bold mt-[20px] text-[20px] md:text-[22px] xl:text-[25px] leading-[20px] xl:leading-[30px] text-white text-center">
              {t("starts")}
            </h2>
          </div>
          <div className="w-full">
            <h2 className="text-[16px] md:text-[17px] xl:text-[22px] text-white leading-[24px] font-normal mt-[30px] text-center">
              {t("ready")}
            </h2>
            <div className="w-full flex flex-row mt-[20px]">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t(`enter_email`)}
                className="w-full xl:w-[490px] border-[1px] border-[#A1A1AA] text-[#9CA3AF] px-[10px] xl:px-[15px] py-[5px] xl:py-[15px] rounded-[5px]"
              />
              <button
                onClick={getStarted}
                className="flex flex-row justify-center items-center ml-[10px] bg-[#E50914] rounded-[5px] py-[5px] xl:py-[13px] px-[20px] xl:px-[25px] text-[14px] xl:text-[19px] leading-[20px] xl:leading-[28px] font-medium xl:font-semibold text-white hover:cursor-pointer"
              >
                {loading3 ? (
                  <div className="flex justify-center items-center">
                    <Loading2 bg="border-white" />
                  </div>
                ) : (
                  <div className="flex flex-row justify-center">
                    {t("get_started")}
                    <img
                      className="w-[30px] h-[30px] ml-[5px]"
                      src="/icons/right-arrow.svg"
                    />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        <img
          src="/images/round-image.png"
          className="w-full h-[25px] xl:h-fit absolute bottom-[0px]"
        />
      </div>
      <div
        className={`${
          theme ? "bg-black text-white" : "bg-white text-black"
        } pt-[60px] xl:pt-[80px] pb-[40px] px-[20px] md:px-[50px] xl:px-[140px]`}
      >
        <h3 className="font-semibold text-[20px] md:text-[22px] xl:text-[24px] leading-[24px] md:leading-[28px] xl:leading-[32px] ">
          {t("trending_now")}
        </h3>

        <div className="mt-[20px]">
          <div ref={selectRef} className="relative w-[130px] md:w-[150px]">
            <select
              onClick={() => setPath((prev) => !prev)}
              onChange={(e) => setType(e.target.value)}
              className={`w-full ${
                theme
                  ? "bg-[#27272A] border-[#A1A1AA]"
                  : "bg-[#636366] border-black"
              } text-white appearance-none text-[12px] md:text-[13px] xl:text-[14px] leading-[16px] md:leading-[20px] xl:leading-[24px] border-[1px] py-[8px] md:py-[9px] xl:py-[10px] px-[10px] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="movie">{t("movie")}</option>
              <option value="tv">{t("tv_shows")}</option>
            </select>

            <img
              src={path ? "/icons/up-chevron.svg" : "/icons/down-chevron.svg"}
              className="w-[13px] h-[11px] md:w-[14px] md:h-[12px] xl:w-[15px] xl:h-[13px] absolute top-[12px] md:top-[14px] xl:top-[16px] right-[6px] md:right-[9px] xl:right-[11px]"
              alt="chevron-icon"
            />
          </div>

          <div className="mt-[50px]">
            {/* Mobil & Tablet (scrollable) */}
            {(type === "movie" || type === "tv") && (
              <div className="xl:hidden">
                <div className="flex gap-[15px] md:gap-[20px] overflow-x-auto custom-scroll whitespace-nowrap scroll-smooth">
                  {(type === "movie" ? movies : tvShows)?.map(
                    (item) =>
                      item && (
                        <div
                          key={item?.id}
                          className="flex-shrink-0 w-[160px] md:w-[200px] h-[240px] md:h-[250px] cursor-pointer"
                        >
                          <img
                            src={
                              item?.poster_path || item?.backdrop_path
                                ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${
                                    item?.poster_path || item?.backdrop_path
                                  }`
                                : "/images/defaultPoster.png"
                            }
                            alt="Poster"
                            className="w-full h-full object-cover rounded-[10px]"
                          />
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

            {/* Desktop (grid) */}
            <div className="hidden xl:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-[30px]">
              {(type === "movie" ? movies : tvShows)?.map(
                (item) =>
                  item && (
                    <div key={item?.id} className="w-full">
                      <img
                        src={
                          item?.poster_path || item?.backdrop_path
                            ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${
                                item?.poster_path || item?.backdrop_path
                              }`
                            : "/images/defaultPoster.png"
                        }
                        alt="Poster"
                        className="w-full h-full object-cover rounded-[10px]"
                      />
                    </div>
                  )
              )}
            </div>

            {/* Loading */}
            {(loading && type === "movie") || (tvLoading && type === "tv") ? (
              <div className="w-full flex justify-center items-center mt-4">
                <Loading />
              </div>
            ) : null}

            {/* Scrollbar stili */}
            <style jsx>{`
              .custom-scroll {
                scrollbar-width: thin;
                scrollbar-color: #999 transparent;
              }
              .custom-scroll::-webkit-scrollbar {
                height: 6px;
              }
              .custom-scroll::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scroll::-webkit-scrollbar-thumb {
                background-color: #999;
                border-radius: 10px;
              }
              .custom-scroll::-webkit-scrollbar-thumb:hover {
                background-color: #666;
              }
            `}</style>
          </div>
        </div>

        <h3 className="mt-[50px] text-[20px] md:text-[22px] xl:text-[24px] leading-[28px] md:leading-[32px] xl:leading-[36px] font-bold mt-[80px">
          {t("more_reasons_to_join")}
        </h3>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-[10px] md:gap-[12px] xl:gap-[15px] mt-[20px]">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-[#192247] rounded-[10px] flex flex-col justify-between px-[14px] md:px-[15px] xl:px-[15px] py-[15px] md:py-[18px] xl:py-[20px]"
            >
              <h3 className="text-white font-bold text-[20px] md:text-[22px] xl:text-[24px] leading-[24px] md:leading-[28px] xl:leading-[32px] text-start">
                {card.title}
              </h3>
              <p className="text-[#FFFFFFB2] text-[12px] md:text-[14px] xl:text-[16px] leading-[16px] md:leading-[20px] xl:leading-[24px] font-normal text-start mt-[15px]">
                {card.description}
              </p>
              <div className="flex flex-row justify-end">
                <img
                  src={card.logoPath}
                  alt="logo"
                  className="w-[50px] md:w-[70px] xl:w-[80px] h-[50px] md:h-[70px] xl:h-[80px] mt-[20px]"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="py-12 w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {t("frequently_asked_questions")}
          </h2>

          <div className="flex flex-col gap-4 w-full">
            {questions.map((item, i) => (
              <div
                key={i}
                className="bg-[#1f1f1f] text-white rounded-xl shadow-md transition-all"
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
                  onClick={() => toggle(i)}
                >
                  <span className="text-[17px] font-medium">
                    {item.question}
                  </span>
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: selected === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaPlus
                      className={`transition-transform duration-300 ${
                        selected === i ? "rotate-45 text-red-500" : ""
                      }`}
                      size={18}
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {selected === i && (
                    <motion.div
                      className="px-6 pb-4 text-[#d4d4d8] text-[15px]"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div>{item.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`mt-[150px] grid grid-cols-4 ${
            theme ? "text-[#FFFFFFB2]" : "text-black"
          } gap-[30px]`}
        >
          <div className="flex flex-col text-[10px] md:text-[12px] xl:text-[14px] leading-[16px] md:leading-[18px] xl:leading-[20px] font-normal">
            <h3 className="underline">{t("faq")}</h3>
            <h3 className="underline mt-[10px]">{t("legal_notices")}</h3>
            <h3 className="underline mt-[10px]">
              {t("corporate_information")}
            </h3>
            <h3 className="underline mt-[10px]">{t("terms_of_use")}</h3>
            <h3 className="underline mt-[10px]">{t("privacy")}</h3>
          </div>

          <div className="flex flex-col text-[10px] md:text-[12px] xl:text-[14px] leading-[16px] md:leading-[18px] xl:leading-[20px] font-normal">
            <h3 className="underline">{t("investor_relations")}</h3>
            <h3 className="underline mt-[10px]">{t("help_center")}</h3>
            <h3 className="underline mt-[10px]">{t("only_on_netflix")}</h3>
            <h3 className="underline mt-[10px]">{t("contact_us")}</h3>
            <h3 className="underline mt-[10px]">{t("speed_test")}</h3>
          </div>

          <div className="flex flex-col text-[10px] md:text-[12px] xl:text-[14px] leading-[16px] md:leading-[18px] xl:leading-[20px] font-normal">
            <h3 className="underline">{t("buy_gift_cards")}</h3>
            <h3 className="underline mt-[10px]">J{t("jobs")}</h3>
            <h3 className="underline mt-[10px]">{t("account")}</h3>
            <h3 className="underline mt-[10px]">{t("media_center")}</h3>
            <h3 className="underline mt-[10px] w-[100px] md:w-[160px] xl:w-[220px]">
              {t("sell")}
            </h3>
          </div>

          <div className="flex flex-col text-[10px] md:text-[12px] xl:text-[14px] leading-[16px] md:leading-[18px] xl:leading-[20px] font-normal">
            <h3 className="underline">{t("cookie_preferences")}</h3>
            <h3 className="underline mt-[10px]">{t("ways_to_watch")}</h3>
            <h3 className="underline mt-[10px]">{t("netflix_shop")}</h3>
            <h3 className="underline mt-[10px]">{t("redeem_gift_cards")}</h3>
            <h3 className="underline mt-[10px]">{t("ad_choices")}</h3>
          </div>
        </div>
        <div className="w-fit mt-[40px] mb-[30px] py-[5px] px-[30px] border-[1px] border-[#808080B2]">
          <h3 className="text-[16px] leading-[24px] font-normal">{fullName}</h3>
        </div>
      </div>
    </div>
  );
};

export default Landing;
