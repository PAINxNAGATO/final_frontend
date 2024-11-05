import toast from "react-hot-toast";
import { create } from "zustand";
import api from "../store/api";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await api.post("/auth/signup", credentials);
      set({ user: response.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await api.post("/auth/login", credentials);
      set({ user: response.user, isLoggingIn: false });
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.message || "Login failed");
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await api.post("/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.message || "Logout failed");
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await api.get("/auth/authCheck");
      set({ user: response.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
      // Silent fail for auth check
    }
  },
}));