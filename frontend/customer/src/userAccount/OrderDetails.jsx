import React from "react";
import { Card, ListGroup, Row, Col } from "react-bootstrap";

const order = {
  id: "ORD123456",
  date: "2025-05-05",
  status: "Delivered",
  items: [
    { name: "Wireless Headphones", quantity: 1, price: 299.99 },
    { name: "Fitness Tracker", quantity: 1, price: 199.50 },
    { name: "Protein Powder", quantity: 1, price: 250.50 },
  ],
  shippingAddress: {
    name: "John Doe",
    city: "Chennai",
    pin: "600001",
    contact: "+91 9876543210",
  },
  tax: 72.45,
};

const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const total = subtotal + order.tax;

function OrderDetails() {
  return (
    <div className="container py-4" style={{ maxWidth: "800px" }}>
      <h2 className="fw-bold mb-4 text-center">Order Details</h2>

      {/* Order Summary */}
      <Card className="mb-4 shadow-sm rounded-4">
        <Card.Body>
          <h5 className="fw-semibold">Order #{order.id}</h5>
          <p>Date: {order.date}</p>
          <p>
            Status:{" "}
            <span
              className={`badge ${
                order.status === "Delivered"
                  ? "bg-success"
                  : order.status === "Processing"
                  ? "bg-warning text-dark"
                  : "bg-danger"
              }`}
            >
              {order.status}
            </span>
          </p>
        </Card.Body>
      </Card>

      {/* Items */}
      <Card className="mb-4 shadow-sm rounded-4">
        <Card.Body>
          <h5 className="fw-semibold mb-3">Items</h5>
          <ListGroup variant="flush">
            {order.items.map((item, idx) => (
              <ListGroup.Item key={idx} className="d-flex justify-content-between">
                <div>
                  {item.name} <span className="text-muted">x{item.quantity}</span>
                </div>
                <div>₹{(item.price * item.quantity).toFixed(2)}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Payment Summary */}
      <Card className="mb-4 shadow-sm rounded-4">
        <Card.Body>
          <h5 className="fw-semibold mb-3">Payment Summary</h5>
          <Row className="mb-2">
            <Col>Subtotal:</Col>
            <Col className="text-end">₹{subtotal.toFixed(2)}</Col>
          </Row>
          <Row className="mb-2">
            <Col>Tax:</Col>
            <Col className="text-end">₹{order.tax.toFixed(2)}</Col>
          </Row>
          <hr />
          <Row>
            <Col className="fw-bold">Total:</Col>
            <Col className="text-end fw-bold">₹{total.toFixed(2)}</Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Shipping Address */}
      <Card className="shadow-sm rounded-4">
        <Card.Body>
          <h5 className="fw-semibold mb-3">Shipping Info</h5>
          <p className="mb-1">{order.shippingAddress.name}</p>
          <p className="mb-1">{order.shippingAddress.city}, {order.shippingAddress.pin}</p>
          <p className="mb-0">WhatsApp: {order.shippingAddress.contact}</p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default OrderDetails;
