import { Button, Modal, Spinner } from "react-bootstrap";
import { IOrderTracking } from "../../../../interfaces/ordertTraking";
import { useMutation, useQueryClient } from "react-query";
import { FaCheckCircle, FaExclamation } from "react-icons/fa";
import { useAlmox } from "../../../../hooks/useAlmox";

type Props = {
  show: boolean;
  handleClose: () => void;
  order: IOrderTracking;
};

const DeliverOrder = ({ show, handleClose, order }: Props) => {
  const { deliverOrder } = useAlmox();
  const query = useQueryClient();
  const { isLoading, mutateAsync } = useMutation("editNotify", deliverOrder, {
    onSuccess: () => {
      query.invalidateQueries("Orders"), handleClose();
    },
  });

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton />

      <Modal.Body className="w-100 d-flex flex-column align-items-center gap-4">
        <h3 className="fs-2 fw-bold">Confirme para continuar!</h3>
        <FaExclamation
          style={{
            fontSize: "16rem",
            padding: "2rem",
            border: "3px solid #00dd0b",
            borderRadius: "50%",
          }}
          className="text-warning"
        />
        <p>
          Você está entregando a id de saída numero: <b> {order.idDeCompra}</b>.
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          className="d-flex justify-content-center align-items-center gap-1"
          variant="outline-success"
          disabled={isLoading}
          onClick={async () => await mutateAsync(order.id)}
        >
          {isLoading ? (
            <>
              Finalizando Entrega <Spinner size="sm" animation="border" />
            </>
          ) : (
            <>
              Confirmar Entrega <FaCheckCircle />
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeliverOrder;
