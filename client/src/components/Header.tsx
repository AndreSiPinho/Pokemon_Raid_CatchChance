import "./Header.css";
import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="header">
      <div className="left">
        <img src={logo} alt="logo" className="logo" />
        <span className="title">PokéTools</span>
      </div>

      <div className="right">
        <span>By: Heda</span>
      </div>
    </div>
  );
}

export default Header;