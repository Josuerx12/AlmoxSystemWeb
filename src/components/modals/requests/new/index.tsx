import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";

type Props = {
  show: boolean;
  handleClose: () => void;
};

const NewRequest = ({ show, handleClose }: Props) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      exitID: 0,
      desc: "",
    },
  });

  return (
    <Modal onHide={handleClose} backdrop="static" size="lg" show={show}>
      <Modal.Header closeButton>
        <h3>Nova solicitação de separação de materiais</h3>
      </Modal.Header>

      <Modal.Body>
        <Form
          onSubmit={(e: never) => handleSubmit(e)}
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
        <Button variant="primary">
          <FaSave /> Cadastrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewRequest;
