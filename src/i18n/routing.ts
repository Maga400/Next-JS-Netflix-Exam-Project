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
    "/register":{
      en: "/register",
      ru: "/зарегистрироваться",
      de: "/registrieren",
      az: "/qeydiyyat",
    },
    "/home":{
      en:"/home",
      ru:"/дом",
      de:"/heim",
      az:"/ev"
    },
    "/movies":{
      en:"/movies",
      ru:"/фильмы",
      de:"/filme",
      az:"/filmlər"
    },
    "/movies/[id]":{
      en:"/movies/[id]",
      ru:"/фильмы/[id]",
      de:"/filme/[id]",
      az:"/filmlər/[id]"
    },
    "/tv-shows":{
      en:"/tv-shows",
      ru:"/телешоу",
      de:"/fernsehsendungen",
      az:"/televiziya-şouları"
    },
    "/tv-shows/[id]":{
      en:"/tv-shows/[id]",
      ru:"/телешоу/[id]",
      de:"/fernsehsendungen/[id]",
      az:"/televiziya-şouları/[id]"
    }
  },
});
