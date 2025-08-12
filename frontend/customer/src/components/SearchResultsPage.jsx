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
        setTimeout(() => {
          const mockResults = [
            {
              id: 1,
              name: `${query} Premium Widget`,
              price: 29.99,
              reducedPrice: 19.99,
              image: "/images/product1.jpg",
              available: true,
              location: loc,
            },
            {
              id: 2,
              name: `${query} Eco Gadget`,
              price: 14.99,
              reducedPrice: 9.99,
              image: "/images/product2.jpg",
              available: false,
              location: loc,
            },
          ];
          setProducts(mockResults);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Search failed:", error);
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