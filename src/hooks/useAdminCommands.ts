/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import { api } from "../config/api";
import { User } from "../interfaces/user";

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
  const fetchUser = async (): Promise<User[]> => {
    try {
      const res = await api.get("/admin/users");
      const users = res.data.payload;

      return users;
    } catch (error: any) {
      throw error.response.data.errors;
    }
  };

  const createUser = async (data: NewUserCredentials) => {
    try {
      await api.post("/admin/newUser", data);
      return "Usuário criado com sucesso!";
    } catch (error: any) {
      throw error.response.data.errors;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await api.delete(`/admin/user/${id}`);
      return "Usuário deletado com sucesso!";
    } catch (error: any) {
      throw error.message;
    }
  };
  const editUser = async ({ id, data }: { id: string; data: FormData }) => {
    try {
      await api.put(`/auth/editUser/${id}`, data);
      return "Usuário editado com sucesso!";
    } catch (error: any) {
      throw error.response.data.errors;
    }
  };

  return { fetchUser, createUser, deleteUser, editUser };
};
