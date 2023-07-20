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
export const deleteProductById = (id) => async (dispatch, getState) => {
  try {
    const {
      user: { user },
    } = getState();
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`${productsUrl}delete/${id}/`, config);
    dispatch(deleteProduct(id));
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
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

export default productsSlice.reducer;

export const { deleteProduct } = productsSlice.actions;
export const selectAllProducts = (state) => state.products.products;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;
