
import { useEffect, useState } from 'react';
import { getAllResumeAnalyses, getJobRoles } from '@/services/resumeService';
import CandidateTable from '@/components/HR/CandidateTable';
import { JobRole, ResumeAnalysis } from '@/types';

const CandidatesPage = () => {
  const [analyses, setAnalyses] = useState<ResumeAnalysis[]>([]);
  const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allAnalyses, allJobRoles] = await Promise.all([
          getAllResumeAnalyses(),
          getJobRoles(),
        ]);
        
        setAnalyses(allAnalyses);
        setJobRoles(allJobRoles);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-8">Loading candidates...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Candidates</h1>
      <CandidateTable 
        analyses={analyses}
        jobRoles={jobRoles.map(role => ({ id: role.id, title: role.title }))}
      />
    </div>
  );
};

export default CandidatesPage;
