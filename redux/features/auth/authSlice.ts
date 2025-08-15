import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    user: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action: PayloadAction<{token: string}>) => {
            state.token = action.payload.token;
        },
        userLoggedIn: (state, action: PayloadAction<{accessToken: string, user: string}>) => {
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
            
            // Persist to localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem('authToken', action.payload.accessToken);
                localStorage.setItem('authUser', JSON.stringify(action.payload.user));
            }
        },
        userLoggedOut: (state) => {
            state.token = "";
            state.user = "";
            
            // Clear from localStorage
            if (typeof window !== "undefined") {
                localStorage.removeItem('authToken');
                localStorage.removeItem('authUser');
            }
        },
        rehydrateAuth: (state) => {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem('authToken');
                const user = localStorage.getItem('authUser');
                
                if (token && user) {
                    state.token = token;
                    try {
                        state.user = JSON.parse(user);
                    } catch (e) {
                        state.user = "";
                    }
                }
            }
        },
        forceRefreshUser: (state, action: PayloadAction<{user: string}>) => {
            // Update user data and localStorage
            state.user = action.payload.user;
            
            if (typeof window !== "undefined") {
                localStorage.setItem('authUser', JSON.stringify(action.payload.user));
            }
        },
    },
})

export const {userRegistration, userLoggedIn, userLoggedOut, rehydrateAuth, forceRefreshUser} = authSlice.actions

export default authSlice.reducer;