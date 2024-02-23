/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { RequestType } from "../../../cards/newRequests";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { useRequests } from "../../../../hooks/useRequests";

type Props = {
  show: boolean;
  handleClose: () => void;
  request: RequestType;
};

type MutationProps = {
  id: string;
  reason: string;
};

type MutationError = {
  reason: { msg: string };
};

const RequestCancelReqConfirmation = ({
  show,
  handleClose,
  request,
}: Props) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      reason: "",
    },
  });

  const query = useQueryClient();

  const { requestCancelReq } = useRequests();

  function cleanReasonAndClose() {
    setValue("reason", "");
    handleClose();
  }

  const { mutateAsync, isLoading, error } = useMutation<
    any,
    MutationError,
    MutationProps
  >(["requestCancelReq"], requestCancelReq, {
    onSuccess: () =>
      Promise.all([
        cleanReasonAndClose(),
        query.invalidateQueries("allRequests"),
        query.invalidateQueries("userRequests"),
      ]),
  });

  async function submitRequestCancelReq(reason: any) {
    await mutateAsync({ id: request._id, reason });
  }

  const ref = useRef<HTMLFormElement | null>(null);

  return (
    <Modal onHide={cleanReasonAndClose} show={show} size="lg">
      <Modal.Header closeButton />
      <Modal.Body className="d-flex flex-column gap-3">
        <h3>
          Solicitar cancelamento - ID: <b>{request.exitID}</b>
        </h3>
        <Form ref={ref} onSubmit={handleSubmit(submitRequestCancelReq)}>
          <Form.Group>
            <Form.Label>Motivo do Cancelamento</Form.Label>
            <Form.Control
              {...register("reason")}
              as="textarea"
              placeholder="ID De saída informada incorretamente!"
              rows={5}
            />
            {error?.reason && (
              <Form.Text className="text-danger fw-bold">
                {error.reason.msg}
              </Form.Text>
            )}
          </Form.Group>
        </Form>
        <div className="d-flex w-100 justify-content-center gap-3">
          <Button
            variant="outline-secondary"
            className="d-flex align-items-center gap-2 justify-content-center"
            disabled={isLoading}
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
                <FaTrash /> Confirmar
              </>
            )}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RequestCancelReqConfirmation;
