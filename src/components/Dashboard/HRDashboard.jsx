
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllResumeAnalyses, getJobRoles } from '@/services/resumeService';
import { BarChart, Briefcase, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CandidateTable from '../HR/CandidateTable';

const HRDashboard = () => {
  const [analyses, setAnalyses] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allAnalyses, allJobRoles] = await Promise.all([
          getAllResumeAnalyses(),
          getJobRoles()
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

  // Calculate statistics
  const totalCandidates = [...new Set(analyses.map(a => a.candidateId))].length;
  const totalSubmissions = analyses.length;
  
  // Calculate average match by job role
  const jobRoleStats = jobRoles.map(role => {
    const roleAnalyses = analyses.filter(a => a.jobRoleId === role.id);
    const averageMatch = roleAnalyses.length > 0
      ? Math.round(roleAnalyses.reduce((sum, item) => sum + item.matchPercentage, 0) / roleAnalyses.length)
      : 0;
    
    return {
      id: role.id,
      title: role.title,
      count: roleAnalyses.length,
      averageMatch
    };
  });

  if (loading) {
    return <div className="flex justify-center py-8">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in mx-4 sm:mx-6 md:mx-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">HR Dashboard</h1>
        <p className="text-gray-500">Overview of candidate resume submissions and analyses</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCandidates}</div>
            <p className="text-xs text-gray-500">Unique applicants</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <BarChart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubmissions}</div>
            <p className="text-xs text-gray-500">Resume analyses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Roles</CardTitle>
            <Briefcase className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobRoles.length}</div>
            <p className="text-xs text-gray-500">Open positions</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md mt-8">
        <CardHeader>
          <CardTitle>Job Role Performance</CardTitle>
          <CardDescription>Average match scores and submission counts by job role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobRoleStats.map((role) => (
              <div key={role.id} className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{role.title}</span>
                    <span className="text-xs text-gray-500 ml-2">({role.count} submissions)</span>
                  </div>
                  <span className="font-semibold">{role.averageMatch}% avg</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-brand-500 h-2.5 rounded-full"
                    style={{ width: `${role.averageMatch}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CandidateTable 
        analyses={analyses}
        jobRoles={jobRoles.map(role => ({ id: role.id, title: role.title }))}
      />

      <div className="flex justify-end mb-8">
        <Link to="/candidates">
          <Button variant="outline" className="flex items-center">
            View All Candidates
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HRDashboard;
