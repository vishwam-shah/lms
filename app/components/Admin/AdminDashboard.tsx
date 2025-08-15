'use client'
import React, { FC } from 'react'
import { useGetAllUsersQuery } from '@/redux/features/user/userApi'

type Props = {}

const AdminDashboard: FC<Props> = (props: Props) => {
  const { data: usersData } = useGetAllUsersQuery({});

  return (
    <div className="mt-[120px] p-8">
      <h1 className="text-[28px] font-Poppins text-black dark:text-white mb-8">
        Admin Dashboard
      </h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <h3 className="text-[18px] font-semibold">Total Users</h3>
          <p className="text-[32px] font-bold mt-2">
            {usersData?.users?.length || 0}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <h3 className="text-[18px] font-semibold">Total Courses</h3>
          <p className="text-[32px] font-bold mt-2">0</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <h3 className="text-[18px] font-semibold">Total Orders</h3>
          <p className="text-[32px] font-bold mt-2">0</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
          <h3 className="text-[18px] font-semibold">Revenue</h3>
          <p className="text-[32px] font-bold mt-2">$0</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#111C43] p-6 rounded-lg shadow-md">
          <h2 className="text-[20px] font-Poppins text-black dark:text-white mb-4">
            Recent Users
          </h2>
          <div className="space-y-3">
            {usersData?.users?.slice(0, 5).map((user: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1a1a2e] rounded-lg">
                <div>
                  <p className="text-[16px] font-medium text-black dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-[14px] text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                  user.role === 'admin' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                }`}>
                  {user.role}
                </span>
              </div>
            )) || (
              <p className="text-gray-500 dark:text-gray-400">No users found</p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-[#111C43] p-6 rounded-lg shadow-md">
          <h2 className="text-[20px] font-Poppins text-black dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
              Create New Course
            </button>
            <button className="w-full p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors">
              View All Users
            </button>
            <button className="w-full p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors">
              Analytics Dashboard
            </button>
            <button className="w-full p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
              Platform Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
