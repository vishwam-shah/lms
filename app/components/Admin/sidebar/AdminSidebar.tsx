'use client'
import React, { FC, useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { 
  BarChartOutlinedIcon, GroupsIcon, ManageHistoryIcon, OndemandVideoIcon, 
  PeopleOutlinedIcon, QuizIcon, RecieptOutlinedIcon, SettingsIcon, VideoCallIcon, 
  WebIcon, WysiwygIcon, ExitToAppIcon, HomeOutlinedIcon 
} from './icons';
import { useAdminContext } from '../AdminContext';
import { getAvatarUrlString } from '../../../utils/avatarUtils';

// Types
interface MenuItem {
  title: string;
  to: string;
  icon: JSX.Element;
  badge?: number;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

// Simplified NavItem Component
const NavItem: FC<{
  item: MenuItem;
  isActive: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}> = ({ item, isActive, onClick, isCollapsed }) => {
  const content = (
    <Link href={item.to} onClick={onClick} className="block">
      <div className={`
        flex items-center px-3 py-3 mx-2 mb-1 rounded-xl transition-all duration-200 cursor-pointer
        ${isActive 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
        }
        ${isCollapsed ? 'justify-center' : ''}
      `}>
        <div className={`
          flex-shrink-0 transition-colors duration-200
          ${isActive ? 'text-white' : ''}
          ${isCollapsed ? '' : 'mr-3'}
        `}>
          {item.icon}
        </div>
        
        {!isCollapsed && (
          <>
            <span className="text-sm font-medium truncate flex-1">
              {item.title}
            </span>
            
            {item.badge && item.badge > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                {item.badge}
              </span>
            )}
          </>
        )}
      </div>
    </Link>
  );

  // Add tooltip when collapsed
  if (isCollapsed) {
    return (
      <div title={item.title}>
        {content}
      </div>
    );
  }

  return content;
};

// Simplified Section Component
const MenuSectionComponent: FC<{
  section: MenuSection;
  activeItem: string;
  setActiveItem: (item: string) => void;
  isCollapsed: boolean;
}> = ({ section, activeItem, setActiveItem, isCollapsed }) => {
  return (
    <div className="mb-6">
      {!isCollapsed && (
        <div className="px-3 mb-2">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            {section.title}
          </p>
        </div>
      )}
      <div>
        {section.items.map((item) => (
          <NavItem
            key={item.title}
            item={item}
            isActive={activeItem === item.title}
            onClick={() => setActiveItem(item.title)}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
    </div>
  );
};

const AdminSidebar: FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { isCollapsed, setIsCollapsed } = useAdminContext();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed, setIsCollapsed]);

  const menuSections: MenuSection[] = useMemo(() => [
    {
      title: "Main",
      items: [
        { title: 'Dashboard', to: "/admin", icon: <HomeOutlinedIcon /> }
      ]
    },
    {
      title: "Content",
      items: [
        { title: 'Create Course', to: "/admin/create-course", icon: <VideoCallIcon /> },
        { title: 'Live Courses', to: "/admin/courses", icon: <OndemandVideoIcon /> }
      ]
    },
    {
      title: "Users",
      items: [
        { title: 'Users', to: "/admin/users", icon: <GroupsIcon /> },
        { title: 'Invoices', to: "/admin/invoices", icon: <RecieptOutlinedIcon /> },
        { title: 'Team', to: "/admin/team", icon: <PeopleOutlinedIcon /> }
      ]
    },
    {
      title: "Analytics",
      items: [
        { title: 'Orders Analytics', to: "/admin/orders-analytics", icon: <BarChartOutlinedIcon /> },
        { title: 'Users Analytics', to: "/admin/users-analytics", icon: <BarChartOutlinedIcon /> },
        { title: 'Courses Analytics', to: "/admin/course-analytics", icon: <BarChartOutlinedIcon /> }
      ]
    },
    {
      title: "Customization",
      items: [
        { title: 'Hero Section', to: "/admin/hero", icon: <WebIcon /> },
        { title: 'FAQ', to: "/admin/faq", icon: <QuizIcon /> },
        { title: 'Categories', to: "/admin/categories", icon: <WysiwygIcon /> }
      ]
    }
  ], []);

  if (!mounted) {
    return (
      <div className="w-[280px] fixed left-0 top-0 h-full z-50 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`
      fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-in-out flex flex-col
      ${isCollapsed ? 'w-16' : 'w-64'}
      bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg
    `}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        {!isCollapsed ? (
          <>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">LMS Admin</span>
            </Link>
            <button
              onClick={handleToggleSidebar}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-pointer transition-colors"
              title="Collapse sidebar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </>
        ) : (
          <button
            onClick={handleToggleSidebar}
            className="w-8 h-8 mx-auto bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
            title="Expand sidebar"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* User Profile */}
      <div className={`p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 ${isCollapsed ? 'px-2' : ''}`}>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              {user?.avatar ? (
                <Image
                  src={getAvatarUrlString(user)}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
          </div>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 dark:text-white truncate">
                {user?.name || 'Admin'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Administrator
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
        <div className="py-4">
          {menuSections.map((section) => (
            <MenuSectionComponent
              key={section.title}
              section={section}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
        <NavItem
          item={{ title: 'Settings', to: "/admin/settings", icon: <SettingsIcon /> }}
          isActive={activeItem === 'Settings'}
          onClick={() => setActiveItem('Settings')}
          isCollapsed={isCollapsed}
        />
        <button
          className={`
            w-full flex items-center px-3 py-3 mx-2 mb-1 rounded-xl transition-all duration-200 cursor-pointer
            text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300
            ${isCollapsed ? 'justify-center' : ''}
          `}
          title={isCollapsed ? "Logout" : ""}
        >
          <ExitToAppIcon className={`flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
          {!isCollapsed && (
            <span className="text-sm font-medium">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
