"use client";
import { useRouter } from "next/navigation";
import { describe } from "node:test";

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
    "What is Netflix?",
    "How much does Netflix cost?",
    "Where can I watch?",
    "How do I cancel?",
    "What can I watch on Netflix?",
    "Is Netflix good for kids?",
    "Why am I seeing this language?",
  ];

  const router = useRouter();
  return (
    <div className="bg-black w-full h-screen">
      <div className="relative flex flex-col justify-center items-center">
        <img
          src="/images/Background.jpg"
          alt="Background"
          className="w-full h-[700px] object-cover"
        />
        <div className="bg-[#000000B2] w-full h-[700px] absolute"></div>
        <div className="w-full flex flex-row justify-between absolute top-[20px] px-[140px]">
          <img
            src="/icons/netflix-logo.png"
            alt="netflix-logo"
            className="w-[160px] h-[50px]"
          />
          <div className="mt-[10px] flex flex-row">
            <button
              onClick={() => router.push("/login")}
              className="bg-[#E50914] rounded-[5px] py-[7px] px-[20px] text-[14px] leading-[20px] font-semibold text-white hover:cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="absolute top-[0px] mt-[210px] w-[700px] flex flex-col items-center">
          <div className="w-[610px]">
            <h1 className="font-bold text-[60px] leading-[65px] text-white text-center">
              Unlimited movies, TV shows, and more
            </h1>
            <h2 className="font-bold mt-[20px] text-[25px] leading-[30px] text-white text-center">
              Starts at $6.99. Cancel anytime.
            </h2>
          </div>
          <div className="w-full">
            <h2 className="text-[22px] text-white leading-[24px] font-normal mt-[30px] text-center">
              Ready to watch? Enter your email to create or restart your
              membership.
            </h2>
            <div className="w-full flex flex-row mt-[20px]">
              <input
                placeholder="Enter email"
                className="w-[490px] border-[1px] border-[#A1A1AA] text-[#9CA3AF] p-[15px] rounded-[5px]"
              />
              <button className="flex flex-row ml-[10px] bg-[#E50914] rounded-[5px] py-[13px] px-[25px] text-[20px] leading-[28px] font-semibold text-white hover:cursor-pointer">
                Get Started
                <img
                  className="w-[30px] h-[30px] ml-[5px]"
                  src="/icons/right-arrow.svg"
                />
              </button>
            </div>
          </div>
        </div>
        <img
          src="/images/round-image.png"
          className="w-full h-fit absolute bottom-[0px]"
        />
      </div>
      <div className="bg-black pt-[80px] pb-[40px] px-[140px]">
        <h3 className="font-semibold text-[24px] leading-[32px] text-white">
          Trending Now
        </h3>

        <h3 className="text-[24px] leading-[36px] font-bold mt-[80px] text-white">
          More Reasons to Join
        </h3>

        <div className="grid grid-cols-4 gap-[15px] mt-[20px]">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-[#192247] rounded-[10px] flex flex-col justify-between px-[15px] py-[20px]"
            >
              <h3 className="font-bold text-[24px] leading-[32px] text-white text-start">
                {card.title}
              </h3>
              <p className="text-[#FFFFFFB2] text-[16px] leading-[24px] font-normal text-start mt-[15px]">
                {card.description}
              </p>
              <div className="flex flex-row justify-end">
                <img
                  src={card.logoPath}
                  alt="logo"
                  className="w-[80px] h-[80px] mt-[20px]"
                />
              </div>
            </div>
          ))}
        </div>
        <h3 className="font-medium text-[26px] leading-[34px] mt-[65px] text-white">
          Frequently Asked Questions
        </h3>
        <div className="mt-[20px]">
          {questions.map((question, index) => (
            <div key={index} className="py-[30px] px-[25px] w-full bg-[#2D2D2D] mb-[10px] flex flex-row justify-between items-center">
              <h2 className="font-normal text-[24px] leading-[36px] text-white">{question}</h2>
              <img src="/icons/plus.png" alt="plus" className="w-[30px] h-[30px]" />
            </div>
          ))}
        </div>
        <div className="mt-[150px] flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline">FAQ</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px]">Legal Notices</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px]">Corporate Information</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px]">Terms of Use</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px]">Privacy</h3>
          </div>

          <div className="flex flex-col">
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline">Investor Relations</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px]">Help Center</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px]">Only on Netflix</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px]">Contact Us</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px]">Speed Test</h3>
          </div>

          <div className="flex flex-col">
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline">Buy Gift Cards</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px]">Jobs</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px]">Account</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px]">Media Center</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px] w-[220px]">Do Not Sell or Share My Personal Information</h3>
          </div>

          <div className="flex flex-col">
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline">Cookie Preferences</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px]">Ways to Watch</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px]">Netflix Shop</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px]">Redeem Gift Cards</h3>
            <h3 className="font-normal text-[14px] leading-[20px] text-[#FFFFFFB2] underline mt-[10px]">Ad Choices</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
