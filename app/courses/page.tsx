'use client'
import React, { useState } from 'react';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import { useGetCoursesUserQuery } from '@/redux/features/courses/coursesApi';
import CourseCard from '../components/Course/CourseCard';
import Loader from '../components/Loader/Loader';

const Courses = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1); // Courses is item 1 in nav
  const [route, setRoute] = useState("Login");
  
  const { data, isLoading, error } = useGetCoursesUserQuery({});

  return (
    <div>
      <Heading 
        title="Courses - E-Learning" 
        description="Browse our collection of courses" 
        keywords="Courses, Programming, MERN, Redux, Machine Learning" 
      />
      <Header
        open={open} 
        setOpen={setOpen} 
        activeItem={activeItem} 
        setRoute={setRoute} 
        route={route}
      />
      
      <div className="min-h-screen pt-[100px] pb-[50px]">
        <div className="w-[90%] 800px:w-[80%] m-auto">
          <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
            Expand Your Career <span className="text-gradient">Opportunity</span>
            <br />
            With Our Courses
          </h1>
          <p className="text-center text-[#000] dark:text-[#edfff4] text-[18px] 1000px:!w-[55%] 1100px:!w-[78%] 1200px:!w-[65%] 1300px:!w-[60%] 1500px:!w-[60%] mx-auto mt-[30px]">
            Discover a world of knowledge with our comprehensive courses designed to help you achieve your goals.
          </p>
          
          <br />
          <br />
          
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="text-center">
              <p className="text-red-500 text-xl">Error loading courses. Please try again later.</p>
            </div>
          ) : data?.courses && data.courses.length > 0 ? (
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {data.courses.map((course: any, index: number) => (
                <CourseCard 
                  course={course} 
                  key={index} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
                <div className="text-6xl mb-4">🚀</div>
                <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                  Courses Coming Soon
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  We&apos;re working hard to bring you amazing courses. Stay tuned for exciting content!
                </p>
                <div className="flex justify-center">
                  <div className="animate-pulse flex space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
