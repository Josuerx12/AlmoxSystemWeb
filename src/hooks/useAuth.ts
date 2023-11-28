import { create } from "zustand";
import { api } from "../config/api";
import Cookies from "js-cookie";

type Credentials = {
  login: string;
  password: string;
};

type User = {
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

type State = {
  user: User | null;
  errors: string | string[] | null;
};

type Actions = {
  login: (credentials: Credentials) => Promise<void>;
  getUser: () => Promise<void>;
  logoutUser: () => void;
};

export const useAuth = create<State & Actions>((set) => ({
  user: null,
  errors: null,
  login: async (credentials: Credentials) => {
    try {
      const res = await api().post("/auth/login", credentials);
      const token = await res.data.token;

      Cookies.set("refreshToken", token, { expires: 1 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set(() => ({ errors: error.response.data.error }));
    }
  },
  logoutUser: () => {
    Cookies.remove("refreshToken");
    set(() => ({ user: null }));
  },
  getUser: async () => {
    const token = Cookies.get("refreshToken");
    try {
      const res = await api(token).get("/auth/user");
      const user = await res.data;

      set(() => ({ user: user, errors: null }));
    } catch (error) {
      console.error(error);
    }
  },
}));
