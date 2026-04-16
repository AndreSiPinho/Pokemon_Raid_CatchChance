import "./Header.css";
import logo from "../assets/logo.png";

type Props = {
  onGoHome: () => void;
};

function Header({ onGoHome }: Props) {
  return (
    <header className="header">
      <div className="header-brand">
        <button
          type="button"
          className="home-button"
          onClick={onGoHome}
          aria-label="Ir para a página inicial"
        >
          <div className="logo-shell">
            <img src={logo} alt="PixelPokeTools logo" className="logo" />
          </div>

          <div className="brand-copy">
            <span className="brand-kicker">Raid Utility Suite</span>
            <span className="title">PixelPokeTools</span>
          </div>
        </button>
      </div>

      <div className="header-credit">
        <span className="credit-label">Projeto</span>
        <span className="credit-value">by Heda</span>
      </div>
    </header>
  );
}

export default Header;
