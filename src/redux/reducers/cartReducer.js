import { createSlice } from '@reduxjs/toolkit';

// Define a cart slice using createSlice
const cartSlice = createSlice({
  name: 'cart',
  initialState: [], // Initial state is an empty array
  reducers: {
    // Reducer to add a product to the cart
    addToCart: (state, action) => {
      // Check if the product is already in the cart
      const existingProduct = state.find((item) => item.id === action.payload.id);

      // If the product is not in the cart, add it
      if (!existingProduct) {
        state.push({ ...action.payload, inCart: true }); // Add the product with an additional property 'inCart'
      }
    },
    // Reducer to remove a product from the cart
    removeFromCart: (state, action) => {
      // Filter out the product with the specified ID
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

// Export actions and selector from the cart slice
export const { addToCart, removeFromCart } = cartSlice.actions;

// Export the cart selector
export const cartSelector = (state) => state.cart;

// Export the cart reducer
export default cartSlice.reducer;
