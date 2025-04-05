
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const { user } = useAuth();
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const getMainPaddingLeft = () => {
    if (windowWidth >= 1024) {
      return sidebarOpen ? '16rem' : '5rem';
    }
    return '0';
  };
  
  if (!user) {
    return <Outlet />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <main 
        className="lg:pl-64 pt-16 min-h-screen transition-all duration-300" 
        style={{ paddingLeft: getMainPaddingLeft() }}
      >
        <div className="px-8 sm:px-10 lg:px-12 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
