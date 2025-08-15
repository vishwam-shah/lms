'use client'
import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Ratings from '../../utils/Ratings';

type Props = {
  course: any;
}

const CourseCard: FC<Props> = ({ course }) => {
  return (
    <Link href={`/course/${course._id}`}>
      <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
        <div className="relative">
          <Image
            src={course.thumbnail?.url || '/default-course.jpg'}
            width={500}
            height={300}
            objectFit="contain"
            className="rounded w-full h-[200px] object-cover"
            alt={course.name}
          />
          {course.estimatedPrice && course.price !== course.estimatedPrice && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
              {Math.round(((course.estimatedPrice - course.price) / course.estimatedPrice) * 100)}% OFF
            </div>
          )}
        </div>
        
        <br />
        
        <h1 className="font-Poppins text-[16px] text-black dark:text-[#fff] font-semibold line-clamp-2">
          {course.name}
        </h1>
        
        <div className="w-full flex items-center justify-between pt-2">
          <Ratings rating={course.ratings || 0} />
          <h5 className={`text-black dark:text-[#fff] text-[14px] ${course.purchased === 0 ? "text-[#d3d3d3] dark:text-[#ffffff83]" : ""}`}>
            {course.purchased} Student{course.purchased !== 1 ? 's' : ''}
          </h5>
        </div>
        
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <h3 className="text-black dark:text-[#fff] text-[20px] font-semibold">
              {course.price === 0 ? "Free" : `$${course.price}`}
            </h3>
            {course.estimatedPrice && course.price !== course.estimatedPrice && (
              <h5 className="text-[14px] text-[#d3d3d3] dark:text-[#ffffff83] line-through">
                ${course.estimatedPrice}
              </h5>
            )}
          </div>
          
          <div className="flex items-center">
            <div className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors">
              View Course
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <p className="text-[#000] dark:text-[#ffffff83] text-[14px] line-clamp-2">
            {course.description}
          </p>
        </div>
        
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[12px] text-[#000] dark:text-[#ffffff83]">
            <span>⏱️</span>
            <span>{course.courseData?.length || 0} Lesson{(course.courseData?.length || 0) !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-[#000] dark:text-[#ffffff83]">
            <span>📊</span>
            <span>{course.level}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
