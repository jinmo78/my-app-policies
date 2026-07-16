import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const policiesDirectory = path.join(process.cwd(), 'content/policies');

export interface PolicyData {
  title: string;
  contentHtml: string;
  updatedAt: string;
}

export async function getPolicyContent(appId: string, policyType: string): Promise<PolicyData | null> {
  const fileName = `${appId}-${policyType}.md`;
  const fullPath = path.join(policiesDirectory, fileName);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(fileContents);
    const contentHtml = processedContent.toString();
    
    // Determine policy title
    let title = '';
    if (policyType === 'privacy') {
      title = '개인정보처리방침';
    } else if (policyType === 'terms') {
      title = '서비스 이용약관';
    } else {
      title = '약관';
    }
    
    // Get file modification time as updated date
    const stats = fs.statSync(fullPath);
    const updatedAt = stats.mtime.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      title,
      contentHtml,
      updatedAt,
    };
  } catch (error) {
    console.error(`Error reading policy file: ${fullPath}`, error);
    return null;
  }
}
