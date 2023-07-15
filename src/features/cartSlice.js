import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem("cartItems");

export const addItemsToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product data.");
    }
    const data = await response.json();
    const payload = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    };
    dispatch(addToCart(payload));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.error("Error adding items to cart:", error);
  }
};

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product data.");
    }
    const data = await response.json();
    const payload = {
      product: data._id,
    };
    dispatch(removeFromCart(payload));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.error("Error removing items from cart:", error);
  }
};

const initialState = {
  cartItems: cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const itemExists = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (itemExists) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === itemExists.product ? item : i
        );
      } else {
        state.cartItems.push(item);
      }
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== item.product
      );
    },
  },

  // extraReducers: {
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
