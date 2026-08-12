import { getAllApps } from "@/lib/apps";
import { getDictionary } from "@/lib/dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Home({ params }: Props) {
  const { lang: langParam } = await params;
  if (!isLocale(langParam)) notFound();
  const lang = langParam as Locale;
  const dict = getDictionary(lang);
  const apps = getAllApps(lang);
  const base = `/${lang}`;

  return (
    <main className="container">
      <div className="bg-glow" />

      <section className={styles.hero}>
        <h1 className={styles.title}>
          {dict.home.titleBefore}{" "}
          <span className={styles.gradientText}>{dict.home.titleHighlight}</span>
        </h1>
        <p className={styles.description}>{dict.home.description}</p>
      </section>

      <section className={styles.grid}>
        {apps.map((app) => {
          const glowStyleClass =
            (styles as Record<string, string>)[app.glowClass] || styles.app1Glow;
          return (
            <div key={app.id} className={styles.card}>
              <div className={`${styles.cardGlow} ${glowStyleClass}`} />

              <div className={styles.cardHeader}>
                <div className={styles.icon}>{app.icon}</div>
                <div>
                  <h2 className={styles.appName}>{app.name}</h2>
                  <span className={styles.appSlogan}>{app.slogan}</span>
                </div>
              </div>

              <p className={styles.cardBody}>{app.desc}</p>

              <div className={styles.cardFooter}>
                <a
                  href={`${base}/apps/${app.id}`}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  {dict.home.learnMore}
                </a>
              </div>

              <div className={styles.policies}>
                <a href={`${base}/apps/${app.id}/privacy`} className={styles.policyLink}>
                  {dict.home.privacy}
                </a>
                <span>&bull;</span>
                <a href={`${base}/apps/${app.id}/terms`} className={styles.policyLink}>
                  {dict.home.terms}
                </a>
              </div>
            </div>
          );
        })}
      </section>

      <div className="bg-glow-secondary" />
    </main>
  );
}
