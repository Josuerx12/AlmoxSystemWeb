import { Button } from "react-bootstrap";
import { FaFilter, FaPlus } from "react-icons/fa";
import NewRequest from "../../components/modals/requests/new";
import { useState } from "react";
import { useQuery } from "react-query";
import { useRequests } from "../../hooks/useRequests";
import NewRequetCard, { RequestType } from "../../components/cards/newRequests";

const RequestsPage = () => {
  const { fetch } = useRequests();

  const requests = useQuery<RequestType[]>(["userRequests"], fetch);
  const [isRequesting, setIsRequesting] = useState(false);

  function handleCloseRequesting() {
    setIsRequesting((prev) => !prev);
  }

  return (
    <>
      <NewRequest show={isRequesting} handleClose={handleCloseRequesting} />
      <section className="me-3 ms-3" style={{ flex: "1" }}>
        <h3 className="text-center fw-bold fs-2">Solicitações</h3>
        <div className="d-flex justify-content-end gap-2 mb-3">
          <Button
            variant="primary"
            className="d-flex gap-2 align-items-center justify-content-center"
          >
            <FaFilter /> Filtrar
          </Button>
          <Button
            onClick={handleCloseRequesting}
            className="d-flex gap-2 align-items-center justify-content-center"
            variant="dark"
          >
            <FaPlus /> Nova Solicitação
          </Button>
        </div>
        <div
          className="d-flex justify-content-between gap-3 bg-light p-3 rounded border"
          style={{ overflowY: "auto" }}
        >
          <div
            className=" d-flex flex-column margin-auto gap-3 border rounded bg-white p-2"
            style={{
              minWidth: "300px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
            }}
          >
            <h5 className="text-center fw-bold">Novas</h5>
            {requests.data
              ?.filter((r) => r.status === "Aguardando Separação")
              .map((req) => (
                <NewRequetCard key={req._id} request={req} />
              ))}
          </div>
          <div
            className=" d-flex flex-column align-items-center border rounded bg-white"
            style={{
              minWidth: "300px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
            }}
          >
            <h5>Em Separação</h5>
          </div>
          <div
            className=" d-flex flex-column align-items-center border rounded bg-white"
            style={{
              minWidth: "300px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
            }}
          >
            <h5>Aguardando Coleta</h5>
          </div>
          <div
            className=" d-flex flex-column align-items-center border rounded bg-white"
            style={{
              minWidth: "300px",
              flex: "1",
              height: "70dvh",
              overflowX: "auto",
            }}
          >
            <h5>Coletadas</h5>
          </div>
        </div>
      </section>
    </>
  );
};

export { RequestsPage };
