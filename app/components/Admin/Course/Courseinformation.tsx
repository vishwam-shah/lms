'use client'
import { styles } from "@/app/styles/style";
import Image from "next/image";
import React, { FC, useState, useCallback } from "react";
import { FiUpload, FiImage } from "react-icons/fi";
import { MdOutlineVideocam } from "react-icons/md";
import toast from 'react-hot-toast';

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
    courseInfo,
    setCourseInfo,
    active,
    setActive,
}) => {
    const [dragging, setDragging] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const validateFields = useCallback(() => {
        const requiredFields = [
            { field: 'name', label: 'Course Name' },
            { field: 'description', label: 'Course Description' },
            { field: 'price', label: 'Course Price' },
            { field: 'tags', label: 'Course Tags' },
            { field: 'level', label: 'Course Level' },
            { field: 'demoUrl', label: 'Demo URL' }
        ];

        for (const { field, label } of requiredFields) {
            if (!courseInfo[field] || courseInfo[field].trim() === '') {
                toast.error(`${label} is required`);
                return false;
            }
        }

        if (!courseInfo.thumbnail) {
            toast.error('Course thumbnail is required');
            return false;
        }

        if (isNaN(Number(courseInfo.price)) || Number(courseInfo.price) < 0) {
            toast.error('Please enter a valid price');
            return false;
        }

        if (courseInfo.estimatedPrice && (isNaN(Number(courseInfo.estimatedPrice)) || Number(courseInfo.estimatedPrice) < 0)) {
            toast.error('Please enter a valid estimated price');
            return false;
        }

        return true;
    }, [courseInfo]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validateFields()) {
            setActive(active + 1);
        }
    };

    const handleNext = () => {
        if (validateFields()) {
            setActive(active + 1);
        }
    };

    const handleFileChange = useCallback((e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('File size should be less than 5MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    const result = reader.result;
                    setCourseInfo({ ...courseInfo, thumbnail: result });
                    if (typeof result === "string" || result === null) {
                        setImagePreview(result);
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    }, [courseInfo, setCourseInfo]);

    const handleDragOver = useCallback((e: any) => {
        e.preventDefault();
        setDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: any) => {
        e.preventDefault();
        setDragging(false);
    }, []);

    const handleDrop = useCallback((e: any) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];

        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size should be less than 5MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const result = reader.result;
                setCourseInfo({ ...courseInfo, thumbnail: result });
                if (typeof result === "string" || result === null) {
                    setImagePreview(result);
                }
            };
            reader.readAsDataURL(file);
        }
    }, [courseInfo, setCourseInfo]);

    const handleInputChange = useCallback((field: string, value: string) => {
        setCourseInfo({ ...courseInfo, [field]: value });
    }, [courseInfo, setCourseInfo]);

    return (
        <div className="w-[90%] max-w-4xl m-auto mt-12 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Course Information</h2>
                    <p className="text-gray-600 dark:text-gray-300">Enter the basic information about your course</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Course Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Course Name <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            required 
                            value={courseInfo.name} 
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="e.g., Complete MERN Stack Development Course"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    {/* Course Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Course Description <span className="text-red-500">*</span>
                        </label>
                        <textarea 
                            rows={5} 
                            placeholder="Describe what students will learn in this course..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                            value={courseInfo.description} 
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                    </div>

                    {/* Price Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Course Price ($) <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="number" 
                                min="0"
                                step="0.01"
                                required 
                                value={courseInfo.price} 
                                onChange={(e) => handleInputChange('price', e.target.value)}
                                placeholder="29.99"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Original Price ($) <span className="text-gray-400">(optional)</span>
                            </label>
                            <input 
                                type="number" 
                                min="0"
                                step="0.01"
                                value={courseInfo.estimatedPrice} 
                                onChange={(e) => handleInputChange('estimatedPrice', e.target.value)}
                                placeholder="79.99"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Course Tags */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Course Tags <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            required 
                            value={courseInfo.tags} 
                            onChange={(e) => handleInputChange('tags', e.target.value)}
                            placeholder="React, Node.js, MongoDB, JavaScript"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">Separate tags with commas</p>
                    </div>

                    {/* Level and Demo URL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Course Level <span className="text-red-500">*</span>
                            </label>
                            <select 
                                required 
                                value={courseInfo.level} 
                                onChange={(e) => handleInputChange('level', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                                <option value="">Select Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Demo Video URL <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <MdOutlineVideocam className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="url" 
                                    required 
                                    value={courseInfo.demoUrl} 
                                    onChange={(e) => handleInputChange('demoUrl', e.target.value)}
                                    placeholder="https://youtube.com/watch?v=..."
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Course Thumbnail */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Course Thumbnail <span className="text-red-500">*</span>
                        </label>
                        <div className="w-full">
                            <input 
                                type="file" 
                                accept="image/*" 
                                id="file" 
                                className="hidden" 
                                onChange={handleFileChange} 
                            />
                            <label 
                                htmlFor="file" 
                                className={`
                                    w-full min-h-[200px] border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200
                                    ${dragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'}
                                `} 
                                onDragOver={handleDragOver} 
                                onDragLeave={handleDragLeave} 
                                onDrop={handleDrop}
                            >
                                {courseInfo.thumbnail ? (
                                    <div className="relative w-full max-w-md">
                                        <Image 
                                            src={courseInfo.thumbnail} 
                                            alt="Course thumbnail" 
                                            width={400} 
                                            height={200} 
                                            className="w-full h-48 object-cover rounded-lg shadow-md"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                                            <span className="text-white font-medium">Click to change</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Drag and drop your thumbnail here
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            or click to browse files
                                        </p>
                                        <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                                            <FiImage />
                                            <span>PNG, JPG, JPEG up to 5MB</span>
                                        </div>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    {/* Navigation Button */}
                    <div className="flex justify-end pt-6">
                        <button
                            type="button"
                            onClick={handleNext}
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
                        >
                            Continue to Course Data →
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CourseInformation;