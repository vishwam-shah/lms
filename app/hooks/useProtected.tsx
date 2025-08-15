import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

interface ProtectedProps {
    children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
    const { user } = useSelector((state: any) => state.auth);
    const [mounted, setMounted] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    
    // Load user data with proper error handling
    const { data, error, isLoading, isSuccess, isError } = useLoadUserQuery({}, {
        skip: false,
        refetchOnMountOrArgChange: false,
    });

    useEffect(() => {
        setMounted(true);
        
        // Set auth as checked after mount and API call is done
        if (mounted && (isSuccess || isError || user)) {
            setAuthChecked(true);
        }
    }, [mounted, isSuccess, isError, user]);

    // Don't render anything during SSR
    if (!mounted) {
        return null;
    }

    // Show loading only when we haven't checked auth yet and are still loading
    if (!authChecked && isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-2 text-gray-600 dark:text-gray-300">Loading...</span>
            </div>
        );
    }

    // Use user from either Redux state or API data
    const currentUser = user || data?.user;

    // If no user after checking (including API errors), redirect to home
    if (!currentUser) {
        redirect("/");
        return null;
    }

    return <>{children}</>;
}