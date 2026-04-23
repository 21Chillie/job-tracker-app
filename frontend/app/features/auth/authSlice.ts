import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import authService from "@services/auth.service";
import toast from "react-hot-toast";

type AuthState = {
  userId: string;
  isError: boolean;
  errorMessage: string;
};

const initialState: AuthState = {
  userId: "",
  isError: false,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      return initialState;
    },

    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
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

export const { clearAuthState, setUserId } = authSlice.actions;

export default authSlice.reducer;
