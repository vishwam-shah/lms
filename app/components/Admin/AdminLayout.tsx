'use client'
import React, { FC, ReactNode, useState, useEffect } from 'react';
import AdminSidebar from './sidebar/AdminSidebar';
import DashboardHero from './DashboardHero';
import { useAdminContext } from './AdminContext';

interface Props {
  children: ReactNode;
  showHero?: boolean;
}

const AdminLayout: FC<Props> = ({ children, showHero = true }) => {
  const { isCollapsed } = useAdminContext();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-[280px] fixed left-0 top-0 h-full z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
        <div className="flex-1 ml-[280px]">
          <div className="p-1 lg:p-2">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - optimized for immediate rendering */}
      <div 
        className={`${isCollapsed ? 'w-[80px]' : 'w-[280px]'} fixed left-0 top-0 h-full z-50 transition-all duration-300`}
        style={{
          opacity: 1,
          visibility: 'visible',
          transform: 'translateX(0)',
        }}
      >
        <AdminSidebar />
      </div>
      
      {/* Main Content */}
      <div className={`flex-1 ${isCollapsed ? 'ml-[80px]' : 'ml-[280px]'} transition-all duration-300`}>
        <div className="min-h-screen">
          {showHero && <DashboardHero />}
          <div className="p-1 lg:p-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
