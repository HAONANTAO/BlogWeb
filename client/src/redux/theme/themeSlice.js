import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  stars: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.stars = false;
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    toggleBack: (state) => {
      state.stars = true;
    },
  },
});
export const { toggleTheme, toggleBack } = themeSlice.actions;
export default themeSlice.reducer;
