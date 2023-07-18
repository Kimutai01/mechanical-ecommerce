import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearCart } from "./cartSlice";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    const {
        user: { user },
      } = getState(),
      token = user.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `http://127.0.0.1:8000/api/orders/add/`,
      order,
      config
    );

    dispatch(setOrder(data));
    localStorage.setItem("order", JSON.stringify(data));
    dispatch(clearCart());
    localStorage.removeItem("cartItems");
  } catch (error) {
    console.error("Error creating order:", error);
  }
};

const initialState = {
  order: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    resetOrder: (state) => {
      state.order = {};

      localStorage.removeItem("order");
    },
  },
});

export const { setOrder, resetOrder } = orderSlice.actions;

export const selectOrder = (state) => state.order.order;

export default orderSlice.reducer;
