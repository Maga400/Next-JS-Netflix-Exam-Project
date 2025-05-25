"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Cookies from "js-cookie";
import { useTranslations, useLocale } from "next-intl";
import Loading from "@/components/Loading";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import { useThemeStore } from "../../../../../../store/themeStore";
import Image from "next/image";
import Loading2 from "../../../../../components/Loading2";

const MoreInfo = () => {
  const t = useTranslations("MoreInfo");
  const locale = useLocale();
  const { id } = useParams();
  const router = useRouter();
  const theme = useThemeStore((state) => state.theme);

  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const fetchMovieDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/Tv/${id}/details?lang=${locale}`
      );
      if (res.ok) {
        const data = await res.json();
        setTvShow(data.content);
        console.log(data.content);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id, locale]);

  const InfoRow = ({ label, value }) => (
    <div
      className={`flex justify-between items-center border-b ${
        theme ? "border-gray-200" : "border-gray-700"
      } py-2 text-sm`}
    >
      <span className={`${theme ? "text-gray-500" : "text-gray-400"}`}>
        {label}
      </span>
      <span className="text-right">{value || "-"}</span>
    </div>
  );

  return (
    <div
      className={`min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 py-6 transition-colors duration-300 ${
        theme ? "bg-black text-white" : "bg-white text-black"
      } font-sans`}
    >
      <div className="flex flex-row justify-between items-center gap-4 mb-8">
        <button
          onClick={() => {setLoading2(true); router.push(`/${locale}/tv-shows/${id}`)}}
          className={`flex items-center gap-2 px-4 py-2 rounded-md shadow-sm text-sm md:text-base transition-colors ${
            theme
              ? "bg-neutral-800 hover:bg-neutral-700 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-black"
          }`}
        >
          <ArrowLeft size={18} />
          {loading2 ? <Loading2 /> : t("go_back")}
        </button>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </div>

      {loading ? (
        <div
          className={`min-h-screen flex justify-center items-center ${
            theme ? "bg-black" : "bg-white"
          }`}
        >
          <Loading />
        </div>
      ) : (
        <div>
          {tvShow?.name && (
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-10 break-words">
              {tvShow?.name}
            </h1>
          )}

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
              <div
                className={`aspect-[2/3] w-full rounded-md overflow-hidden border ${
                  theme ? "border-gray-300" : "border-gray-700"
                } shadow-md`}
              >
                <Image
                  src={
                    tvShow?.poster_path
                      ? `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${tvShow?.poster_path}`
                      : "/images/defaultPoster.png"
                  }
                  alt={tvShow?.name || "image"}
                  width={400}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>

              {tvShow?.belongs_to_collection && (
                <div
                  className={`${
                    theme ? "bg-gray-800" : "bg-gray-100"
                  } p-4 rounded-md text-center shadow`}
                >
                  <h2 className="font-semibold text-base sm:text-lg mb-2">
                    {t("collection")} {tvShow?.belongs_to_collection?.name}
                  </h2>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${tvShow?.belongs_to_collection?.poster_path}`}
                    alt={tvShow?.belongs_to_collection?.name || "image"}
                    width={150}
                    height={225}
                    className="mx-auto rounded object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-8">
              {tvShow?.genres?.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {tvShow?.genres?.map((genre) => (
                    <span
                      key={genre?.id}
                      className={`px-4 py-1 rounded-full text-sm font-medium ${
                        theme
                          ? "bg-gray-800 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      {genre?.name}
                    </span>
                  ))}
                </div>
              )}

              {tvShow?.overview && (
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  {tvShow?.overview}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                <InfoRow
                  label={t("release_date")}
                  value={tvShow?.release_date}
                />
                <InfoRow
                  label={t("runtime")}
                  value={`${tvShow?.runtime} min`}
                />
                <InfoRow
                  label={t("rating")}
                  value={`${tvShow?.vote_average}/10`}
                />
                <InfoRow label={t("status")} value={tvShow?.status} />
                <InfoRow
                  label={t("language")}
                  value={tvShow?.original_language?.toUpperCase()}
                />
                <InfoRow label="IMDB ID" value={tvShow?.imdb_id || "-"} />
                <InfoRow
                  label={t("budget")}
                  value={
                    tvShow?.budget
                      ? `$${tvShow?.budget?.toLocaleString()}`
                      : "-"
                  }
                />
                <InfoRow
                  label={t("revenue")}
                  value={
                    tvShow?.revenue
                      ? `$${tvShow?.revenue?.toLocaleString()}`
                      : "-"
                  }
                />
                <InfoRow
                  label={t("popularity")}
                  value={tvShow?.popularity?.toFixed(1) || "-"}
                />
                <InfoRow label={t("tagline")} value={tvShow?.tagline || "-"} />
              </div>

              {tvShow?.production_companies?.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("production_companies")}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {tvShow?.production_companies?.map((company) => (
                      <div
                        key={company?.id}
                        className="flex flex-col items-center w-24 sm:w-28"
                      >
                        {company?.logo_path ? (
                          <div
                            className={`w-[100px] h-[50px] flex items-center justify-center rounded shadow-sm ${
                              theme ? "bg-white" : "bg-white/80"
                            }`}
                          >
                            <Image
                              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${company?.logo_path}`}
                              alt={company?.name || "image"}
                              width={100}
                              height={50}
                              className="object-contain max-h-[50px]"
                            />
                          </div>
                        ) : (
                          <div
                            className={`w-[100px] h-[50px] ${
                              theme ? "bg-gray-700" : "bg-gray-300"
                            } flex items-center justify-center text-xs rounded`}
                          >
                            {t("no_logo")}
                          </div>
                        )}
                        <span
                          className={`mt-1 text-center text-xs ${
                            theme ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {company?.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tvShow?.production_countries?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t("production_countries")}
                    </h3>
                    <ul className="list-disc list-inside text-sm">
                      {tvShow?.production_countries?.map((country, idx) => (
                        <li key={idx}>{country?.name}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {tvShow?.spoken_languages?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t("spoken_languages")}
                    </h3>
                    <ul className="list-disc list-inside text-sm">
                      {tvShow?.spoken_languages?.map((lang, idx) => (
                        <li key={idx}>{lang?.english_name}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {tvShow?.origin_country?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t("origin_country")}
                    </h3>
                    <ul className="list-disc list-inside text-sm">
                      {tvShow?.origin_country?.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="text-sm space-y-1">
                <div>
                  <strong>{t("video_available")} </strong>{" "}
                  {tvShow?.video ? "Yes" : "No"}
                </div>
                <div>
                  <strong>{t("adult_content")} </strong>{" "}
                  {tvShow?.adult ? "Yes" : "No"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreInfo;
