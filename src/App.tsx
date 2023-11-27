import { Routes } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes></Routes>
      <Footer />
    </div>
  );
};

export default App;
