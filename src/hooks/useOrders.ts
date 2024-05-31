import { api } from "../config/api";
import { IOrderTracking } from "../interfaces/ordertTraking";
/* eslint-disable @typescript-eslint/no-explicit-any */
export function useOrders() {
  async function userOrders(): Promise<IOrderTracking[]> {
    try {
      const allOrders = (await api.get("/orderTracking/user")).data.payload;

      return allOrders;
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }

  return { userOrders };
}
