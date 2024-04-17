import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../Config2";

export const fetchCustomers = createAsyncThunk("/get_all_clients", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get_all_clients`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.customers = [];
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
        state.error = null;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.categories = [];
        state.error = action.error.message;
      });
  },
});

export const selectCustomers = (state) => state.customers.customers;

export default customersSlice.reducer;
