import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { getSocket } from "../../lib/socket";
import { addNewMessage } from './chatSlice';

export const getUsers = createAsyncThunk(
    "chat/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("/messages/users");
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return rejectWithValue();
        }
    }
);

export const getMessages = createAsyncThunk(
    "chat/getMessages",
    async (userId, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return rejectWithValue();
        }
    }
);

export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async (messageData, { getState, rejectWithValue }) => {
        try {
            const { selectedUser } = getState().chat;
            
            if (!selectedUser) return;

            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return rejectWithValue();
        }
    }
);

export const subscribeToMessages = createAsyncThunk(
    "chat/subscribeToMessages",
    async (_, { getState, dispatch, rejectWithValue }) => {
        try {
            const socket = getSocket();

            socket.on("newMessage", (newMessage) => {
                const { selectedUser } = getState().chat;

                if (!selectedUser) return;
                if (newMessage.senderId !== selectedUser._id) return;

                dispatch(addNewMessage(newMessage));
            });
        } catch (error) {
            toast.error(error.response.data.message);
            return rejectWithValue();
        }
    }
);

export const unsubscribeFromMessages = createAsyncThunk(
    "chat/unsubscribeFromMessages",
    async (_, { rejectWithValue }) => {
        try {
            const socket = getSocket();
            
            socket.off("newMessage");
        } catch (error) {
            toast.error(error.response.data.message);
            return rejectWithValue();
        }
    }
);