// features/Store.js
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import attemptSlice from './slice/Attemptslice'
import authReducer from './slice/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    attempts: attemptSlice,
  },
});

// Simple hooks (no typing)
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Auth selectors
export const selectUser = (s) => s.auth.user;
export const selectIsLoggedIn = (s) => s.auth.user !== null;
export const selectIsAdmin = (s) => s.auth.user?.role === "admin";