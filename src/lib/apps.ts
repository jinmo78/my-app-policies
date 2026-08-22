import fs from "fs";
import path from "path";
import type { Locale } from "@/lib/i18n";

export interface AppFeature {
  title: string;
  desc: string;
}

export interface AppLocaleCopy {
  name: string;
  slogan: string;
  desc: string;
  features: AppFeature[];
  ageNote?: string;
}

export interface AppConfigRaw {
  id: string;
  icon: string;
  glowClass: string;
  name: string;
  slogan: string;
  desc: string;
  features: AppFeature[];
  appStoreUrl?: string;
  playStoreUrl?: string;
  operator?: string;
  supportEmail?: string;
  ageNote?: string;
  en?: Partial<AppLocaleCopy>;
}

export type AppConfig = AppConfigRaw & AppLocaleCopy;

const appsFilePath = path.join(process.cwd(), "content/apps.json");

export function getAllAppsRaw(): AppConfigRaw[] {
  try {
    const fileContents = fs.readFileSync(appsFilePath, "utf8");
    return JSON.parse(fileContents) as AppConfigRaw[];
  } catch (error) {
    console.error("Failed to read apps config:", error);
    return [];
  }
}

export function localizeApp(app: AppConfigRaw, locale: Locale): AppConfig {
  if (locale === "en" && app.en) {
    return {
      ...app,
      name: app.en.name ?? app.name,
      slogan: app.en.slogan ?? app.slogan,
      desc: app.en.desc ?? app.desc,
      features: app.en.features ?? app.features,
      ageNote: app.en.ageNote ?? app.ageNote,
    };
  }
  return {
    ...app,
    name: app.name,
    slogan: app.slogan,
    desc: app.desc,
    features: app.features,
  };
}

export function getAllApps(locale: Locale = "ko"): AppConfig[] {
  return getAllAppsRaw().map((app) => localizeApp(app, locale));
}

export function getAppById(id: string, locale: Locale = "ko"): AppConfig | undefined {
  const app = getAllAppsRaw().find((item) => item.id === id);
  return app ? localizeApp(app, locale) : undefined;
}
