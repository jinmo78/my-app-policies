import type { Locale } from "@/lib/i18n";
import ko from "@/dictionaries/ko.json";
import en from "@/dictionaries/en.json";

const dictionaries = { ko, en };

export type Dictionary = typeof ko;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.ko;
}

export function t(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, value),
    template
  );
}
