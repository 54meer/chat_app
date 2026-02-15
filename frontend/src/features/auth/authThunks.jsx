import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { connectSocket, disconnectSocket } from "../../lib/socket";

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const res = await axiosInstance.get("/auth/check");
            connectSocket(res.data, dispatch);
            return res.data;
        } catch (error) {
            return rejectWithValue();
        }
    }
);

export const signup = createAsyncThunk(
    "auth/signup",
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            toast.success("Account created successfully");
            connectSocket(res.data, dispatch);
            
            return res.data;
        } catch (error) {
            return rejectWithValue();
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await axiosInstance.post("/auth/login", data);
            toast.success("Logged in successfully");
            connectSocket(res.data, dispatch);
            return res.data;
        } catch (error) {
            return rejectWithValue();
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await axiosInstance.post("/auth/logout");
            toast.success("Logged out successfully");
            disconnectSocket();
        } catch (error) {
            return rejectWithValue();
        }
    }
);

export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            toast.success("Profile updated successfully");
            return res.data;
        } catch (error) {
            return rejectWithValue();
        }
    }
);
