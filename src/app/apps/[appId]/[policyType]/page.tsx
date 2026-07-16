import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPolicyContent } from "@/lib/markdown";

type Props = {
  params: Promise<{ appId: string; policyType: string }>;
};

// Define static path generation for all apps & policy types
export async function generateStaticParams() {
  const paths = [];
  const apps = ["app1", "app2", "app3", "app4"];
  const policyTypes = ["privacy", "terms"];
  
  for (const appId of apps) {
    for (const policyType of policyTypes) {
      paths.push({ appId, policyType });
    }
  }
  return paths;
}

const appNames: Record<string, string> = {
  app1: "TaskFlow",
  app2: "FitTrack",
  app3: "SpendWise",
  app4: "SnapEdit"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { appId, policyType } = await params;
  const appName = appNames[appId] || appId;
  const typeText = policyType === "privacy" ? "개인정보처리방침" : "서비스 이용약관";

  return {
    title: `${appName} - ${typeText}`,
    description: `${appName}의 공식 ${typeText} 페이지입니다. 최신 업데이트 및 세부 규정을 제공합니다.`,
  };
}

export default async function PolicyPage({ params }: Props) {
  const { appId, policyType } = await params;
  const data = await getPolicyContent(appId, policyType);

  if (!data) {
    notFound();
  }

  const appName = appNames[appId] || appId;

  return (
    <main className="container">
      <div className="bg-glow" />
      
      <div className="policy-container">
        <a href={`/apps/${appId}`} className="back-btn">
          <span>&larr;</span> {appName} 소개로 돌아가기
        </a>
        
        <div className="policy-meta">
          <span>{appName} 공식 문서</span>
          <span>최종 수정일: {data.updatedAt}</span>
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
