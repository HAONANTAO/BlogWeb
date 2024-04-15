import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  errorMessage: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //actions payload contain information
    signInStart: (state) => {
      state.loading = true;
      state.errorMessage = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.errorMessage = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.errorMessage = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.errorMessage = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.errorMessage = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.errorMessage = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
