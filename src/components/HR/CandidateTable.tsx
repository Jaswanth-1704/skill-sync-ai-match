
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ResumeAnalysis } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpDown, Eye, Search } from 'lucide-react';

interface CandidateTableProps {
  analyses: ResumeAnalysis[];
  jobRoles: { id: string; title: string }[];
}

const CandidateTable = ({ analyses, jobRoles }: CandidateTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobRole, setSelectedJobRole] = useState('all');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ResumeAnalysis | null;
    direction: 'ascending' | 'descending';
  }>({
    key: 'submittedAt',
    direction: 'descending',
  });

  // Filter by search term and job role
  const filteredAnalyses = analyses.filter(analysis => {
    const matchesSearch = analysis.candidateName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJobRole = selectedJobRole === 'all' || analysis.jobRoleId === selectedJobRole;
    return matchesSearch && matchesJobRole;
  });

  // Sort analyses
  const sortedAnalyses = [...filteredAnalyses].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.key === 'submittedAt') {
      return sortConfig.direction === 'ascending'
        ? new Date(aValue as string).getTime() - new Date(bValue as string).getTime()
        : new Date(bValue as string).getTime() - new Date(aValue as string).getTime();
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'ascending'
        ? aValue - bValue
        : bValue - aValue;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'ascending'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const requestSort = (key: keyof ResumeAnalysis) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'ascending'
        ? 'descending'
        : 'ascending',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Candidate Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="w-full md:w-72">
            <Select value={selectedJobRole} onValueChange={setSelectedJobRole}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by job role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Job Roles</SelectItem>
                {jobRoles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => requestSort('candidateName')} className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center">
                    Candidate
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead onClick={() => requestSort('jobRoleTitle')} className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center">
                    Position
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead onClick={() => requestSort('matchPercentage')} className="cursor-pointer hover:bg-gray-50 text-right">
                  <div className="flex items-center justify-end">
                    Match %
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead onClick={() => requestSort('submittedAt')} className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAnalyses.length > 0 ? (
                sortedAnalyses.map((analysis) => (
                  <TableRow key={analysis.id}>
                    <TableCell className="font-medium">{analysis.candidateName}</TableCell>
                    <TableCell>{analysis.jobRoleTitle}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={getScoreColor(analysis.matchPercentage)}>
                        {analysis.matchPercentage}%
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(analysis.submittedAt)}</TableCell>
                    <TableCell>
                      <Link to={`/analysis/${analysis.id}`}>
                        <Button variant="ghost" size="sm" className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No submissions match your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateTable;
