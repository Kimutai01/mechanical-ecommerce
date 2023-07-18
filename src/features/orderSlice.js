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

export const orderDetails = (id) => async (dispatch, getState) => {
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
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/orders/${id}/`,
      config
    );

    dispatch(getOrderDetails(data));
    localStorage.setItem("order", JSON.stringify(data));
  } catch (error) {
    console.error("Error getting order:", error);
  }
};

const initialState = {
  order: {},
  orderDetails: {},
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
    getOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
    },
  },
});

export const { setOrder, resetOrder, getOrderDetails } = orderSlice.actions;

export const selectOrder = (state) => state.order.order;
export const selectOrderDetails = (state) => state.order.orderDetails;

export default orderSlice.reducer;
