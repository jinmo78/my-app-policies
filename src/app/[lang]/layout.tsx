import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { getAllApps } from "@/lib/apps";
import { getDictionary } from "@/lib/dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SiteNav from "@/components/SiteNav";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: langParam } = await params;
  if (!isLocale(langParam)) return {};
  const dict = getDictionary(langParam);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang: langParam } = await params;
  if (!isLocale(langParam)) notFound();
  const lang = langParam as Locale;
  const dict = getDictionary(lang);
  const apps = getAllApps(lang);
  const base = `/${lang}`;

  return (
    <html lang={lang}>
      <body>
        <header className="header">
          <div className="container header-container">
            <a href={base} className="logo">
              <span>🚀</span> John.k
            </a>
            <div className="header-right">
              <SiteNav
                base={base}
                homeLabel={dict.nav.home}
                appsLabel={dict.nav.apps}
                closeLabel={dict.nav.close}
                apps={apps.map((app) => ({ id: app.id, name: app.name, icon: app.icon }))}
              />
              <LanguageSwitcher lang={lang} labels={dict.lang} />
            </div>
          </div>
        </header>

        {children}

        <footer className="footer">
          <div className="container">
            <div className="footer-apps">
              <h4>{dict.footer.apps}</h4>
              <nav className="footer-app-icons" aria-label={dict.footer.apps}>
                {apps.map((app) => (
                  <a
                    key={app.id}
                    href={`${base}/apps/${app.id}`}
                    className="footer-app-icon"
                    title={app.name}
                    aria-label={app.name}
                  >
                    <span aria-hidden="true">{app.icon}</span>
                  </a>
                ))}
              </nav>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 John.k. {dict.footer.rights}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
