
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Upload, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { analyzeResume } from '@/services/resumeService';
import { getJobRoles } from '@/services/resumeService';
import { useNavigate } from 'react-router-dom';

const ResumeUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedJobRole, setSelectedJobRole] = useState('');
  const [jobRoles, setJobRoles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch job roles on component mount
  useState(() => {
    const fetchJobRoles = async () => {
      try {
        const roles = await getJobRoles();
        setJobRoles(roles);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching job roles:', error);
        toast({
          title: 'Failed to load job roles',
          description: 'Please try again later.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };
    
    fetchJobRoles();
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is PDF or text
      if (file.type === 'application/pdf' || file.type === 'text/plain') {
        setSelectedFile(file);
      } else {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a PDF or text file.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please upload your resume.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!selectedJobRole) {
      toast({
        title: 'No job role selected',
        description: 'Please select a job role.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      if (!user) throw new Error('User not authenticated');
      
      const result = await analyzeResume(
        user.id,
        user.name,
        selectedJobRole,
        selectedFile
      );
      
      toast({
        title: 'Resume analysis complete',
        description: 'Your resume has been analyzed successfully.',
        className: 'bg-green-50 border-green-200',
      });
      
      // Navigate to results page
      navigate(`/analysis/${result.id}`);
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: 'Upload failed',
        description: 'An error occurred while analyzing your resume.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading job roles...</div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Resume Analysis</CardTitle>
        <CardDescription>
          Upload your resume and select a job role to get personalized feedback
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="job-role">Select Job Role</Label>
            <Select 
              onValueChange={setSelectedJobRole} 
              value={selectedJobRole}
            >
              <SelectTrigger id="job-role" className="w-full">
                <SelectValue placeholder="Select a job role" />
              </SelectTrigger>
              <SelectContent>
                {jobRoles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="resume">Upload Resume</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-400 transition-colors">
              <input
                id="resume"
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
              {!selectedFile ? (
                <label htmlFor="resume" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      PDF or TXT files (max. 5MB)
                    </span>
                  </div>
                </label>
              ) : (
                <div className="flex items-center justify-center">
                  <FileText className="h-8 w-8 text-brand-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    {selectedFile.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="ml-2 text-xs text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {selectedJobRole && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-medium mb-2">Selected Job Role Details</h3>
              {jobRoles.find(role => role.id === selectedJobRole)?.description}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-brand-500 hover:bg-brand-600"
            disabled={!selectedFile || !selectedJobRole || isUploading}
          >
            {isUploading ? "Analyzing Resume..." : "Analyze Resume"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ResumeUploadForm;
