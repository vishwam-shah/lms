'use client'
import React from 'react'
import AdminProtected from '@/app/hooks/adminProtected'
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import Heading from "../../utils/Heading";
import DashboardHeader from "../../components/Admin/DashboardHeader"
import { AdminProvider } from '../../components/Admin/AdminContext';
import AdminLayout from '../../components/Admin/AdminLayout';

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
         <Heading title="E-Learning - Admin" description="E-Learning is a platform for students" keywords="Programming, MERN, Redux, Machine Learning" />
         <AdminProvider>
            <AdminLayout showHero={false}>
                <DashboardHeader/>
                <CreateCourse/>
            </AdminLayout>
         </AdminProvider>
      </AdminProtected>
    </div>
  )
}

export default page