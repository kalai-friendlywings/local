import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, updateQuantity, removeItem } from "../redux/cartSlice";
import "../pages/TrendingProductCard.css";

function TrendingProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );
  const [liked, setLiked] = useState(false);
  const quantity = cartItem?.quantity || 0;

  const calculateDiscount = () => {
    if (
      !product.original_price ||
      !product.discount_price ||
      product.original_price <= product.discount_price
    )
      return null;
    const discountAmount = product.original_price - product.discount_price;
    return Math.round((discountAmount / product.original_price) * 100);
  };

  const discountPercentage = calculateDiscount();

  const toggleLike = (e) => {
    e.preventDefault();
    setLiked(!liked);
    const heart = document.querySelector(`.like-btn-${product.id}`);
    heart?.classList.add("bounce");
    setTimeout(() => heart?.classList.remove("bounce"), 400);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }));
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
    } else {
      dispatch(removeItem(product.id));
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        {/* Image Section */}
        <div className="product-image-container">
          {discountPercentage > 0 && (
            <div className="discount-badge">{discountPercentage}% OFF</div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
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

        {/* Product Text Info */}
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

          {/* Pricing Section */}
          <div className="product-pricing">
            <div className="price-container">
              <span className="current-price">
                ₹{product.discount_price || product.original_price}
              </span>
              {product.original_price &&
                product.discount_price &&
                product.original_price > product.discount_price && (
                  <span className="original-price">
                    ₹{product.original_price}
                  </span>
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

          {/* Cart Controls */}
          {product.available ? (
            <div className="cart-controls">
              {quantity > 0 ? (
                <div className="qty-selector">
                  <button onClick={handleDecrement}>−</button>
                  <span>{quantity}</span>
                  <button onClick={handleIncrement}>+</button>
                </div>
              ) : (
                <button className="add-btn" onClick={handleAdd}>
                  + Add
                </button>
              )}
            </div>
          ) : (
            <button className="add-to-cart-btn" disabled>
              Notify Me
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

export default TrendingProductCard;
