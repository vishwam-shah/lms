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
            <AdminLayout showHero={false}>
                <DashboardHeader/>
                <div className="mt-[120px] p-8">
                    <h1 className="text-[28px] font-Poppins text-black dark:text-white">
                        Categories
                    </h1>
                    <div className="w-full mt-8 p-6 bg-white dark:bg-[#111C43] rounded-lg shadow-md">
                        <p className="text-[18px] text-black dark:text-white mb-6">
                            Manage course categories
                        </p>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[16px] font-medium text-black dark:text-white mb-2">
                                    Category Name
                                </label>
                                <input 
                                    type="text"
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1a1a2e] text-black dark:text-white"
                                    placeholder="Enter category name"
                                />
                            </div>
                            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium">
                                Add Category
                            </button>
                            <div className="mt-6">
                                <h3 className="text-[20px] font-medium text-black dark:text-white mb-4">
                                    Existing Categories
                                </h3>
                                <div className="bg-gray-50 dark:bg-[#1a1a2e] p-4 rounded-lg">
                                    <p className="text-gray-500 dark:text-gray-400">No categories found</p>
                                </div>
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
