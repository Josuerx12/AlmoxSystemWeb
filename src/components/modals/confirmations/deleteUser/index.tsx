/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Spinner } from "react-bootstrap";
import { FaExclamation, FaTrash } from "react-icons/fa";
import { User } from "../../../../interfaces/user";
import { useMutation, useQueryClient } from "react-query";
import { useAdminCommands } from "../../../../hooks/useAdminCommands";

type Props = {
  show: boolean;
  handleClose: () => void;
  user: User;
};

const DeleteUserConfirmation = ({ show, handleClose, user }: Props) => {
  const { deleteUser } = useAdminCommands();

  const query = useQueryClient();

  const { mutateAsync, isLoading } = useMutation<any, any, string>(
    ["deleteUser"],
    deleteUser,
    {
      onSuccess: () =>
        Promise.all([query.invalidateQueries("users"), handleClose()]),
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

        <p>Tem certeza que deseja excluir o usuário {user.name}?</p>
        <p className="d-flex flex-column border p-2 rounded gap-1">
          <span className="d-flex gap-2">
            <b>Login:</b>
            {user.login}.
          </span>
          <span className="d-flex gap-2">
            <b>E-mail:</b>
            {user.email}.
          </span>
          <span className="d-flex gap-2">
            <b>Telefone:</b>
            {user.phone}.
          </span>
        </p>

        <Button
          className="d-flex justify-content-center align-items-center gap-1"
          variant="outline-danger"
          onClick={async () => await mutateAsync(user._id)}
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

export default DeleteUserConfirmation;
