import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useRef } from "react";

type Props = {
  show: boolean;
  handleClose: () => void;
};

const NewUserModal = ({ show, handleClose }: Props) => {
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
  const ref = useRef<HTMLFormElement | null>(null);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      size="xl"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Novo Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="d-flex flex-column gap-3"
          ref={ref}
          onSubmit={(e: never) => handleSubmit(e)}
        >
          <Form.Group className="d-flex gap-2 flex-wrap">
            <Form.Group style={{ flexBasis: "200px", flexGrow: "1" }}>
              <Form.Label>Nome do Usuário</Form.Label>
              <Form.Control
                {...register("name")}
                type="text"
                placeholder="Ex.: João Victor"
              />
            </Form.Group>

            <Form.Group style={{ flexBasis: "200px", flexGrow: "1" }}>
              <Form.Label>Telefone do Usuário</Form.Label>
              <Form.Control
                {...register("phone")}
                type="number"
                placeholder="Ex.: 22997979633"
              />
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
            </Form.Group>
            <Form.Group style={{ flexBasis: "250px", flexGrow: "1" }}>
              <Form.Label>Email do Usuário</Form.Label>
              <Form.Control
                {...register("email")}
                type="email"
                placeholder="Ex.: johndoe@email.com.br"
              />
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
            </Form.Group>

            <Form.Group style={{ flexBasis: "200px", flexGrow: "1" }}>
              <Form.Label>Confirmar Senha</Form.Label>
              <Form.Control
                type="password"
                {...register("confirmPassword")}
                placeholder="*********"
              />
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
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => ref.current?.requestSubmit()}>
          Cadastrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewUserModal;
