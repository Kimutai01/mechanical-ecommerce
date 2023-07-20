import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productsUrl = "http://127.0.0.1:8000/api/products/";
const initialState = {
  products: [],
  status: "idle",
  error: null,
  createdProduct: {},
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
    dispatch(fetchProducts());
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

export const createNewProduct = () => async (dispatch, getState) => {
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
    const { data } = await axios.post(`${productsUrl}create/`, {}, config);
    dispatch(fetchProducts());
    dispatch(createProduct(data));
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createProduct: (state, action) => {
      state.createdProduct = action.payload;
    },
    createProductReset: (state) => {
      state.createdProduct = {};
    },
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
export const { createProduct } = productsSlice.actions;
export const { createProductReset } = productsSlice.actions;
export const selectAllProducts = (state) => state.products.products;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;
export const getCreatedProduct = (state) => state.products.createdProduct;
