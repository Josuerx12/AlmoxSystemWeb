import { Button, Modal, Spinner } from "react-bootstrap";
import { RequestType } from "../../../cards/newRequests";
import { FaCheck, FaCheckCircle, FaExclamation } from "react-icons/fa";
import { useAlmox } from "../../../../hooks/useAlmox";
import { useMutation, useQueryClient } from "react-query";

type Props = {
  show: boolean;
  handleClose: () => void;
  request: RequestType;
};

const InSeparationAlert = ({ show, handleClose, request }: Props) => {
  const { startSeparation } = useAlmox();

  const query = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    ["startSeparation"],
    () => startSeparation(request._id),
    {
      onSuccess: () =>
        Promise.all([
          query.invalidateQueries("allRequests"),
          query.invalidateQueries("userRequests"),
          handleClose(),
        ]),
    }
  );

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton />

      <Modal.Body className="w-100 d-flex flex-column align-items-center gap-4">
        <h3 className="fs-2 fw-bold">Confirme para continuar!</h3>

        <FaExclamation
          style={{
            fontSize: "16rem",
            padding: "2rem",
            border: "3px solid #ffc107",
            borderRadius: "50%",
          }}
          className="text-warning"
        />

        <p>
          Tem certeza que deseja começar a separação da ID de saída numero:{" "}
          <b> {request.exitID} </b>?
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          className="d-flex justify-content-center align-items-center gap-1"
          variant="outline-success"
          onClick={async () => await mutateAsync()}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              Iniciando Separação <Spinner size="sm" animation="border" />
            </>
          ) : (
            <>
              Confirmar Inicio da Separação <FaCheckCircle />
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InSeparationAlert;
