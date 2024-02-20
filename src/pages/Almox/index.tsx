import { Button } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { useQuery, useQueryClient } from "react-query";
import { SkeletonCard } from "../../components/skelletons/card/styles";
import NewRequetCard from "../../components/cards/newRequests";
import { useAlmox } from "../../hooks/useAlmox";
import { useState } from "react";
import { useFilter } from "../../hooks/useFilter";
import InSeparationReqCard from "../../components/cards/isSeparationReq";
import WaitingToCollectCard from "../../components/cards/waitingToCollect";
import CollectedReqCard from "../../components/cards/collectedReq";
import CancelledReqCard from "../../components/cards/cancelledReq";

const AlmoxPage = () => {
  const [filters, setFilters] = useState(false);
  const { fetchAllRequests } = useAlmox();
  const query = useQueryClient();
  const allReq = useQuery(["allRequests"], fetchAllRequests, {
    refetchInterval: 300000,
  });
  const {
    newReq,
    canceledReq,
    collectedReq,
    inSeparationReq,
    waitingToCollectReq,
  } = useFilter(allReq.data, filters);

  return (
    <>
      <section className="m-3" style={{ flex: "1" }}>
        <h3 className="text-center fw-bold fs-2">Almoxarifado - Dashboard</h3>
        <div className="d-flex justify-content-end gap-2 mb-3">
          <Button
            variant="dark"
            onClick={() => query.resetQueries("allRequests")}
            className="d-flex gap-2 align-items-center justify-content-center btn-refresh"
          >
            <LuRefreshCcw />
          </Button>
          <Button
            variant="primary"
            className="d-flex gap-2 align-items-center justify-content-center"
          >
            <FaFilter /> Filtrar
          </Button>
        </div>

        <div
          className="d-flex justify-content-between gap-3 bg-light p-3 rounded border"
          style={{ overflowY: "auto" }}
        >
          <div
            className=" d-flex flex-column gap-3 border rounded mx-auto bg-white p-2"
            style={{
              minWidth: "350px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
            }}
          >
            <h5 className="text-center fw-bold">Novas</h5>
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
          <div
            className=" d-flex flex-column margin-auto gap-3 border rounded bg-white p-2"
            style={{
              minWidth: "350px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
            }}
          >
            <h5 className="text-center fw-bold">Em Separação</h5>

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
            className=" d-flex flex-column margin-auto gap-3 border rounded bg-white p-2"
            style={{
              minWidth: "350px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
            }}
          >
            <h5 className="text-center fw-bold">Aguardando Coleta</h5>

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
            className=" d-flex flex-column margin-auto gap-3 border rounded bg-white p-2"
            style={{
              minWidth: "350px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
            }}
          >
            <h5 className="text-center fw-bold">Coletadas</h5>
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
          <div
            className=" d-flex flex-column margin-auto gap-3 border rounded bg-white p-2"
            style={{
              minWidth: "350px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
            }}
          >
            <h5 className="text-center fw-bold">Solicitações Canceladas</h5>
            {allReq.isLoading ? (
              Array.from(Array(4)).map((_, i) => {
                return <SkeletonCard key={i} />;
              })
            ) : canceledReq && canceledReq.length > 0 ? (
              canceledReq.map((r) => (
                <CancelledReqCard request={r} key={r._id} />
              ))
            ) : (
              <p className="text-center fw-bold text-secondary">
                Nenhuma requisição realizada!
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export { AlmoxPage };
