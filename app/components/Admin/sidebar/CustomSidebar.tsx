'use client'
import React, { FC, ReactNode, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface SidebarProps {
  collapsed: boolean;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  width?: string;
  collapsedWidth?: string;
}

interface MenuProps {
  children: ReactNode;
  iconShape?: string;
  className?: string;
}

interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
}

interface SubMenuProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

// Custom Sidebar Component
export const ProSidebar: FC<SidebarProps> = ({ 
  collapsed, 
  children, 
  className = '', 
  style, 
  width = '16rem', 
  collapsedWidth = '5rem',
  ...props 
}) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  return (
    <div 
      className={`
        ${className}
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-20' : 'w-64'}
        h-full relative z-10
      `}
      style={{ 
        width: collapsed ? collapsedWidth : width,
        ...style 
      }}
      {...props}
    >
      <div className="pro-sidebar-inner h-full overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

// Custom Menu Component
export const Menu: FC<MenuProps> = ({ children, iconShape, className = '' }) => {
  return (
    <nav className={`menu-container h-full py-2 ${className}`}>
      <div className="space-y-1">
        {children}
      </div>
    </nav>
  );
};

// Custom MenuItem Component
export const MenuItem: FC<MenuItemProps> = ({ 
  children, 
  onClick, 
  className = '', 
  style, 
  active = false,
  disabled = false,
  tooltip,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`
        pro-menu-item relative group
        transition-all duration-200 ease-in-out
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${active ? 'active' : ''}
        ${className}
      `}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={style}
      {...props}
    >
      <div className="pro-inner-item flex items-center relative">
        {children}
      </div>
      
      {/* Tooltip for collapsed state */}
      {tooltip && isHovered && (
        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 z-50 pointer-events-none">
          <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-1 rounded-md text-sm whitespace-nowrap shadow-lg">
            {tooltip}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900 dark:border-r-gray-100" />
          </div>
        </div>
      )}
    </div>
  );
};

// SubMenu Component for nested navigation
export const SubMenu: FC<SubMenuProps> = ({ 
  title, 
  icon, 
  children, 
  defaultOpen = false,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`sub-menu ${className}`}>
      <div 
        className="sub-menu-header cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg mx-2 mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {icon && <div className="w-5 h-5 text-gray-500 dark:text-gray-400">{icon}</div>}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {title}
            </span>
          </div>
          <div className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className={`
        sub-menu-content transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="ml-6 border-l border-gray-200 dark:border-gray-600 pl-4 pb-2">
          {children}
        </div>
      </div>
    </div>
  );
};

// Icon wrapper for consistency
export const ProIconWrapper: FC<{ 
  children: ReactNode; 
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ children, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={`pro-icon-wrapper flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
};

// Sidebar Header Component
export const SidebarHeader: FC<{
  children: ReactNode;
  className?: string;
  collapsed?: boolean;
}> = ({ children, className = '', collapsed = false }) => {
  return (
    <div className={`
      sidebar-header border-b border-gray-200 dark:border-gray-700 
      ${collapsed ? 'px-2 py-4' : 'px-4 py-6'}
      transition-all duration-300
      ${className}
    `}>
      {children}
    </div>
  );
};

// Sidebar Footer Component
export const SidebarFooter: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`
      sidebar-footer border-t border-gray-200 dark:border-gray-700 
      px-4 py-4 mt-auto
      ${className}
    `}>
      {children}
    </div>
  );
};
