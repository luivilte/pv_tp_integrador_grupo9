
import { createSlice } from '@reduxjs/toolkit';

const sessionUser = JSON.parse(localStorage.getItem('sessionUser')) || null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: sessionUser,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem('sessionUser', JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('sessionUser');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
