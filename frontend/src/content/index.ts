import { enContent } from "./en";
import { LOCALES, type LandingContent, type Locale } from "./content.types";
import { viContent } from "./vi";

export { LOCALES, type LandingContent, type Locale } from "./content.types";

const contentByLocale: Record<Locale, LandingContent> = {
  vi: viContent,
  en: enContent,
};

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function getContent(locale: Locale): LandingContent {
  return contentByLocale[locale];
}
