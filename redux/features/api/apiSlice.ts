import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, forceRefreshUser } from "../auth/authSlice";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: (data) => ({
                url: "refresh",
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        loadUser: builder.query({
            query: (data) => ({
                url: "me",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                    
                    // Also force refresh to ensure localStorage is updated
                    dispatch(
                        forceRefreshUser({
                            user: result.data.user,
                        })
                    );
                } catch (error: any) {
                    // Silently handle authentication errors - they're expected when user is not logged in
                    // Only log errors that aren't 401/403 (authentication errors)
                    if (error?.error?.status && ![401, 403].includes(error.error.status)) {
                        console.error("Unexpected API error:", error);
                    }
                }
            }
        })
    }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;