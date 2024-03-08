import { Button } from "react-bootstrap";
import { FaFilter, FaPlus, FaWhatsapp } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import NewRequest from "../../components/modals/requests/new";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useRequests } from "../../hooks/useRequests";
import NewRequetCard, { RequestType } from "../../components/cards/newRequests";
import InSeparationReqCard from "../../components/cards/isSeparationReq";
import WaitingToCollectCard from "../../components/cards/waitingToCollect";
import CollectedReqCard from "../../components/cards/collectedReq";
import { SkeletonCard } from "../../components/skelletons/card/styles";
import { useFilter } from "../../hooks/useFilter";
import RequestFilters, {
  RequestFiltersProps,
} from "../../components/filters/requestFilters";
import CancelledReqCard from "../../components/cards/cancelledReq";

const RequestsPage = () => {
  const { fetch } = useRequests();
  const [filters, setFilters] = useState<RequestFiltersProps>({
    exitID: undefined,
    startPeriod: "",
    endPeriod: "",
  });

  const requests = useQuery<RequestType[]>(["userRequests"], fetch);

  const query = useQueryClient();

  const [isRequesting, setIsRequesting] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  function handleCloseRequesting() {
    setIsRequesting((prev) => !prev);
  }

  const filteredReqs = requests.data?.filter((req) => {
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
    inSeparationReq,
    collectedReq,
    waitingToCollectReq,
    canceledReq,
  } = useFilter(filteredReqs);

  return (
    <>
      <RequestFilters
        show={isFiltering}
        handleClose={() => setIsFiltering((prev) => !prev)}
        filters={filters}
        setFilters={setFilters}
      />
      <NewRequest show={isRequesting} handleClose={handleCloseRequesting} />
      <section className="m-3" style={{ flex: "1" }}>
        <h3 className="text-center fw-bold fs-2">Solicitações</h3>
        <div className="d-flex justify-content-end gap-2 mb-3">
          <Button
            variant="dark"
            onClick={() => query.resetQueries("userRequests")}
            title="Atualizar solicitações pendentes"
            className="d-flex gap-2 align-items-center justify-content-center btn-refresh"
          >
            <LuRefreshCcw />
          </Button>
          <Button
            className="d-flex gap-2 align-items-center justify-content-center"
            variant="outline-success"
            title="Caso não esteja recebendo as mensagens por whatsapp clique aqui e responda!"
            onClick={() => window.open("https://api.whatsapp.com/send/?phone=5521998208228&text=Quero+receber+notifica%C3%A7%C3%B5es+sobre+minhas+solicita%C3%A7%C3%B5es%21%21+&type=phone_number&app_absent=0", '_blank')}
          >
            <FaWhatsapp /> Acompanhar
          </Button>
          <Button
            onClick={() => setIsFiltering((prev) => !prev)}
            variant="primary"
            className="d-flex gap-2 align-items-center justify-content-center"
            title="Clique aqui para filtrar!"
          >
            <FaFilter /> Filtrar
          </Button>
          <Button
            onClick={handleCloseRequesting}
            className="d-flex gap-2 align-items-center justify-content-center"
            variant="success"
            title="Clique aqui para realizar uma nova solicitação!"
          >
            <FaPlus /> Nova Solicitação
          </Button>
        </div>
        <div
          className="d-flex justify-content-between gap-3 bg-light p-3 rounded border"
          style={{ overflowY: "auto" }}
        >
          <div
            className=" d-flex flex-column gap-3 border rounded bg-white"
            style={{
              minWidth: "350px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
            }}
          >
            <h5 className="text-center fw-bold bg-light text-dark sticky-top p-2 shadow-sm">
              Novas
            </h5>
            {requests.isLoading ? (
              Array.from(Array(4)).map((_, i) => {
                return <SkeletonCard key={i} />;
              })
            ) : newReq && newReq.length > 0 ? (
              newReq.map((req) => <NewRequetCard key={req._id} request={req} />)
            ) : (
              <p className="text-center fw-bold text-secondary">
                Nenhuma solicitação realizada!
              </p>
            )}
          </div>
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
              Em Separação
            </h5>

            {requests.isLoading ? (
              Array.from(Array(4)).map((_, i) => {
                return <SkeletonCard key={i} />;
              })
            ) : inSeparationReq && inSeparationReq.length > 0 ? (
              inSeparationReq.map((r) => (
                <InSeparationReqCard key={r._id} request={r} />
              ))
            ) : (
              <p className="text-center fw-bold text-secondary">
                Nenhuma solicitação realizada!
              </p>
            )}
          </div>
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
              Aguardando Coleta
            </h5>

            {requests.isLoading ? (
              Array.from(Array(4)).map((_, i) => {
                return <SkeletonCard key={i} />;
              })
            ) : waitingToCollectReq && waitingToCollectReq.length > 0 ? (
              waitingToCollectReq.map((r) => (
                <WaitingToCollectCard key={r._id} request={r} />
              ))
            ) : (
              <p className="text-center fw-bold text-secondary">
                Nenhuma solicitação realizada!
              </p>
            )}
          </div>
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
              Coletadas
            </h5>
            {requests.isLoading ? (
              Array.from(Array(4)).map((_, i) => {
                return <SkeletonCard key={i} />;
              })
            ) : collectedReq && collectedReq.length > 0 ? (
              collectedReq.map((r) => (
                <CollectedReqCard request={r} key={r._id} />
              ))
            ) : (
              <p className="text-center fw-bold text-secondary">
                Nenhuma solicitação realizada!
              </p>
            )}
          </div>
          {canceledReq && canceledReq.length > 0 && (
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
                Solicitações Canceladas
              </h5>
              {requests.isLoading
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

export { RequestsPage };
