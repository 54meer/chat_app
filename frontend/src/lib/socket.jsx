import { io } from "socket.io-client";
import { setOnlineUsers } from "../features/auth/authSlice";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

let socket = null;

export const connectSocket = (user, dispatch) => {
    if (!user || socket?.connected) return;

    socket = io(BASE_URL, {
        query: { userId: user._id },
    });

    socket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
    });
};

export const disconnectSocket = () => {
    if (socket?.connected) socket.disconnect();
    socket = null;
};

export const getSocket = () => socket;