import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../redux/store";
import { rehydrateAuth } from "../redux/features/auth/authSlice";

interface ProvidersProps {
    children: any;
}

// Component to handle auth rehydration
function AuthRehydrator({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    useEffect(() => {
        // Rehydrate auth state from localStorage on app startup
        dispatch(rehydrateAuth());
    }, [dispatch]);

    return <>{children}</>;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <Provider store={store}>
            <AuthRehydrator>
                {children}
            </AuthRehydrator>
        </Provider>
    );
}