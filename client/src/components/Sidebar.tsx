import "./Sidebar.css";

type Props = {
  setPage: (page: string) => void;
  currentPage: string;
  isOpen: boolean;
  onToggle: () => void;
};

const items = [
  { id: "home", label: "Inicio", tag: "Base" },
  { id: "catch", label: "Catch Rate", tag: "Tool" },
];

function Sidebar({ setPage, currentPage, isOpen, onToggle }: Props) {
  return (
    <div className={`sidebar-shell ${isOpen ? "is-open" : "is-closed"}`}>
      <button
        type="button"
        className="sidebar-arrow"
        onClick={onToggle}
        aria-label={isOpen ? "Esconder menu lateral" : "Mostrar menu lateral"}
        aria-expanded={isOpen}
      >
        <span className="sidebar-arrow-icon" aria-hidden="true">
          {isOpen ? "<" : ">"}
        </span>
      </button>

      <aside className={`sidebar ${isOpen ? "is-open" : "is-closed"}`} aria-hidden={!isOpen}>
        <div className="sidebar-header">
          <span className="sidebar-kicker">Navigation</span>
          <h3>Menu</h3>
        </div>

        <nav className="sidebar-nav" aria-label="Main menu">
          {items.map((item) => (
            <button
              key={item.id}
              className={currentPage === item.id ? "active" : ""}
              onClick={() => setPage(item.id)}
              tabIndex={isOpen ? 0 : -1}
            >
              <span className="nav-marker" aria-hidden="true" />
              <span className="nav-copy">{item.label}</span>
              <span className="nav-tag">{item.tag}</span>
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
