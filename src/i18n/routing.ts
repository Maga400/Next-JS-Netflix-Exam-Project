import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ru", "de", "az"] as const,
  // Used when no locale matches
  defaultLocale: "en",
  pathnames: {
    "/login": {
      en: "/login",
      ru: "/логин",
      de: "/anmelden",
      az: "/daxil-ol",
    },
    "/register": {
      en: "/register",
      ru: "/зарегистрироваться",
      de: "/registrieren",
      az: "/qeydiyyat",
    },
    "/verification": {
      en: "/verification",
      ru: "/проверка",
      de: "/überprüfung",
      az: "/yoxlama",
    },
    "/home": {
      en: "/home",
      ru: "/дом",
      de: "/heim",
      az: "/ev",
    },
    "/profile": {
      en: "/profile",
      ru: "/профиль",
      de: "/profil",
      az: "/profil",
    },
    "/movies": {
      en: "/movies",
      ru: "/фильмы",
      de: "/filme",
      az: "/filmlər",
    },
    "/movies/category": {
      en: "/movies/category",
      ru: "/фильмы/категория",
      de: "/filme/kategorie",
      az: "/filmlər/kateqoriya",
    },
    "/movies/genre": {
      en: "/movies/genre",
      ru: "/фильмы/жанр",
      de: "/filme/genre",
      az: "/filmlər/janr",
    },
    "/movies/[id]": {
      en: "/movies/[id]",
      ru: "/фильмы/[id]",
      de: "/filme/[id]",
      az: "/filmlər/[id]",
    },
    "/movies/[id]/more-info": {
      en: "/movies/[id]/more-info",
      ru: "/фильмы/[id]/больше-информации",
      de: "/filme/[id]/mehr-infos",
      az: "/filmlər/[id]/ətraflı-məlumat",
    },
    "/tv-shows": {
      en: "/tv-shows",
      ru: "/телешоу",
      de: "/fernsehsendungen",
      az: "/televiziya-şouları",
    },
    "/tv-shows/category": {
      en: "/tv-shows/category",
      ru: "/телешоу/категория",
      de: "/fernsehsendungen/kategorie",
      az: "/televiziya-şouları/kateqoriya",
    },
    "/tv-shows/genre": {
      en: "/tv-shows/genre",
      ru: "/телешоу/жанр",
      de: "/fernsehsendungen/genre",
      az: "/televiziya-şouları/janr",
    },
    "/tv-shows/[id]": {
      en: "/tv-shows/[id]",
      ru: "/телешоу/[id]",
      de: "/fernsehsendungen/[id]",
      az: "/televiziya-şouları/[id]",
    },
    "/tv-shows/[id]/more-info": {
      en: "/tv-shows/[id]/more-info",
      ru: "/телешоу/[id]/больше-информации",
      de: "/fernsehsendungen/[id]/mehr-infos",
      az: "/televiziya-şouları/[id]/ətraflı-məlumat",
    },
  },
});
