import { useMemo } from "react";
import { RequestType } from "../components/cards/newRequests";

export const useFilter = (requests?: RequestType[]) => {
  const newReq = useMemo(
    () => requests?.filter((r) => r.status === "Aguardando Separação"),
    [requests]
  );
  const inSeparationReq = useMemo(
    () => requests?.filter((r) => r.status === "Em Separação"),
    [requests]
  );
  const waitingToCollectReq = useMemo(
    () => requests?.filter((r) => r.status === "Aguardando Coleta"),
    [requests]
  );
  const collectedReq = useMemo(
    () => requests?.filter((r) => r.status === "Coletado"),
    [requests]
  );

  const canceledReq = useMemo(
    () => requests?.filter((r) => r.status === "Solicitação Cancelada"),
    [requests]
  );

  return {
    newReq,
    inSeparationReq,
    waitingToCollectReq,
    collectedReq,
    canceledReq,
  };
};
