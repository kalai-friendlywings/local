import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/SearchFilterBar.css";

function SearchFilterBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
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

        const defaultAddress = res.data.find((addr) => addr.default === true);
        if (defaultAddress) {
          handleAddressChange(defaultAddress);
        }
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
      `/search-results?query=${encodeURIComponent(
        searchQuery
      )}&location=${encodeURIComponent(location)}`
    );
  };

  const handleSuggestionClick = (addr) => {
    const formatted = `${addr.houseNo}, ${addr.city}, ${addr.village}, ${addr.pinCode}`;
    setLocation(formatted);
    setShowSuggestions(false);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const formatted = `My Location (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`;
        setLocation(formatted);
        setShowSuggestions(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Failed to get current location. Please allow location access.");
      }
    );
  };

  const filteredSuggestions = addresses.filter((addr) => {
    const formatted = `${addr.houseNo}, ${addr.city}, ${addr.village}, ${addr.pinCode}`;
    return formatted.toLowerCase().includes(location.toLowerCase());
  });

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="container my-3 position-relative"
    >
      <div className="row gy-3">
        {/* Location Input */}
        <div className="col-12 position-relative">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter your location..."
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />

          {/* Address suggestions dropdown */}
          {showSuggestions && (
            <ul
              className="list-group position-absolute w-100 z-index-3"
              style={{ maxHeight: "250px", overflowY: "auto" }}
            >
              <li
                className="list-group-item list-group-item-action text-primary"
                onClick={handleUseMyLocation}
                style={{ cursor: "pointer" }}
              >
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
                    {addr.default && (
                      <span className="badge bg-primary ms-2">Default</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="col-12">
            <div className="alert alert-danger py-2">{error}</div>
          </div>
        )}

        {/* Search input and button */}
        <div className="col-12 d-flex">
          <div className="flex-grow-1 me-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search for products or shops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg">
            <svg
              className="bi bi-search"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a5 5 0 1 0-1.001 9.9A5 5 0 0 0 11 6zM2 6a6 6 0 1 1 10.9 3.001L16 13.1 13.1 16l-3.1-3.1A6 6 0 0 1 2 6z" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchFilterBar;
