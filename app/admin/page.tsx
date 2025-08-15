'use client'
import React, { useEffect } from 'react'
import AdminDashboard from "../components/Admin/AdminDashboard";
import Heading from "../utils/Heading";
import DashboardHeader from "../components/Admin/DashboardHeader"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import AdminProtected from '../hooks/adminProtected';
import { AdminProvider } from '../components/Admin/AdminContext';
import AdminLayout from '../components/Admin/AdminLayout';

type Props = {}

const Page = (props: Props) => {
  // Force refresh user data when admin page loads to get updated role
  const { refetch } = useLoadUserQuery({}, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    // Refresh user data when component mounts to ensure we have latest role
    refetch();
  }, [refetch]);
  
  return (
    <div>
      <AdminProtected>
         <Heading title="ELearning - Admin Dashboard" description="ELearning is a platform for students" keywords="Programming, MERN, Redux, Machine Learning" />
         <AdminProvider>
            <AdminLayout showHero={false}>
                <DashboardHeader/>
                <AdminDashboard/>
            </AdminLayout>
         </AdminProvider>
      </AdminProtected>
    </div>
  )
}

export default Page