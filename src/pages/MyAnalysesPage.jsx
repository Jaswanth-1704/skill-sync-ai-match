
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getResumeAnalysesByCandidateId } from '@/services/resumeService';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, AlertCircle } from 'lucide-react';

const MyAnalysesPage = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAnalyses = async () => {
      if (user) {
        try {
          const result = await getResumeAnalysesByCandidateId(user.id);
          setAnalyses(result);
        } catch (error) {
          console.error('Error fetching analyses:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAnalyses();
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading your analyses...</div>;
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Resume Analyses</h1>
        <Link to="/resume-upload">
          <Button className="bg-brand-500 hover:bg-brand-600">New Analysis</Button>
        </Link>
      </div>

      {analyses.length > 0 ? (
        <div className="space-y-6">
          {analyses.map((analysis) => (
            <Card key={analysis.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 flex flex-row justify-between items-center">
                <div>
                  <CardTitle>{analysis.jobRoleTitle}</CardTitle>
                  <CardDescription>Submitted on {formatDate(analysis.submittedAt)}</CardDescription>
                </div>
                <Badge className={getScoreColor(analysis.matchPercentage)}>
                  {analysis.matchPercentage}% Match
                </Badge>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Matched Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.matchedSkills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {analysis.missingSkills.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Missing Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.missingSkills.map((skill) => (
                          <Badge key={skill} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="md:text-right">
                    <Link to={`/analysis/${analysis.id}`}>
                      <Button className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <AlertCircle className="h-10 w-10 text-amber-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Resume Analyses Yet</h3>
            <p className="text-gray-500 text-center mb-4">
              You haven't submitted any resumes for analysis yet.
            </p>
            <Link to="/resume-upload">
              <Button className="bg-brand-500 hover:bg-brand-600">
                Upload Resume
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyAnalysesPage;
