/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import { api } from "../config/api";
import Cookies from "js-cookie";

export type NewUserCredentials = {
  name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  almox: boolean;
  admin: boolean;
  requester: boolean;
};

export type UserEditCredentials = {
  name: string;
  login: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
  almox: boolean;
  admin: boolean;
  requester: boolean;
};

export const useAdminCommands = () => {
  const token = Cookies.get("refreshToken");

  const fetchUser = async () => {
    try {
      const res = await api(token).get("/admin/users");
      const users = await res.data.payload;

      return users;
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (data: NewUserCredentials) => {
    try {
      await api(token).post("/admin/newUser", data);
      return "Usuário criado com sucesso!";
    } catch (error: any) {
      throw error.response.data.errors;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await api(token).delete(`/admin/user/${id}`);
      return "Usuário deletado com sucesso!";
    } catch (error: any) {
      throw error.message;
    }
  };
  const editUser = async ({
    id,
    data,
  }: {
    id: string;
    data: UserEditCredentials;
  }) => {
    try {
      await api(token).put(`/admin/editUser/${id}`, data);
      return "Usuário deletado com sucesso!";
    } catch (error: any) {
      throw error.response.data.errors;
    }
  };

  return { fetchUser, createUser, deleteUser, editUser };
};
