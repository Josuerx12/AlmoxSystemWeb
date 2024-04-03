import { api } from "../config/api";
import Cookies from "js-cookie";
import { IOrderTracking } from "../interfaces/ordertTraking";
/* eslint-disable @typescript-eslint/no-explicit-any */
export function useOrders() {
  const token = Cookies.get("refreshToken");

  async function userOrders(): Promise<IOrderTracking[]> {
    try {
      const allOrders = (await api(token).get("/orderTracking/user")).data
        .payload;

      return allOrders;
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }

  return { userOrders };
}
