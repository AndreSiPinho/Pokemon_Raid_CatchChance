import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Catch from "./pages/CatchRate";
import Footer from "./components/Footer";

function App() {
  const [page, setPage] = useState<string>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app">
      <Header
        onGoHome={() => setPage("home")}
      />
      <div className="main">
        <Sidebar
          setPage={setPage}
          currentPage={page}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((current) => !current)}
        />
        <div className={`content ${isSidebarOpen ? "" : "content-expanded"}`}>
          {page === "home" && <Home />}
          {page === "catch" && <Catch />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
