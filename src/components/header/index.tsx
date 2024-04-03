import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { RiShieldUserFill, RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaBoxes, FaPlus, FaUsers } from "react-icons/fa";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth";
import { useMemo, useState } from "react";
import NewRequest from "../modals/requests/new";
import { useQuery, useQueryClient } from "react-query";
import { useRequests } from "../../hooks/useRequests";
import { RequestType } from "../cards/newRequests";
import { useFilter } from "../../hooks/useFilter";
import { LuLogOut } from "react-icons/lu";
import { IOrderTracking } from "../../interfaces/ordertTraking";
import { useOrders } from "../../hooks/useOrders";

const Header = () => {
  const { user, logoutUser } = useAuth();
  const { userOrders } = useOrders();
  const navigate = useNavigate();
  const { fetch } = useRequests();
  const requests = useQuery<RequestType[]>(["userRequests"], fetch);
  const ordersNotify = useQuery<IOrderTracking[]>("userOrders", userOrders);

  const newOrdersNotify = useMemo(
    () => ordersNotify.data?.filter((i) => !i.collected),
    [ordersNotify.data]
  );

  const [isRequesting, setIsRequesting] = useState(false);

  const { newReq: userNewReq } = useFilter(requests.data);

  function handleNavigate(e: React.FormEvent, path: string) {
    e.preventDefault();
    navigate(path);
  }

  function handleCloseModal() {
    setIsRequesting((prev) => !prev);
  }

  const query = useQueryClient();

  return (
    <>
      <NewRequest show={isRequesting} handleClose={handleCloseModal} />
      <Navbar key="xxl" expand="xxl" className="mb-3 bg-primary">
        <Container fluid>
          <Navbar.Brand
            className="text-white d-flex align-items-center justify-content-center gap-1"
            onClick={(e) => handleNavigate(e, "/")}
          >
            Separa <FaPlus />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-xxl" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-xxl"
            aria-labelledby="offcanvasNavbarLabel-expand-xxl"
            placement="start"
            className="bg-primary"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id="offcanvasNavbarLabel-expand-xxl"
                onClick={(e) => handleNavigate(e, "/")}
                className="text-white"
              >
                AlmoxSystem
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start pe-3 w-100">
                {user?.admin && (
                  <NavDropdown
                    title="Gerenciar"
                    id="offcanvasNavbarDropdown-expand-xxl"
                    menuVariant="dark"
                    drop="down-centered"
                  >
                    <NavDropdown.Item
                      className="d-flex justify-content-between gap-2 align-items-center"
                      onClick={(e) => handleNavigate(e, "/admin/users")}
                    >
                      <FaUsers /> Usuários
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="d-flex justify-content-between gap-2 align-items-center"
                      onClick={(e) => handleNavigate(e, "/admin/requests")}
                    >
                      <IoGitPullRequestSharp /> Solicitações
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                {user?.almox && (
                  <NavDropdown title="Almoxarifado Gestão" menuVariant="dark">
                    <NavDropdown.Item
                      className="d-flex justify-content-between gap-3 align-items-center"
                      onClick={(e) => handleNavigate(e, "/almox/dashboard")}
                    >
                      <LuLogOut /> Processos de Saídas
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="d-flex justify-content-between gap-3 align-items-center"
                      onClick={(e) =>
                        handleNavigate(e, "/almox/orders/dashboard")
                      }
                    >
                      <FaBoxes /> Processos de Entregas
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                {user?.requester && (
                  <>
                    <Nav.Link
                      onClick={(e) => handleNavigate(e, "/requests")}
                      className="requestsNotify"
                      data-set={userNewReq ? userNewReq.length : 0}
                    >
                      Solicitações
                    </Nav.Link>
                    <Nav.Link
                      onClick={(e) => handleNavigate(e, "/user/notifies")}
                      className="requestsNotify"
                      data-set={newOrdersNotify ? newOrdersNotify.length : 0}
                    >
                      Compras
                    </Nav.Link>
                    <Nav.Link
                      onClick={(e) => {
                        handleNavigate(e, "/requests");
                        handleCloseModal();
                      }}
                    >
                      Nova Solicitação <FaPlus />
                    </Nav.Link>
                  </>
                )}
              </Nav>
              <div className="d-flex align-items-center justify-content-xl-end justify-content-lg-start w-100 ">
                {!user && (
                  <Nav.Link onClick={(e) => handleNavigate(e, "/login")}>
                    Autentique-se <RiShieldUserFill />
                  </Nav.Link>
                )}
                {user && (
                  <Nav.Link
                    onClick={() => {
                      logoutUser();
                      query.clear();
                    }}
                  >
                    Sair <RiLogoutBoxRLine />
                  </Nav.Link>
                )}
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
