import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { popularShops } from "../data/dummyData";
import "../pages/ShopDetail.css";
import TrendingProductCard from "../components/TrendingProductCard.jsx"; // adjust path if needed

const tabs = ["Products", "About", "Reviews", "Shipping & Returns"];

const ShopDetail = () => {
  const { id } = useParams();
  const shop = popularShops.find((s) => s.id === parseInt(id));
  const [activeTab, setActiveTab] = useState("Shipping & Returns");
  const [isFollowing, setIsFollowing] = useState(true);

  if (!shop) return <div className="text-center p-5">Shop not found</div>;

  const toggleFollow = () => setIsFollowing((prev) => !prev);

  return (
    <div className="container mt-4">
      <Link
        to="/"
        className="text-secondary d-inline-block mb-4"
        style={{ textDecoration: "none" }}
      >
        &larr; Back to Shops
      </Link>

      {/* Shop Banner */}
      <div
        className="position-relative bg-light rounded overflow-hidden mb-3"
        style={{ height: 180 }}
      >
        <img
          src={shop.banner || ""}
          alt={`${shop.name} banner`}
          className="w-100 h-100 object-fit-cover"
        />

        {/* Follow Button */}
        <button
          className={`btn btn-sm rounded-pill px-3 shadow-sm position-absolute top-0 end-0 m-3 ${
            isFollowing
              ? "btn-light border text-primary"
              : "btn-primary text-white"
          }`}
          onClick={toggleFollow}
        >
          <i
            className={`bi ${
              isFollowing ? "bi-suit-heart-fill" : "bi-suit-heart"
            }`}
          ></i>{" "}
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>

      {/* Shop Info */}
      <div className="bg-white p-3 rounded shadow-sm d-flex align-items-center flex-wrap gap-3 mb-3">
        <img
          src={shop.logo}
          alt="Shop Logo"
          className="rounded border"
          style={{ width: 80, height: 80, objectFit: "contain" }}
        />
        <div>
          <h4 className="mb-1">{shop.name}</h4>
          <p className="mb-1 text-muted">
            <FaMapMarkerAlt /> {shop.location} &nbsp;•&nbsp;
            <FaStar className="text-warning" /> {shop.rating} (
            {shop.reviewCount} reviews)
          </p>
          <div className="d-flex flex-wrap gap-2">
            {shop.tags.map((tag, i) => (
              <span
                key={i}
                className="badge bg-light text-dark border rounded-pill px-2 py-1 small"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="shop-tabs mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shop-tab ${activeTab === tab ? "active" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-4 rounded shadow-sm">
        {activeTab === "Shipping & Returns" && (
          <>
            <h5 className="mb-3">Shipping & Returns</h5>
            <h6>Shipping Policy</h6>
            <p>
              All orders are processed and shipped within 2-3 business days.
              Shipping rates and delivery estimates depend on the location and
              shipping method selected at checkout.
            </p>

            <h6>Return Policy</h6>
            <p>
              We accept returns within 14 days of delivery. Items must be unused
              and in the same condition as received. Contact the shop to
              initiate a return.
            </p>

            <h6>Damaged Items</h6>
            <p>
              If you receive a damaged item, please contact us immediately with
              photos of the damage. We'll work to resolve the issue as quickly
              as possible.
            </p>
          </>
        )}
        {activeTab === "Products" && (
          <div>
            <h5 className="mb-3">All Products</h5>
            <div className="row g-3">
              {shop.products && shop.products.length > 0 ? (
                shop.products.map((product) => (
                  <div key={product.id} className="col-6 col-md-4 col-lg-3">
                    <TrendingProductCard
                      name={product.name}
                      price={product.price}
                      image={product.image}
                    />
                  </div>
                ))
              ) : (
                <p className="text-muted">
                  No products available for this shop.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === "About" && <p>About the shop will go here.</p>}
        {activeTab === "Reviews" && <p>Customer reviews will go here.</p>}
      </div>
    </div>
  );
};

export default ShopDetail;
