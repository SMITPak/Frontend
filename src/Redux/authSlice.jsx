// store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  expiryAccessToken: null,
  expiryRefreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.expiryAccessToken = action.payload.expiryAccessToken;
      state.expiryRefreshToken = action.payload.expiryRefreshToken;
      state.user = action.payload.user || null;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.expiryAccessToken = null;
      state.expiryRefreshToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
