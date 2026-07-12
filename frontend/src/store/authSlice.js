import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("ecosphere_user");

const initialState = {
  token: localStorage.getItem("ecosphere_token") || null,
  user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, ...user } = action.payload;
      state.token = token;
      state.user = user;
      localStorage.setItem("ecosphere_token", token);
      localStorage.setItem("ecosphere_user", JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("ecosphere_token");
      localStorage.removeItem("ecosphere_user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
