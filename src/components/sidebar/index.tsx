import {
  SidebarContainer,
  NavContainer,
  NavListItems,
  LogoutButton,
  LoginButton,
  H3,
  DropdownButton,
  DropdownContainer,
  DropdownItem,
} from "./styles";
import { RiShieldUserFill, RiLogoutBoxRLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { LuPackageSearch } from "react-icons/lu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { SiGoogletagmanager } from "react-icons/si";
import { TbPackages } from "react-icons/tb";
import { useState } from "react";

const Sidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <SidebarContainer>
      <H3>Menu de navegação</H3>
      <NavContainer>
        <NavListItems to="/nova-solicitacao">
          <p>Nova Solicitação</p> <FaPlus />
        </NavListItems>
        <NavListItems to="/acompanhar-solicitacoes">
          <p>Acompanhar Solicitações</p> <LuPackageSearch />
        </NavListItems>
        <NavListItems to="/dashboard">
          <p>Dashboard</p> <MdOutlineDashboardCustomize />
        </NavListItems>
        <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
          <p>Administrar</p> <SiGoogletagmanager />
        </DropdownButton>
        <DropdownContainer isOpen={dropdownOpen}>
          <DropdownItem
            to="/admin/usuarios"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Usuários
          </DropdownItem>
          <DropdownItem
            to="/admin/solicitacoes"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Solicitações
          </DropdownItem>
        </DropdownContainer>
        <NavListItems to="/almoxarifado">
          <p>Almoxarifado</p> <TbPackages />
        </NavListItems>
      </NavContainer>
      <LoginButton>
        Entrar <RiShieldUserFill />
      </LoginButton>
      <LogoutButton>
        Sair <RiLogoutBoxRLine />
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;
