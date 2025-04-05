
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'hr';
}

export interface JobRole {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  qualifications: string[];
}

export interface ResumeAnalysis {
  id: string;
  candidateId: string;
  candidateName: string;
  jobRoleId: string;
  jobRoleTitle: string;
  matchPercentage: number;
  atsFriendlinessScore: number;
  matchedSkills: string[];
  requiredSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  submittedAt: string;
  resumeText?: string;
  resumeUrl?: string;
}
