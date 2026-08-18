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
  /** Path to the client's mark under /public/logos. */
  logo: string;
}

/**
 * One of the three headline capability cards. ProSIM's remit starts at
 * detailed engineering, so these deliberately describe execution-phase work
 * rather than any front-end or basic-engineering scope.
 */
export interface PillarItem {
  id: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface CredentialItem {
  id: string;
  label: string;
  detail: string;
  iconName: string;
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
