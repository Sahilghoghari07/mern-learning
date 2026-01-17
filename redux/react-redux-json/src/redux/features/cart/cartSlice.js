import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const storedCart = localStorage.getItem("cart");

const cartSlice = createSlice({
  name: "cart",
  initialState: storedCart ? JSON.parse(storedCart) : [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;