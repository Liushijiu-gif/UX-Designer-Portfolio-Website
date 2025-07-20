// 项目相关的类型定义

export interface ProjectSummary {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
  image: string;
}

export interface KeyFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ProjectResult {
  metric: string;
  value: string;
  description: string;
}

export interface ProjectDetail {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  duration: string;
  team: string;
  role: string;
  year: string;
  client: string;
  overview: string;
  challenge: string;
  processSteps: ProcessStep[];
  keyFeatures: KeyFeature[];
  results: ProjectResult[];
  nextSteps: string[];
  liveUrl: string;
  caseStudyUrl: string;
  gallery?: string[];
}

export interface ProjectDetailsCollection {
  [key: number]: ProjectDetail;
}