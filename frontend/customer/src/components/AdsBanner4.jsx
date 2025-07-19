import React from "react";
import { Carousel } from "react-bootstrap";
import "../pages/AdsBanner4.css";

const adSlides = [
  {
    image: "./src/assets/AdsBanner/primeday.jpg",
    alt: "Amazon Sale",
    link: "https://www.amazon.in/",
  },
  {
    image: "./src/assets/AdsBanner/grocery.jpg",
    alt: "Flipkart Offer",
    link: "https://www.flipkart.com/",
  },
  {
    image: "./src/assets/AdsBanner/shoes.webp",
    alt: "MakeMyTrip",
    link: "https://www.makemytrip.com/",
  },
];

function AdsCarousel() {
  return (
    <div className="ads-carousel container px-0  mt-3">
      <Carousel indicators={false} interval={3000} pause="hover">
        {adSlides.map((ad, index) => (
          <Carousel.Item key={index}>
            <a href={ad.link} target="_blank" rel="noopener noreferrer">
              <img
                className="d-block w-100 "
                src={ad.image}
                alt={ad.alt}
              />
            </a>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default AdsCarousel;
