import { Button, Form, Modal } from "react-bootstrap";
import { RequestType } from "../../../cards/newRequests";
import { useAuth } from "../../../../hooks/useAuth";
import { FaPeopleCarryBox, FaPeopleGroup, FaXmark } from "react-icons/fa6";
import { FaBoxes, FaInfo } from "react-icons/fa";
import { useState } from "react";
import { InSeparationConfirmation } from "../../confirmations/inSeparationReq";
import SeparetedReqConfirmation from "../../confirmations/separetedReq";
import DeliverReqConfirmation from "../../confirmations/deliverReq";

type Props = {
  show: boolean;
  handleClose: () => void;
  request: RequestType;
};

const RequestDetails = ({ show, handleClose, request }: Props) => {
  const { user } = useAuth();
  const [isSeparating, setIsSeparating] = useState(false);
  const [isSepareted, setIsSeparated] = useState(false);
  const [isDelivering, setIsDelivering] = useState(false);
  return (
    <>
      <DeliverReqConfirmation
        show={isDelivering}
        handleClose={() => setIsDelivering((prev) => !prev)}
        request={request}
      />
      <SeparetedReqConfirmation
        show={isSepareted}
        handleClose={() => setIsSeparated((prev) => !prev)}
        request={request}
      />
      <InSeparationConfirmation
        show={isSeparating}
        handleClose={() => setIsSeparating((prev) => !prev)}
        request={request}
      />
      <Modal
        style={
          isSeparating || isSepareted || isDelivering
            ? { opacity: "0" }
            : { opacity: "1" }
        }
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="xl"
      >
        <Modal.Header closeButton>
          <h4 className="d-flex gap-2 justify-content-center align-items-center">
            <FaInfo
              style={{
                border: "2px solid blue",
                borderRadius: "50%",
                padding: ".2rem",
                fontSize: "2rem",
              }}
            />
            Detalhes da Requisição
          </h4>
        </Modal.Header>
        <Modal.Body>
          <h6 className="fs-5">
            <b>Status: </b>
            {request.status}
          </h6>
          <Form className="mt-3">
            <Form.Group className="d-flex gap-3 flex-wrap mt-3">
              <Form.Group style={{ flexBasis: "150px", flexGrow: "1" }}>
                <Form.Label>ID do Orquestra:</Form.Label>
                <Form.Control type="number" disabled value={request.exitID} />
              </Form.Group>
              <Form.Group style={{ flexBasis: "150px", flexGrow: "1" }}>
                <Form.Label>Solicitado Por:</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  value={request.requestedBy.name.split(" ")[0]}
                />
              </Form.Group>
              <Form.Group style={{ flexBasis: "150px", flexGrow: "1" }}>
                <Form.Label>Contato:</Form.Label>
                <Form.Control
                  type="number"
                  disabled
                  value={request.requestedBy.phone}
                />
              </Form.Group>
              <Form.Group style={{ flexBasis: "150px", flexGrow: "1" }}>
                <Form.Label>Solicitado em:</Form.Label>
                <Form.Control
                  type="date"
                  disabled
                  value={request.createdAt.split("T")[0]}
                />
              </Form.Group>
              <Form.Group style={{ flexBasis: "150px", flexGrow: "1" }}>
                <Form.Label>Hora da Solicitação</Form.Label>
                <Form.Control
                  type="time"
                  disabled
                  value={new Date(request.createdAt)
                    .toLocaleString("pt-BR")
                    .split(",")[1]
                    .trim()}
                />
              </Form.Group>
            </Form.Group>

            {request.separetedBy && (
              <Form.Group className="d-flex gap-3 flex-wrap mt-3">
                <Form.Group style={{ flexBasis: "150px", flexGrow: "1" }}>
                  <Form.Label>Separado por:</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    value={request.separetedBy.name}
                  />
                </Form.Group>
                <Form.Group
                  className="d-flex flex-column justify-content-center"
                  style={{ flexBasis: "150px", flexGrow: "1" }}
                >
                  <Form.Label>Contato do Operador:</Form.Label>

                  <Form.Control
                    type="tel"
                    disabled
                    value={request.separetedBy.phone}
                  />
                </Form.Group>
                <Form.Group
                  className="d-flex flex-column justify-content-center"
                  style={{ flexBasis: "150px", flexGrow: "1" }}
                >
                  <Form.Label>E-mail do Operador:</Form.Label>
                  <Form.Control
                    type="mail"
                    value={request.separetedBy.email}
                    disabled
                  />
                </Form.Group>
                <Form.Group style={{ flexBasis: "150px", flexGrow: "1" }}>
                  <Form.Label>Separado em:</Form.Label>
                  <Form.Control
                    type="date"
                    disabled
                    value={request.separetedAt.split("T")[0]}
                  />
                </Form.Group>
                <Form.Group style={{ flexBasis: "150px", flexGrow: "1" }}>
                  <Form.Label>Hora da Separação</Form.Label>
                  <Form.Control
                    type="time"
                    disabled
                    value={new Date(request.separetedAt)
                      .toLocaleString("pt-BR")
                      .split(",")[1]
                      .trim()}
                  />
                </Form.Group>
              </Form.Group>
            )}

            {request.collectedBy && (
              <Form.Group className="d-flex gap-3 flex-wrap mt-3">
                <Form.Group style={{ flexBasis: "250px", flexGrow: "1" }}>
                  <Form.Label>Coletado por:</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    value={request.collectedBy.name}
                  />
                </Form.Group>
                <Form.Group style={{ flexBasis: "250px", flexGrow: "1" }}>
                  <Form.Label>Documento:</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    value={request.collectedBy.document}
                  />
                </Form.Group>
                <Form.Group style={{ flexBasis: "250px", flexGrow: "1" }}>
                  <Form.Label>Coletado em:</Form.Label>
                  <Form.Control
                    disabled
                    type="date"
                    value={request.collectedAt.split("T")[0]}
                  />
                </Form.Group>
                <Form.Group style={{ flexBasis: "250px", flexGrow: "1" }}>
                  <Form.Label>Coletado as:</Form.Label>
                  <Form.Control
                    disabled
                    type="time"
                    value={new Date(request.collectedAt)
                      .toLocaleString("pt-BR")
                      .split(",")[1]
                      .trim()}
                  />
                </Form.Group>
              </Form.Group>
            )}
            {request.desc && (
              <Form.Group className="mt-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  disabled
                  rows={5}
                  value={request.desc}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        {user?.almox && (
          <Modal.Footer>
            {user.login === request.requestedBy.login &&
              request.status === "Aguardando Separação" && (
                <Button
                  className="d-flex justify-content-center align-items-center gap-1"
                  variant="danger"
                  onClick={handleClose}
                >
                  <FaXmark
                    style={{
                      border: "2px solid #fff",
                      borderRadius: "50%",
                    }}
                  />{" "}
                  Solicitar Cancelamento
                </Button>
              )}
            {request.status === "Aguardando Separação" && (
              <Button
                className="d-flex justify-content-center align-items-center gap-1"
                variant="success"
                onClick={() => setIsSeparating((prev) => !prev)}
              >
                <FaPeopleCarryBox /> Iniciar Separação
              </Button>
            )}
            {request.status === "Em Separação" && (
              <Button
                className="d-flex justify-content-center align-items-center gap-1"
                variant="success"
                onClick={() => setIsSeparated((prev) => !prev)}
              >
                <FaPeopleGroup /> Finalizar Separação
              </Button>
            )}
            {request.status === "Aguardando Coleta" && (
              <Button
                onClick={() => setIsDelivering((prev) => !prev)}
                variant="success"
              >
                <FaBoxes /> Realizar Entrega
              </Button>
            )}
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export { RequestDetails };
