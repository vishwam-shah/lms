'use client'
import React from 'react'
import Heading from "../../utils/Heading";
import DashboardHeader from "../../components/Admin/DashboardHeader"
import EditFaq from "../../components/Admin/Customization/EditFaq"
import AdminProtected from '../../hooks/adminProtected';
import { AdminProvider } from '../../components/Admin/AdminContext';
import AdminLayout from '../../components/Admin/AdminLayout';

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading title="FAQ Management - E-Learning" description="Manage frequently asked questions" keywords="FAQ, Admin, E-Learning" />
        <AdminProvider>
          <AdminLayout showHero={false}>
            <DashboardHeader/>
            <EditFaq/>
          </AdminLayout>
        </AdminProvider>
      </AdminProtected>
    </div>
  )
}

export default page