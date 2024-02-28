/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { useMutation, useQueryClient } from "react-query";
import { useRequests } from "../../../../hooks/useRequests";
import { useRef } from "react";

type Props = {
  show: boolean;
  handleClose: () => void;
};

export type NewReqCredentials = {
  exitID: number;
  collectForecast: Date;
  desc: string;
};

export type MutationError = {
  exitID: { msg: string };
  collectForecast: { msg: string };
  desc: { msg: string };
};

const NewRequest = ({ show, handleClose }: Props) => {
  const { newReq } = useRequests();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      exitID: undefined,
      collectForecast: undefined,
      desc: undefined,
    },
  });

  const query = useQueryClient();

  const { mutateAsync, isLoading, error, reset } = useMutation<
    any,
    MutationError,
    NewReqCredentials
  >(["NovaReq"], (data) => newReq(data), {
    onSuccess: () =>
      Promise.all([
        handleClose(),
        cleanCredentials(),
        query.invalidateQueries("allRequests"),
        query.invalidateQueries("userRequests"),
      ]),
  });

  function cleanCredentials() {
    setValue("exitID", undefined);
    setValue("collectForecast", undefined);
    setValue("desc", undefined);
    reset();
  }

  async function onSubmit(data: any) {
    await mutateAsync(data);
  }

  const ref = useRef<HTMLFormElement | null>(null);

  return (
    <Modal onHide={handleClose} backdrop="static" size="lg" show={show}>
      <Modal.Header closeButton>
        <h3>Nova solicitação de separação de materiais</h3>
      </Modal.Header>

      <Modal.Body>
        <Form
          ref={ref}
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-column gap-3"
        >
          <Form.Group>
            <Form.Label>ID de Saída</Form.Label>
            <Form.Control type="number" {...register("exitID")} />
            {error?.exitID && (
              <Form.Text className="text-danger fw-bold">
                {error.exitID.msg}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Previsão de Coleta</Form.Label>
            <Form.Control type="date" {...register("collectForecast")} />
            {error?.collectForecast && (
              <Form.Text className="text-danger fw-bold">
                {error.collectForecast.msg}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control as="textarea" rows={5} {...register("desc")} />
            {error?.desc && (
              <Form.Text className="text-danger fw-bold">
                {error.desc.msg}
              </Form.Text>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            handleClose();
            cleanCredentials();
          }}
        >
          <TiCancel style={{ fontSize: "1.3rem" }} /> Cancelar
        </Button>

        <Button
          variant="primary"
          disabled={isLoading}
          onClick={() => ref.current?.requestSubmit()}
        >
          {isLoading ? (
            <>
              Cadastrando <Spinner size="sm" animation="border" />
            </>
          ) : (
            <>
              <FaSave /> Cadastrar
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewRequest;
