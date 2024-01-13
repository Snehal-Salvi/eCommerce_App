import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//API URL for fetching and updating products
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

// Define the Products slice
const ProductsSlice = createSlice({
  name: 'products',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {
    // Reducer for adding a new Product
  addProduct: (state, action) => {
  state.data.push(action.payload);
  console.log('Updated State:', state); 
  },

 // Reducer for updating an Product
  updateProduct: (state, action) => {
  const { id, name, image, price } = action.payload;
    
  // Find the product by ID and update its details
  const updatedProducts = state.data.map((product) =>
  product.id === id ? { ...product, name, image, price } : product
  );
    
  // Return a new state with updated products
  return { ...state, data: updatedProducts };
  },
    

  // Reducer for deleting an Product
  deleteProduct: (state, action) => {
  // Filter out the Product with the specified ID
  state.data = state.data.filter((Product) => Product.id !== action.payload);
  },

  },

  extraReducers: (builder) => {
  // Handle the fulfilled state of the fetchProducts async thunk
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      // Set status to 'succeeded', and update the data with fetched Products
      state.status = 'succeeded';
      state.data = action.payload;

      // Log the fetched Products
      console.log('Fetched Products:', action.payload);
    });
  },
});

// Export actions and reducer
export const { addProduct, updateProduct, deleteProduct } = ProductsSlice.actions;
export default ProductsSlice.reducer;

// Selector to get the Products data from the state
export const productsSelector = (state) => state.products.data;
