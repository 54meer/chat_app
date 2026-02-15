import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        current: localStorage.getItem("theme") || "coffee",
    },
    reducers: {
        setTheme: (state, action) => {
            state.current = action.payload;
            localStorage.setItem("theme", action.payload);
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;