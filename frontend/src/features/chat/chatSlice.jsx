import { createSlice } from '@reduxjs/toolkit';
import { getUsers, getMessages, sendMessage, subscribeToMessages, unsubscribeFromMessages } from './chatThunk';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        users: [],
        selectedUser: null,
        isUsersLoading: false,
        isMessagesLoading: false,
    },
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        addNewMessage: (state, action) => {
            state.messages = [...state.messages, action.payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messages = [...state.messages, action.payload];
            })
    }
});

export const { setSelectedUser, addNewMessage } = chatSlice.actions;
export default chatSlice.reducer;