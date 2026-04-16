import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <span className="footer-kicker">PixelPokeTools</span>
          <p className="title">Calculadora de Catch Rate</p>
        </div>

        <div className="footer-meta">
          <p className="author">Autor: Andre Pinho</p>
          <p className="footer-detail">Discord: andy_Cap</p>
          <p className="footer-detail">Versão 1.0</p>
          <p className="footer-detail">2026</p>
        </div>
      </div>

      <p className="disclaimer">
        Este é um projeto fan-made e não é afiliado à Nintendo nem à Niantic.
      </p>
    </footer>
  );
}

export default Footer;
