'use client'
import React, { useState } from 'react'
import { useGetSingleCourseQuery } from '@/redux/features/courses/coursesApi'
import Loader from '@/app/components/Loader/Loader'
import Heading from '@/app/utils/Heading'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import CourseDetails from '@/app/components/Course/CourseDetails'

type Props = {
  id: string
}

const CourseDetailsClient = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");
  
  const { data, isLoading, error } = useGetSingleCourseQuery(id);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Course Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400">The course you're looking for doesn't exist.</p>
          </div>
        </div>
      ) : (
        <div>
          <Heading
            title={`${data?.course?.name} - E-Learning`}
            description={data?.course?.description || "Course details"}
            keywords={data?.course?.tags || "course, learning"}
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
            route={route}
            setRoute={setRoute}
          />
          <CourseDetails
            data={data?.course}
            setRoute={setRoute}
            setOpen={setOpen}
          />
          <Footer />
        </div>
      )}
    </>
  )
}

export default CourseDetailsClient
