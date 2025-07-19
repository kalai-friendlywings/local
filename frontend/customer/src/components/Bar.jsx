import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import "../pages/Bar.css";

function AppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) {
      setError("Enter location first.");
      return;
    }
    setError("");
    navigate(`/search-results?query=${searchQuery}&location=${location}`);
  };

  return (
    <>
      <nav className="custom-appbar  shadow-sm  rounded-pill px-3 py-3 my-2 mx-auto d-flex align-items-center justify-content-between flex-wrap">
        {/* Brand and location */}
        <div className="d-flex align-items-center px-2 gap-2">
          <Link to="/" className="text-white fw-bold fs-4 text-decoration-none">
            Doom Shop
          </Link>
        </div>

        {/* Desktop Search bar */}
        <form
  onSubmit={handleSearchSubmit}
  className="d-none d-md-flex align-items-center gap-2 flex-grow-1 justify-content-center px-2"
>
  <div className="dropdown">
    <button
      className="btn btn-sm text-white dropdown-toggle"
      type="button"
      id="locationDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {location || "Select Location"}
    </button>
    <ul className="dropdown-menu" aria-labelledby="locationDropdown">
      <li>
        <button
          className="dropdown-item"
          onClick={() => setLocation("Use My Current Location")}
        >
          📍 Use My Current Location
        </button>
      </li>
      <li>
        <button
          className="dropdown-item"
          onClick={() => setLocation("123, Anna Nagar, Chennai")} // Replace with actual default address from Address.jsx
        >
          Home: 123, Anna Nagar, Chennai
        </button>
      </li>
      <li><hr className="dropdown-divider" /></li>
      <li>
        <button className="dropdown-item" onClick={() => setLocation("Bangalore, KA")}>
          Bangalore, KA
        </button>
      </li>
      <li>
        <button className="dropdown-item" onClick={() => setLocation("Hyderabad, TS")}>
          Hyderabad, TS
        </button>
      </li>
      <li>
        <button className="dropdown-item" onClick={() => setLocation("Mumbai, MH")}>
          Mumbai, MH
        </button>
      </li>
      <li>
        <button className="dropdown-item" onClick={() => setLocation("Delhi, DL")}>
          Delhi, DL
        </button>
      </li>
    </ul>
  </div>

  <div className="position-relative flex-grow-1">
    <BiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
    <input
      type="text"
      className="form-control rounded-pill py-2 ps-5"
      placeholder="Search shops or items"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>

  <li>
    <Link to="/account" className="text-white">
      <FaUserCircle size={44} />
    </Link>
  </li>
</form>

        {/* ❌ Do NOT show nav links on desktop/tablet */}
        {/* <ul className="d-none d-md-flex ..."> ... </ul> removed */}

        {/* Show menu icon ONLY on mobile */}
        <button className="d-md-none btn text-white" onClick={() => setDrawerOpen(true)}>
          ☰
        </button>
      </nav>

      {/* Error message */}
      {error && <p className="text-danger text-center small mt-n3">{error}</p>}

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="mobile-drawer bg-white position-fixed top-0 start-0 vh-100 vw-100 d-flex flex-column p-4 shadow">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Doom Shop</h5>
            <button
              className="btn-close"
              onClick={() => setDrawerOpen(false)}
            ></button>
          </div>

          {/* Nav links centered */}
          <ul className="list-unstyled text-center flex-grow-1 d-flex flex-column justify-content-center">
            <li className="mb-3">
              <Link
                to="/"
                onClick={() => setDrawerOpen(false)}
                className="text-dark text-decoration-none fs-5"
              >
                Discover
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/editor"
                onClick={() => setDrawerOpen(false)}
                className="text-dark text-decoration-none fs-5"
              >
                Categories
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/Shops"
                onClick={() => setDrawerOpen(false)}
                className="text-dark text-decoration-none fs-5"
              >
                Shops
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/Map"
                onClick={() => setDrawerOpen(false)}
                className="text-dark text-decoration-none fs-5"
              >
                Map
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/about"
                onClick={() => setDrawerOpen(false)}
                className="text-dark text-decoration-none fs-5"
              >
                About
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/profile"
                onClick={() => setDrawerOpen(false)}
                className="text-dark text-decoration-none fs-5"
              >
                My Profile
              </Link>
            </li>
          </ul>

          {/* Login/Signup pinned to bottom */}
          <div className="mt-auto pt-4 border-top">
            <Link
              to="/Login"
              className="btn btn-outline-dark w-100 mb-2"
              onClick={() => setDrawerOpen(false)}
            >
              Log in
            </Link>
            <Link
              to="/Signup"
              className="btn btn-primary w-100"
              onClick={() => setDrawerOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default AppBar;
