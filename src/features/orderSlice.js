import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearCart } from "./cartSlice";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      user: { user },
    } = getState();
    const token = user.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      `https://mechanic.lipiangoma.co.ke/api/orders/add/`,
      order,
      config
    );

    dispatch(setOrder(data));
    localStorage.setItem("order", JSON.stringify(data));
    dispatch(clearCart());
    localStorage.removeItem("cartItems");
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error creating order:", error);
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const orderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      user: { user },
    } = getState();
    const token = user.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `https://mechanic.lipiangoma.co.ke/api/orders/${id}/`,
      config
    );

    dispatch(getOrderDetails(data));
    localStorage.setItem("order", JSON.stringify(data));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error getting order:", error);
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      user: { user },
    } = getState();
    const token = user.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `https://mechanic.lipiangoma.co.ke/api/orders/${id}/pay/`,
      paymentResult,
      config
    );

    dispatch(orderPay(data));
    localStorage.setItem("order", JSON.stringify(data));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error paying order:", error);
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const listAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      user: { user },
    } = getState();
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `https://mechanic.lipiangoma.co.ke/api/orders/myorders`,
      config
    );

    dispatch(listOrders(data));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error listing orders:", error);
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      user: { user },
    } = getState();
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `https://mechanic.lipiangoma.co.ke/api/orders/`,
      config
    );

    dispatch(allOrders(data));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error listing orders:", error);
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const markOrderAsDelivered = (id) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      user: { user },
    } = getState();
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.put(
      `https://mechanic.lipiangoma.co.ke/api/orders/${id}/deliver/`,
      {},
      config
    );
    dispatch(markOrderDelivered(id));
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error marking order as delivered:", error);
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

const initialState = {
  order: {},
  orderDetails: {},
  orderPay: {},
  loading: false,
  error: null,
  orders: [],
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
    orderPay: (state, action) => {
      state.orderPay = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    listOrders: (state, action) => {
      state.orders = action.payload;
    },
    allOrders: (state, action) => {
      state.orders = action.payload;
    },
    markOrderDelivered: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const {
  setOrder,
  resetOrder,
  getOrderDetails,
  setLoading,
  setError,
  orderPay,
  listOrders,
  allOrders,
  markOrderDelivered,
} = orderSlice.actions;

export const selectOrder = (state) => state.order.order;
export const selectOrderDetails = (state) => state.order.orderDetails;
export const selectOrderPay = (state) => state.order.orderPay;
export const selectLoading = (state) => state.order.loading;
export const selectError = (state) => state.order.error;
export const selectOrders = (state) => state.order.orders;
export const selectAllOrders = (state) => state.order.orders;

export default orderSlice.reducer;
