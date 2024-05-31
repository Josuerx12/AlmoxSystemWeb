/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewReqCredentials } from "../components/modals/requests/new";
import { api } from "../config/api";

export const useRequests = () => {
  async function fetch() {
    try {
      const res = await api.get("/user/requests");
      const data = await res.data.payload;

      return data;
    } catch (error: any) {
      throw error;
    }
  }

  async function newReq(data: NewReqCredentials) {
    try {
      const res = await api.post("/requests/new", data);
      return res;
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }

  async function requestCancelReq({
    id,
    reason,
  }: {
    id: string;
    reason: string;
  }) {
    try {
      const res = await api.put(`/requests/requestCancel/${id}`, reason);
      return res;
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }
  async function cancelReq(id: string) {
    try {
      const res = await api.put(`/requests/cancel/${id}`);
      return res;
    } catch (error: any) {
      throw error.response.data.errors;
    }
  }
  async function deleteReq(id: string) {
    try {
      const res = await api.delete(`/requests/${id}`);
      return res;
    } catch (error: any) {
      throw error;
    }
  }

  return { fetch, newReq, requestCancelReq, cancelReq, deleteReq };
};
