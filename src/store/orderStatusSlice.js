import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../Config2";

export const fetchOrderStatus = createAsyncThunk(
  "/get_all_order_status",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get_all_order_status`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const orderStatusSlice = createSlice({
  name: " orderStatus",
  initialState: {
    orderStatus: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderStatus.pending, (state) => {
        state.loading = true;
        state.orderStatus = [];
        state.error = null;
      })
      .addCase(fetchOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orderStatus = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.orderStatus = [];
        state.error = action.error.message;
      });
  },
});

export const selectOrderStatus = (state) => state.orderStatus.orderStatus;

export default orderStatusSlice.reducer;
