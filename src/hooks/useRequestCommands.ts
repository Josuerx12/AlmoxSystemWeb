import { api } from "../config/api";
import Cookies from "js-cookie";

export const useAdminCommands = async () => {
  const token = Cookies.get("refreshToken");
  const fetchRequests = async () => {
    const res = await api(token).get("/requests/all");
    const requests = await res.data.payload;

    return requests;
  };

  return fetchRequests;
};
