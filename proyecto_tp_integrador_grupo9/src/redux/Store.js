import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './ProductsSlice';
import favoritesReducer from './favoritesSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    auth: authReducer,
  },
});
