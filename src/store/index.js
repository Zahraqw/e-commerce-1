import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import modalReducer from "./modalSlice";
import searchReducer from "./searchSlice";
import userReducer from "./userSlice";
import posReducer from "./posSlice";
import kitReducer from "./kitSlice";
import categoriesReducer from "./categoriesSlice";
import customersReducer from "./customersSlice";
import orderStatusReducer from "./orderStatusSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    pos: posReducer,
    kit: kitReducer,
    modal: modalReducer,
    search: searchReducer,
    user: userReducer,
    categories: categoriesReducer,
    customers: customersReducer,
    orderStatus: orderStatusReducer,
  },
});

export default store;
