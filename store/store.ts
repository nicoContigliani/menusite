// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import chExcelDataReducer from './chExcelDataSlice';
import toastReducer from "./toastSlice"
import auth from "./authSlice"


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    chExcelData: chExcelDataReducer,
    toast: toastReducer,
    auth: auth


  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
