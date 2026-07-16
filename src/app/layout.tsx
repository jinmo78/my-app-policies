import type { Metadata } from "next";
import "./globals.css";
import { getAllApps } from "@/lib/apps";

export const metadata: Metadata = {
  title: "App Suite - 공식 소개 및 약관 센터",
  description: "우리가 출시하는 혁신적인 앱들의 공식 웹페이지와 개인정보처리방침 및 서비스 이용약관을 한곳에서 쉽고 간편하게 확인하실 수 있습니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const apps = getAllApps();

  return (
    <html lang="ko">
      <body>
        <header className="header">
          <div className="container header-container">
            <a href="/" className="logo">
              <span>🚀</span> App Suite
            </a>
            <nav className="nav-links">
              <a href="/" className="nav-link">Home</a>
              {apps.map((app) => (
                <a key={app.id} href={`/apps/${app.id}`} className="nav-link">
                  {app.name}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {children}

        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <h3>App Suite</h3>
                <p>우리는 일상을 변화시키는 혁신적인 스마트폰 어플리케이션을 개발하고 서비스합니다. 철저한 보안과 투명한 이용약관을 바탕으로 최선의 가치를 제공합니다.</p>
              </div>
              <div className="footer-col">
                <h4>바로가기</h4>
                <ul>
                  <li><a href="/">홈 허브</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>출시 앱 소개</h4>
                <ul>
                  {apps.map((app) => (
                    <li key={app.id}>
                      <a href={`/apps/${app.id}`}>{app.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer-col">
                <h4>개인정보 및 약관</h4>
                <ul>
                  {apps.map((app) => (
                    <li key={app.id} style={{ marginBottom: "0.5rem" }}>
                      <a href={`/apps/${app.id}/privacy`} style={{ display: "block", fontSize: "0.85rem" }}>
                        {app.name} 개인정보방침
                      </a>
                      <a href={`/apps/${app.id}/terms`} style={{ display: "block", fontSize: "0.85rem", opacity: 0.7 }}>
                        {app.name} 이용약관
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 App Suite. All rights reserved.</p>
              <p>모든 방침은 최신 법령 기준을 준수하여 작성되었습니다.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
