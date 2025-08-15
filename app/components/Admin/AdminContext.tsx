'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  // Initialize with consistent default value to prevent hydration mismatch
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Set initial state based on screen size after mount
    if (window.innerWidth < 1024) {
      setIsCollapsed(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Auto-collapse sidebar on mobile/tablet screens
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [mounted]);

  return (
    <AdminContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </AdminContext.Provider>
  );
};
