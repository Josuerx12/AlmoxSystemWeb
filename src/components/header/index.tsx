import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { RiShieldUserFill, RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaUsers } from "react-icons/fa";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { GoPackageDependents } from "react-icons/go";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  function handleNavigate(e: React.FormEvent, path: string) {
    e.preventDefault();
    navigate(path);
  }

  const { user, logoutUser } = useAuth();

  return (
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
            <Nav className="justify-content-start pe-3">
              {user?.admin && (
                <NavDropdown
                  title="Gerenciar"
                  id="offcanvasNavbarDropdown-expand-xxl"
                  menuVariant="dark"
                  drop="down-centered"
                >
                  <NavDropdown.Item
                    onClick={(e) => handleNavigate(e, "/admin/users")}
                  >
                    Usuários <FaUsers />
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={(e) => handleNavigate(e, "/admin/requests")}
                  >
                    Solicitações <IoGitPullRequestSharp />
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
                    onClick={(e) => handleNavigate(e, "/almox/dashboard")}
                  >
                    Dashboard <MdOutlineDashboardCustomize />
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={(e) =>
                      handleNavigate(e, "/almox/canceledRequests")
                    }
                  >
                    Solicitações Canceladas <TiCancel />
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {user?.requester && (
                <NavDropdown
                  title="Solicitações"
                  id="offcanvasNavbarDropdown-expand-xxl"
                  menuVariant="dark"
                  drop="down-centered"
                >
                  <NavDropdown.Item>
                    Nova Solicitação <FaPlusCircle />
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={(e) =>
                      handleNavigate(e, "/solicitacao/acompanhar")
                    }
                  >
                    Acompanhar Solicitações <GoPackageDependents />
                  </NavDropdown.Item>
                </NavDropdown>
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
  );
};

export default Header;
