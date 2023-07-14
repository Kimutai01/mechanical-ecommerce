import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productsUrl = "http://127.0.0.1:8000/api/products/";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(productsUrl);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default productSlice.reducer;

export const selectAllProducts = (state) => state.products.products;
export const getProductStatus = (state) => state.products.status;
export const getProductError = (state) => state.products.error;
