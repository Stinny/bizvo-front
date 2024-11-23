// notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  isOpen: false,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.message = action.payload;
      state.isOpen = true;
    },
    hideNotification(state) {
      state.message = '';
      state.isOpen = false;
    },
  },
});

export const { showNotification, hideNotification } = toastSlice.actions;
export default toastSlice.reducer;
