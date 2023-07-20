import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productsUrl = "http://127.0.0.1:8000/api/products/";
const initialState = {
  product: null,
  status: "idle",
  error: null,
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id) => {
    const response = await axios.get(`${productsUrl}${id}`);
    return response.data;
  }
);

export const updateProductById = (product) => async (dispatch, getState) => {
  try {
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
    await axios.put(`${productsUrl}update/${product._id}/`, product, config);
    dispatch(fetchProduct(product.id));
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      state.product = action.payload;
    },
  },
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
export const getProductStatus = (state) => state.product.status;
export const getProductError = (state) => state.product.error;
