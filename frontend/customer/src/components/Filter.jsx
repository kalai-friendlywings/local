// Filter.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Filter() {
  return (
    <ul className="d-none d-md-flex list-unstyled mb-0 mx-auto align-items-center gap-4 justify-content-center">
      <li>
        <Link to="/" className="text-decoration-none text-dark">Discover</Link>
      </li>
      <li>
        <Link to="/categories" className="text-decoration-none text-dark">Categories</Link>
      </li>
      <li>
        <Link to="/shops" className="text-decoration-none text-dark">Shops</Link>
      </li>
      <li>
        <Link to="/Map" className="text-decoration-none text-dark">Map</Link>
      </li>
      <li>
        <Link to="/about" className="text-decoration-none text-dark">About</Link>
      </li>
     
    </ul>
  );
}

export default Filter;
