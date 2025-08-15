'use client'
import React, { FC } from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import { FiLock } from 'react-icons/fi'

type Props = {
  active: number;
  setActive: (active: number) => void;
  canProceed?: boolean;
}

const CourseOptions: FC<Props> = ({ active, setActive, canProceed = true }) => {

  const options = [
    { title: "Course Information", description: "Basic course details" },
    { title: "Course Data", description: "Benefits & prerequisites" },
    { title: "Course Content", description: "Videos & materials" }, 
    { title: "Course Preview", description: "Review & publish" },
  ]

  const handleStepClick = (index: number) => {
    // Allow clicking on previous steps or current step
    if (index <= active || (index === active + 1 && canProceed)) {
      setActive(index);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Course Creation</h3>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((active + 1) / options.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Step {active + 1} of {options.length}
        </p>
      </div>

      <div className="space-y-4">
        {options.map((option, index) => {
          const isCompleted = active > index;
          const isCurrent = active === index;
          const isAccessible = index <= active || (index === active + 1 && canProceed);
          const isLocked = !isAccessible;

          return (
            <div 
              key={index} 
              className={`
                relative flex items-start p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                ${isCurrent ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}
                ${isCompleted ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}
                ${!isCurrent && !isCompleted ? 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500' : ''}
                ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
              `}
              onClick={() => handleStepClick(index)}
            >
              <div className={`
                flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm
                ${isCompleted ? 'bg-green-500' : ''}
                ${isCurrent ? 'bg-blue-500' : ''}
                ${!isCurrent && !isCompleted ? 'bg-gray-300 dark:bg-gray-600' : ''}
              `}>
                {isCompleted ? (
                  <IoMdCheckmark className='text-white text-lg' />
                ) : isLocked && index > active ? (
                  <FiLock className='text-white text-sm' />
                ) : (
                  <span className='text-white font-bold text-sm'>{index + 1}</span>
                )}
              </div>

              <div className="ml-4 flex-1">
                <h5 className={`
                  font-semibold leading-tight
                  ${isCurrent ? 'text-blue-700 dark:text-blue-300' : ''}
                  ${isCompleted ? 'text-green-700 dark:text-green-300' : ''}
                  ${!isCurrent && !isCompleted ? 'text-gray-700 dark:text-gray-300' : ''}
                `}>
                  {option.title}
                </h5>
                <p className={`
                  text-sm mt-1
                  ${isCurrent ? 'text-blue-600 dark:text-blue-400' : ''}
                  ${isCompleted ? 'text-green-600 dark:text-green-400' : ''}
                  ${!isCurrent && !isCompleted ? 'text-gray-500 dark:text-gray-400' : ''}
                `}>
                  {option.description}
                </p>
              </div>

              {/* Connection line */}
              {index !== options.length - 1 && (
                <div className={`
                  absolute left-9 top-14 w-0.5 h-8 transition-colors duration-200
                  ${isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}
                `} />
              )}
            </div>
          )
        })}
      </div>

      {/* Tips section */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Tips</h4>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Fill all required fields to proceed</li>
          <li>• You can go back to edit previous steps</li>
          <li>• Preview your course before publishing</li>
        </ul>
      </div>
    </div>
  )
}

export default CourseOptions