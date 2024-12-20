import { configureStore } from '@reduxjs/toolkit';
import assetReducer from '../slices/assetSlice';

export const store = configureStore({
  reducer: {
    asset: assetReducer,
  },
});
