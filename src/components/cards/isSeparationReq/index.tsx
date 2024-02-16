import { useState } from "react";
import { RequestType } from "../newRequests";
import RequestDetails from "../../modals/requests/details";

const InSeparationReqCard = ({ request }: { request: RequestType }) => {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow((prev) => !prev);
  }

  return (
    <>
      <RequestDetails show={show} handleClose={handleClose} request={request} />
      <div
        onClick={handleClose}
        className="d-flex flex-column justify-content-center p-2 mx-auto rounded border inSeparationReqCard bg-light"
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
      </div>
    </>
  );
};

export default InSeparationReqCard;
