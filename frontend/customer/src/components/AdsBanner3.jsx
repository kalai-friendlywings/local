import React from "react";
import { Card } from "react-bootstrap";
import "../pages/AdsBanner3.css";

const bannerData = [
  {
    img: "./src/assets/AdsBanner/primeday.jpg",
    alt: "Amazon Ad",
  },
//   {
//     img: "./src/assets/AdsBanner/display.webp",
//     alt: "Event Promo",
//   },
  {
    img: "./src/assets/AdsBanner/primeday.jpg",
    alt: "Special Offer",
  },
];

function AdsBannerStack() {
  return (
    <div className="container-fluid px-2">
      {bannerData.map((banner, index) => (
        <Card key={index} className="mb-3 shadow-sm border-0">
          <Card.Img
            variant="top"
            src={banner.img}
            alt={banner.alt}
            className="img-fluid rounded"
          />
        </Card>
      ))}
    </div>
  );
}

export default AdsBannerStack;
