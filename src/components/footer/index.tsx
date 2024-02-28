import { FooterComponent } from "./styles";
const Footer = () => {
  return (
    <FooterComponent>
      &copy; {new Date().getFullYear()} <span>Josué Carvalho </span> |
      <span> Contate-me por: </span>
      <a
        className="text-primary fw-bold"
        href="tel:+5522997979633"
        target="_blank"
        title="Entre em contato por telefone clicando aqui!"
      >
        Telefone
      </a>
      <span className="text-light"> ou </span>
      <a
        className="text-primary fw-bold"
        href="mailto:josueazevedo71@hotmail.com"
        target="_blank"
        title="Entre em contato por e-mail clicando aqui!"
      >
        E-mail
      </a>
    </FooterComponent>
  );
};

export default Footer;
