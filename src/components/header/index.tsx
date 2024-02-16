import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { RiShieldUserFill, RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaUsers } from "react-icons/fa";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { useAuth } from "../../hooks/useAuth";
import { useMemo, useState } from "react";
import NewRequest from "../modals/requests/new";
import { useQuery } from "react-query";
import { useRequests } from "../../hooks/useRequests";
import { RequestType } from "../cards/newRequests";

const Header = () => {
  const navigate = useNavigate();
  const { fetch } = useRequests();
  const requests = useQuery<RequestType[]>(["userRequests"], fetch);

  const [isRequesting, setIsRequesting] = useState(false);
  const newReq = useMemo(
    () => requests.data?.filter((r) => r.status === "Aguardando Separação"),
    [requests.data]
  );

  function handleNavigate(e: React.FormEvent, path: string) {
    e.preventDefault();
    navigate(path);
  }

  const { user, logoutUser } = useAuth();

  function handleCloseModal() {
    setIsRequesting((prev) => !prev);
  }

  return (
    <>
      <NewRequest show={isRequesting} handleClose={handleCloseModal} />
      <Navbar key="xxl" expand="xxl" className="mb-3 bg-primary">
        <Container fluid>
          <Navbar.Brand
            className="text-white"
            onClick={(e) => handleNavigate(e, "/")}
          >
            AlmoxSystem
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
                  <NavDropdown
                    title="Almoxarifado"
                    id="offcanvasNavbarDropdown-expand-xxl"
                    menuVariant="dark"
                    drop="down-centered"
                  >
                    <NavDropdown.Item
                      className="d-flex justify-content-between gap-2 align-items-center"
                      onClick={(e) => handleNavigate(e, "/almox/dashboard")}
                    >
                      <MdOutlineDashboardCustomize /> Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="d-flex justify-content-between gap-2 align-items-center"
                      onClick={(e) =>
                        handleNavigate(e, "/almox/canceledRequests")
                      }
                    >
                      <TiCancel /> Solicitações Canceladas
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                {user?.requester && (
                  <>
                    <Nav.Link
                      onClick={(e) => handleNavigate(e, "/requests")}
                      className="requestsNotify"
                      data-set={newReq ? newReq.length : 0}
                    >
                      Solicitações
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
                  <Nav.Link onClick={logoutUser}>
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
