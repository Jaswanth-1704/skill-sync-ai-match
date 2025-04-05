
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <main 
        className="lg:pl-64 pt-16 min-h-screen transition-all duration-300" 
        style={{ 
          paddingLeft: sidebarOpen ? (window.innerWidth >= 1024 ? '16rem' : '0') : (window.innerWidth >= 1024 ? '5rem' : '0')
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
