import { Route, Routes, Navigate } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import Login from "./pages/login";
import { useAuth } from "./store/useAuth";
import Home from "./pages/home";

const App = () => {
  const { user } = useAuth();
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={!user ? <Navigate to="/login" /> : <Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
