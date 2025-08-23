import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/TrendingProductCard";
import "../pages/TrendingProductCard.css";
import "../pages/SearchResultsPage.css"; // Adjust path as needed
import "bootstrap/dist/css/bootstrap.min.css";
import FloatingCartBar from "../components/FloatingCartBar";

function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [locationQuery, setLocationQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Load initial query and location from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    const loc = params.get("location") || "";

    setSearchQuery(query);
    setLocationQuery(loc);

    fetchResults(query, loc);
  }, [location.search]);

  const fetchResults = async (query, loc) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/merchant-products/?query=${encodeURIComponent(
          query
        )}&location=${encodeURIComponent(loc)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data); // Expecting merchant backend serializer returns proper product objects
    } catch (error) {
      console.error("Search failed:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(
      `/search-results?query=${encodeURIComponent(
        searchQuery
      )}&location=${encodeURIComponent(locationQuery)}`
    );
  };

  return (
    <div className="container py-3">
      {/* Search Bar at top */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2 justify-content-center">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary btn-lg w-100" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Results */}
      <h4 className="mb-3">
        Results for "<strong>{searchQuery}</strong>" in{" "}
        <strong>{locationQuery || "all locations"}</strong>
      </h4>

      {loading ? (
        <div className="text-center py-5">Loading...</div>
      ) : products.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {products.map((product) => (
            <div className="col-6 col-md-4 col-lg-3" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 text-muted">
          No products found for your search.
        </div>
      )}
      {/* Floating Checkout Bar */}
      <FloatingCartBar />
    </div>
  );
}

export default SearchResultsPage;
