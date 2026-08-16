export interface ProjectArchitecture {
  title: string;
  description: string;
  steps: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  liveUrl: string;
  backendApi?: string;
  worker?: string;
  githubUrl: string;
  status: 'Live' | 'In Development' | 'Concept';
  badge: string;
  symbol: string;
  researchDomain?: string;
  architecture?: ProjectArchitecture;
  scientificImpact?: string[];
  keyFeatures?: string[];
}
