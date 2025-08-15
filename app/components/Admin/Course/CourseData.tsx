import React, { FC, useCallback } from 'react'
import toast from 'react-hot-toast';
import { FiPlus, FiX, FiTarget, FiCheckCircle } from 'react-icons/fi';

type Props = {
    benefits: {title: string}[];
    setBenefits: (benefits: {title:string}[]) => void;
    prerequisites:{title: string}[];
    setPrerequisites: (prerequisites: {title:string}[]) => void;
    active:number;
    setActive: (active: number) => void;
}

const CourseData: FC<Props> = ({
    benefits,
    setBenefits,
    prerequisites,
    setPrerequisites,
    active,
    setActive,
}) => {

    const handleBenefitChange = useCallback((index: number, value: string) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    }, [benefits, setBenefits]);

    const handleAddBenefit = useCallback(() => {
        setBenefits([...benefits, {title: ""}]);
    }, [benefits, setBenefits]);

    const handleRemoveBenefit = useCallback((index: number) => {
        if (benefits.length > 1) {
            const updatedBenefits = benefits.filter((_, i) => i !== index);
            setBenefits(updatedBenefits);
        }
    }, [benefits, setBenefits]);

    const handlePrerequisiteChange = useCallback((index: number, value: string) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setPrerequisites(updatedPrerequisites);
    }, [prerequisites, setPrerequisites]);

    const handleAddPrerequisite = useCallback(() => {
        setPrerequisites([...prerequisites, {title: ""}]);
    }, [prerequisites, setPrerequisites]);

    const handleRemovePrerequisite = useCallback((index: number) => {
        if (prerequisites.length > 1) {
            const updatedPrerequisites = prerequisites.filter((_, i) => i !== index);
            setPrerequisites(updatedPrerequisites);
        }
    }, [prerequisites, setPrerequisites]);

    const validateData = useCallback(() => {
        const validBenefits = benefits.filter(benefit => benefit.title.trim() !== "");
        const validPrerequisites = prerequisites.filter(prereq => prereq.title.trim() !== "");

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

    const prevButton = () => {
        setActive(active - 1);
    }

    const handleNext = () => {
        if (validateData()) {
            setActive(active + 1);
        }
    }

    return (
        <div className='w-[90%] max-w-4xl m-auto mt-12 mb-12'>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Course Data</h2>
                    <p className="text-gray-600 dark:text-gray-300">Define the benefits and prerequisites for your course</p>
                </div>

                <div className="space-y-8">
                    {/* Benefits Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <FiTarget className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Course Benefits</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">What will students gain from this course?</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center space-x-3 group">
                                    <div className="flex-shrink-0">
                                        <FiCheckCircle className="h-5 w-5 text-green-500" />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="e.g., Build full-stack web applications with confidence"
                                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                        value={benefit.title} 
                                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                                    />
                                    {benefits.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveBenefit(index)}
                                            className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                                        >
                                            <FiX className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={handleAddBenefit}
                            className="flex items-center space-x-2 px-4 py-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200 border border-dashed border-green-300 dark:border-green-600 hover:border-solid"
                        >
                            <FiPlus className="h-4 w-4" />
                            <span className="font-medium">Add Another Benefit</span>
                        </button>
                    </div>

                    {/* Prerequisites Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <FiCheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Prerequisites</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">What should students know before taking this course?</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {prerequisites.map((prerequisite, index) => (
                                <div key={index} className="flex items-center space-x-3 group">
                                    <div className="flex-shrink-0">
                                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="e.g., Basic understanding of HTML, CSS, and JavaScript"
                                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        value={prerequisite.title} 
                                        onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                                    />
                                    {prerequisites.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemovePrerequisite(index)}
                                            className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                                        >
                                            <FiX className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={handleAddPrerequisite}
                            className="flex items-center space-x-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 border border-dashed border-blue-300 dark:border-blue-600 hover:border-solid"
                        >
                            <FiPlus className="h-4 w-4" />
                            <span className="font-medium">Add Another Prerequisite</span>
                        </button>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8">
                    <button
                        type="button"
                        onClick={prevButton}
                        className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                    >
                        ← Previous
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                        Continue to Content →
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CourseData