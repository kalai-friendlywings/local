import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Badge, Card, Offcanvas } from 'react-bootstrap';
import { FaStar, FaSearch, FaMapMarkerAlt, FaFilter, FaTimes } from 'react-icons/fa';
import '../pages/Shops.css';

const sampleShops = [
  // ... (same sample shops data as before)
];

const Shops = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [activeTags, setActiveTags] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // ... (keep existing filter/sort logic)

  return (
    <Container className="py-4 shops-container">
      {/* Header */}
      <div className="text-center mb-4 mb-md-5">
        <h2 className="fw-bold display-6 display-md-5">Discover Local Shops</h2>
        <p className="text-muted lead d-none d-md-block">
          Browse and shop from unique local businesses in your community
        </p>
      </div>

      {/* Search & Filter Row - Desktop */}
      <Row className="mb-3 g-2 d-none d-md-flex">
        <Col md={5}>
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="Search for shops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ps-4"
            />
            <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          </div>
        </Col>
        <Col md={4}>
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="ps-4"
            />
            <FaMapMarkerAlt className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          </div>
        </Col>
        <Col md={3} className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={resetFilters} className="flex-grow-1">
            <FaTimes className="me-1" /> Clear
          </Button>
          <Button variant="primary" className="flex-grow-1">
            <FaFilter className="me-1" /> Filter
          </Button>
        </Col>
      </Row>

      {/* Mobile Search & Filter Button */}
      <Row className="mb-3 d-flex d-md-none g-2">
        <Col xs={9}>
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="Search shops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ps-4"
            />
            <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          </div>
        </Col>
        <Col xs={3}>
          <Button 
            variant="primary" 
            className="w-100"
            onClick={() => setShowMobileFilters(true)}
          >
            <FaFilter />
          </Button>
        </Col>
      </Row>

      {/* Mobile Filters Offcanvas */}
      <Offcanvas 
        show={showMobileFilters} 
        onHide={() => setShowMobileFilters(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mb-3">
            <Form.Label>Location</Form.Label>
            <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="ps-4"
              />
              <FaMapMarkerAlt className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            </div>
          </div>
          
          <div className="mb-3">
            <Form.Label>Sort By</Form.Label>
            <Form.Select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="new">New Arrivals</option>
              <option value="top">Top Rated</option>
            </Form.Select>
          </div>

          <div className="mb-4">
            <Form.Label>Tags</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge 
                  key={tag} 
                  pill 
                  bg={activeTags.includes(tag) ? 'primary' : 'light'} 
                  text={activeTags.includes(tag) ? 'white' : 'dark'} 
                  className="px-3 py-2 cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Button 
            variant="outline-danger" 
            className="w-100 mb-2"
            onClick={resetFilters}
          >
            <FaTimes className="me-1" /> Reset All
          </Button>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Tags & Sort Row */}
      <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
        <div className="mb-2 mb-md-0">
          <h5 className="mb-2 mb-md-0">Filter by Tags</h5>
          <div className="d-flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge 
                key={tag} 
                pill 
                bg={activeTags.includes(tag) ? 'primary' : 'light'} 
                text={activeTags.includes(tag) ? 'white' : 'dark'} 
                className="px-3 py-2 cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="d-flex align-items-center gap-2">
          <span className="d-none d-md-block me-2">Sort by:</span>
          <Form.Select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            size="sm"
            className="w-auto"
          >
            <option value="featured">Featured</option>
            <option value="new">New Arrivals</option>
            <option value="top">Top Rated</option>
          </Form.Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">
          {filteredShops.length} {filteredShops.length === 1 ? 'shop' : 'shops'} found
        </h5>
      </div>

      {/* Shops Grid */}
      {sortedShops.length > 0 ? (
        <Row className="g-3">
          {sortedShops.map((shop) => (
            <Col key={shop.id} xl={3} lg={4} md={6} xs={12}>
              <Card className="h-100 shop-card">
                {/* ... (same card content as before) */}
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <h4 className="text-muted">No shops found matching your criteria</h4>
          <Button variant="outline-primary" onClick={resetFilters} className="mt-3">
            Reset Filters
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Shops;