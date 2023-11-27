import { create } from "zustand";
import { api } from "../config/api";
import Cookies from "js-cookie";

type Credentials = {
  email: string;
  password: string;
};

type State = {
  user: string | null;
  token: string | null;
};

type Actions = {
  login: (credentials: Credentials) => Promise<void>;
  getUser: (token: string) => Promise<void>;
  loggedUser: (token: string) => void;
  logoutUser: () => void;
};

export const useAuth = create<State & Actions>((set) => ({
  user: null,
  token: null,
  login: async (credentials: Credentials) => {
    try {
      const res = await api().post("/auth/login", { credentials });
      const token = await res.data.token;

      Cookies.set("refreshToken", token, { expires: 1 });

      set(() => ({ token: token }));
    } catch (error) {
      console.log(error);
    }
  },
  loggedUser: (token: string) => {
    set(() => ({ token: token }));
  },
  logoutUser: () => {
    set(() => ({ user: null, token: null }));
  },
  getUser: async (token: string) => {
    try {
      const res = await api(token).get("/auth/user");
      const user = await res.data;

      set(() => ({ user: user }));
    } catch (error) {
      console.error(error);
    }
  },
}));
