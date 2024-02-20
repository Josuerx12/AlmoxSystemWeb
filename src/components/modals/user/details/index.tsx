/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { User } from "../../../../interfaces/user";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { FaRegTrashAlt, FaPen, FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import DeleteUserConfirmation from "../../confirmations/deleteUser";
import { useMutation, useQueryClient } from "react-query";
import {
  UserEditCredentials,
  useAdminCommands,
} from "../../../../hooks/useAdminCommands";

type Props = {
  user: User;
  show: boolean;
  handleClose: () => void;
};

type DataMutationProps = {
  id: string;
  data: UserEditCredentials;
};
type ErrorMutationProps = {
  name: { msg: string };
  login: { msg: string };
  email: { msg: string };
  phone: { msg: string };
  password: { msg: string };
  confirmPassword: { msg: string };
};

const UserDetails = ({ user, show, handleClose }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { editUser } = useAdminCommands();

  const query = useQueryClient();

  const { mutateAsync, error, isLoading, reset } = useMutation<
    any,
    ErrorMutationProps,
    DataMutationProps
  >(["editUser"], editUser, {
    onSuccess: () =>
      Promise.all([
        resetData(),
        handleClose(),
        query.invalidateQueries("users"),
      ]),
  });

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: user.name,
      login: user.login,
      email: user.email,
      phone: user.phone,
      password: undefined,
      confirmPassword: undefined,
      almox: user.almox,
      admin: user.admin,
      requester: user.requester,
    },
  });

  function resetData() {
    setValue("name", user.name);
    setValue("login", user.login);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("password", undefined);
    setValue("confirmPassword", undefined);
    setValue("almox", user.almox);
    setValue("almox", user.almox);
    setValue("admin", user.admin);
    setValue("requester", user.requester);
    reset();
  }

  function cancellEditing() {
    resetData();
    setIsEditing((prev) => !prev);
  }

  const ref = useRef<HTMLFormElement | null>(null);

  async function submitEdit(data: any) {
    await mutateAsync({ id: user._id, data });
  }

  return (
    <>
      <DeleteUserConfirmation
        show={isDeleting}
        handleClose={() => setIsDeleting((prev) => !prev)}
        user={user}
      />
      <Modal
        size="lg"
        onHide={() => {
          handleClose();
          resetData();
        }}
        show={show}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <h3>
            Detalhes usuário: <b>{user.name}</b>
          </h3>
        </Modal.Header>

        <Modal.Body>
          {!isEditing && (
            <div className="d-flex gap-2 justify-content-end">
              <Button
                variant="outline-primary"
                className="d-flex gap-1 align-items-center justify-content-center"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                <FaPen /> Editar
              </Button>
              <Button
                variant="outline-danger"
                className="d-flex gap-1 align-items-center justify-content-center"
                onClick={() => setIsDeleting((prev) => !prev)}
              >
                <FaRegTrashAlt /> Deletar
              </Button>
            </div>
          )}
          <Form
            ref={ref}
            onSubmit={handleSubmit(submitEdit)}
            className="d-flex flex-column gap-3"
          >
            <Form.Group className="d-flex gap-2 flex-wrap">
              <Form.Group style={{ flexBasis: "200px", flexGrow: "1" }}>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  {...register("name")}
                  type="text"
                  disabled={!isEditing}
                />
                {error?.name && (
                  <Form.Text className="text-danger">
                    <span className="fw-bold">Error:</span>
                    {error?.name.msg}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group style={{ flexBasis: "200px", flexGrow: "1" }}>
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  {...register("phone")}
                  type="number"
                  disabled={!isEditing}
                />
                {error?.phone && (
                  <Form.Text className="text-danger">
                    <span className="fw-bold">Error:</span>
                    {error?.phone.msg}
                  </Form.Text>
                )}
              </Form.Group>
            </Form.Group>

            <Form.Group className="d-flex gap-2 flex-wrap">
              <Form.Group style={{ flexBasis: "200px", flexGrow: "1" }}>
                <Form.Label>Login</Form.Label>
                <Form.Control
                  {...register("login")}
                  type="text"
                  disabled={!isEditing}
                />
                {error?.login && (
                  <Form.Text className="text-danger">
                    <span className="fw-bold">Error:</span>
                    {error?.login.msg}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group style={{ flexBasis: "200px", flexGrow: "1" }}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  {...register("email")}
                  type="text"
                  disabled={!isEditing}
                />
                {error?.email && (
                  <Form.Text className="text-danger">
                    <span className="fw-bold">Error:</span>
                    {error?.email.msg}
                  </Form.Text>
                )}
              </Form.Group>
            </Form.Group>

            {isEditing && (
              <Form.Group className="d-flex gap-2 flex-wrap">
                <Form.Group style={{ flexBasis: "200px", flexGrow: "1" }}>
                  <Form.Label>Nova Senha</Form.Label>
                  <Form.Control
                    {...register("password")}
                    type="password"
                    autoSave="password"
                    placeholder="*********"
                  />
                  {error?.password && (
                    <Form.Text className="text-danger">
                      <span className="fw-bold">Error:</span>
                      {error?.password.msg}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group style={{ flexBasis: "200px", flexGrow: "1" }}>
                  <Form.Label>Confirmar Senha</Form.Label>
                  <Form.Control
                    {...register("confirmPassword")}
                    type="password"
                    placeholder="*********"
                  />
                  {error?.confirmPassword && (
                    <Form.Text className="text-danger">
                      <span className="fw-bold">Error:</span>
                      {error?.confirmPassword.msg}
                    </Form.Text>
                  )}
                </Form.Group>
              </Form.Group>
            )}

            <Form.Group className="w-100 d-flex justify-content-center">
              <Form.Group className="d-flex gap-3">
                <Form.Group className="d-flex flex-column align-items-center">
                  <Form.Label>Almoxarife?</Form.Label>
                  <Form.Check // prettier-ignore
                    defaultChecked={user.almox}
                    onChange={(e) => {
                      setValue("almox", e.target.checked);
                    }}
                    type="switch"
                    label={watch("almox") ? "Sim" : "Não"}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <hr className="border border-dark" />
                <Form.Group className="d-flex flex-column align-items-center">
                  <Form.Label>Administrador?</Form.Label>
                  <Form.Check // prettier-ignore
                    defaultChecked={user.admin}
                    onChange={(e) => {
                      setValue("admin", e.target.checked);
                    }}
                    type="switch"
                    label={watch("admin") ? "Sim" : "Não"}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Form.Group>
            </Form.Group>
          </Form>
        </Modal.Body>

        {isEditing && (
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              className="d-flex gap-1 align-items-center justify-content-center"
              onClick={cancellEditing}
              disabled={isLoading}
            >
              <TiCancel style={{ fontSize: "1.3rem" }} />
              Cancelar
            </Button>
            <Button
              variant="outline-primary"
              className="d-flex gap-1 align-items-center justify-content-center"
              disabled={isLoading}
              onClick={() => ref.current?.requestSubmit()}
            >
              {isLoading ? (
                <>
                  Salvando Alterações <Spinner animation="border" size="sm" />
                </>
              ) : (
                <>
                  <FaSave /> Salvar Alterações
                </>
              )}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export { UserDetails };
