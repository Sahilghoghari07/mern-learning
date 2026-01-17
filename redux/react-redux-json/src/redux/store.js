import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer
    }
});