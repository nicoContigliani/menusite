import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  loginSuccess, 
  registerSuccess, 
  authFailure, 
  clearError 
} from '../store/authSlice';
import { localhostStorage } from '@/services/localstorage.services';

type AuthData = {
  email: string;
  password: string;
  fullname?: string;
  birthday?: string;
  phone?: string;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    // other user fields
  };
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const authRequest = async (url: string, data: AuthData) => {
    dispatch(clearError());
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Authentication failed');
      }

      await localhostStorage(result);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed';
      setError(message);
      dispatch(authFailure(message));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await authRequest('/api/loginuser', { email, password });
      dispatch(loginSuccess(result));
      setIsAuthenticated(true);
      return result;
    } catch (error) {
      // Error is already handled in authRequest
      return null;
    }
  };

  const register = async (data: AuthData) => {
    try {
      const result = await authRequest('/api/registerdata', data);
      dispatch(registerSuccess(result));
      setIsAuthenticated(true);
      setIsRegistering(false);
      return result;
    } catch (error) {
      // Error is already handled in authRequest
      return null;
    }
  };

  const toggleAuthMode = () => {
    dispatch(clearError());
    setError(null);
    setIsRegistering(!isRegistering);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return {
    login,
    register,
    logout,
    toggleAuthMode,
    error,
    isLoading,
    isAuthenticated,
    isRegistering,
    setIsAuthenticated
  };
};