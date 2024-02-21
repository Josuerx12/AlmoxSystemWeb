import { useState } from "react";
import { RequestDetails } from "../../modals/requests/details";

type RequestedBy = {
  id: string;
  name: string;
  login: string;
  phone: string;
  email: string;
};

type SeparetedBy = {
  id?: string;
  name?: string;
  login?: string;
  phone?: string;
  email?: string;
};

type DispatchedBy = {
  id?: string;
  name?: string;
  login?: string;
  phone?: string;
  email?: string;
};

type CollectedBy = {
  name?: string;
  document?: string;
};

export interface RequestType {
  _id: string;
  requestedBy: RequestedBy;
  status: string;
  exitID: number;
  desc: string;
  separetedBy: SeparetedBy;
  separetedAt: string;
  dispatchedBy: DispatchedBy;
  collectedBy: CollectedBy;
  collectedAt: string;
  createdAt: string;
  updatedAt: string;
}

const NewRequetCard = ({ request }: { request: RequestType }) => {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow((prev) => !prev);
  }

  const createdAtSplited = request.createdAt.split("T")[0].split("-");

  return (
    <>
      <RequestDetails show={show} handleClose={handleClose} request={request} />
      <div
        onClick={handleClose}
        className="d-flex flex-column justify-content-center p-2 mx-auto rounded border newRequestCard bg-light"
        style={{ width: "90%", position: "relative" }}
      >
        <h6 className="d-flex gap-1">
          <b style={{ whiteSpace: "nowrap" }}>ID de Saída:</b>{" "}
          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {request.exitID}
          </span>
        </h6>
        <p className="d-flex gap-1">
          {request.desc && (
            <>
              <b>Desc:</b>{" "}
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                {request.desc}
              </span>
            </>
          )}
        </p>
        <span style={{ fontSize: ".825rem" }}>
          Solicitado: {createdAtSplited[2]}/{createdAtSplited[1]}/
          {createdAtSplited[0]}
        </span>
      </div>
    </>
  );
};

export default NewRequetCard;
