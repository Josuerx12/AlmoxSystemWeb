import { Route, Routes, Navigate } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import Login from "./pages/login";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import Cookies from "js-cookie";

const App = () => {
  const { user, getUser } = useAuth();
  const token = Cookies.get("refreshToken");
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/solicitacao/acompanhar" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/solicitacao/acompanhar" /> : <Login />}
        />
        {!user && <Route path="*" element={<Navigate to="/login" />} />}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
