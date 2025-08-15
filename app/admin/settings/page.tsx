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
                     Settings
                 </h1>
                 <div className="w-full mt-8 space-y-6">
                     {/* General Settings */}
                     <div className="p-6 bg-white dark:bg-[#111C43] rounded-lg shadow-md">
                         <h2 className="text-[20px] font-medium text-black dark:text-white mb-4">
                             General Settings
                         </h2>
                         <div className="space-y-4">
                             <div>
                                 <label className="block text-[16px] font-medium text-black dark:text-white mb-2">
                                     Site Name
                                 </label>
                                 <input 
                                     type="text"
                                     defaultValue="ELearning"
                                     className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1a1a2e] text-black dark:text-white"
                                 />
                             </div>
                             <div>
                                 <label className="block text-[16px] font-medium text-black dark:text-white mb-2">
                                     Site Description
                                 </label>
                                 <textarea 
                                     defaultValue="ELearning is a platform for students"
                                     className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1a1a2e] text-black dark:text-white h-24"
                                 />
                             </div>
                         </div>
                     </div>

                     {/* Email Settings */}
                     <div className="p-6 bg-white dark:bg-[#111C43] rounded-lg shadow-md">
                         <h2 className="text-[20px] font-medium text-black dark:text-white mb-4">
                             Email Settings
                         </h2>
                         <div className="space-y-4">
                             <div>
                                 <label className="block text-[16px] font-medium text-black dark:text-white mb-2">
                                     SMTP Host
                                 </label>
                                 <input 
                                     type="text"
                                     className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1a1a2e] text-black dark:text-white"
                                     placeholder="smtp.gmail.com"
                                 />
                             </div>
                             <div>
                                 <label className="block text-[16px] font-medium text-black dark:text-white mb-2">
                                     SMTP Port
                                 </label>
                                 <input 
                                     type="number"
                                     className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1a1a2e] text-black dark:text-white"
                                     placeholder="465"
                                 />
                             </div>
                         </div>
                     </div>

                     <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
                         Save All Settings
                     </button>
                 </div>
             </div>
           </AdminLayout>
         </AdminProvider>
         </AdminProtected>
    </div>
  )
}

export default page
