// store.js
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './SearchSlice'

const store = configureStore({
  reducer: {
    search: searchReducer, // Define your searchReducer
    // Add other reducers as needed for your application
  },
});

export default store;
