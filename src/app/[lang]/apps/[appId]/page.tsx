import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllApps, getAppById } from "@/lib/apps";
import { getDictionary } from "@/lib/dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ lang: string; appId: string }>;
};

export async function generateStaticParams() {
  const apps = getAllApps("ko");
  return locales.flatMap((lang) =>
    apps.map((app) => ({
      lang,
      appId: app.id,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam, appId } = await params;
  if (!isLocale(langParam)) return { title: "App Not Found" };
  const lang = langParam as Locale;
  const dict = getDictionary(lang);
  const app = getAppById(appId, lang);
  if (!app) return { title: "App Not Found" };
  return {
    title: `${app.name} - ${dict.app.officialIntro}`,
    description: `${app.name} (${app.slogan}): ${app.desc}`,
  };
}

export default async function AppPage({ params }: Props) {
  const { lang: langParam, appId } = await params;
  if (!isLocale(langParam)) notFound();
  const lang = langParam as Locale;
  const dict = getDictionary(lang);
  const app = getAppById(appId, lang);
  const base = `/${lang}`;

  if (!app) notFound();

  return (
    <main className="container">
      <div className="bg-glow" />
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.icon}>{app.icon}</div>
          <h1 className={styles.appName}>{app.name}</h1>
          <span className={styles.slogan}>{app.slogan}</span>
          <p className={styles.desc}>{app.desc}</p>
          {(app.appStoreUrl || app.playStoreUrl) && (
            <div className={styles.downloadStore}>
              {app.appStoreUrl && (
                <a
                  href={app.appStoreUrl}
                  className={styles.storeBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🍎 {dict.app.appStore}
                </a>
              )}
              {app.playStoreUrl && (
                <a
                  href={app.playStoreUrl}
                  className={styles.storeBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🤖 {dict.app.playStore}
                </a>
              )}
            </div>
          )}
        </section>

        <section style={{ marginBottom: "5rem" }}>
          <h2 className={styles.sectionTitle}>{dict.app.featuresTitle}</h2>
          <div className={styles.features}>
            {app.features.map((feature, idx) => (
              <div key={idx} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.policySection}>
          <h3>{dict.app.policyTitle}</h3>
          <p>{dict.app.policyDesc}</p>
          <div className={styles.policyLinks}>
            <a
              href={`${base}/apps/${app.id}/privacy`}
              className={`${styles.policyBtn} ${styles.storeBtn}`}
            >
              {dict.app.privacyBtn}
            </a>
            <a
              href={`${base}/apps/${app.id}/terms`}
              className={`${styles.policyBtn} ${styles.storeBtn}`}
              style={{ backgroundColor: "var(--primary)", borderColor: "var(--primary)" }}
            >
              {dict.app.termsBtn}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
