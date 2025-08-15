'use client'
import React from 'react'
import AdminProtected from '@/app/hooks/adminProtected'
import AllCourses from '@/app/components/Admin/Course/AllCourses'
import Heading from '@/app/utils/Heading'
import { AdminProvider } from '@/app/components/Admin/AdminContext'
import AdminLayout from '@/app/components/Admin/AdminLayout'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <AdminProtected>
         <Heading title="E-Learning - Admin" description="E-Learning is a platform for students" keywords="Programming, MERN, Redux, Machine Learning" />
         <AdminProvider>
            <AdminLayout>
                <AllCourses/>
            </AdminLayout>
         </AdminProvider>
         </AdminProtected>
    </div>
  )
}

export default page