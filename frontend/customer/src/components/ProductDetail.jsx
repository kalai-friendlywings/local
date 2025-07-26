// src/pages/ProductDetail.jsx

import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  Slide,
} from "@mui/material";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateQuantity } from "../redux/cartSlice";
import { trendingProducts } from "../data/dummyData";
import FloatingCartBar from "../components/FloatingCartBar";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = trendingProducts.find((p) => p.id === parseInt(id));
  const cart = useSelector((state) => state.cart.items);
  const cartItem = cart.find((item) => item.id === product?.id);
  const cartQuantity = cartItem?.quantity || 0;

  const [tab, setTab] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [showSlide, setShowSlide] = useState(false);

  useEffect(() => {
    const favorites =
      JSON.parse(localStorage.getItem("favoriteProducts")) || [];
    setIsFavorited(favorites.some((f) => f.id === product?.id));
  }, [product?.id]);

  const handleTabChange = (_, newValue) => setTab(newValue);

  const handleFavoriteToggle = () => {
    const stored = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
    const updated = isFavorited
      ? stored.filter((item) => item.id !== product.id)
      : [...stored, product];
    localStorage.setItem("favoriteProducts", JSON.stringify(updated));
    setIsFavorited(!isFavorited);
  };

  const handleAddItem = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.discount_price || product.price,
        quantity: 1,
      })
    );
    setShowSlide(true);
    setTimeout(() => setShowSlide(false), 1500);
  };

  const handleReduceCart = () => {
    if (cartQuantity > 1) {
      dispatch(updateQuantity({ id: product.id, quantity: cartQuantity - 1 }));
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: 0 }));
    }
  };

  if (!product)
    return <div className="p-5 text-center">Product not found.</div>;

  return (
    <div className="container-fluid px-3 pt-3 pb-5">
      {/* Header Actions */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="text" onClick={() => navigate(-1)}>
          ← Back
        </Button>
        <div className="d-flex gap-2 align-items-center">
          <Tooltip title="Share">
            <IconButton onClick={() => setShareOpen(true)}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={isFavorited ? "Remove Favorite" : "Add to Favorites"}>
            <IconButton onClick={handleFavoriteToggle}>
              {isFavorited ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Product Info */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h3>{product.name}</h3>
          <h5 className="text-muted">₹{product.discount_price}</h5>
          <del className="text-secondary">₹{product.original_price }</del>
          <p className="mt-2">
            <strong>Availability: </strong>
            <span
              className={product.available ? "text-success" : "text-danger"}
            >
              {product.available ? "In Stock" : "Out of Stock"}
            </span>
          </p>

          {/* Add to Cart / Quantity Buttons */}
          <div className="mt-4 d-flex justify-content-start">
            {cartQuantity === 0 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddItem}
              >
                Add
              </Button>
            ) : (
              <div
                className="d-flex align-items-center gap-2 px-3 py-1"
                style={{
                  border: "2px solid #fdd835",
                  borderRadius: 12,
                  background: "#fff",
                }}
              >
                <IconButton onClick={handleReduceCart} size="small">
                  <RemoveIcon />
                </IconButton>
                <span>{cartQuantity}</span>
                <IconButton onClick={handleAddItem} size="small">
                  <AddIcon />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onChange={handleTabChange} className="my-4">
        <Tab label="Product Info" />
        <Tab label="Shop Details" />
        <Tab label="Shipping & Returns" />
      </Tabs>
      <div className="mb-4">
        {tab === 0 && <p>{product.description}</p>}
        {tab === 1 && (
          <>
            <p>
              <strong>Shop:</strong> {product.shop}
            </p>
            <p>
              <strong>Location:</strong> {product.location}
            </p>
          </>
        )}
        {tab === 2 && (
          <ul>
            <li>Free shipping for orders above ₹500.</li>
            <li>Returns accepted within 7 days of delivery.</li>
          </ul>
        )}
      </div>

      {/* Related Products */}
      <div className="mt-5">
        <h5 className="mb-3">Related Products</h5>
        <div className="d-flex overflow-auto gap-3 pb-2">
          {trendingProducts
            .filter((p) => p.id !== product.id)
            .slice(0, 6)
            .map((item) => (
              <div key={item.id} className="card" style={{ minWidth: 150 }}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: 120, objectFit: "cover" }}
                />
                <div className="card-body p-2">
                  <h6 className="card-title mb-1">{item.name}</h6>
                  <p className="text-muted mb-0">₹{item.discount_price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Slide Notification */}
      <Slide direction="left" in={showSlide} mountOnEnter unmountOnExit>
        <div
          className="position-fixed top-0 end-0 bg-success text-white px-3 py-2 rounded-start shadow"
          style={{ zIndex: 2000 }}
        >
          Added to cart!
        </div>
      </Slide>

      {/* Share Dialog */}
      <Dialog open={shareOpen} onClose={() => setShareOpen(false)}>
        <DialogTitle>Share Product</DialogTitle>
        <DialogContent>
          <input
            type="text"
            className="form-control mb-2"
            value={window.location.href}
            readOnly
          />
          <div className="d-flex gap-2">
            <Button
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              variant="contained"
            >
              Copy Link
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                window.open(
                  `https://wa.me/?text=Check this out: ${window.location.href}`,
                  "_blank"
                )
              }
            >
              WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Swiggy-style Checkout Bar */}
      <FloatingCartBar />
    </div>
  );
}

export default ProductDetail;
