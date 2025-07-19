import React, { useState } from "react";
import "../Pages/TrendingProductCard.css";

function TrendingProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (!product.originalPrice || !product.reducedPrice || 
        product.originalPrice <= product.reducedPrice) return null;
    const discountAmount = product.originalPrice - product.reducedPrice;
    const discountPercentage = (discountAmount / product.originalPrice) * 100;
    return Math.round(discountPercentage);
  };

  const discountPercentage = calculateDiscount();

  const toggleLike = () => {
    setLiked(!liked);
    if (!liked) {
      const heart = document.querySelector(`.like-btn-${product.id}`);
      heart.classList.add("bounce");
      setTimeout(() => heart.classList.remove("bounce"), 400);
    }
  };

  return (
    <div className="product-card">
      {/* Product Image with Like Button and Discount Badge */}
      <div className="product-image-container">
        {/* Auto-calculated Discount Badge - Top Left */}
        {discountPercentage > 0 && (
          <div className="discount-badge">{discountPercentage}% OFF</div>
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        
        {/* Like Button - Top Right */}
        <button
          className={`like-btn like-btn-${product.id} ${liked ? "liked" : ""}`}
          onClick={toggleLike}
          aria-label={liked ? "Unlike product" : "Like product"}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={liked ? "#e83e8c" : "none"}
            stroke={liked ? "#e83e8c" : "#6B7280"}
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Product Details */}
      <div className="product-details">
        <div className="product-meta">
          <span className="product-location">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7280"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {product.location || "Local"}
          </span>
        </div>

        <h3 className="product-name">{product.name}</h3>
        <p className="product-brand">{product.brand || "Local Brand"}</p>
        <p className="product-description">
          {product.description || "Trending local product"}
        </p>

        <div className="product-pricing">
          <div className="price-container">
            <span className="current-price">₹{product.reducedPrice || product.price}</span>
            {product.originalPrice && product.originalPrice > product.reducedPrice && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>
          <span
            className={`availability ${
              product.available ? "available" : "out-of-stock"
            }`}
          >
            {product.available ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <button
          className="add-to-cart-btn"
          disabled={!product.available}
          aria-disabled={!product.available}
        >
          {product.available ? (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to Cart
            </>
          ) : (
            "Notify Me"
          )}
        </button>
      </div>
    </div>
  );
}

export default TrendingProductCard;