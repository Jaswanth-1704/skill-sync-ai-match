
import { useEffect, useState } from 'react';
import { getAllResumeAnalyses } from '@/services/resumeService';
import { ResumeAnalysis } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Eye, Search, Download, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResumeDatabase = () => {
  const [analyses, setAnalyses] = useState<ResumeAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allAnalyses = await getAllResumeAnalyses();
        setAnalyses(allAnalyses);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter analyses by search term
  const filteredAnalyses = analyses.filter(analysis => 
    analysis.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    analysis.jobRoleTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group analyses by match percentage range
  const highMatchAnalyses = filteredAnalyses.filter(a => a.matchPercentage >= 80);
  const mediumMatchAnalyses = filteredAnalyses.filter(a => a.matchPercentage >= 60 && a.matchPercentage < 80);
  const lowMatchAnalyses = filteredAnalyses.filter(a => a.matchPercentage < 60);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading resume database...</div>;
  }

  const AnalysisList = ({ analyses }: { analyses: ResumeAnalysis[] }) => (
    <div className="space-y-4">
      {analyses.length > 0 ? (
        analyses.map((analysis) => (
          <Card key={analysis.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h3 className="font-semibold text-lg">{analysis.candidateName}</h3>
                  <p className="text-gray-500">
                    {analysis.jobRoleTitle} • Submitted {formatDate(analysis.submittedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getScoreColor(analysis.matchPercentage)}>
                    {analysis.matchPercentage}% Match
                  </Badge>
                  <Link to={`/analysis/${analysis.id}`}>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium flex items-center mb-2">
                    <CheckCircle2 className="text-green-500 h-4 w-4 mr-1" /> Matched Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.matchedSkills.map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {analysis.missingSkills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium flex items-center mb-2">
                      <XCircle className="text-red-500 h-4 w-4 mr-1" /> Missing Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missingSkills.map(skill => (
                        <Badge key={skill} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          No resumes match your search criteria
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Resume Database</h1>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by candidate name or job role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="all">All ({filteredAnalyses.length})</TabsTrigger>
          <TabsTrigger value="high">High ({highMatchAnalyses.length})</TabsTrigger>
          <TabsTrigger value="medium">Medium ({mediumMatchAnalyses.length})</TabsTrigger>
          <TabsTrigger value="low">Low ({lowMatchAnalyses.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AnalysisList analyses={filteredAnalyses} />
        </TabsContent>
        <TabsContent value="high">
          <AnalysisList analyses={highMatchAnalyses} />
        </TabsContent>
        <TabsContent value="medium">
          <AnalysisList analyses={mediumMatchAnalyses} />
        </TabsContent>
        <TabsContent value="low">
          <AnalysisList analyses={lowMatchAnalyses} />
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end mt-6">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default ResumeDatabase;
