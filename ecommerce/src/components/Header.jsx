import { NavLink, useNavigate, useSearchParams } from "react-router";
import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import LogoWhite from "../assets/images/logo-white.png";
import MobileLogoWhite from "../assets/images/mobile-logo-white.png";
import { useState } from "react";
import "./Header.css";
export function Header({ cart }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  }
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");
  const [search, setSearch] = useState(searchText || "");
  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  };
  const searchProducts = () => {
    navigate(`/home?search=${search}`);
  };
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return (
    <div className="header">
      <div className="left-section">
        <img className="mobile-logo" src={MobileLogoWhite} />

        {user && <div className="user-name">Hello, {user.name} !</div>}
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={search}
          onChange={updateSearchInput}
        />

        <button className="search-button" onClick={searchProducts}>
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="nav-link header-link" to="/home">
          <span className="orders-text">Home</span>
        </NavLink>
        <NavLink
        className="nav-link header-link"
        to="/wishlist"
        >
        <span className="nav-text">Wishlist</span>
        </NavLink>

        <NavLink className="nav-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
