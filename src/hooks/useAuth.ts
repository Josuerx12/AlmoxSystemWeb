import { create } from "zustand";
import { api } from "../config/api";
import Cookies from "js-cookie";

type Credentials = {
  login: string;
  password: string;
};

export type User = {
  _id: string;
  name: string;
  login: string;
  email: string;
  almox: boolean;
  requester: boolean;
  admin: boolean;
  createdAt: string;
  updatedAt: string;
  phone: string;
};
type Error = {
  login: { msg: string; path: string };
  password: { msg: string; path: string };
};

type State = {
  user: User | null;
  errors: string | Error | null;
};

type Actions = {
  login: (credentials: Credentials) => Promise<void>;
  getUser: () => Promise<void>;
  logoutUser: () => void;
};

export const useAuth = create<State & Actions>((set) => ({
  user: null,
  errors: null,
  isLoadingUser: true,
  login: async (credentials: Credentials) => {
    try {
      const res = await api.post("/auth/login", credentials);
      const token = await res.data.token;

      Cookies.set("refreshToken", token, { expires: 1 });
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set(() => ({ errors: error.response.data.errors }));
    }
  },
  logoutUser: () => {
    Cookies.remove("refreshToken");
    api.defaults.headers.common.Authorization = "";
    set(() => ({ user: null }));
  },
  getUser: async () => {
    try {
      const res = await api.get("/auth/user");
      const user = await res.data;

      set(() => ({ user: user, errors: null, isLoadingUser: false }));
    } catch (error) {
      console.error(error);
    }
  },
}));
