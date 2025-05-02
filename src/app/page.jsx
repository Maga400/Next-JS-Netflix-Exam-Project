"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import LanguageSelector from "@/components/LanguageSelector";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlus, FaTimes } from "react-icons/fa";
import Loading from "../components/Loading";

const Landing = () => {
  const cards = [
    {
      id: 1,
      title: "Enjoy on your TV",
      description:
        "Watch on Smart TVs,Playstation, Xbox,Chromecast, Apple TV, Blu-ray players, and more.",
      logoPath: "/icons/television.png",
    },
    {
      id: 2,
      title: "Download your shows to watch offline",
      description:
        "Save your favorites easily and always have something to watch.",
      logoPath: "/icons/download.png",
    },
    {
      id: 3,
      title: "Watch everywhere",
      description:
        "Stream unlimited movies and TV shows on your phone,tablet, laptop, and TV.",
      logoPath: "/icons/watch.png",
    },
    {
      id: 4,
      title: "Create profiles for kids",
      description:
        "Send kids on adventures with their favorite characters in a space made just for them — free with your membership.",
      logoPath: "/icons/profiles.png",
    },
  ];

  const questions = [
    {
      question: "What is Netflix?",
      answer:
        "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more.",
    },
    {
      question: "How much does Netflix cost?",
      answer:
        "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $6.99 to $19.99 a month.",
    },
    {
      question: "Where can I watch?",
      answer:
        "You can watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device.",
    },
    {
      question: "How do I cancel?",
      answer:
        "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks.",
    },
    {
      question: "What can I watch on Netflix?",
      answer:
        "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.",
    },
    {
      question: "Is Netflix good for kids?",
      answer:
        "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies.",
    },
    {
      question: "Why am I seeing this language?",
      answer:
        "Your browser language preferences or location determine the default language shown. You can change it in settings.",
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

  const getTrendingMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/movie/trending/1?lang=en&count=5`
      );
      const data = await response.json();
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
        `${process.env.NEXT_PUBLIC_IP_URL}/tv/trending/1?lang=en&count=5`
      );
      const data = await response.json();
      setTvShows(data.tvShows);
    } catch (error) {
      console.error(error);
    } finally {
      setTvLoading(false);
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
  }, [type]);

  return (
    <div className="bg-black w-full h-screen">
      <div className="relative flex flex-col justify-center items-center">
        <img
          src="/images/Background.jpg"
          alt="Background"
          className="w-full h-[700px] object-cover"
        />
        <div className="bg-[#000000B2] w-full h-[700px] absolute"></div>
        <div className="w-full flex flex-row justify-between items-center absolute top-[20px] px-[20px] md:px-[50px] xl:px-[140px]">
          <img
            src="/icons/netflix-logo.png"
            alt="netflix-logo"
            className="w-[100px] md:w-[130px] xl:w-[160px] h-[30px] md:h-[40px] xl:h-[50px]"
          />

          <div className="xl:mt-[10px] flex flex-row ">
            <LanguageSelector />
            <button
              onClick={() => router.push("/login")}
              className="bg-[#E50914] ml-[10px] rounded-[5px] py-[5px] md:py-[6px] xl:py-[7px] px-[15px] md:px-[18px] xl:px-[20px] text-[11px] md:text-[13px] xl:text-[14px] leading-[18px] xl:leading-[20px] font-medium xl:font-semibold text-white hover:cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="absolute top-[0px] mt-[140px] xl:mt-[210px] px-[20px] xl:px-[0px] w-full md:w-[600px] xl:w-[700px] flex flex-col items-center">
          <div className="w-full md:w-full xl:w-[610px]">
            <h1 className="font-semibold xl:font-bold text-[30px] xl:text-[60px] leading-[35px] xl:leading-[65px] text-white text-center">
              Unlimited movies, TV shows, and more
            </h1>
            <h2 className="font-bold mt-[20px] text-[20px] md:text-[22px] xl:text-[25px] leading-[20px] xl:leading-[30px] text-white text-center">
              Starts at $6.99. Cancel anytime.
            </h2>
          </div>
          <div className="w-full">
            <h2 className="text-[16px] md:text-[17px] xl:text-[22px] text-white leading-[24px] font-normal mt-[30px] text-center">
              Ready to watch? Enter your email to create or restart your
              membership.
            </h2>
            <div className="w-full flex flex-row mt-[20px]">
              <input
                placeholder="Enter email"
                className="w-full xl:w-[490px] border-[1px] border-[#A1A1AA] text-[#9CA3AF] px-[10px] xl:px-[15px] py-[5px] xl:py-[15px] rounded-[5px]"
              />
              <button className="flex flex-row ml-[10px] bg-[#E50914] rounded-[5px] py-[5px] xl:py-[13px] px-[15px] xl:px-[25px] text-[14px] xl:text-[20px] leading-[20px] xl:leading-[28px] font-medium xl:font-semibold text-white hover:cursor-pointer">
                Get Started
                <img
                  className="w-[30px] h-[30px] ml-[5px] mt-[5px] xl:mt-[0px]"
                  src="/icons/right-arrow.svg"
                />
              </button>
            </div>
          </div>
        </div>
        <img
          src="/images/round-image.png"
          className="w-full h-[25px] xl:h-fit absolute bottom-[0px]"
        />
      </div>
      <div className="bg-black pt-[60px] xl:pt-[80px] pb-[40px] px-[20px] md:px-[50px] xl:px-[140px]">
        <h3 className="font-semibold text-[20px] md:text-[22px] xl:text-[24px] leading-[24px] md:leading-[28px] xl:leading-[32px] text-white">
          Trending Now
        </h3>

        <div className="mt-[15px]">
          <div ref={selectRef} className="relative w-[120px]">
            <select
              onClick={() => setPath((prev) => !prev)}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-[#27272A] appearance-none text-white text-[12px] md:text-[13px] xl:text-[14px] leading-[16px] md:leading-[20px] xl:leading-[24px] border-[1px] border-[#A1A1AA] py-[8px] md:py-[9px] xl:py-[10px] px-[10px] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="movie">Movie</option>
              <option value="tv">Tv Shows</option>
            </select>

            <img
              src={path ? "/icons/up-chevron.svg" : "/icons/down-chevron.svg"}
              className="w-[13px] h-[11px] md:w-[14px] md:h-[12px] xl:w-[15px] xl:h-[13px] absolute top-[12px] md:top-[14px] xl:top-[16px] right-[6px] md:right-[9px] xl:right-[11px]"
              alt="chevron-icon"
            />
          </div>

          <div className="mt-[20px] grid grid-cols-5 gap-[10px] md:gap-[15px] xl:gap-[20px]">
            {loading ? (
              <Loading />
            ) : (
              type === "movie" &&
              movies?.map(
                (movie) =>
                  movie && (
                    <div key={movie?.id} className="w-full">
                      <img
                        src={
                          movie?.poster_path
                            ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movie?.poster_path}`
                            : "/images/defaultPoster.png"
                        }
                        className="w-fit h-fit rounded-[10px]"
                      />
                    </div>
                  )
              )
            )}

            {tvLoading ? (
              <Loading />
            ) : (
              type === "tv" &&
              tvShows?.map(
                (tvShow) =>
                  tvShow && (
                    <div key={tvShow?.id} className="w-full">
                      <img
                        src={
                          tvShow?.poster_path
                            ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${tvShow?.poster_path}`
                            : "/images/defaultPoster.png"
                        }
                        className="w-fit h-fit rounded-[10px]"
                      />
                    </div>
                  )
              )
            )}
          </div>
        </div>

        <h3 className="text-[20px] md:text-[22px] xl:text-[24px] leading-[28px] md:leading-[32px] xl:leading-[36px] font-bold mt-[80px] text-white">
          More Reasons to Join
        </h3>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-[10px] md:gap-[12px] xl:gap-[15px] mt-[20px]">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-[#192247] rounded-[10px] flex flex-col justify-between px-[14px] md:px-[15px] xl:px-[15px] py-[15px] md:py-[18px] xl:py-[20px]"
            >
              <h3 className="font-bold text-[20px] md:text-[22px] xl:text-[24px] leading-[24px] md:leading-[28px] xl:leading-[32px] text-white text-start">
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
        <div className="bg-black text-white py-12 w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col gap-4 w-full">
            {questions.map((item, i) => (
              <div
                key={i}
                className="bg-[#1f1f1f] rounded-xl shadow-md transition-all"
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
        {/* <div className="bg-black px-[20px] md:px-[50px] xl:px-[140px] py-[80px]">
          <h3 className="text-[24px] font-bold mb-[20px]">
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={index}>
                <button
                  onClick={() =>
                    setSelectedQuestionIndex(
                      selectedQuestionIndex === index ? null : index
                    )
                  }
                  className="w-full text-left bg-[#1f2937] px-4 py-3 rounded text-[18px] font-medium hover:bg-[#374151] transition"
                >
                  {q.question}
                </button>
                {selectedQuestionIndex === index && (
                  <p className="mt-2 px-4 text-[16px] text-[#d1d5db]">
                    {q.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div> */}
        <div className="mt-[150px] grid grid-cols-4 gap-[30px]">
          <div className="flex flex-col text-[10px] md:text-[12px] xl:text-[14px] leading-[16px] md:leading-[18px] xl:leading-[20px] text-[#FFFFFFB2] font-normal">
            <h3 className="underline">FAQ</h3>
            <h3 className="underline mt-[10px]">Legal Notices</h3>
            <h3 className="underline mt-[10px]">Corporate Information</h3>
            <h3 className="underline mt-[10px]">Terms of Use</h3>
            <h3 className="underline mt-[10px]">Privacy</h3>
          </div>

          <div className="flex flex-col text-[10px] md:text-[12px] xl:text-[14px] leading-[16px] md:leading-[18px] xl:leading-[20px] text-[#FFFFFFB2] font-normal">
            <h3 className="underline">Investor Relations</h3>
            <h3 className="underline mt-[10px]">Help Center</h3>
            <h3 className="underline mt-[10px]">Only on Netflix</h3>
            <h3 className="underline mt-[10px]">Contact Us</h3>
            <h3 className="underline mt-[10px]">Speed Test</h3>
          </div>

          <div className="flex flex-col text-[10px] md:text-[12px] xl:text-[14px] leading-[16px] md:leading-[18px] xl:leading-[20px] text-[#FFFFFFB2] font-normal">
            <h3 className="underline">Buy Gift Cards</h3>
            <h3 className="underline mt-[10px]">Jobs</h3>
            <h3 className="underline mt-[10px]">Account</h3>
            <h3 className="underline mt-[10px]">Media Center</h3>
            <h3 className="underline mt-[10px] w-[100px] md:w-[160px] xl:w-[220px]">
              Do Not Sell or Share My Personal Information
            </h3>
          </div>

          <div className="flex flex-col text-[10px] md:text-[12px] xl:text-[14px] leading-[16px] md:leading-[18px] xl:leading-[20px] text-[#FFFFFFB2] font-normal">
            <h3 className="underline">Cookie Preferences</h3>
            <h3 className="underline mt-[10px]">Ways to Watch</h3>
            <h3 className="underline mt-[10px]">Netflix Shop</h3>
            <h3 className="underline mt-[10px]">Redeem Gift Cards</h3>
            <h3 className="underline mt-[10px]">Ad Choices</h3>
          </div>
        </div>
        <div className="w-fit mt-[40px] mb-[30px] py-[5px] px-[30px] border-[1px] border-[#808080B2]">
          <h3 className="text-[16px] leading-[24px] font-normal text-white">
            English
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Landing;
