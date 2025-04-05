
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResumeAnalysis } from '@/types';
import { CheckCircle2, XCircle, AlertCircle, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface AnalysisResultProps {
  analysis: ResumeAnalysis;
}

const AnalysisResult = ({ analysis }: AnalysisResultProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [animatedMatch, setAnimatedMatch] = useState(0);
  const [animatedATS, setAnimatedATS] = useState(0);

  useEffect(() => {
    // Animate progress bars
    const timer = setTimeout(() => {
      setAnimatedMatch(analysis.matchPercentage);
      setAnimatedATS(analysis.atsFriendlinessScore);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [analysis]);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="overflow-hidden shadow-lg border-t-4 border-t-brand-500">
        <CardHeader className="bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">Resume Analysis Results</CardTitle>
              <CardDescription>
                Job Role: <span className="font-medium">{analysis.jobRoleTitle}</span>
              </CardDescription>
              <p className="text-sm text-gray-500 mt-1">
                Submitted on {formatDate(analysis.submittedAt)}
              </p>
            </div>
            <div className="text-right">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Match Analysis</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Match Percentage</span>
                    <span className={`font-bold text-lg ${getMatchColor(analysis.matchPercentage)}`}>
                      {animatedMatch}%
                    </span>
                  </div>
                  <Progress value={animatedMatch} className="h-3 rounded-full" indicatorClassName={getProgressColor(analysis.matchPercentage)} />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">ATS-Friendliness Score</span>
                    <span className={`font-bold text-lg ${getMatchColor(analysis.atsFriendlinessScore)}`}>
                      {animatedATS}%
                    </span>
                  </div>
                  <Progress value={animatedATS} className="h-3 rounded-full" indicatorClassName={getProgressColor(analysis.atsFriendlinessScore)} />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Skills Assessment</h3>
              
              <div className="space-y-4">
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
            </div>
          </div>
          
          <div className="mt-8 border-t pt-6">
            <Button
              variant="ghost"
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="flex items-center gap-2 mb-4"
            >
              <AlertCircle className="text-amber-500 h-5 w-5" />
              <span>Improvement Suggestions</span>
              {showSuggestions ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            
            {showSuggestions && (
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 animate-fade-in">
                <ul className="space-y-2 list-disc list-inside text-sm">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-gray-700">{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResult;
