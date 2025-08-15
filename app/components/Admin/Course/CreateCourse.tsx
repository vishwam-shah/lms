'use client'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import CourseInformation from './Courseinformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import { useCreateCourseMutation } from '@/redux/features/courses/coursesApi';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';


type Props = {}

// Type definitions for better type safety
interface CourseInfo {
    name: string;
    description: string;
    price: string;
    estimatedPrice: string;
    tags: string;
    level: string;
    demoUrl: string;
    thumbnail: string;
}

interface Benefit {
    title: string;
}

interface Prerequisite {
    title: string;
}

interface CourseContentItem {
    videoUrl: string;
    title: string;
    description: string;
    videoSection: string;
    links: Array<{
        title: string;
        url: string;
    }>;
    suggestion: string;
}

interface CourseDataType {
    name: string;
    description: string;
    price: number;
    estimatedPrice: number;
    tags: string;
    thumbnail: string;
    level: string;
    demoUrl: string;
    totalVideos: number;
    benefits: Benefit[];
    prerequisites: Prerequisite[];
    courseData: CourseContentItem[];
}

const CreateCourse = (props: Props) => {
    const [createCourse, { isLoading, isSuccess, error }] = useCreateCourseMutation();
    
    // Effect for handling API responses
    useEffect(() => {
        if (isSuccess) {
            toast.success("Course Created Successfully", {
                duration: 4000,
                style: {
                    background: '#10B981',
                    color: '#FFFFFF',
                },
            });
            redirect("/admin/courses");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message || "Failed to create course", {
                    duration: 4000,
                    style: {
                        background: '#EF4444',
                        color: '#FFFFFF',
                    },
                });
            }
        }
    }, [isLoading, isSuccess, error])
    
    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState<CourseInfo>({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: "",
    });

    const [benefits, setBenefits] = useState<Benefit[]>([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState<Prerequisite[]>([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState<CourseContentItem[]>([{
        videoUrl: "",
        title: "",
        description: "",
        videoSection: "Untitled Section",
        links: [
            {
                title: "",
                url: "",
            },
        ],
        suggestion: "",
    }]);

    const [courseData, setCourseData] = useState<CourseDataType | null>(null);

    // Validation functions
    const validateCourseInfo = useCallback((): boolean => {
        const requiredFields = ['name', 'description', 'price', 'tags', 'level', 'demoUrl'];
        const missingFields = requiredFields.filter(field => !courseInfo[field as keyof CourseInfo]);
        
        if (missingFields.length > 0) {
            toast.error(`Please fill in: ${missingFields.join(', ')}`);
            return false;
        }
        
        if (isNaN(Number(courseInfo.price)) || Number(courseInfo.price) < 0) {
            toast.error("Please enter a valid price");
            return false;
        }

        if (!courseInfo.thumbnail) {
            toast.error("Please upload a course thumbnail");
            return false;
        }
        
        return true;
    }, [courseInfo]);

    const validateBenefitsAndPrerequisites = useCallback((): boolean => {
        const validBenefits = benefits.filter(benefit => benefit.title.trim() !== '');
        const validPrerequisites = prerequisites.filter(prerequisite => prerequisite.title.trim() !== '');
        
        if (validBenefits.length === 0) {
            toast.error("Please add at least one benefit");
            return false;
        }
        
        if (validPrerequisites.length === 0) {
            toast.error("Please add at least one prerequisite");
            return false;
        }
        
        return true;
    }, [benefits, prerequisites]);

    const validateCourseContent = useCallback((): boolean => {
        const validContent = courseContentData.filter(content => 
            content.title.trim() !== '' && 
            content.description.trim() !== '' && 
            content.videoUrl.trim() !== '' &&
            content.links.some(link => link.title.trim() !== '' && link.url.trim() !== '')
        );
        
        if (validContent.length === 0) {
            toast.error("Please add at least one complete course content item");
            return false;
        }
        
        return true;
    }, [courseContentData]);

    // Memoized handlers for better performance
    const handleSubmit = useCallback(async () => {
        if (!validateCourseContent()) return;

        // Format data
        const formattedBenefits = benefits
            .filter(benefit => benefit.title.trim() !== '')
            .map(benefit => ({ title: benefit.title.trim() }));

        const formattedPrerequisites = prerequisites
            .filter(prerequisite => prerequisite.title.trim() !== '')
            .map(prerequisite => ({ title: prerequisite.title.trim() }));

        const formattedCourseContentData = courseContentData
            .filter(content => content.title.trim() !== '' && content.description.trim() !== '' && content.videoUrl.trim() !== '')
            .map(courseContent => ({
                videoUrl: courseContent.videoUrl.trim(),
                title: courseContent.title.trim(),
                description: courseContent.description.trim(),
                videoSection: courseContent.videoSection.trim(),
                links: courseContent.links.filter(link => link.title.trim() !== '' && link.url.trim() !== ''),
                suggestion: courseContent.suggestion.trim(),
            }));

        const data: CourseDataType = {
            name: courseInfo.name.trim(),
            description: courseInfo.description.trim(),
            price: Number(courseInfo.price),
            estimatedPrice: courseInfo.estimatedPrice ? Number(courseInfo.estimatedPrice) : 0,
            tags: courseInfo.tags.trim(),
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level.trim(),
            demoUrl: courseInfo.demoUrl.trim(),
            totalVideos: formattedCourseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseData: formattedCourseContentData,
        };

        setCourseData(data);
    }, [courseInfo, benefits, prerequisites, courseContentData, validateCourseContent]);

    const handleCourseCreate = useCallback(async (e: any) => {
        e?.preventDefault();
        
        if (!courseData) {
            toast.error("Course data is not ready. Please try again.");
            return;
        }

        if (!validateCourseInfo() || !validateBenefitsAndPrerequisites() || !validateCourseContent()) {
            return;
        }

        if (!isLoading) {
            try {
                await createCourse(courseData);
            } catch (error) {
                console.error("Course creation error:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    }, [courseData, isLoading, createCourse, validateCourseInfo, validateBenefitsAndPrerequisites, validateCourseContent]);

    // Memoized step validation for navigation - using dependencies instead of calling functions
    const canProceedToStep = useMemo(() => {
        switch (active) {
            case 0: {
                const requiredFields = ['name', 'description', 'price', 'tags', 'level', 'demoUrl'];
                const hasRequiredFields = requiredFields.every(field => courseInfo[field as keyof CourseInfo]);
                const hasValidPrice = !isNaN(Number(courseInfo.price)) && Number(courseInfo.price) >= 0;
                const hasThumbnail = Boolean(courseInfo.thumbnail);
                return hasRequiredFields && hasValidPrice && hasThumbnail;
            }
            case 1: {
                const validBenefits = benefits.filter(benefit => benefit.title.trim() !== '');
                const validPrerequisites = prerequisites.filter(prerequisite => prerequisite.title.trim() !== '');
                return validBenefits.length > 0 && validPrerequisites.length > 0;
            }
            case 2: {
                const validContent = courseContentData.filter(content => 
                    content.title.trim() !== '' && 
                    content.description.trim() !== '' && 
                    content.videoUrl.trim() !== '' &&
                    content.links.some(link => link.title.trim() !== '' && link.url.trim() !== '')
                );
                return validContent.length > 0;
            }
            default: return true;
        }
    }, [active, courseInfo, benefits, prerequisites, courseContentData]);

    const handleStepChange = useCallback((newStep: number) => {
        if (newStep > active && !canProceedToStep) {
            return; // Prevent moving forward if current step is invalid
        }
        setActive(newStep);
    }, [active, canProceedToStep]);

    // Loading overlay component
    const LoadingOverlay = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex items-center space-x-3">
                <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
                <span className="text-gray-800 dark:text-white font-medium">Creating your course...</span>
            </div>
        </div>
    );

    return (
        <>
            {isLoading && <LoadingOverlay />}
            <div className='w-full flex min-h-screen relative flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
                <div className='w-full lg:w-[75%] lg:pr-6'>
                    {active === 0 && (
                        <CourseInformation 
                            courseInfo={courseInfo} 
                            setCourseInfo={setCourseInfo}
                            active={active}
                            setActive={handleStepChange} 
                        />
                    )}

                    {active === 1 && (
                        <CourseData 
                            benefits={benefits} 
                            setBenefits={setBenefits} 
                            prerequisites={prerequisites} 
                            setPrerequisites={setPrerequisites}
                            active={active}
                            setActive={handleStepChange} 
                        />
                    )}

                    {active === 2 && (
                        <CourseContent 
                            active={active} 
                            setActive={handleStepChange} 
                            courseContentData={courseContentData} 
                            setCourseContentData={setCourseContentData} 
                            handleSubmit={handleSubmit} 
                        />
                    )}

                    {active === 3 && (
                        <CoursePreview 
                            active={active} 
                            setActive={handleStepChange} 
                            courseData={courseData} 
                            handleCourseCreate={handleCourseCreate} 
                            isEdit={false}
                            isLoading={isLoading}
                        />
                    )}
                </div>
                <div className='w-full lg:w-[25%] lg:pl-6 lg:sticky lg:top-[100px] lg:h-fit mb-8 lg:mb-0'>
                    <CourseOptions 
                        active={active} 
                        setActive={handleStepChange}
                        canProceed={canProceedToStep}
                    />
                </div>
            </div>
        </>
    )
}

export default CreateCourse