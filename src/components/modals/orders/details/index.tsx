import { Button, Form, Modal } from "react-bootstrap";
import { FaBoxOpen } from "react-icons/fa";
import { IOrderTracking } from "../../../../interfaces/ordertTraking";
import { useState } from "react";
import DeliverOrder from "../../confirmations/deliverOrder";
import { useAuth } from "../../../../hooks/useAuth";

type Props = {
  show: boolean;
  handleClose: () => void;
  order: IOrderTracking;
};

const OrdersNotificationDetails = ({ show, handleClose, order }: Props) => {
  const [isDelivering, setIsDelivering] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <DeliverOrder
        order={order}
        show={isDelivering}
        handleClose={() => setIsDelivering((prev) => !prev)}
      />
      <Modal
        show={show}
        onHide={() => {
          handleClose();
        }}
        backdrop="static"
        size="xl"
        keyboard={true}
        style={isDelivering ? { opacity: "0" } : { opacity: "1" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalhes da ID de Compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column gap-2">
            <Form.Group>
              <Form.Label>ID de Compra</Form.Label>
              <Form.Control type="text" disabled value={order.idDeCompra} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Recebido por: </Form.Label>
              <Form.Control
                type="text"
                value={order.receptor.name + " | " + order.receptor.email}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mensagem: </Form.Label>
              <Form.Control
                rows={5}
                as="textarea"
                value={order.message}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data de chegada: </Form.Label>
              <Form.Control
                type="text"
                value={new Date(order.createdAt).toLocaleString("pt-BR")}
                disabled
              />
            </Form.Group>
            {order.collected && (
              <Form.Group style={{ flexBasis: "200px", flexGrow: "1" }}>
                <Form.Label>Data de Entrega: </Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  value={new Date(order.updatedAt).toLocaleString("pt-BR")}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        {(user?.almox || user?.admin) && order.state !== 5 && (
          <Modal.Footer>
            <Button
              onClick={() => setIsDelivering((prev) => !prev)}
              variant="success"
              className="d-flex gap-1 align-items-center justify-content-center"
            >
              <>
                <FaBoxOpen />
                Entregar
              </>
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default OrdersNotificationDetails;
