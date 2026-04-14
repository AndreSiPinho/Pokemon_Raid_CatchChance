import "./Sidebar.css";

type Props = {
  setPage: (page: string) => void;
  currentPage: string;
};

function Sidebar({ setPage, currentPage }: Props) {
  return (
    <div className="sidebar">
      <h3>Menu</h3>

      <button
        className={currentPage === "home" ? "active" : ""}
        onClick={() => setPage("home")}
      >
        🏠 Início
      </button>

      <button
        className={currentPage === "catch" ? "active" : ""}
        onClick={() => setPage("catch")}
      >
        🎯 Catch Rate
      </button>
    </div>
  );
}

export default Sidebar;