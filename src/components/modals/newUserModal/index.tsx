import React from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

type Props = {
  show: boolean;
  handleClose: () => void;
};

const NewUserModal = ({ show, handleClose }: Props) => {
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
      <Modal.Body>Formulario de registro!!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary">Cadastrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewUserModal;
