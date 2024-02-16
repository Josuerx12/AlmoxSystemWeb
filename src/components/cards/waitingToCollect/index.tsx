import { useState } from "react";
import RequestDetails from "../../modals/requests/details";
import { RequestType } from "../newRequests";

const WaitingToCollectCard = ({ request }: { request: RequestType }) => {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow((prev) => !prev);
  }

  return (
    <>
      <RequestDetails show={show} handleClose={handleClose} request={request} />
      <div
        onClick={handleClose}
        className="d-flex flex-column justify-content-center p-2 mx-auto rounded border waitingToCollect bg-light"
        style={{
          width: "90%",
          position: "relative",
        }}
      >
        <h6>
          ID de Saída: <b>{request.exitID}</b>
        </h6>
        <p>
          <b>Desc</b>: {request.desc}
        </p>
        <span style={{ fontSize: ".825rem" }}>
          Solicitado: {new Date(request.createdAt).toLocaleString("pt-BR")}
        </span>
        <span style={{ fontSize: ".825rem" }}>
          Separado: {new Date(request.separetedAt).toLocaleString("pt-BR")}
        </span>
      </div>
    </>
  );
};

export default WaitingToCollectCard;
