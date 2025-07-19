import React from "react";
import { Card } from "react-bootstrap";
import "../pages/AdsBanner2.css";

function AdsBanner() {
  return (
    <div className="ads-banners container my-3">
      <a
        href="https://www.amazon.in/" // Your ad's external link here
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none"
      >
        <Card className="overflow-hidden rounded-4 shadow-sm">
          <Card.Img
            variant="top"
            src="./src/assets/AdsBanner/primeday.jpg"
            alt="Ad Banner"
            className="img-fluid"
          />
          <Card.Body className="text-center p-2">
            <Card.Title className="mb-1 fs-6 text-dark">Sponsored</Card.Title>
            <Card.Text className="text-muted small">
              Shop the latest trends online at Amazon.
            </Card.Text>
          </Card.Body>
        </Card>
      </a>
    </div>
  );
}

export default AdsBanner;
