import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPolicyContent } from "@/lib/markdown";
import { getAllApps, getAppById } from "@/lib/apps";
import { getDictionary, t } from "@/lib/dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ lang: string; appId: string; policyType: string }>;
};

export async function generateStaticParams() {
  const apps = getAllApps("ko");
  const policyTypes = ["privacy", "terms"];
  const paths = [];
  for (const lang of locales) {
    for (const app of apps) {
      for (const policyType of policyTypes) {
        paths.push({ lang, appId: app.id, policyType });
      }
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam, appId, policyType } = await params;
  if (!isLocale(langParam)) return {};
  const lang = langParam as Locale;
  const dict = getDictionary(lang);
  const app = getAppById(appId, lang);
  const appName = app ? app.name : appId;
  const typeText =
    policyType === "privacy" ? dict.policy.privacyTitle : dict.policy.termsTitle;

  return {
    title: `${appName} - ${typeText}`,
    description: t(dict.policy.metaDesc, { app: appName, type: typeText }),
  };
}

export default async function PolicyPage({ params }: Props) {
  const { lang: langParam, appId, policyType } = await params;
  if (!isLocale(langParam)) notFound();
  const lang = langParam as Locale;
  const dict = getDictionary(lang);
  const data = await getPolicyContent(appId, policyType, lang);

  if (!data) notFound();

  const app = getAppById(appId, lang);
  const appName = app ? app.name : appId;
  const base = `/${lang}`;

  return (
    <main className="container">
      <div className="bg-glow" />

      <div className="policy-container">
        <a href={`${base}/apps/${appId}`} className="back-btn">
          <span>&larr;</span> {t(dict.policy.back, { app: appName })}
        </a>

        <div className="policy-meta">
          <span>{t(dict.policy.officialDoc, { app: appName })}</span>
          <span>{t(dict.policy.updated, { date: data.updatedAt })}</span>
        </div>

        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: data.contentHtml }}
        />
      </div>

      <div className="bg-glow-secondary" />
    </main>
  );
}
