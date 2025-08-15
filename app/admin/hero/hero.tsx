'use client'
import React from 'react'
import Heading from '../../utils/Heading'
import AdminProtected from "../../hooks/adminProtected";
import DashboardHero from "../../components/Admin/DashboardHero";
import EditHero from "../../components/Admin/Customization/EditHero"
import { AdminProvider } from '../../components/Admin/AdminContext'
import AdminLayout from '../../components/Admin/AdminLayout'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <AdminProtected>
            <Heading title='E-Learning - Admin'
            description='E-Learning is a platform for students to learn and get help from teachers'
            keywords="Programming, MERN, Redux, Machine Learning"/>
            <AdminProvider>
                <AdminLayout showHero={true}>
                    <EditHero/>
                </AdminLayout>
            </AdminProvider>
        </AdminProtected>
    </div>
  )
}

export default page