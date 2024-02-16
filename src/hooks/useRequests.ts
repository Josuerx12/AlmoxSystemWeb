/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewReqCredentials } from "../components/modals/requests/new";
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

  async function newReq(data: NewReqCredentials) {
    try {
      const res = await api(token).post("/requests/new", data);
      return res;
    } catch (error) {
      throw error;
    }
  }

  return { fetch, newReq };
};
