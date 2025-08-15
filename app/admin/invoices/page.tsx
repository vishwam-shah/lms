'use client'
import React from 'react'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import { AdminProvider } from '@/app/components/Admin/AdminContext'
import AdminLayout from '@/app/components/Admin/AdminLayout'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <AdminProtected>
         <Heading title="ELearning - Admin" description="ELearning is a platform for students" keywords="Programming, MERN, Redux, Machine Learning" />
         <AdminProvider>
           <AdminLayout>
             <DashboardHeader/>
             <div className="mt-[120px] p-8">
                 <h1 className="text-[28px] font-Poppins text-black dark:text-white">
                     Invoices
                 </h1>
                 <div className="w-full mt-8 p-6 bg-white dark:bg-[#111C43] rounded-lg shadow-md">
                     <p className="text-[18px] text-black dark:text-white">
                         Invoices management coming soon...
                     </p>
                     <div className="mt-4">
                         <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
                             <h3 className="text-[20px] font-semibold">Total Invoices</h3>
                             <p className="text-[32px] font-bold mt-2">0</p>
                         </div>
                     </div>
                 </div>
             </div>
           </AdminLayout>
         </AdminProvider>
         </AdminProtected>
    </div>
  )
}

export default page
