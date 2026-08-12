import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";

const policiesDirectory = path.join(process.cwd(), "content/policies");

export interface PolicyData {
  title: string;
  contentHtml: string;
  updatedAt: string;
}

export async function getPolicyContent(
  appId: string,
  policyType: string,
  locale: Locale = "ko"
): Promise<PolicyData | null> {
  const fileName = `${appId}-${policyType}.md`;
  const localizedPath =
    locale === "en"
      ? path.join(policiesDirectory, "en", fileName)
      : path.join(policiesDirectory, fileName);
  const fallbackPath = path.join(policiesDirectory, fileName);
  const fullPath = fs.existsSync(localizedPath) ? localizedPath : fallbackPath;

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const processedContent = await remark().use(html).process(fileContents);
    const contentHtml = processedContent.toString();
    const dict = getDictionary(locale);

    let title = dict.policy.genericTitle;
    if (policyType === "privacy") title = dict.policy.privacyTitle;
    else if (policyType === "terms") title = dict.policy.termsTitle;

    const stats = fs.statSync(fullPath);
    const updatedAt = stats.mtime.toLocaleDateString(
      locale === "en" ? "en-US" : "ko-KR",
      { year: "numeric", month: "long", day: "numeric" }
    );

    return { title, contentHtml, updatedAt };
  } catch (error) {
    console.error(`Error reading policy file: ${fullPath}`, error);
    return null;
  }
}
