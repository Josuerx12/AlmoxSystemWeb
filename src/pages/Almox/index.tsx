import { Button } from "react-bootstrap";
import { FaFileExcel, FaFilter } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { useQuery, useQueryClient } from "react-query";
import { SkeletonCard } from "../../components/skelletons/card/styles";
import NewRequetCard, { RequestType } from "../../components/cards/newRequests";
import { useAlmox } from "../../hooks/useAlmox";
import { useState } from "react";
import { useFilter } from "../../hooks/useFilter";
import InSeparationReqCard from "../../components/cards/isSeparationReq";
import WaitingToCollectCard from "../../components/cards/waitingToCollect";
import CollectedReqCard from "../../components/cards/collectedReq";
import CancelledReqCard from "../../components/cards/cancelledReq";
import RequestFilters, {
  RequestFiltersProps,
} from "../../components/filters/requestFilters";
import WaitingToCancelReqCard from "../../components/cards/waitingToCancelReq";
import { useGenerateXlsx } from "../../hooks/useGenerateXlsx";
import { toast } from "react-toastify";

const AlmoxPage = () => {
  const [filters, setFilters] = useState<RequestFiltersProps>({
    exitID: undefined,
    startPeriod: "",
    endPeriod: "",
  });
  const [isFiltering, setIsFiltering] = useState(false);
  const { fetchAllRequests } = useAlmox();
  const query = useQueryClient();
  const allReq = useQuery<RequestType[]>(["allRequests"], fetchAllRequests, {
    refetchInterval: 300000,
  });

  const { generate, downloadXlsx } = useGenerateXlsx();

  const filteredReqs = allReq.data?.filter((req) => {
    return (
      (!filters.exitID ||
        req.exitID.toString().includes(filters.exitID.toString())) &&
      (!filters.startPeriod ||
        new Date(req.createdAt) >= new Date(filters.startPeriod)) &&
      (!filters.endPeriod ||
        new Date(req.createdAt) <= new Date(filters.endPeriod))
    );
  });

  const {
    newReq,
    canceledReq,
    collectedReq,
    inSeparationReq,
    waitingToCollectReq,
    requestsToCancelReq,
  } = useFilter(
    filteredReqs?.sort((fr1, fr2) => {
      if (!fr1.collectForecast) {
        fr1.collectForecast = new Date("2024-02-01").toString();
      }
      if (!fr2.collectForecast) {
        fr2.collectForecast = new Date("2024-02-01").toString();
      }

      const collectForecastfr1 = new Date(
        fr1.collectForecast.split("T")[0].split("-")[0] +
          "-" +
          Number(fr1.collectForecast.split("T")[0].split("-")[1]) +
          "-" +
          fr1.collectForecast.split("T")[0].split("-")[2]
      ).getTime();
      const collectForecastfr2 = new Date(
        fr2.collectForecast.split("T")[0].split("-")[0] +
          "-" +
          Number(fr2.collectForecast.split("T")[0].split("-")[1]) +
          "-" +
          fr2.collectForecast.split("T")[0].split("-")[2]
      ).getTime();

      return collectForecastfr1 - collectForecastfr2;
    })
  );

  return (
    <>
      <RequestFilters
        show={isFiltering}
        handleClose={() => setIsFiltering((prev) => !prev)}
        filters={filters}
        setFilters={setFilters}
      />
      <section className="m-3" style={{ flex: "1" }}>
        <h3 className="text-center fw-bold fs-2">Processos de Saída</h3>
        <div className="d-flex justify-content-between gap-2 mb-3"
          <div className="d-flex gap-2 mb-3">
            <Button
              variant="dark"
              onClick={() => query.resetQueries("allRequests")}
              className="d-flex gap-2 align-items-center justify-content-center btn-refresh"
            >
              <LuRefreshCcw />
            </Button>
            <Button
              variant="success"
              className="d-flex  gap-2 align-items-center justify-content-center"
              onClick={() => {
                generate(filteredReqs)
                  .then((blob) => {
                    downloadXlsx(
                      blob,
                      `Relatorio ${new Date(Date.now()).toLocaleString(
                        "pt-BR"
                      )}.xlsx`
                    );
                    toast.success(
                      "Relatorio baseados nos filtros gerados com sucesso!"
                    );
                  })
                  .catch((err) => {
                    console.error(err);
                    toast.error(
                      "Erro ao gerar relatorio tente novamente mais tarde!"
                    );
                  });
              }}
            >
              <FaFileExcel /> Exportar Relatorio
            </Button>
            <Button
              variant="primary"
              className="d-flex gap-2 align-items-center justify-content-center"
              onClick={() => setIsFiltering((prev) => !prev)}
            >
              <FaFilter /> Filtrar
            </Button>
          </div>
        </div>

        <div
          className="d-flex justify-content-between gap-3 bg-light p-3 rounded border"
          style={{ overflowY: "auto" }}
        >
          <div
            className="d-flex flex-column gap-3 border rounded mx-auto bg-white"
            style={{
              minWidth: "350px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
              paddingBottom: "1rem",
            }}
          >
            <h5 className="text-center fw-bold bg-light text-dark sticky-top p-2 shadow-sm">
              Novas
            </h5>
            {allReq.isLoading ? (
              Array.from(Array(4)).map((_, i) => {
                return <SkeletonCard key={i} />;
              })
            ) : newReq && newReq.length > 0 ? (
              newReq.map((req) => <NewRequetCard key={req._id} request={req} />)
            ) : (
              <p className="text-center fw-bold text-secondary">
                Nenhuma requisição realizada!
              </p>
            )}
          </div>
          {requestsToCancelReq && requestsToCancelReq.length > 0 && (
            <div
              className="d-flex flex-column gap-3 border rounded mx-auto bg-white"
              style={{
                minWidth: "350px",
                flex: "1",
                height: "70dvh",
                overflowX: "auto",
              }}
            >
              <h5 className="text-center fw-bold bg-light text-dark sticky-top p-2 shadow-sm">
                Aguardando Cancelamento
              </h5>
              {allReq.isLoading
                ? Array.from(Array(4)).map((_, i) => {
                    return <SkeletonCard key={i} />;
                  })
                : requestsToCancelReq.map((req) => (
                    <WaitingToCancelReqCard key={req._id} request={req} />
                  ))}
            </div>
          )}
          <div
            className=" d-flex flex-column margin-auto gap-3 border rounded bg-white"
            style={{
              minWidth: "350px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
              paddingBottom: "1rem",
            }}
          >
            <h5 className="text-center fw-bold bg-light text-dark sticky-top p-2 shadow-sm">
              Em Separação
            </h5>

            {allReq.isLoading ? (
              Array.from(Array(4)).map((_, i) => {
                return <SkeletonCard key={i} />;
              })
            ) : inSeparationReq && inSeparationReq.length > 0 ? (
              inSeparationReq.map((r) => (
                <InSeparationReqCard key={r._id} request={r} />
              ))
            ) : (
              <p className="text-center fw-bold text-secondary">
                Nenhuma requisição realizada!
              </p>
            )}
          </div>
          <div
            className=" d-flex flex-column margin-auto gap-3 border rounded bg-white"
            style={{
              minWidth: "350px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
              paddingBottom: "1rem",
            }}
          >
            <h5 className="text-center fw-bold bg-light text-dark sticky-top p-2 shadow-sm">
              Aguardando Coleta
            </h5>

            {allReq.isLoading ? (
              Array.from(Array(4)).map((_, i) => {
                return <SkeletonCard key={i} />;
              })
            ) : waitingToCollectReq && waitingToCollectReq.length > 0 ? (
              waitingToCollectReq.map((r) => (
                <WaitingToCollectCard key={r._id} request={r} />
              ))
            ) : (
              <p className="text-center fw-bold text-secondary">
                Nenhuma requisição realizada!
              </p>
            )}
          </div>
          <div
            className=" d-flex flex-column margin-auto gap-3 border rounded bg-white "
            style={{
              minWidth: "350px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
              paddingBottom: "1rem",
            }}
          >
            <h5 className="text-center fw-bold bg-light text-dark sticky-top p-2 shadow-sm">
              Coletadas
            </h5>

            {allReq.isLoading ? (
              Array.from(Array(4)).map((_, i) => {
                return <SkeletonCard key={i} />;
              })
            ) : collectedReq && collectedReq.length ? (
              collectedReq.map((r) => (
                <CollectedReqCard request={r} key={r._id} />
              ))
            ) : (
              <p className="text-center fw-bold text-secondary">
                Nenhuma requisição realizada!
              </p>
            )}
          </div>

          {canceledReq && canceledReq.length > 0 && (
            <div
              className=" d-flex flex-column margin-auto gap-3 border rounded bg-white"
              style={{
                minWidth: "350px",
                flex: "1",
                height: "70dvh",
                overflowX: "auto",
              }}
            >
              <h5 className="text-center fw-bold bg-light text-dark sticky-top p-2 shadow-sm">
                Solicitações Canceladas
              </h5>
              {allReq.isLoading
                ? Array.from(Array(4)).map((_, i) => {
                    return <SkeletonCard key={i} />;
                  })
                : canceledReq.map((r) => (
                    <CancelledReqCard request={r} key={r._id} />
                  ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export { AlmoxPage };
