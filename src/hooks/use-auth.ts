import { create } from "zustand";
import { api } from "../lib/api";
import Cookies from "js-cookie";
import type { LoginInputProps, RegisterInputProps, User } from "../types/auth";

type AuthState = {
  isLoading: boolean;
  user?: User | null;
  login: (data: LoginInputProps) => Promise<void>;
  register: (data: RegisterInputProps) => Promise<void>;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => {
  const init = async () => {
    set({ isLoading: true, user: null });
    try {
      const res = await api.get("/auth/me");
      set({ user: res.data.user, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  };

  init();

  return {
    isLoading: true,
    user: null,
    login: async (data: LoginInputProps) => {
      try {
        const res = await api.post("/auth/login", data);
        const token = res.data?.token;
        if (token) {
          Cookies.set("token", token, {
            expires: 7,
            sameSite: "lax",
            secure: window.location.protocol === "https:",
            path: "/",
          });
        }

        const me = await api.get("/auth/me");
        set({ user: me.data.user });
      } catch (err) {
        set({ user: null });
        throw err;
      }
    },
    register: async (data) => {
      try {
        const res = await api.post("/auth/register", data);
        const token = res.data?.token;

        if (token) {
          Cookies.set("token", token, {
            expires: 7,
            sameSite: "lax",
            secure: window.location.protocol === "https:",
            path: "/",
          });
        }

        const me = await api.get("/auth/me");
        set({ user: me.data.user });
      } catch (err) {
        set({ user: null });
        throw err;
      }
    },
    logout: () => {
      Cookies.remove("token", { path: "/" });

      delete api.defaults.headers.common["Authorization"];

      set({ user: null });
    },
  };
});
