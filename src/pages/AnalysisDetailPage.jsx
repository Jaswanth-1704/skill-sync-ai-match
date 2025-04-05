
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getResumeAnalysisById } from '@/services/resumeService';
import AnalysisResult from '@/components/Candidate/AnalysisResult';
import { AlertCircle } from 'lucide-react';

const AnalysisDetailPage = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!id) {
        setError('Analysis ID not provided');
        setLoading(false);
        return;
      }
      
      try {
        const result = await getResumeAnalysisById(id);
        if (result) {
          setAnalysis(result);
        } else {
          setError('Analysis not found');
        }
      } catch (err) {
        console.error('Error fetching analysis:', err);
        setError('Failed to load analysis results');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalysis();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600">Loading analysis...</p>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4 mx-auto" />
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-gray-600">{error || 'Unknown error occurred'}</p>
        </div>
      </div>
    );
  }

  return <AnalysisResult analysis={analysis} />;
};

export default AnalysisDetailPage;
