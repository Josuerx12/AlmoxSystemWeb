import Footer from "./components/footer";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="content">
        <Sidebar />
        <section>Teste 2</section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
