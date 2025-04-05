
import { JobRole, ResumeAnalysis } from '@/types';

export const jobRoles: JobRole[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    description: 'We are seeking a skilled Frontend Developer to join our team. The ideal candidate will have strong expertise in React and modern JavaScript frameworks.',
    requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'TypeScript', 'Git'],
    preferredSkills: ['Next.js', 'Tailwind CSS', 'GraphQL', 'Jest', 'Redux'],
    responsibilities: [
      'Develop and maintain responsive web applications',
      'Collaborate with backend developers for API integration',
      'Implement UI components based on design specifications',
      'Optimize applications for maximum performance'
    ],
    qualifications: [
      'Bachelor\'s degree in Computer Science or related field',
      '2+ years of experience with React',
      'Strong understanding of JavaScript fundamentals',
      'Experience with version control systems'
    ]
  },
  {
    id: '2',
    title: 'Backend Developer',
    description: 'We are looking for a Backend Developer with experience in building efficient server-side applications and APIs using Node.js and databases.',
    requiredSkills: ['Node.js', 'Express', 'MongoDB', 'SQL', 'RESTful APIs', 'Git'],
    preferredSkills: ['TypeScript', 'PostgreSQL', 'Docker', 'Kubernetes', 'GraphQL'],
    responsibilities: [
      'Design and implement server-side architecture',
      'Develop APIs and backend services',
      'Optimize database queries and performance',
      'Implement security and data protection measures'
    ],
    qualifications: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of experience with backend development',
      'Strong knowledge of database design',
      'Experience with cloud platforms (AWS, GCP, or Azure)'
    ]
  },
  {
    id: '3',
    title: 'Data Scientist',
    description: 'We are seeking a Data Scientist to analyze large datasets and extract valuable insights to drive business decisions.',
    requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization'],
    preferredSkills: ['TensorFlow', 'PyTorch', 'R', 'Hadoop', 'Spark', 'NLP'],
    responsibilities: [
      'Analyze large datasets to identify patterns and trends',
      'Develop machine learning models for predictive analysis',
      'Create data visualizations and dashboards',
      'Collaborate with business stakeholders to define objectives'
    ],
    qualifications: [
      'Master\'s or PhD in Computer Science, Statistics, or related field',
      '3+ years of experience in data analysis or machine learning',
      'Strong programming skills in Python',
      'Experience with big data technologies'
    ]
  }
];

export const resumeAnalyses: ResumeAnalysis[] = [
  {
    id: '1',
    candidateId: '2',
    candidateName: 'John Doe',
    jobRoleId: '1',
    jobRoleTitle: 'Frontend Developer',
    matchPercentage: 78,
    atsFriendlinessScore: 85,
    matchedSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git'],
    requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'TypeScript', 'Git'],
    missingSkills: ['TypeScript'],
    suggestions: [
      'Add more details about your React projects',
      'Include TypeScript experience if you have any',
      'Quantify your achievements with metrics',
      'Highlight responsive design experience'
    ],
    submittedAt: '2023-04-01T14:32:21Z'
  },
  {
    id: '2',
    candidateId: '3',
    candidateName: 'Jane Smith',
    jobRoleId: '2',
    jobRoleTitle: 'Backend Developer',
    matchPercentage: 92,
    atsFriendlinessScore: 90,
    matchedSkills: ['Node.js', 'Express', 'MongoDB', 'SQL', 'RESTful APIs', 'Git'],
    requiredSkills: ['Node.js', 'Express', 'MongoDB', 'SQL', 'RESTful APIs', 'Git'],
    missingSkills: [],
    suggestions: [
      'Expand on your database optimization experience',
      'Include more details about specific APIs you\'ve built',
      'Add information about your experience with security practices'
    ],
    submittedAt: '2023-04-02T09:15:43Z'
  },
  {
    id: '3',
    candidateId: '4',
    candidateName: 'Bob Johnson',
    jobRoleId: '3',
    jobRoleTitle: 'Data Scientist',
    matchPercentage: 65,
    atsFriendlinessScore: 72,
    matchedSkills: ['Python', 'SQL', 'Statistics', 'Data Visualization'],
    requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization'],
    missingSkills: ['Machine Learning'],
    suggestions: [
      'Highlight any machine learning projects or courses',
      'Include more technical details about your data analysis methods',
      'Add examples of insights you\'ve discovered through data analysis',
      'Mention specific visualization tools you\'ve used'
    ],
    submittedAt: '2023-04-03T16:45:12Z'
  }
];
