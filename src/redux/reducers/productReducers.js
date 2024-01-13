import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the API URL for fetching and updating products
const API_URL = 'https://my-json-server.typicode.com/Snehal-Salvi/products_API/products';

// Async thunk to fetch products from the API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
});

// Async thunk to add a new product to the API
export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
  try {
    const response = await axios.post(API_URL, newProduct);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add new product');
  }
});

// Async thunk to delete a product from the API
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  try {
    await axios.delete(`${API_URL}/${productId}`);
    return productId;
  } catch (error) {
    throw new Error('Failed to delete product');
  }
});

// Async thunk to update a product in the API
export const updateProduct = createAsyncThunk('products/updateProduct', async (updatedProduct) => {
  try {
    const response = await axios.put(`${API_URL}/${updatedProduct.id}`, updatedProduct);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update product');
  }
});

// Create a products slice using createSlice
const productsSlice = createSlice({
  name: 'products',
  initialState: { data: [], status: 'idle', error: null, editProduct: null },
  reducers: {
    // Reducer to set the product being edited
    setEditProduct: (state, action) => {
      state.editProduct = action.payload;
    },
    // Reducer to clear the product being edited
    clearEditProduct: (state) => {
      state.editProduct = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetching products
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
  
    // Handle adding a new product
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = [...state.data, action.payload];
    });
    
    // Handle deleting a product
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = state.data.filter((product) => product.id !== action.payload);
    });
  
    // Handle updating a product
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = state.data.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
      state.editProduct = null;
    });
  },
});

// Export actions and selectors from the products slice
export const { setEditProduct, clearEditProduct } = productsSlice.actions;
export const productsSelector = (state) => state.products.data;
export const editProductSelector = (state) => state.products.editProduct;

// Export the products reducer
export default productsSlice.reducer;
