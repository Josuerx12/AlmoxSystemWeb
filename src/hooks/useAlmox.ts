/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import { api } from "../config/api";
import Cookies from "js-cookie";
import { IOrderTracking } from "../interfaces/ordertTraking";

export const useAlmox = () => {
  const token = Cookies.get("refreshToken");

  async function fetchAllRequests() {
    try {
      const res = await api(token).get("/requests/all");
      return res.data.payload;
    } catch (error: any) {
      throw error.message;
    }
  }

  async function startSeparation(id: string) {
    try {
      await api(token).put(`/requests/inSeparation/${id}`);
    } catch (error: any) {
      throw error.message;
    }
  }

  async function awaitingCollection(id: string) {
    try {
      await api(token).put(`/requests/separated/${id}`);
    } catch (error: any) {
      throw error.message;
    }
  }

  async function collected({
    id,
    collectorCredentials,
  }: {
    id: string;
    collectorCredentials: { name: string; document: string };
  }) {
    try {
      await api(token).post(`/requests/collected/${id}`, collectorCredentials);
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }

  async function fetchAllOrders(): Promise<IOrderTracking[]> {
    try {
      const allOrders = (await api(token).get("/orderTracking/")).data.payload;

      return allOrders;
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }

  async function createNewOrder(formData: FormData): Promise<string> {
    try {
      const payload = (await api(token).post("/orderTracking/", formData)).data
        .payload;

      return payload;
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }
  async function deliverOrder(id: string): Promise<string> {
    try {
      const credentials = {
        collected: true,
      };

      (await api(token).patch("/orderTracking/" + id, credentials)).data
        .payload;

      return "Entrega realizada com sucesso!";
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }

  return {
    fetchAllRequests,
    fetchAllOrders,
    awaitingCollection,
    startSeparation,
    collected,
    createNewOrder,
    deliverOrder,
  };
};
