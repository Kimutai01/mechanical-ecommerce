import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productsSlice";
import productReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
