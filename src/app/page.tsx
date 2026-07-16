import { getAllApps } from "@/lib/apps";
import styles from "./page.module.css";

export default function Home() {
  const apps = getAllApps();

  return (
    <main className="container">
      <div className="bg-glow" />
      
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Meet Our <span className={styles.gradientText}>Innovations</span>
        </h1>
        <p className={styles.description}>
          삶의 질을 높이고 효율을 극대화하는 스마트 서비스를 소개합니다. 
          각 서비스의 상세 설명 및 개인정보처리방침, 이용약관은 아래 카드에서 바로 확인하실 수 있습니다.
        </p>
      </section>

      <section className={styles.grid}>
        {apps.map((app) => {
          // Dynamically map glowClass string to CSS Module class reference
          const glowStyleClass = (styles as Record<string, string>)[app.glowClass] || styles.app1Glow;
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
                <a href={`/apps/${app.id}`} className={`${styles.btn} ${styles.btnPrimary}`}>
                  자세히 보기
                </a>
              </div>

              <div className={styles.policies}>
                <a href={`/apps/${app.id}/privacy`} className={styles.policyLink}>
                  개인정보처리방침
                </a>
                <span>&bull;</span>
                <a href={`/apps/${app.id}/terms`} className={styles.policyLink}>
                  이용약관
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
