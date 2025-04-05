
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getResumeAnalysesByCandidateId } from '@/services/resumeService';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, BarChart2, TrendingUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CandidateDashboard = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // In a real app, this would fetch data filtered by the user ID
          // For demo purposes, we'll use mock data
          const userAnalyses = await getResumeAnalysesByCandidateId(user.id);
          setAnalyses(userAnalyses);
        } catch (error) {
          console.error('Error fetching analyses:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  const getLatestAnalysis = () => {
    if (analyses.length === 0) return null;
    
    return analyses.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    )[0];
  };

  const latestAnalysis = getLatestAnalysis();
  const averageMatch = analyses.length > 0
    ? Math.round(analyses.reduce((sum, item) => sum + item.matchPercentage, 0) / analyses.length)
    : 0;

  if (loading) {
    return <div className="flex justify-center py-8">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in px-8 sm:px-10 md:px-12 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-gray-500">Here's a summary of your resume analyses</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyses.length}</div>
            <p className="text-xs text-gray-500">Resumes analyzed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Match</CardTitle>
            <BarChart2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageMatch}%</div>
            <p className="text-xs text-gray-500">Across all job roles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestAnalysis ? `${latestAnalysis.matchPercentage}%` : 'N/A'}
            </div>
            <p className="text-xs text-gray-500">
              {latestAnalysis ? latestAnalysis.jobRoleTitle : 'No analyses yet'}
            </p>
          </CardContent>
        </Card>
      </div>

      {analyses.length > 0 ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Analyses</CardTitle>
            <CardDescription>Your most recent resume submissions and results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyses.slice(0, 3).map((analysis) => (
                <Link 
                  key={analysis.id}
                  to={`/analysis/${analysis.id}`}
                  className="block"
                >
                  <div className="flex items-center p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                    <div className="mr-4">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
                        ${analysis.matchPercentage >= 80 ? 'bg-green-500' : 
                          analysis.matchPercentage >= 60 ? 'bg-amber-500' : 'bg-red-500'}
                      `}>
                        {analysis.matchPercentage}%
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{analysis.jobRoleTitle}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(analysis.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div className="flex flex-wrap gap-1">
                        {analysis.matchedSkills.slice(0, 3).map((skill) => (
                          <span key={skill} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                        {analysis.matchedSkills.length > 3 && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            +{analysis.matchedSkills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {analyses.length > 3 && (
              <div className="mt-4 text-center">
                <Link to="/my-analyses">
                  <Button variant="outline">View All Analyses</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="mt-8">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <AlertCircle className="h-10 w-10 text-amber-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Resume Analyses Yet</h3>
            <p className="text-gray-500 text-center mb-4">
              Upload your resume and select a job role to get personalized feedback.
            </p>
            <Link to="/resume-upload">
              <Button className="bg-brand-500 hover:bg-brand-600">
                <FileText className="mr-2 h-4 w-4" /> Upload Resume
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CandidateDashboard;
