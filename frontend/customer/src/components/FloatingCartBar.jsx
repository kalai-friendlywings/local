import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, Typography, Slide } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const FloatingCartBar = ({ visible = true }) => {
  const navigate = useNavigate();

  // Filter only items with quantity > 0
  const cartItems = useSelector((state) =>
    state.cart.items.filter((item) => item.quantity > 0)
  );

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  if (!visible || cartItems.length === 0) return null;

  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "skyblue",
          color: "white",
          py: 1.5,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1300,
          boxShadow: 4,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <ShoppingCartIcon />
          <Typography>
            {totalQuantity} item{totalQuantity > 1 ? "s" : ""} | ₹{totalPrice}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="light"
          onClick={() => navigate("/checkout")}
        >
          View Cart
        </Button>
      </Box>
    </Slide>
  );
};

export default FloatingCartBar;
