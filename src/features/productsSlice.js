import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productsUrl = "http://127.0.0.1:8000/api/products/";
const productUrl = "http://127.0.0.1:8000/api/products/:id";
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

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id) => {
    const response = await axios.get(productUrl.replace(":id", id));
    return response.data;
  }
);

const productsSlice = createSlice({
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
    [fetchProduct.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default productsSlice.reducer;

export const selectAllProducts = (state) => state.products.products;
export const getProductStatus = (state) => state.products.status;
export const getProductError = (state) => state.products.error;
