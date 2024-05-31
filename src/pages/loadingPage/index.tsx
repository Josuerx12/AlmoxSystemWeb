import { Spinner } from "react-bootstrap";

const LoadingPage = () => {
  return (
    <div className="">
      <img
        src="/splashartseparamaispc.png"
        style={{ objectFit: "contain", width: "100%", height: "100%" }}
      />
      <p className="d-flex justify-content-center align-items-center">
        Carregando dados... <Spinner animation="border" variant="primary" />
      </p>
    </div>
  );
};

export default LoadingPage;
