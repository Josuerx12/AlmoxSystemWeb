/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../config/api";
import Cookies from "js-cookie";

export const useRequests = () => {
  const token = Cookies.get("refreshToken");

  async function fetch() {
    try {
      const res = await api(token).get("/user/requests");
      const data = await res.data.payload;

      return data;
    } catch (error: any) {
      throw error;
    }
  }

  return { fetch };
};
