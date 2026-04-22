import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "@features/auth/authSlice";
import jobFilterReducer from "@features/job/jobFilterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobFilter: jobFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
