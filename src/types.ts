export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  highlight: string;
  description: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  capabilities: string[];
  keyStandards: string[];
  sampleProject: string;
  metrics: string;
  iconName: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  deliverables: string[];
  tools: string[];
  iconName: string;
}

export interface ClientItem {
  id: string;
  name: string;
  shortName: string;
  sector: string;
  description: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  industry: string;
  clientType: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
  metrics: { label: string; val: string };
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  type: string;
  description: string;
  requirements: string[];
}
