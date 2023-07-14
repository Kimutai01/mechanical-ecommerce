import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productUrl = "http://127.0.0.1:8000/api/products/:id";
const initialState = {
  product: {},
  status: "idle",
  error: null,
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id) => {
    const response = await axios.get(productUrl.replace(":id", id));
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProduct.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.product = action.payload;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default productSlice.reducer;

export const selectProduct = (state) => state.product.product;
export const selectProductStatus = (state) => state.product.status;
export const selectProductError = (state) => state.product.error;
