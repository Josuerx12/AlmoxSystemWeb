/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form, Spinner } from "react-bootstrap";
import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  NewUserCredentials,
  useAdminCommands,
} from "../../../../hooks/useAdminCommands";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { toast } from "react-toastify";

type MutationError = {
  name: { msg: string };
  login: { msg: string };
  email: { msg: string };
  phone: { msg: string };
  password: { msg: string };
  confirmPassword: { msg: string };
};

type Props = {
  show: boolean;
  handleClose: () => void;
};

const NewUserModal = ({ show, handleClose }: Props) => {
  const { createUser } = useAdminCommands();

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      login: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      almox: false,
      admin: false,
      requester: true,
    },
  });

  const query = useQueryClient();

  const { mutateAsync, isLoading, error, reset } = useMutation<
    any,
    MutationError,
    NewUserCredentials
  >(["newUser"], createUser, {
    onSuccess: (data) =>
      Promise.all([
        query.invalidateQueries("users"),
        cleanCredentials(),
        handleClose(),
        toast.success(data),
      ]),
  });

  function cleanCredentials() {
    setValue("name", "");
    setValue("login", "");
    setValue("email", "");
    setValue("phone", "");
    setValue("password", "");
    setValue("confirmPassword", "");
    setValue("almox", false);
    setValue("admin", false);
    setValue("requester", true);
    reset();
  }

  async function submitNewUser(data: any) {
    await mutateAsync(data);
  }

  const ref = useRef<HTMLFormElement | null>(null);

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        cleanCredentials();
      }}
      backdrop="static"
      size="xl"
      keyboard={true}
    >
      <Modal.Header closeButton={!isLoading}>
        <Modal.Title>Novo Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="d-flex flex-column gap-3"
          ref={ref}
          onSubmit={handleSubmit(submitNewUser)}
        >
          <Form.Group className="d-flex gap-2 flex-wrap">
            <Form.Group style={{ flexBasis: "200px", flexGrow: "1" }}>
              <Form.Label>Nome do Usuário</Form.Label>
              <Form.Control
                {...register("name")}
                type="text"
                placeholder="Ex.: João Victor"
              />
              {error?.name && (
                <Form.Text className="text-danger fw-bold">
                  {error.name.msg}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group style={{ flexBasis: "200px", flexGrow: "1" }}>
              <Form.Label>Telefone do Usuário</Form.Label>
              <Form.Control
                {...register("phone")}
                type="number"
                placeholder="Ex.: 22997979633"
              />
              {error?.phone && (
                <Form.Text className="text-danger fw-bold">
                  {error.phone.msg}
                </Form.Text>
              )}
            </Form.Group>
          </Form.Group>

          <Form.Group className="d-flex gap-2 flex-wrap">
            <Form.Group style={{ flexBasis: "250px", flexGrow: "1" }}>
              <Form.Label>Login de Acesso do Usuário</Form.Label>
              <Form.Control
                {...register("login")}
                type="text"
                placeholder="Ex.: joao.victor"
              />
              {error?.login && (
                <Form.Text className="text-danger fw-bold">
                  {error.login.msg}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group style={{ flexBasis: "250px", flexGrow: "1" }}>
              <Form.Label>Email do Usuário</Form.Label>
              <Form.Control
                {...register("email")}
                type="email"
                placeholder="Ex.: johndoe@email.com.br"
              />
              {error?.email && (
                <Form.Text className="text-danger fw-bold">
                  {error.email.msg}
                </Form.Text>
              )}
            </Form.Group>
          </Form.Group>

          <Form.Group className="d-flex gap-2 flex-wrap">
            <Form.Group style={{ flexBasis: "200px", flexGrow: "1" }}>
              <Form.Label>Senha do Usuário</Form.Label>
              <Form.Control
                type="password"
                autoSave="password"
                {...register("password")}
                placeholder="*********"
              />
              {error?.password && (
                <Form.Text className="text-danger fw-bold">
                  {error.password.msg}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group style={{ flexBasis: "200px", flexGrow: "1" }}>
              <Form.Label>Confirmar Senha</Form.Label>
              <Form.Control
                type="password"
                {...register("confirmPassword")}
                placeholder="*********"
              />
              {error?.confirmPassword && (
                <Form.Text className="text-danger fw-bold">
                  {error.confirmPassword.msg}
                </Form.Text>
              )}
            </Form.Group>
          </Form.Group>

          <Form.Group className="w-100 d-flex justify-content-center">
            <Form.Group className="d-flex gap-3">
              <Form.Group className="d-flex flex-column align-items-center">
                <Form.Label>Almoxarife?</Form.Label>
                <Form.Check // prettier-ignore
                  onChange={(e) => {
                    setValue("almox", e.target.checked);
                  }}
                  type="switch"
                  label={watch("almox") ? "Sim" : "Não"}
                />
              </Form.Group>
              <hr className="border border-dark" />
              <Form.Group className="d-flex flex-column align-items-center">
                <Form.Label>Administrador?</Form.Label>
                <Form.Check // prettier-ignore
                  onChange={(e) => {
                    setValue("admin", e.target.checked);
                  }}
                  type="switch"
                  label={watch("admin") ? "Sim" : "Não"}
                />
              </Form.Group>
            </Form.Group>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="d-flex gap-1 align-items-center justify-content-center"
          disabled={isLoading}
          onClick={() => {
            handleClose();
            cleanCredentials();
          }}
        >
          <TiCancel style={{ fontSize: "1.3rem" }} />
          Cancelar
        </Button>
        <Button
          variant="primary"
          className="d-flex gap-1 align-items-center justify-content-center"
          disabled={isLoading}
          onClick={() => ref.current?.requestSubmit()}
        >
          {isLoading ? (
            <>
              Cadastrando <Spinner animation="border" size="sm" />
            </>
          ) : (
            <>
              <FaSave />
              Cadastrar
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewUserModal;
