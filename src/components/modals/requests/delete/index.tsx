import { Button, Modal, Spinner } from "react-bootstrap";
import { RequestType } from "../../../cards/newRequests";
import { FaExclamation, FaTrash } from "react-icons/fa6";
import { useMutation, useQueryClient } from "react-query";
import { useRequests } from "../../../../hooks/useRequests";

type Props = {
  show: boolean;
  handleClose: () => void;
  request: RequestType;
};

const DeleteRequestModal = ({ show, handleClose, request }: Props) => {
  const { deleteReq } = useRequests();
  const query = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(["deleteRequest"], deleteReq, {
    onSuccess: () =>
      Promise.all([
        query.invalidateQueries("allRequests"),
        query.invalidateQueries("userRequests"),
        handleClose(),
      ]),
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton />

      <Modal.Body className="w-100 d-flex flex-column align-items-center gap-4">
        <h3 className="fs-2 fw-bold">Confirme para continuar!</h3>
        <FaExclamation
          style={{
            fontSize: "16rem",
            padding: "2rem",
            border: "3px solid red",
            borderRadius: "50%",
          }}
          className="text-danger"
        />
        <p>
          Tem certeza que deseja excluir a solicitação nº{" "}
          <b>{request.exitID}</b>?
        </p>
        <Button
          className="d-flex justify-content-center align-items-center gap-1"
          variant="outline-danger"
          onClick={async () => await mutateAsync(request._id)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              Deletando Usuário <Spinner size="sm" animation="border" />
            </>
          ) : (
            <>
              Confirmar Deleção <FaTrash />
            </>
          )}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteRequestModal;
