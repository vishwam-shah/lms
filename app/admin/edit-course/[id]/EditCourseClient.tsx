'use client'
import React from 'react'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from "../../../utils/Heading";
import DashboardHeader from "../../../components/Admin/DashboardHeader"
import EditCourse from '@/app/components/Admin/Course/EditCourse';
import { AdminProvider } from '@/app/components/Admin/AdminContext'
import AdminLayout from '@/app/components/Admin/AdminLayout'

type Props = {
  id: string
}

const EditCourseClient = ({ id }: Props) => {
  return (
    <div>
      <AdminProtected>
         <Heading title="E-Learning - Admin" description="E-Learning is a platform for students" keywords="Programming, MERN, Redux, Machine Learning" />
         <AdminProvider>
           <AdminLayout>
             <DashboardHeader/>
             <EditCourse id={id}/>
           </AdminLayout>
         </AdminProvider>
      </AdminProtected>
    </div>
  )
}

export default EditCourseClient
