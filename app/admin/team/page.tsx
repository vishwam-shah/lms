'use client'
import React from 'react'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import AllUsers from '@/app/components/Admin/Users/AllUsers'
import { AdminProvider } from '@/app/components/Admin/AdminContext'
import AdminLayout from '@/app/components/Admin/AdminLayout'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <AdminProtected>
         <Heading title="E-Learning - Team Management" description="Manage your admin team members" keywords="Admin, Team, Management" />
         <AdminProvider>
            <AdminLayout>
                <AllUsers isTeam={true}/>
            </AdminLayout>
         </AdminProvider>
         </AdminProtected>
    </div>
  )
}

export default page