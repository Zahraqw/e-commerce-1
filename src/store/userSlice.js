import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../Config";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const request = await axios.post(`${BASE_URL}/login`, userCredentials, {
      withCredentials: true,
    });
    const response = await request.data;
    return response;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    setIsLogIn: (state, action) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log(state.user.roles);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Login failed. Please check your credentials.";
        } else {
          state.error = action.error.message;
        }
      });
  },
});
export const { setIsLogIn } = userSlice.actions;
export const isLoginUser = (state) => state.user.isLogin;
export const user = (state) => state.user.user;
export default userSlice.reducer;
