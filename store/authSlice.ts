// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AuthState {
//   user: any | null;
//   isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginSuccess: (state, action: PayloadAction<any>) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  name?: string;
  // Agrega más campos según necesites
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Acción para inicio de procesos async
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Registro exitoso
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    
    // Login exitoso
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    
    // Fallo en autenticación
    authFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    
    // Resetear errores
    clearError: (state) => {
      state.error = null;
    }
  },
});

// Exportamos todas las acciones
export const { 
  authStart,
  registerSuccess, 
  loginSuccess, 
  logout, 
  authFailure,
  clearError
} = authSlice.actions;

export default authSlice.reducer;