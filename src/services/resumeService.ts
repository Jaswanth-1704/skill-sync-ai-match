
import { ResumeAnalysis, JobRole } from '@/types';
import { jobRoles, resumeAnalyses } from './mockData';

// Get all job roles
export const getJobRoles = async (): Promise<JobRole[]> => {
  // In a real app, this would be an API call
  return Promise.resolve(jobRoles);
};

// Get job role by ID
export const getJobRoleById = async (id: string): Promise<JobRole | undefined> => {
  // In a real app, this would be an API call
  return Promise.resolve(jobRoles.find(job => job.id === id));
};

// Upload and analyze resume
export const analyzeResume = async (
  candidateId: string,
  candidateName: string,
  jobRoleId: string,
  resumeFile: File
): Promise<ResumeAnalysis> => {
  // In a real app, this would:
  // 1. Upload the file to a storage service
  // 2. Parse the resume text using an OCR or PDF parser
  // 3. Send the text to an ML model for analysis
  // 4. Compare with job description
  // 5. Return results
  
  // For this demo, we'll simulate the process with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const jobRole = jobRoles.find(job => job.id === jobRoleId);
      
      if (!jobRole) {
        throw new Error('Job role not found');
      }
      
      // Generate random analysis results
      const matchPercentage = Math.floor(Math.random() * 40) + 60; // 60-99%
      const atsFriendlinessScore = Math.floor(Math.random() * 30) + 70; // 70-99
      
      // Randomly select which required skills are matched and missing
      const shuffled = [...jobRole.requiredSkills].sort(() => 0.5 - Math.random());
      const matchedCount = Math.ceil(shuffled.length * (matchPercentage / 100));
      
      const matchedSkills = shuffled.slice(0, matchedCount);
      const missingSkills = shuffled.slice(matchedCount);
      
      // Generate suggestions based on missing skills
      const suggestions = missingSkills.map(skill => `Add experience related to ${skill}`);
      suggestions.push('Use more action verbs in your job descriptions');
      suggestions.push('Quantify your achievements with metrics where possible');
      
      // Create the analysis result
      const result: ResumeAnalysis = {
        id: Math.random().toString(36).substr(2, 9),
        candidateId,
        candidateName,
        jobRoleId,
        jobRoleTitle: jobRole.title,
        matchPercentage,
        atsFriendlinessScore,
        matchedSkills,
        requiredSkills: jobRole.requiredSkills,
        missingSkills,
        suggestions,
        submittedAt: new Date().toISOString(),
        resumeText: `Mock resume content for ${candidateName}`,
      };
      
      resolve(result);
    }, 2000); // 2 second delay to simulate processing
  });
};

// Get all resume analyses
export const getAllResumeAnalyses = async (): Promise<ResumeAnalysis[]> => {
  // In a real app, this would be an API call to get all analyses for HR view
  return Promise.resolve(resumeAnalyses);
};

// Get resume analyses by candidate ID
export const getResumeAnalysesByCandidateId = async (candidateId: string): Promise<ResumeAnalysis[]> => {
  // In a real app, this would be an API call filtered by candidate ID
  return Promise.resolve(resumeAnalyses.filter(analysis => analysis.candidateId === candidateId));
};

// Get resume analysis by ID
export const getResumeAnalysisById = async (id: string): Promise<ResumeAnalysis | undefined> => {
  // In a real app, this would be an API call
  return Promise.resolve(resumeAnalyses.find(analysis => analysis.id === id));
};
