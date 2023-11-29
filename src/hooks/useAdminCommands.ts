import { api } from "../config/api";
import Cookies from "js-cookie";

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

  return { fetchUser };
};
