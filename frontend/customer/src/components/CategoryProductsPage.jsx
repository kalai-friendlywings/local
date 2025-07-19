import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Button, Form, Offcanvas } from 'react-bootstrap';
import '../Pages/CategoryProductsPage.css'; // Make sure to create this CSS file

export default function CategoryListingPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('featured');
  const [activeCategory, setActiveCategory] = useState('muesli');
  const [likedProducts, setLikedProducts] = useState({});

  const categories = [
    { name: 'Crazy Deals', icon: '�', id: 'deals' },
    { name: 'Muesli & Granola', icon: '🥣', id: 'muesli' },
    { name: 'Oats', icon: '🌾', id: 'oats' },
    { name: 'Kids Cereals', icon: '🧒', id: 'kids' },
    { name: 'Flakes', icon: '🌽', id: 'flakes' },
    { name: 'Newly Added', icon: '🆕', id: 'new' },
    { name: 'Energy Bars', icon: '🍫', id: 'bars' },
    { name: 'Ready Mixes', icon: '🍲', id: 'mixes' },
    { name: 'Pancake Mixes', icon: '🥞', id: 'pancakes' },
  ];

  const allProducts = useMemo(() => [
    {
      id: 1,
      title: "Kellogg's Chocolate Muesli 57% Multigrain, Fruit, Nut & Seeds",
      category: 'muesli',
      weight: '450g',
      price: 399,
      discount: 25,
      originalPrice: 532,
      rating: 4.5,
      reviews: 142,
      image: 'https://placehold.co/150x150/FFDDC1/262626?text=Muesli',
    },
    {
      id: 2,
      title: "Kellogg's Muesli Fruit, Nut & Seeds, 12-in-1",
      category: 'muesli',
      weight: '750g',
      price: 516,
      discount: 27,
      originalPrice: 707,
      rating: 4.2,
      reviews: 89,
      image: 'https://placehold.co/150x150/CCE5FF/262626?text=Muesli',
    },
    {
      id: 3,
      title: 'Yogabar Muesli Dark Chocolate & Cranberry',
      category: 'muesli',
      weight: '400g',
      price: 449,
      discount: 15,
      originalPrice: 528,
      rating: 4.8,
      reviews: 204,
      image: 'https://placehold.co/150x150/D4EDDA/262626?text=Muesli',
      handpicked: true,
    },
    {
      id: 4,
      title: "Bagrry's Crunchy Muesli Fruit & Nut With Cranberries",
      category: 'muesli',
      weight: '375g',
      price: 265,
      discount: 18,
      originalPrice: 323,
      rating: 4.0,
      reviews: 67,
      image: 'https://placehold.co/150x150/FFF3CD/262626?text=Muesli',
    },
    {
      id: 5,
      title: "Nature's Path Organic Pumpkin Seed Granola",
      category: 'muesli',
      weight: '500g',
      price: 475,
      discount: 10,
      originalPrice: 528,
      rating: 4.6,
      reviews: 121,
      image: 'https://placehold.co/150x150/E2D9FF/262626?text=Granola',
      newArrival: true,
    },
    {
      id: 6,
      title: "Quaker Oats & Honey Granola",
      category: 'oats',
      weight: '480g',
      price: 320,
      originalPrice: 320,
      rating: 4.3,
      reviews: 98,
      image: 'https://placehold.co/150x150/C1F0C1/262626?text=Granola',
      bestseller: true,
    },
    {
      id: 7,
      title: "Saffola Oats & Almond Granola",
      category: 'oats',
      weight: '400g',
      price: 299,
      discount: 20,
      originalPrice: 374,
      rating: 3.9,
      reviews: 56,
      image: 'https://placehold.co/150x150/FFCCEE/262626?text=Granola',
    },
    {
      id: 8,
      title: "Post Honey Bunches of Oats with Almonds",
      category: 'flakes',
      weight: '510g',
      price: 425,
      discount: 15,
      originalPrice: 500,
      rating: 4.7,
      reviews: 187,
      image: 'https://placehold.co/150x150/D1ECF1/262626?text=Oats',
      limited: true,
    },
    {
      id: 9,
      title: "Dabur Oats for Healthy Breakfast",
      category: 'oats',
      weight: '1000g',
      price: 199,
      discount: 10,
      originalPrice: 220,
      rating: 4.1,
      reviews: 300,
      image: 'https://placehold.co/150x150/FFDDCC/262626?text=Oats',
    },
    {
      id: 10,
      title: "NutriChoice Kids Cereal - Choco Delite",
      category: 'kids',
      weight: '300g',
      price: 250,
      originalPrice: 250,
      rating: 4.6,
      reviews: 75,
      image: 'https://placehold.co/150x150/CCFFDD/262626?text=Kids',
    },
    {
      id: 11,
      title: "Corn Flakes Original by CerealKing",
      category: 'flakes',
      weight: '500g',
      price: 180,
      discount: 5,
      originalPrice: 190,
      rating: 3.8,
      reviews: 110,
      image: 'https://placehold.co/150x150/DDCCFF/262626?text=Flakes',
    },
    {
      id: 12,
      title: "Newly Added Super Berry Mix Muesli",
      category: 'new',
      weight: '400g',
      price: 550,
      originalPrice: 550,
      rating: 4.9,
      reviews: 50,
      image: 'https://placehold.co/150x150/FFEECC/262626?text=New',
      newArrival: true,
    },
  ], []);

  const ProductCard = ({ product }) => {
    const isLiked = likedProducts[product.id] || false;
    const discountPercentage = product.discount ? Math.round(product.discount) : null;

    const toggleLike = () => {
      setLikedProducts(prev => ({
        ...prev,
        [product.id]: !prev[product.id]
      }));
    };

    return (
      <div className="product-card">
        <div className="product-image-container">
          {discountPercentage && (
            <div className="discount-badge">{discountPercentage}% OFF</div>
          )}
          
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            loading="lazy"
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src="https://placehold.co/150x150/EEEEEE/000000?text=Image+Error"; 
            }}
          />
          
          <button
            className={`like-btn ${isLiked ? "liked" : ""}`}
            onClick={toggleLike}
            aria-label={isLiked ? "Unlike product" : "Like product"}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isLiked ? "#e83e8c" : "none"}
              stroke={isLiked ? "#e83e8c" : "#6B7280"}
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

        <div className="product-details">
          <div className="product-meta">
            <span className="product-weight">
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
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
              {product.weight}
            </span>
          </div>

          <h3 className="product-name">{product.title}</h3>
          
          <div className="product-rating">
            <div className="d-flex text-warning small">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`bi bi-star${i < Math.floor(product.rating) ? '-fill' : ''}`}
                ></i>
              ))}
            </div>
            <span className="text-muted small ms-2">({product.reviews})</span>
          </div>

          <div className="product-pricing">
            <div className="price-container">
              <span className="current-price">₹{product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price">₹{product.originalPrice}</span>
              )}
            </div>
            <span className="availability available">In Stock</span>
          </div>

          <button className="add-to-cart-btn">
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
          </button>
        </div>
      </div>
    );
  };

  const calculateDiscount = (product) => {
    if (!product.discount) return null;
    return Math.round(product.discount);
  };

  const displayedProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];

    let filtered = allProducts.filter(product => {
      if (activeCategory === 'deals') {
        return product.discount && product.discount > 0;
      }
      if (activeCategory === 'new') {
        return product.newArrival;
      }
      return product.category === activeCategory;
    });

    if (filtered.length === 0) {
      return [];
    }

    return [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
        case 'featured':
        default:
          return a.id - b.id;
      }
    });
  }, [allProducts, activeCategory, selectedSort]);

  const handleCloseMobileFilters = () => setMobileFiltersOpen(false);
  const handleShowMobileFilters = () => setMobileFiltersOpen(true);
  const handleCategoryClick = (id) => {
    setActiveCategory(id);
    if (mobileFiltersOpen) {
      handleCloseMobileFilters();
    }
  };

  return (
    <div className="cereals-haven-app bg-light min-vh-100">
      {/* Horizontal Category Slider */}
      <div className="bg-white shadow-sm py-2 mb-4 category-slider">
        <Container>
          <div className="d-flex overflow-auto pb-2 custom-scroll-bar">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "success" : "light"}
                className={`text-nowrap mx-1 px-3 py-2 rounded-pill d-flex align-items-center justify-content-center flex-column flex-shrink-0 ${activeCategory === cat.id ? 'text-white' : 'text-dark fw-normal'}`}
                onClick={() => handleCategoryClick(cat.id)}
                style={{ minWidth: '90px' }}
              >
                <span className="category-icon-large mb-1">{cat.icon}</span>
                <span className="category-label-small small">{cat.name}</span>
              </Button>
            ))}
          </div>
        </Container>
      </div>

      {/* Mobile Filters Offcanvas */}
      <Offcanvas show={mobileFiltersOpen} onHide={handleCloseMobileFilters} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters & Sort</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mb-4">
            <h6 className="mb-3 text-uppercase small fw-bold text-muted">Categories</h6>
            <div className="d-flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "success" : "outline-secondary"}
                  size="sm"
                  className="d-flex align-items-center rounded-pill px-3 py-2"
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <span className="me-1">{cat.icon}</span>
                  <span>{cat.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h6 className="mb-3 text-uppercase small fw-bold text-muted">Sort By</h6>
            <Form.Select size="sm" value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)} className="rounded-pill">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest Arrivals</option>
            </Form.Select>
          </div>

          <div>
            <h6 className="mb-3 text-uppercase small fw-bold text-muted">Dietary Filters</h6>
            <Form.Check type="checkbox" id="discountCheckMobile" label="Discounted Items" className="mb-2" />
            <Form.Check type="checkbox" id="organicCheckMobile" label="Organic" className="mb-2" />
            <Form.Check type="checkbox" id="veganCheckMobile" label="Vegan" className="mb-2" />
            <Form.Check type="checkbox" id="glutenFreeCheckMobile" label="Gluten Free" className="mb-2" />
          </div>

          <div className="mt-4 border-top pt-3">
            <Button variant="success" className="w-100 rounded-pill" onClick={handleCloseMobileFilters}>
              Apply Filters
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Container className="py-4">
        <Row>
          {/* Sidebar - Hidden on mobile */}
          <Col md={3} lg={2} className="d-none d-md-block">
            <div className="bg-white rounded-3 shadow-sm p-3 sticky-top filters-sidebar">
              <h6 className="mb-3 text-uppercase small fw-bold text-muted">Categories</h6>
              <div className="d-flex flex-column gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={activeCategory === cat.id ? "success" : "link"}
                    className={`text-start ${activeCategory === cat.id ? 'text-white' : 'text-dark fw-normal'} rounded-pill`}
                    onClick={() => handleCategoryClick(cat.id)}
                    style={activeCategory === cat.id ? {} : {backgroundColor: '#f8f9fa', borderColor: '#f8f9fa'}}
                  >
                    <div className="d-flex align-items-center">
                      <span className="me-2">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="mt-4 pt-3 border-top">
                <h6 className="mb-3 text-uppercase small fw-bold text-muted">Sort By</h6>
                <Form.Select size="sm" value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)} className="rounded-pill">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </Form.Select>
              </div>

              <div className="mt-4 pt-3 border-top">
                <h6 className="mb-3 text-uppercase small fw-bold text-muted">Dietary Filters</h6>
                <Form.Check type="checkbox" id="discountCheck" label="Discounted Items" className="mb-2" />
                <Form.Check type="checkbox" id="organicCheck" label="Organic" className="mb-2" />
                <Form.Check type="checkbox" id="veganCheck" label="Vegan" className="mb-2" />
                <Form.Check type="checkbox" id="glutenFreeCheck" label="Gluten Free" className="mb-2" />
                <Button variant="outline-success" size="sm" className="w-100 mt-3 rounded-pill">
                  Apply Filters
                </Button>
              </div>
            </div>
          </Col>

          {/* Product Grid Section */}
          <Col xs={12} md={9} lg={10}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
              <div className="mb-3 mb-md-0">
                <h5 className="mb-1 text-dark">
                  <span className="fw-bold">{displayedProducts.length} items</span> in <span className="text-success">{categories.find(cat => cat.id === activeCategory)?.name || 'All Products'}</span>
                </h5>
                <p className="text-muted small mb-0">Showing 1-{Math.min(displayedProducts.length, 12)} of {displayedProducts.length} products</p>
              </div>
              <div className="d-none d-md-block">
                <Form.Select size="sm" value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)} className="rounded-pill">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </Form.Select>
              </div>
            </div>

            <Row xs={2} sm={2} lg={3} xl={4} className="g-3">
              {displayedProducts && displayedProducts.length > 0 ? (
                displayedProducts.map((product) => (
                  <Col key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))
              ) : (
                <Col xs={12} className="text-center py-5">
                  <p className="text-muted fs-5">No products found for this category.</p>
                </Col>
              )}
            </Row>

            <div className="d-flex justify-content-center mt-5">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item active"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}