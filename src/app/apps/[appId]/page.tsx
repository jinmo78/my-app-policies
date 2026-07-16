import { notFound } from "next/navigation";
import { Metadata } from "next";
import styles from "./page.module.css";

interface AppDetail {
  id: string;
  name: string;
  icon: string;
  slogan: string;
  desc: string;
  features: { title: string; desc: string }[];
}

const appDetails: Record<string, AppDetail> = {
  app1: {
    id: "app1",
    name: "TaskFlow",
    icon: "📝",
    slogan: "스마트한 할 일 관리의 시작",
    desc: "할 일 목록, 캘린더, 메모를 하나로 통합하여 일상의 생산성을 극대화합니다. 세련된 대시보드와 클라우드 동기화로 어디서든 업무를 관리해 보세요.",
    features: [
      { title: "실시간 클라우드 동기화", desc: "모바일, 태블릿, PC 등 모든 기기에서 즉시 업데이트되는 할 일 목록을 경험해 보세요." },
      { title: "인공지능 우선순위 분석", desc: "사용자의 업무 패턴을 AI가 스스로 분석하여 오늘 반드시 끝내야 할 최적의 할 일을 추천합니다." },
      { title: "협업용 공유 워크스페이스", desc: "팀 프로젝트나 가족 간 장보기 목록 등 함께 작성하고 완료하는 실시간 공유 기능을 탑재했습니다." }
    ]
  },
  app2: {
    id: "app2",
    name: "FitTrack",
    icon: "⚡",
    slogan: "매일 더 건강해지는 루틴",
    desc: "실시간 활동 추적, 인공지능 기반 홈트레이닝 코칭, 상세 분석 리포트를 제공하여 건강하고 균형 잡힌 라이프스타일을 지원합니다.",
    features: [
      { title: "AI 모션 코칭", desc: "스마트폰 카메라를 통해 사용자의 운동 자세를 정확히 인식하고 실시간 음성 피드백을 제공합니다." },
      { title: "정밀 체성분 및 활동 분석", desc: "웨어러블 기기와 연동하여 심박수, 소모 칼로리, 수면 패턴까지 포괄적인 건강 리포트를 자동 생성합니다." },
      { title: "맞춤형 운동 플랜", desc: "사용자의 체력 수준과 목표에 맞추어 매주 고도로 개인화된 신규 홈트레이닝 루틴을 추천합니다." }
    ]
  },
  app3: {
    id: "app3",
    name: "SpendWise",
    icon: "💰",
    slogan: "쉽게 쓰고 똑똑하게 아끼기",
    desc: "수입과 지출을 자동으로 카테고리화하고 금융 목표를 계획해 보세요. 직관적인 차트와 자산 분석을 통해 더욱 현명한 소비 습관을 설계해 드립니다.",
    features: [
      { title: "자동 가계부 및 지출 분석", desc: "카드 결제 문자 및 뱅킹 앱 푸시와 연동하여 모든 내역을 스스로 분류하고 일일/주간 리포트를 작성합니다." },
      { title: "스마트 예산 경고 시스템", desc: "설정한 카테고리별 예산 한도에 가까워지면 알림을 주어 과소비를 사전에 완벽히 차단합니다." },
      { title: "미래 자산 저축 플래너", desc: "목표 저축액과 기간만 설정하면, 인공지능이 매일 권장 지출 금액을 계산해 성공적인 목돈 마련을 돕습니다." }
    ]
  },
  app4: {
    id: "app4",
    name: "SnapEdit",
    icon: "📸",
    slogan: "순간을 예술로 만드는 사진 편집",
    desc: "강력한 AI 필터, 정밀 조정 도구, 오버레이 효과를 터치 몇 번으로 적용할 수 있습니다. 당신의 일상 사진을 독창적인 작품으로 완성하세요.",
    features: [
      { title: "원터치 AI 개체 지우개", desc: "사진 속에 원치 않는 행인이나 물체, 반사광을 인공지능이 아주 자연스럽게 감쪽같이 지워줍니다." },
      { title: "프로급 후보정 프리셋", desc: "세계적인 포토그래퍼들과 협업하여 만든 시그니처 필터를 제공하여 원본의 디테일을 영화처럼 살립니다." },
      { title: "무손실 고해상도 내보내기", desc: "편집 과정에서 원본 픽셀의 파괴를 최소화하며, 4K 초고화질 이미지 및 미디어 파일 저장을 보장합니다." }
    ]
  }
};

type Props = {
  params: Promise<{ appId: string }>;
};

export async function generateStaticParams() {
  return [
    { appId: "app1" },
    { appId: "app2" },
    { appId: "app3" },
    { appId: "app4" }
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { appId } = await params;
  const app = appDetails[appId];
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
  const app = appDetails[appId];

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
