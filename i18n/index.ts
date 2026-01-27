import es from "./es";
import en from "./en";

const translations = { es, en };

export function t(lang: "es" | "en" = "es") {
  return translations[lang];
}
