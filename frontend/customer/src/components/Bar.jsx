import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import "../pages/Bar.css";

function AppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/addresses/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(res.data);
        const defaultAddr = res.data.find((a) => a.default);
        if (defaultAddr) handleAddressChange(defaultAddr);
      } catch (err) {
        console.error("Error fetching addresses", err);
      }
    };
    if (token) fetchAddresses();
  }, [token]);

  const handleAddressChange = (addr) => {
    const formatted = `${addr.houseNo}, ${addr.city}, ${addr.village}, ${addr.pinCode}`;
    setLocation(formatted);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) {
      setError("Please enter your location before searching.");
      return;
    }
    setError("");
    navigate(
      `/search-results?query=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`
    );
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const formatted = `My Location (${coords.latitude.toFixed(3)}, ${coords.longitude.toFixed(3)})`;
        setLocation(formatted);
        setShowSuggestions(false);
      },
      (err) => {
        console.error("Location error:", err);
        alert("Failed to access location.");
      }
    );
  };

  const handleSuggestionClick = (addr) => {
    const formatted = `${addr.houseNo}, ${addr.city}, ${addr.village}, ${addr.pinCode}`;
    setLocation(formatted);
    setShowSuggestions(false);
  };

  const filteredSuggestions = addresses.filter((addr) =>
    `${addr.houseNo}, ${addr.city}, ${addr.village}, ${addr.pinCode}`
      .toLowerCase()
      .includes(location.toLowerCase())
  );

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="custom-appbar shadow-sm rounded-pill px-3 py-3 my-2 mx-auto d-flex align-items-center justify-content-between flex-wrap">
        <div className="d-flex align-items-center px-2 gap-2">
          <Link to="/" className="text-white fw-bold fs-4 text-decoration-none">
            Doom Shop
          </Link>
        </div>

        {/* Search & Location */}
        <form
          onSubmit={handleSearchSubmit}
          className="d-none d-md-flex align-items-center gap-2 flex-grow-1 justify-content-center px-2 position-relative"
        >
          <div className="position-relative" style={{ width: "240px" }}>
            <input
              type="text"
              className="form-control rounded-pill py-2 ps-3"
              placeholder="Enter your location..."
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              style={{ fontSize: "0.85rem" }}
            />
            {showSuggestions && (
              <ul className="list-group position-absolute w-100 z-index-3" style={{ maxHeight: "160px", overflowY: "auto", fontSize: "0.8rem", zIndex: 999 }}>
                <li className="list-group-item list-group-item-action text-primary" onClick={handleUseMyLocation}>
                  📍 Use My Current Location
                </li>
                {filteredSuggestions.map((addr) => {
                  const formatted = `${addr.houseNo}, ${addr.city}, ${addr.village}, ${addr.pinCode}`;
                  return (
                    <li
                      key={addr.id}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSuggestionClick(addr)}
                      style={{ cursor: "pointer" }}
                    >
                      {addr.type} - {formatted}
                      {addr.default && <span className="badge bg-primary ms-2">Default</span>}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Search bar */}
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

          {/* Account */}
          <li>
            <Link to="/account" className="text-white">
              <FaUserCircle size={40} />
            </Link>
          </li>
        </form>

        {/* Hamburger (Mobile) */}
        <button className="d-md-none btn text-white" onClick={() => setDrawerOpen(true)}>
          ☰
        </button>
      </nav>

      {/* Error message */}
      {error && <p className="text-danger text-center small mt-n3">{error}</p>}

      {/* Mobile Drawer Menu */}
      {drawerOpen && (
        <div className="mobile-drawer bg-white position-fixed top-0 start-0 vh-100 vw-100 d-flex flex-column p-4 shadow">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Doom Shop</h5>
            <button className="btn-close" onClick={() => setDrawerOpen(false)}></button>
          </div>

          <ul className="list-unstyled text-center flex-grow-1 d-flex flex-column justify-content-center">
            {["/", "/editor", "/Shops", "/Map", "/about", "/profile"].map((path, i) => (
              <li className="mb-3" key={i}>
                <Link
                  to={path}
                  onClick={() => setDrawerOpen(false)}
                  className="text-dark text-decoration-none fs-5"
                >
                  {path === "/" ? "Discover" : path.slice(1)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-4 border-top">
            <Link to="/Login" className="btn btn-outline-dark w-100 mb-2" onClick={() => setDrawerOpen(false)}>
              Log in
            </Link>
            <Link to="/Signup" className="btn btn-primary w-100" onClick={() => setDrawerOpen(false)}>
              Sign up
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default AppBar;
