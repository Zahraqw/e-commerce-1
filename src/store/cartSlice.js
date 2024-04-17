import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  cartShipping: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // check if the product on cart or not
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        if (state.cartItems[existingIndex].cartQuantity >= action.payload.quantity) {
          toast.error(`عذرا... الكمية المطلوبة غير متوفرة في المتجر حاليا`, { position: "top-right", autoClose: 2000 })
        }
        else {
          state.cartItems[existingIndex] = {
            ...state.cartItems[existingIndex],
            cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
          };
          toast.info(`Increased product quantity`, { position: "top-right", autoClose: 2000 })
        }
      }
      // Not On Cart
      else {
        const newItem = { ...action.payload, cartQuantity: 1 };
        // Calculate topPrice based on sale or regular price
        newItem.topPrice = newItem.onSale ? newItem.salePrice : newItem.price;

        state.cartItems.push(newItem);
        toast.success(` added ${action.payload.name} to your cart  `, { position: "top-right", autoClose: 2000 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    ChangeQuantityCart(state, action) {
      const { id, newQuantity } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id);
      if (newQuantity > 0 && newQuantity <= state.cartItems[itemIndex].quantity) {
        state.cartItems[itemIndex].cartQuantity = newQuantity;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const itemIdToRemove = action.payload.id;
      const indexOfItemToRemove = state.cartItems.findIndex(
        (item) => item.id === itemIdToRemove
      );
      if (indexOfItemToRemove !== -1) {
        const removedItem = state.cartItems[indexOfItemToRemove];

        const nextCartItems = [
          ...state.cartItems.slice(0, indexOfItemToRemove),
          ...state.cartItems.slice(indexOfItemToRemove + 1),
        ];
        state.cartItems = nextCartItems;
        toast.error(`${removedItem.name} removed from cart`, { position: "top-right", autoClose: 2000 });
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { topPrice, cartQuantity } = cartItem;
          const itemTotal = topPrice * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },


    setShipping(state, action) {
      state.cartShipping = action.payload;
    }
  },
});

export const { addToCart, ChangeQuantityCart, setShipping, removeFromCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;