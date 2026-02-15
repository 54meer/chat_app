import { createSlice } from '@reduxjs/toolkit';
import { checkAuth, signup, login, logout, updateProfile } from './authThunks';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authUser: null,
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
        isCheckingAuth: true,
        onlineUsers: []
    },
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // check auth
            .addCase(checkAuth.pending, (state) => {
                state.isCheckingAuth = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isCheckingAuth = false;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.authUser = null;
                state.isCheckingAuth = false;
            })
            // signup
            .addCase(signup.pending, (state) => {
                state.isSigningUp = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isSigningUp = false;
            })
            .addCase(signup.rejected, (state) => {
                state.isSigningUp = false;
            })
            // login
            .addCase(login.pending, (state) => {
                state.isLoggingIn = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isLoggingIn = false;
            })
            .addCase(login.rejected, (state) => {
                state.isLoggingIn = false;
            })
            // logout
            .addCase(logout.fulfilled, (state) => {
                state.authUser = null;
            })
            // update profile
            .addCase(updateProfile.pending, (state) => {
                state.isUpdatingProfile = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isUpdatingProfile = false;
            })
            .addCase(updateProfile.rejected, (state) => {
                state.isUpdatingProfile = false;
            });
    }
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;