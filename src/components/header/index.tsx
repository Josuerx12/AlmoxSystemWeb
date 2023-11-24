import {
  NavWrapper,
  NavLogo,
  NavList,
  NavListItems,
  MobileButton,
} from "./styles";
import { RiShieldUserFill, RiLogoutBoxRLine } from "react-icons/ri";
import { RiMenuFoldFill } from "react-icons/ri";

const Header = () => {
  return (
    <NavWrapper>
      <NavLogo>AlmoxSystem</NavLogo>
      <NavList>
        <li>
          <NavListItems to="/login">
            <p>Entrar</p> <RiShieldUserFill />
          </NavListItems>
        </li>
        <li>
          <NavListItems to="/">
            <p>Sair</p> <RiLogoutBoxRLine />
          </NavListItems>
        </li>
      </NavList>

      <MobileButton>
        <RiMenuFoldFill />
      </MobileButton>
    </NavWrapper>
  );
};

export default Header;
