import { createSlice } from "@reduxjs/toolkit";
import authService from "@services/auth.service";
import toast from "react-hot-toast";

type AuthState = {
  isError: boolean;
  errorMessage: string;
};

const initialState: AuthState = {
  isError: false,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authService.logout.fulfilled, (state, action) => {
        const { success } = action.payload;

        if (success) {
          toast.success("Logged out successfully");

          state.isError = false;
          state.errorMessage = "";
        }
      })
      .addCase(authService.logout.rejected, (state, action) => {
        const message = action.error.message || "An unexpected error occurred";

        state.isError = true;
        state.errorMessage = message;
      })
      .addCase(authService.loginGoogle.fulfilled, (state, action) => {
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(authService.loginGoogle.rejected, (state, action) => {
        const message = action.error.message || "An unexpected error occurred";

        state.isError = true;
        state.errorMessage = message;
      });
  },
});

export const { clearAuthState } = authSlice.actions;

export default authSlice.reducer;
