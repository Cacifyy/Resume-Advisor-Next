export interface Education {
  id: string;
  universityName: string;
  degree: string;
  location: string;
  datesAttended: string;
  coursework?: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  dates: string;
  achievements: string;
}

export interface Project {
  id: string;
  projectName: string;
  technologies: string;
  date: string;
  description: string;
}

export interface Leadership {
  id: string;
  role: string;
  organization: string;
  dates: string;
  achievements: string;
}

export interface TechnicalSkills {
  languages: string;
  developerTools: string;
  technologiesFrameworks: string;
}

export interface ResumeData {
  education: Education[];
  experience: Experience[];
  projects: Project[];
  leadership: Leadership[];
  technicalSkills: TechnicalSkills;
}
