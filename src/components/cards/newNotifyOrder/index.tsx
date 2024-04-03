import { useState } from "react";
import { IOrderTracking } from "../../../interfaces/ordertTraking";
import OrdersNotificationDetails from "../../modals/orders/details";

const NotifyOrderCard = ({
  orderTracking,
}: {
  orderTracking: IOrderTracking;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <OrdersNotificationDetails
        show={isOpen}
        handleClose={() => setIsOpen((prev) => !prev)}
        order={orderTracking}
      />
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`d-flex flex-column justify-content-center p-2 mx-auto rounded border ${
          !orderTracking.collected ? "newRequestCard" : "collectedReq"
        } bg-light`}
        style={{
          width: "90%",
          position: "relative",
        }}
      >
        <h6 className="d-flex gap-1">
          <b style={{ whiteSpace: "nowrap" }}>ID de Compra:</b>{" "}
          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {orderTracking.idDeCompra}
          </span>
        </h6>
        <p
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <b>Mensagem: </b> {orderTracking.message}
        </p>
        <p
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <b>Recebido por: </b>{" "}
          {orderTracking.receptor.name + " | " + orderTracking.receptor.email}
        </p>
        <p>
          <b>Chegou: </b>
          {new Date(orderTracking.createdAt).toLocaleString("pt-BR")}
        </p>
        {orderTracking.collected && (
          <p>
            <b>Entregou: </b>
            {new Date(orderTracking.updatedAt).toLocaleString("pt-BR")}
          </p>
        )}
      </div>
    </>
  );
};

export default NotifyOrderCard;
