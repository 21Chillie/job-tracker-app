import authClient from "@configs/auth-client";
import api from "@configs/axios-instance.config";
import { getQueryClient } from "@configs/query-client.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type AxiosResponse } from "axios";
import { redirect } from "react-router";
import type { SessionType } from "~/types/user.type";

const authService = {
  getSession: async (cookie?: string) => {
    try {
      const response: AxiosResponse<SessionType> = await api.get(
        "/api/auth/get-session",
        {
          headers: {
            // Forward the user's cookie to the backend
            ...(cookie && { Cookie: cookie }),
          },
        },
      );

      return response.data;
    } catch {
      throw redirect("/login");
    }
  },

  logout: createAsyncThunk("/auth/logout", async (_, { rejectWithValue }) => {
    const queryClient = getQueryClient();
    const { data, error } = await authClient.signOut();

    if (error) {
      return rejectWithValue(
        error.message || "An expected error occurred when trying to logout",
      );
    }

    queryClient.clear();
    return data;
  }),

  loginGoogle: createAsyncThunk(
    "auth/loginGoogle",
    async (_, { rejectWithValue }) => {
      const origin = window.location.origin;

      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${origin}/`,
        disableRedirect: true,
      });

      if (error) {
        return rejectWithValue(
          error.message ||
            "An unexpected error occurred when trying to login with Google",
        );
      }

      window.open(data?.url, "_blank", "noreferrer");

      return data;
    },
  ),

  loginEmail: async (value: { email: string; password: string }) => {
    const { error, data } = await authClient.signIn.email({
      email: value.email,
      password: value.password,
      rememberMe: true,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  registerEmail: async (value: {
    name: string;
    email: string;
    password: string;
  }) => {
    const { error, data } = await authClient.signUp.email({
      name: value.name,
      email: value.email,
      password: value.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
  deleteAccount: async (password: string) => {
    const { error, data } = await authClient.deleteUser({
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};

export default authService;
