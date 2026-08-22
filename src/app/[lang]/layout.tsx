import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { getAllApps } from "@/lib/apps";
import { getDictionary } from "@/lib/dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FooterPolicySelect from "@/components/FooterPolicySelect";

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
              <nav className="nav-links">
                <a href={base} className="nav-link">
                  {dict.nav.home}
                </a>
                {apps.map((app) => (
                  <a key={app.id} href={`${base}/apps/${app.id}`} className="nav-link">
                    {app.name}
                  </a>
                ))}
              </nav>
              <LanguageSwitcher lang={lang} labels={dict.lang} />
            </div>
          </div>
        </header>

        {children}

        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-col">
                <h4>{dict.footer.shortcuts}</h4>
                <ul>
                  <li>
                    <a href={base}>{dict.footer.homeHub}</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>{dict.footer.apps}</h4>
                <ul>
                  {apps.map((app) => (
                    <li key={app.id}>
                      <a href={`${base}/apps/${app.id}`}>{app.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer-col">
                <h4>{dict.footer.policies}</h4>
                <FooterPolicySelect
                  apps={apps.map((app) => ({ id: app.id, name: app.name }))}
                  base={base}
                  placeholder={dict.footer.policySelectPlaceholder}
                  privacyShort={dict.footer.privacyShort}
                  termsShort={dict.footer.termsShort}
                />
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 John.k. {dict.footer.rights}</p>
              <p>{dict.footer.compliance}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
