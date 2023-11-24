import { FooterComponent } from "./styles";
const Footer = () => {
  return (
    <FooterComponent>
      &copy; {new Date().getFullYear()} Josué Carvalho
    </FooterComponent>
  );
};

export default Footer;
