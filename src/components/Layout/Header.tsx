
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <button 
            className="p-2 rounded-md lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center ml-4 lg:ml-0">
            <div className="bg-brand-500 text-white p-1 rounded-md">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18"></path>
                <path d="M8 9h8"></path>
                <path d="M8 15h8"></path>
              </svg>
            </div>
            <h1 className="ml-2 text-xl font-semibold text-gray-900">SkillSync</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center text-sm text-gray-600">
            Welcome, {user?.name}
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <div className="relative">
            <button
              className="flex items-center focus:outline-none"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-medium">
                {user?.name.charAt(0)}
              </div>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
