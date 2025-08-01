import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:2000/api/auth";
axios.defaults.withCredentials = true;

// ----- Expanded User Model -----
interface GifterProfile {
  walletBalance: number;
  paymentMethods: string[];
  settings: {
    defaultAnonymous: boolean;
  };
}

interface ReceiverAddress {
  label: string;
  name: string;
  street: string;
  city: string;
  state?: string;
  zip: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

interface ReceiverProfile {
  addresses: ReceiverAddress[];
}

interface User {
  id: string;
  name: string;
  email: string;
  currentRole: "gifter" | "receiver";
  gifterProfile?: GifterProfile;
  receiverProfile?: ReceiverProfile;
  profileImage?: string;
  isVerified: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ----- Zustand Store Interface -----
interface AuthState {
  user: User | null;
  email: string | null;
  role: string | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;

  signup: (email: string, password: string, name: string, role: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<User>;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<string>;
  setEmail: (email: string) => void;
  setRole: (role: string) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

// ----- Zustand Store -----
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  email: localStorage.getItem("email"),
  role: localStorage.getItem("role"),
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  setEmail: (email) => {
    localStorage.setItem("email", email);
    set({ email });
  },

  setRole: (role) => {
    localStorage.setItem("role", role);
    set({ role });
  },

  signup: async (email, password, name, role) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
        role,
      });

      const user: User = response.data.user;

      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.currentRole);

      set({
        user,
        email: user.email,
        role: user.currentRole,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });

      const user: User = response.data.user;

      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.currentRole);

      set({
        user,
        email: user.email,
        role: user.currentRole,
        isAuthenticated: true,
        isLoading: false,
      });

      return user;
    } catch (error) {
      set({
        error:
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password, rememberMe) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(
        `${API_URL}/signin`,
        { email, password, rememberMe },
        { withCredentials: true }
      );
      set({ isLoading: false, error: null });
    } catch (error) {
      set({
        error:
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Error signing in",
        isLoading: false,
      });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/forgot-password`, { email });
      set({ isLoading: false });
    } catch (error) {
      set({
        error:
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Error sending reset link",
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ isLoading: false });
      return response.data.message;
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Error resetting password";
      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      const user: User = response.data.user;

      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.currentRole);

      set({
        user,
        email: user.email,
        role: user.currentRole,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch {
      set({
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (e) {
      console.error("Logout failed:", e);
    }
    set({
      user: null,
      isAuthenticated: false,
      email: null,
      role: null,
    });
  },
}));
