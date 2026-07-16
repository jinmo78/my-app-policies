import styles from "./page.module.css";

interface AppInfo {
  id: string;
  name: string;
  icon: string;
  slogan: string;
  desc: string;
  glowClass: string;
}

const apps: AppInfo[] = [
  {
    id: "app1",
    name: "TaskFlow",
    icon: "📝",
    slogan: "스마트한 할 일 관리의 시작",
    desc: "할 일 목록, 캘린더, 메모를 하나로 통합하여 일상의 생산성을 극대화합니다. 세련된 대시보드와 클라우드 동기화로 어디서든 업무를 관리해 보세요.",
    glowClass: styles.app1Glow,
  },
  {
    id: "app2",
    name: "FitTrack",
    icon: "⚡",
    slogan: "매일 더 건강해지는 루틴",
    desc: "실시간 활동 추적, 인공지능 기반 홈트레이닝 코칭, 상세 분석 리포트를 제공하여 건강하고 균형 잡힌 라이프스타일을 지원합니다.",
    glowClass: styles.app2Glow,
  },
  {
    id: "app3",
    name: "SpendWise",
    icon: "💰",
    slogan: "쉽게 쓰고 똑똑하게 아끼기",
    desc: "수입과 지출을 자동으로 카테고리화하고 금융 목표를 계획해 보세요. 직관적인 차트와 자산 분석을 통해 더욱 현명한 소비 습관을 설계해 드립니다.",
    glowClass: styles.app3Glow,
  },
  {
    id: "app4",
    name: "SnapEdit",
    icon: "📸",
    slogan: "순간을 예술로 만드는 사진 편집",
    desc: "강력한 AI 필터, 정밀 조정 도구, 오버레이 효과를 터치 몇 번으로 적용할 수 있습니다. 당신의 일상 사진을 독창적인 작품으로 완성하세요.",
    glowClass: styles.app4Glow,
  },
];

export default function Home() {
  return (
    <main className="container">
      <div className="bg-glow" />
      
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Meet Our <span className={styles.gradientText}>Innovations</span>
        </h1>
        <p className={styles.description}>
          삶의 질을 높이고 효율을 극대화하는 4가지 고유의 스마트 서비스를 소개합니다. 
          각 서비스의 상세 설명 및 개인정보처리방침, 이용약관은 아래 카드에서 바로 확인하실 수 있습니다.
        </p>
      </section>

      <section className={styles.grid}>
        {apps.map((app) => (
          <div key={app.id} className={styles.card}>
            <div className={`${styles.cardGlow} ${app.glowClass}`} />
            
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
        ))}
      </section>

      <div className="bg-glow-secondary" />
    </main>
  );
}
