
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { BarChart3, Briefcase, FileText, Home, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const { user } = useAuth();
  
  const isCandidate = user?.role === 'candidate';
  
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col bg-white border-r border-gray-200 pt-16 transition-all duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 lg:w-20"
      )}
    >
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          <Link 
            to="/" 
            className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
          >
            <Home className="h-5 w-5 text-gray-500" />
            {isOpen && <span className="ml-3">Dashboard</span>}
          </Link>
          
          {isCandidate ? (
            <>
              <Link 
                to="/resume-upload" 
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <FileText className="h-5 w-5 text-gray-500" />
                {isOpen && <span className="ml-3">Upload Resume</span>}
              </Link>
              
              <Link 
                to="/job-roles" 
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Briefcase className="h-5 w-5 text-gray-500" />
                {isOpen && <span className="ml-3">Job Roles</span>}
              </Link>
              
              <Link 
                to="/my-analyses" 
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <BarChart3 className="h-5 w-5 text-gray-500" />
                {isOpen && <span className="ml-3">My Analyses</span>}
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/candidates" 
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Users className="h-5 w-5 text-gray-500" />
                {isOpen && <span className="ml-3">Candidates</span>}
              </Link>
              
              <Link 
                to="/job-roles" 
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <Briefcase className="h-5 w-5 text-gray-500" />
                {isOpen && <span className="ml-3">Job Roles</span>}
              </Link>
              
              <Link 
                to="/resume-database" 
                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <FileText className="h-5 w-5 text-gray-500" />
                {isOpen && <span className="ml-3">Resume Database</span>}
              </Link>
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
