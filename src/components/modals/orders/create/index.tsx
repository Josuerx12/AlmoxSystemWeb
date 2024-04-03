/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Select from "react-select";
import { useAlmox } from "../../../../hooks/useAlmox";
import { useAdminCommands } from "../../../../hooks/useAdminCommands";

type Props = {
  show: boolean;
  handleClose: () => void;
};

interface ICredentials {
  ownerOfTrackingId: string;
  idDeCompra: string;
  message: string;
}
type MutationError = {
  idDeCompra: { msg: string };
  collected: { msg: string };
  message: { msg: string };
  ownerOfTrackingId: { msg: string };
};

const CreateNewOrder = ({ show, handleClose }: Props) => {
  const { handleSubmit, register, setValue, reset } = useForm<ICredentials>();
  const { fetchUser } = useAdminCommands();

  const { createNewOrder } = useAlmox();

  const query = useQueryClient();

  const {
    mutateAsync,
    isLoading,
    error,
    reset: resetMutation,
  } = useMutation<any, MutationError, FormData>(
    "createOrderNotify",
    createNewOrder,
    {
      onSuccess: () => {
        handleClose();
        reset();
        query.invalidateQueries("Orders");
      },
    }
  );

  const users = useQuery("users", fetchUser);

  const ref = useRef<HTMLFormElement>(null);

  async function onSubmit(data: ICredentials) {
    const formData = new FormData();

    if (data.idDeCompra.length > 0)
      formData.append("idDeCompra", data.idDeCompra);
    if (data.message.length > 0) formData.append("message", data.message);
    if (data.ownerOfTrackingId.length > 0)
      formData.append("ownerOfTrackingId", data.ownerOfTrackingId);

    await mutateAsync(formData);
  }

  return (
    <Modal
      onHide={() => {
        handleClose();
        reset();
        resetMutation();
      }}
      backdrop="static"
      size="lg"
      show={show}
    >
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
            <Form.Label>ID de Compra</Form.Label>
            <Form.Control type="number" {...register("idDeCompra")} />
            {error?.idDeCompra && (
              <Form.Text className="text-danger fw-bold">
                {error.idDeCompra.msg}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Dono da Solicitação</Form.Label>
            <Select
              onChange={(e) => {
                if (e) {
                  setValue("ownerOfTrackingId", e?.value);
                }
              }}
              options={users.data?.map((user) => ({
                label: `${user.name} | ${user.email}`,
                value: user._id,
              }))}
            />
            {error?.ownerOfTrackingId && (
              <Form.Text className="text-danger fw-bold">
                {error.ownerOfTrackingId.msg}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Mensagem</Form.Label>
            <Form.Control as="textarea" rows={7} {...register("message")} />
            {error?.message && (
              <Form.Text className="text-danger fw-bold">
                {error.message.msg}
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
            resetMutation();
            reset();
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

export default CreateNewOrder;
