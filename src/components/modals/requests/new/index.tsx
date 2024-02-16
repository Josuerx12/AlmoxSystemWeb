/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal } from "react-bootstrap";
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
  desc: string;
};

const NewRequest = ({ show, handleClose }: Props) => {
  const { newReq } = useRequests();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      exitID: 0,
      desc: "",
    },
  });

  const query = useQueryClient();

  function cleanCredentials() {
    setValue("exitID", 0);
    setValue("desc", "");
  }

  const mutation = useMutation<any, any>(
    ["NovaReq"],
    (data: any) => newReq(data),
    {
      onSuccess: () =>
        Promise.all([
          handleClose(),
          cleanCredentials(),
          query.invalidateQueries("allReq"),
          query.invalidateQueries("userRequests"),
        ]),
    }
  );

  async function onSubmit(data: any, e: FormEvent) {
    e.preventDefault();
    await mutation.mutateAsync(data);
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
          </Form.Group>

          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control as="textarea" rows={5} {...register("desc")} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <TiCancel style={{ fontSize: "1.3rem" }} /> Cancelar
        </Button>
        <Button variant="primary" onClick={() => ref.current?.requestSubmit()}>
          <FaSave /> Cadastrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewRequest;
