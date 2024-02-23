import { FormEvent, useRef } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { RequestType } from "../../../cards/newRequests";
import { useRequests } from "../../../../hooks/useRequests";
import { useMutation, useQueryClient } from "react-query";
import { FaCheck } from "react-icons/fa";

type Props = {
  show: boolean;
  handleClose: () => void;
  request: RequestType;
};

const CancelReqConfirmation = ({ show, handleClose, request }: Props) => {
  const { cancelReq } = useRequests();

  const query = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(["cancelReq"], cancelReq, {
    onSuccess: () =>
      Promise.all([
        handleClose(),
        query.invalidateQueries("allRequests"),
        query.invalidateQueries("usersRequests"),
      ]),
  });

  const ref = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    await mutateAsync(request._id);
  }

  return (
    <Modal onHide={handleClose} show={show} size="lg">
      <Modal.Header closeButton />
      <Modal.Body className="d-flex flex-column gap-3">
        <h3>
          Confirmar Cancelamento - ID: <b>{request.exitID}</b>
        </h3>
        <Form ref={ref} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Motivo do Cancelamento</Form.Label>
            <Form.Control
              as="textarea"
              disabled
              placeholder="ID De saída informada incorretamente!"
              rows={5}
              value={request.reason}
            />
          </Form.Group>
        </Form>
        <div className="d-flex w-100 justify-content-center gap-3">
          <Button
            variant="outline-secondary"
            className="d-flex align-items-center gap-2 justify-content-center"
            disabled={isLoading}
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            variant="outline-danger"
            className="d-flex align-items-center gap-2 justify-content-center"
            disabled={isLoading}
            onClick={() => ref.current?.requestSubmit()}
          >
            {isLoading ? (
              <>
                Cancelando <Spinner animation="border" size="sm" />
              </>
            ) : (
              <>
                <FaCheck /> Confirmar
              </>
            )}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CancelReqConfirmation;
