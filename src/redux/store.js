import { configureStore } from '@reduxjs/toolkit'; 
import logger from 'redux-logger'; 
import cartReducer from './reducers/cartReducer';
import productReducers from './reducers/productReducers';

//The Redux store with combined reducers and middleware
const store = configureStore({
  reducer: {
    products: productReducers,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


export default store;