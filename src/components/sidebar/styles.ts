import styled from "styled-components";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.nav`
  display: flex;
  position: relative;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  padding: 20px 0;
  background-color: #0000aa;
  box-shadow: 0 0 2px 1px #0000aa;
  flex-direction: column;
  align-items: center;
  transition: 0.3s ease;
  overflow: visible;
`;

export const H3 = styled.h3`
  margin: 1rem 0;
  color: #fff;
  font-size: 1.3rem;
`;

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  position: relative;
`;

export const NavListItems = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.425rem;
  gap: 0.425rem;
  background: #fff;
  border-radius: 0.225rem;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s ease;
  font-size: 1.2rem;

  &:hover {
    background: #cacaca;
  }
`;

export const Button = styled.button`
  display: none;
  width: 54%;
  padding: 10px;
  border: none;
  border-radius: 0.225rem;
  margin-bottom: 0.45rem;
  cursor: pointer;
  transition: 0.2s ease;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const LogoutButton = styled(Button)`
  background: #c0392b;
  color: #fff;

  &:hover {
    background: #a5281a;
  }
`;

export const LoginButton = styled(Button)`
  background: #3498db;
  color: #fff;

  &:hover {
    background: #2980b9;
  }
`;

type DropdownContainerProps = {
  isOpen: boolean;
};

export const DropdownContainer = styled.div<DropdownContainerProps>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: calc(75% + 10px); /* Ajuste a distância conforme necessário */
  left: 50%; /* Posiciona o dropdown no centro do botão Administrar */
  transform: translateX(-50%); /* Centraliza o dropdown horizontalmente */
  width: 200px; /* Ajuste a largura conforme necessário */
  background: #fff;
  border-radius: 0.225rem;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

export const DropdownButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.425rem;
  gap: 0.425rem;
  background: #fff;
  border-radius: 0.225rem;
  color: #000;
  cursor: pointer;
  transition: 0.2s ease;
  font-size: 1.2rem;

  &:hover {
    background: #cacaca;
  }
`;

export const DropdownItem = styled(NavListItems)`
  background: #fff;
  color: #000;
  font-size: 1rem;

  &:hover {
    background: #cacaca;
  }
`;
