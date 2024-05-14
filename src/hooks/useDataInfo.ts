import { RequestType } from "../components/cards/newRequests";
import { api } from "../config/api";
import Cookies from "js-cookie";

export type PeriodOfDataRequests = {
  startAt: string;
  endAt: string;
};

export type RequestByMonth = {
  _id: number;
  totalRequests: number;
};

export interface IRequestDataInfo {
  requestsByPeriod: RequestType[];
  requestsByMonth: RequestByMonth[];
  collectedRequestsByMonth: RequestByMonth[];
  emSeparacao: RequestType[];
  coletado: RequestType[];
  cancelada: RequestType[];
  aguardandoSeparacao: RequestType[];
  aguardandoCancelamento: RequestType[];
  aguardandoColeta: RequestType[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function useDataInfo() {
  const token = Cookies.get("refreshToken");

  async function fetchRequestsData(
    period: PeriodOfDataRequests
  ): Promise<IRequestDataInfo> {
    try {
      const res = await api(token).post("/requests/dataInfo", period);

      return res.data.payload;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  return { fetchRequestsData };
}
