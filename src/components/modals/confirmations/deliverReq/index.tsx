/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { useAlmox } from "../../../../hooks/useAlmox";
import { useMutation, useQueryClient } from "react-query";
import { RequestType } from "../../../cards/newRequests";
import { useForm } from "react-hook-form";
import { useRef } from "react";

type Props = {
  show: boolean;
  handleClose: () => void;
  request: RequestType;
};

type MutationError = {
  name: { msg: string };
  document: { msg: string };
};

type ReceptorCredentials = {
  name: string;
  document: string;
};

const DeliverReqConfirmation = ({ show, handleClose, request }: Props) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      document: "",
    },
  });

  const { collected } = useAlmox();
  const query = useQueryClient();

  const { mutateAsync, isLoading, error } = useMutation<
    any,
    MutationError,
    ReceptorCredentials
  >(
    ["collectedReq"],
    (credentials) =>
      collected({ id: request._id, collectorCredentials: credentials }),
    {
      onSuccess: () =>
        Promise.all([
          query.invalidateQueries("allRequests"),
          query.invalidateQueries("userRequests"),
          handleClose(),
        ]),
      onError: (e) => console.log(e),
    }
  );

  const ref = useRef<HTMLFormElement | null>(null);

  async function submitDelivery(data: ReceptorCredentials) {
    await mutateAsync(data);
  }

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton />

      <Modal.Body className="w-100 d-flex flex-column align-items-center gap-4">
        <h3 className="fs-2 fw-bold">Confirme para continuar!</h3>

        <Form
          className="w-100"
          ref={ref}
          onSubmit={handleSubmit(submitDelivery)}
        >
          <Form.Group>
            <Form.Label>Nome do Receptor</Form.Label>
            <Form.Control
              {...register("name")}
              minLength={3}
              placeholder="Max"
              type="text"
              required
            />
            {error?.name && (
              <Form.Text className="text-danger fw-bold">
                {error.name.msg}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>CPF do Receptor</Form.Label>
            <Form.Control
              {...register("document")}
              minLength={3}
              placeholder="Max"
              type="text"
            />
            {error?.document && (
              <Form.Text className="text-danger fw-bold">
                {error.document.msg}
              </Form.Text>
            )}
          </Form.Group>
        </Form>

        <p>
          Você está entregando a id de saída numero: <b> {request.exitID}</b>.
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          className="d-flex justify-content-center align-items-center gap-1"
          variant="outline-success"
          onClick={() => ref.current?.requestSubmit()}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              Finalizando Entrega <Spinner size="sm" animation="border" />
            </>
          ) : (
            <>
              Confirmar Entrega <FaCheckCircle />
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeliverReqConfirmation;
