// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import chExcelDataReducer from './chExcelDataSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    chExcelData: chExcelDataReducer,

  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
