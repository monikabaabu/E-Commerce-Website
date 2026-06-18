import "./AuthHeader.css";
import MobileLogoWhite from "../assets/images/mobile-logo-white.png";
export function AuthHeader() {
  return (
    <div className="brand">
      <img className="mobile-logo" src={MobileLogoWhite} alt="Shoppie Logo" />
      <span className="brand-name">Shoppie</span>
    </div>
  );
}
