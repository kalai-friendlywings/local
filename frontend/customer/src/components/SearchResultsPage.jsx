// SearchResultsPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/TrendingProductCard"; // You'll need to create this component

function SearchResultsPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Parse query parameters from URL
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    const locationQuery = params.get("location") || "";
    
    setSearchParams({
      query,
      location: locationQuery
    });

    // Fetch search results from your API
    const fetchResults = async () => {
      try {
        setLoading(true);
        // Replace with your actual API call
        // const response = await api.get(`/search?q=${query}&location=${locationQuery}`);
        // setProducts(response.data);
        
        // Mock data for demonstration
        setTimeout(() => {
          setProducts([
            {
              id: 1,
              name: `${query} Product 1`,
              price: 19.99,
              image: "/images/product1.jpg",
              location: locationQuery
            },
            {
              id: 2,
              name: `${query} Product 2`,
              price: 29.99,
              image: "/images/product2.jpg",
              location: locationQuery
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    fetchResults();
  }, [location.search]);

  return (
    <div className="search-results-container">
      <h2>Search Results for "{searchParams.query}" in {searchParams.location || "all locations"}</h2>
      
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : products.length > 0 ? (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;