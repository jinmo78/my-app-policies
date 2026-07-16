import fs from 'fs';
import path from 'path';

export interface AppFeature {
  title: string;
  desc: string;
}

export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  slogan: string;
  desc: string;
  glowClass: string;
  features: AppFeature[];
}

const appsFilePath = path.join(process.cwd(), 'content/apps.json');

export function getAllApps(): AppConfig[] {
  try {
    const fileContents = fs.readFileSync(appsFilePath, 'utf8');
    return JSON.parse(fileContents) as AppConfig[];
  } catch (error) {
    console.error('Failed to read apps config:', error);
    return [];
  }
}

export function getAppById(id: string): AppConfig | undefined {
  const apps = getAllApps();
  return apps.find(app => app.id === id);
}
