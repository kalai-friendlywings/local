import React from "react";
import { Link, useLocation } from "react-router-dom";
import { House, Search, Heart, Cart, Person } from "react-bootstrap-icons";
import "../pages/BottomNavBar.css";

function BottomNavBar() {
  const location = useLocation();
  const current = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="bottom-nav shadow-sm">
      <Link to="/" className={`nav-icon ${current("/")}`}>
        <House />
        <span>Home</span>
      </Link>
      <Link to="/Shops" className={`nav-icon ${current("/search")}`}>
        <Search />
        <span>Search</span>
      </Link>
      <Link to="/favorites" className={`nav-icon ${current("/wishlist")}`}>
        <Heart />
        <span>Wishlist</span>
      </Link>
      <Link to="/cart" className={`nav-icon ${current("/cart")}`}>
        <Cart />
        <span>Cart</span>
      </Link>
      <Link to="/account" className={`nav-icon ${current("/account")}`}>
        <Person />
        <span>Account</span>
      </Link>
    </nav>
  );
}

export default BottomNavBar;
