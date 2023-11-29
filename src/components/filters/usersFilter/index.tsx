import Offcanvas from "react-bootstrap/Offcanvas";

type props = {
  isOpen: boolean;
  handleClose: () => void;
};

const UsersFilter = ({ isOpen, handleClose }: props) => {
  return (
    <Offcanvas
      show={isOpen}
      onHide={handleClose}
      className="bg-info"
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="text-white">Filtrar por</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>Alguns Filtros aqui</Offcanvas.Body>
    </Offcanvas>
  );
};

export default UsersFilter;
