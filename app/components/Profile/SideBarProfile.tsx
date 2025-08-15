'use client'
import Image from 'next/image';
import React, { FC } from 'react'
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import Link from 'next/link';
import { getAvatarUrl } from '../../utils/avatarUtils';

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;

}

const SideBarProfile: FC<Props> = ({ user, active, setActive, avatar, logOutHandler }) => {
  return (
    <div className='w-full dark:text-white text-black'>
      <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? " dark:bg-slate-800 bg-white" : "bg-transparent"}`} onClick={() => setActive(1)}>

        <Image 
          src={getAvatarUrl(user, avatar || undefined)} 
          alt="User Avatar" 
          width={20} 
          height={20} 
          className='w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full object-cover' 
        />

        <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
          My Account
        </h5>
        </div>
        <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`} onClick={() => setActive(2)}>
            <RiLockPasswordLine size={20} fill='#fff'/>
            <h5 className='pl-2 800px:block hidden'>Change Password</h5>

        </div>
        <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`} onClick={() => setActive(3)}>
            <SiCoursera size={20} fill='#fff'/>
            <h5 className='pl-2 800px:block hidden'>Enrolled Courses</h5>

        </div>
        {
          user.role === "admin" && (
            <Link className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`} href={"/admin"}>

            <MdOutlineAdminPanelSettings size={20} fill='#fff'/>
            <h5 className='pl-2 800px:block hidden'>Admin Dashboard</h5>

        </Link>
          )
        }
        <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`} onClick={() => logOutHandler()}>
            <AiOutlineLogout size={20} fill='#fff'/>
            <h5 className='pl-2 800px:block hidden'>Logout</h5>

        </div>
    </div>
  )
}

export default SideBarProfile