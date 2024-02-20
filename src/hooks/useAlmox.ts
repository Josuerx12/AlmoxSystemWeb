/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import { api } from "../config/api";
import Cookies from "js-cookie";

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

  return { fetchAllRequests, awaitingCollection, startSeparation, collected };
};
