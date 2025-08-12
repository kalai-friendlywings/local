import React, { useState, useEffect } from 'react';

// --- !! ACTION REQUIRED: UPDATE THESE PATHS !! ---
 import primeDayImg from "../assets/AdsBanner/doomfresh.png";
 import groceryImg from "../assets/AdsBanner/grocery1.jpg";
 import shoesImg from "../assets/AdsBanner/foodeat1.png";

const Card = ({ className, children }) => (
  <div className={`card ${className}`}>{children}</div>
);

Card.Img = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={`card-img ${className}`} />
);

const Carousel = ({ interval, children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const tick = () => {
      setActiveIndex((current) => (current + 1) % React.Children.count(children));
    };
    const timer = setInterval(tick, interval);
    return () => clearInterval(timer);
  }, [children, interval]);

  const items = React.Children.toArray(children);

  return (
    <div className="carousel slide">
      <div className="carousel-inner">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
          >
            {item.props.children}
          </div>
        ))}
      </div>
    </div>
  );
};

Carousel.Item = ({ children }) => <div>{children}</div>;

// This data now uses the imported image variables instead of string paths.
const adSlides = [
  {
    image: primeDayImg, // Use the imported variable
    alt: "Advertisement for a big sale event",
    link: "https://www.amazon.in/",
  },
  {
    image: groceryImg, // Use the imported variable
    alt: "Advertisement for a grocery delivery service",
    link: "https://www.flipkart.com/",
  },
  {
    image: shoesImg, // Use the imported variable
    alt: "Advertisement for trendy shoes",
    link: "https://www.nike.com/in/",
  },
];

// This is the AdsCarousel component you are building.
function AdsCarousel() {
  return (
    <div className="ads-carousel">
      <Carousel indicators={false} interval={3000} pause="hover">
        {adSlides.map((ad, index) => (
          <Carousel.Item key={index}>
            <a href={ad.link} target="_blank" rel="noopener noreferrer" className="ad-link">
              <Card className="ad-card h-100">
                <Card.Img
                  src={ad.image}
                  alt={ad.alt}
                  className="ad-card-img h-100"
                />
              </Card>
            </a>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}


// --- Main App component to render everything ---
export default function App() {
  return (
    <>
    
      <style>{`
        /* Import Bootstrap CSS from a CDN for this demo */
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
        
        body {
          background-color: #f9fbfffb; /* A light grey background for the page */
        }
        
        .ads-carousel {
          border-radius: 12px; /* Rounded corners for the main container */
          overflow: hidden; /* This clips the corners of the content inside */
          box-shadow: 0 8px 20px rgba(0,0,0,0.1); /* A subtle shadow for depth */
        }

        /* --- Carousel Styling --- */
        .carousel.slide {
            position: relative;
        }
        .carousel-inner {
            position: relative;
            width: 100%;
            overflow: hidden;
        }
        .carousel-item {
            position: relative;
            display: none;
            width: 100%;
            transition: transform .6s ease-in-out;
            backface-visibility: hidden;
            perspective: 1000px;
        }
        .carousel-item.active {
            display: block;
        }

        .ads-carousel .carousel-item {
          height: 300px; /* Default height for desktop */
        }

        .ads-carousel .ad-card {
          border: none;
          background-color: transparent;
        }
        .ads-carousel .ad-link {
          display: block;
          height: 100%;
        }

        .ads-carousel .ad-card-img {
          object-fit: cover;
          transition: transform 0.3s ease; /* Smooth zoom effect on hover */
        }

        .ads-carousel .ad-link:hover .ad-card-img {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .ads-carousel .carousel-item {
            height: 200px; /* A shorter height for mobile is better */
          }
        }
        
        @media (max-width: 576px) {
          .ads-carousel .carousel-item {
            height: 150px; /* Even shorter for very small screens */
          }
        }
      `}</style>

      <div className="container py-2">
        <AdsCarousel />
      </div>
    </>
  );
}
