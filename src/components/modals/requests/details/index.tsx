import { Form, Modal } from "react-bootstrap";
import { RequestType } from "../../../cards/newRequests";

type Props = {
  show: boolean;
  handleClose: () => void;
  request: RequestType;
};

const RequestDetails = ({ show, handleClose, request }: Props) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" size="xl">
      <Modal.Header closeButton>
        <h4>Detalhes da Requisição</h4>
      </Modal.Header>
      <Modal.Body>
        <h6 className="fs-5">
          <b>Status: </b>
          {request.status}
        </h6>
        <Form className="mt-3">
          <Form.Group className="d-flex gap-3 flex-wrap">
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
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RequestDetails;
