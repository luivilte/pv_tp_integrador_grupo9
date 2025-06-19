
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

const initialState = {
  items: [],
  favorites: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      const isFav = state.favorites.includes(id);
      state.favorites = isFav
        ? state.favorites.filter(fav => fav !== id)
        : [...state.favorites, id];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.error = 'Error al cargar productos';
      });
  },
});

export const { toggleFavorite } = productsSlice.actions;
export default productsSlice.reducer;
