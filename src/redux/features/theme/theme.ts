
import { createSlice } from "@reduxjs/toolkit";

const storedDarkMode = localStorage.getItem("darkMode");
const initialState = {
  darkMode: storedDarkMode ? JSON.parse(storedDarkMode) : false
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

