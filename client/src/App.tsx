import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Catch from "./pages/CatchRate";

function App() {
  const [page, setPage] = useState<string>("home");

  return (
    <div className="app">
      <Header />
      <div className="main">
        <Sidebar setPage={setPage} currentPage={page} />
        <div className="content">
          {page === "home" && <Home />}
          {page === "catch" && <Catch />}
        </div>
      </div>
    </div>
  );
}

export default App;