import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem("cartItems");
const shippingAddressFromStorage = localStorage.getItem("shippingAddress");
const paymentMethodFromStorage = localStorage.getItem("paymentMethod");

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

export const saveShippingAddress = (data) => async (dispatch) => {
  try {
    dispatch(shippingAddress(data));
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving shipping address:", error);
  }
};

export const savePaymentMethod = (data) => async (dispatch) => {
  try {
    dispatch(paymentMethod(data));
    localStorage.setItem("paymentMethod", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving payment method:", error);
  }
};

const initialState = {
  cartItems: cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [],
  shippingAddress: shippingAddressFromStorage
    ? JSON.parse(shippingAddressFromStorage)
    : {},
  paymentMethod: paymentMethodFromStorage
    ? JSON.parse(paymentMethodFromStorage)
    : {},
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

    shippingAddress: (state, action) => {
      const item = action.payload;
      state.shippingAddress = item;
    },

    paymentMethod: (state, action) => {
      const item = action.payload;
      state.paymentMethod = item;
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },

  // extraReducers: {
});

export const {
  addToCart,
  removeFromCart,
  shippingAddress,
  paymentMethod,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectShippingAddress = (state) => state.cart.shippingAddress;
export const selectPaymentMethod = (state) => state.cart.paymentMethod;

export const selectCartItemsCount = (state) =>
  state.cart.cartItems.reduce((acc, item) => acc + item.qty, 0);

export default cartSlice.reducer;
