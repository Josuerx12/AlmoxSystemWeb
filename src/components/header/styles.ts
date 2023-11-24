import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 80px;
  background: #0000ff;
  color: #fff;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const NavLogo = styled.h1`
  font-size: 2.4rem;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const NavList = styled.ul`
  font-size: 1.1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.2rem;

  @media (max-width: 768px) {
    display: none;
  }
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
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #cacaca;
  }
`;

export const MobileButton = styled.button`
  display: none;
  font-size: 2rem;
  background: transparent;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  color: #ffff;
  border-radius: 0.1rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;
