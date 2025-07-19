import React from "react";
import { useNavigate } from "react-router-dom";
import { popularShops } from "../data/dummyData";
import "../Pages/PopularShops.css";

function PopularShops() {
  const navigate = useNavigate();

  const handleShopClick = (shopId) => {
    navigate(`/shop/${shopId}`);
  };

  return (
    <div className="my-4 px-2">
      <h5 className="mb-3 fw-bold">Popular Shops</h5>
      <div className="popular d-flex flex-row flex-nowrap overflow-auto gap-3">
        {popularShops.map((shop) => (
          <div 
            className="popular-shop-card text-center shadow-sm" 
            key={shop.id}
            onClick={() => handleShopClick(shop.id)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={shop.image}
              className="shop-banner mb-2"
              alt={shop.name}
            />
            <div className="shop-name small fw-semibold">{shop.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularShops;