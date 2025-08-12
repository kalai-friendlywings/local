import React from "react";
import TrendingProductCard from "./TrendingProductCard";
import { trendingProducts } from "../data/dummyData"; // Adjust path if needed
import "../Pages/TrendingProductCard.css";

function TrendingProducts() {
  return (
    <section className="my-1 px-2">
      <h3 className="mb-4 fw-bold">Trending This Week</h3>
      <div className="trending-scroll-container">
        {trendingProducts.map((product) => (
          <TrendingProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default TrendingProducts;
