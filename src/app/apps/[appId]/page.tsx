import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllApps, getAppById } from "@/lib/apps";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ appId: string }>;
};

// Generate static routes dynamically based on apps.json config
export async function generateStaticParams() {
  const apps = getAllApps();
  return apps.map((app) => ({
    appId: app.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { appId } = await params;
  const app = getAppById(appId);
  if (!app) {
    return {
      title: "App Not Found",
    };
  }
  return {
    title: `${app.name} - 공식 소개`,
    description: `${app.name} (${app.slogan}): ${app.desc}`,
  };
}

export default async function AppPage({ params }: Props) {
  const { appId } = await params;
  const app = getAppById(appId);

  if (!app) {
    notFound();
  }

  return (
    <main className="container">
      <div className="bg-glow" />
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.icon}>{app.icon}</div>
          <h1 className={styles.appName}>{app.name}</h1>
          <span className={styles.slogan}>{app.slogan}</span>
          <p className={styles.desc}>{app.desc}</p>
          <div className={styles.downloadStore}>
            <button className={styles.storeBtn}>
              🍎 App Store에서 다운로드
            </button>
            <button className={styles.storeBtn}>
              🤖 Google Play에서 다운로드
            </button>
          </div>
        </section>

        <section style={{ marginBottom: "5rem" }}>
          <h2 className={styles.sectionTitle}>핵심 기능 안내</h2>
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
          <h3>개인정보 및 이용약관</h3>
          <p>
            우리는 이용자의 권리를 존중하며 개인정보 보호에 최선을 다합니다. 
            해당 서비스의 공식 약관을 확인하려면 아래 버튼을 클릭하십시오.
          </p>
          <div className={styles.policyLinks}>
            <a
              href={`/apps/${app.id}/privacy`}
              className={`${styles.policyBtn} ${styles.storeBtn}`}
            >
              개인정보처리방침
            </a>
            <a
              href={`/apps/${app.id}/terms`}
              className={`${styles.policyBtn} ${styles.storeBtn}`}
              style={{ backgroundColor: "var(--primary)", borderColor: "var(--primary)" }}
            >
              서비스 이용약관
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
