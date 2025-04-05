
import { useEffect, useState } from 'react';
import { getJobRoles } from '@/services/resumeService';
import { JobRole } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BriefcaseIcon, Users, CheckCircle } from 'lucide-react';

const JobRolesPage = () => {
  const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const roles = await getJobRoles();
        setJobRoles(roles);
      } catch (error) {
        console.error('Error fetching job roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobRoles();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-8">Loading job roles...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Job Roles</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobRoles.map((role) => (
          <Card key={role.id} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{role.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {role.requiredSkills.length} required skills
                  </CardDescription>
                </div>
                <div className="bg-brand-100 p-2 rounded-full">
                  <BriefcaseIcon className="h-5 w-5 text-brand-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Description</p>
                <p className="text-sm">{role.description}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {role.requiredSkills.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-gray-50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Preferred Skills</p>
                <div className="flex flex-wrap gap-2">
                  {role.preferredSkills.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-1" /> 
                <span>3 candidates</span>
              </div>
              <Button variant="ghost" size="sm" className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" /> 
                <span>View Details</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobRolesPage;
