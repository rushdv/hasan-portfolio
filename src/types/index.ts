export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  learned: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: {
    name: string;
    description: string;
    icon?: string;
    linkText?: string;
  }[];
}

export interface TravelPlace {
  id: string;
  location: string;
  region: string;
  coordinates: { x: number; y: number };
  date: string;
  photo: string;
  story: string;
  favouriteMoment: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  category: 'ALL' | 'TRAVEL' | 'NATURE' | 'STREET' | 'ARCHITECTURE' | 'RANDOM';
  location: string;
  date: string;
  src: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  caption: string;
}

export interface EducationItem {
  period: string;
  institution: string;
  degree: string;
  status: string;
  courses: string[];
  highlight?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  thumbnail?: string;
  skills: string[];
}

export interface RoadmapStep {
  step: number;
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
  technologies: string[];
}

export interface PersonalInterest {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  bgImage: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  linkedin: string;
  github: string;
  email: string;
}
