import api from "@configs/axios-instance.config";
import { isAxiosError, type AxiosResponse } from "axios";
import type { SessionType } from "~/types/user.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authClient from "@configs/auth-client";
import toast from "react-hot-toast";
import { getQueryClient } from "@configs/query-client.config";

const authService = {
  getSession: async (cookie?: string) => {
    try {
      const response: AxiosResponse<SessionType> = await api.get(
        "/api/auth/get-session",
        {
          headers: {
            // Forward the user's cookie to the backend
            Cookie: cookie,
          },
        },
      );

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Response(error.message, {
          status: error.response?.status,
          statusText: error.response?.statusText,
        });
      }

      throw error;
    }
  },

  logout: createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await authClient.signOut();

      if (error) {
        return rejectWithValue(error.message);
      }

      getQueryClient().clear();

      return data;
    } catch (err) {
      return rejectWithValue(
        "An expected error occurred when trying to logout",
      );
    }
  }),

  loginGoogle: createAsyncThunk(
    "auth/loginGoogle",
    async (_, { rejectWithValue }) => {
      const origin = window.location.origin;

      try {
        const { data, error } = await authClient.signIn.social({
          provider: "google",
          callbackURL: `${origin}/`,
        });

        if (error) {
          rejectWithValue(error.message);
        }

        return data;
      } catch {
        rejectWithValue(
          "An unexpected error occurred when trying to login with Google",
        );
      }
    },
  ),

  loginEmail: async (value: { email: string; password: string }) => {
    try {
      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
        rememberMe: true,
      });

      if (error && error.message) toast.error(error.message);

      return;
    } catch {
      toast.error(
        "An unexpected error occurred when trying to login with email",
      );
    }
  },

  registerEmail: async (value: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const { error } = await authClient.signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
      });

      if (error && error.message) toast.error(error.message);

      return;
    } catch {
      toast.error(
        "An unexpected error occurred when trying to register with email",
      );
    }
  },
};

export default authService;
