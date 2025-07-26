import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cart
      .reduce((sum, item) => {
        const price = item.reducedPrice || item.price || 0;
        return sum + price * (item.quantity || 1);
      }, 0)
      .toFixed(2);
  };

  const calculateTotalItems = () => {
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        {/* Left: Cart Items */}
        <Grid item xs={12} md={8}>
          {cart.length === 0 ? (
            <Typography variant="h6" color="text.secondary">
              Your cart is empty.
            </Typography>
          ) : (
            cart.map((item) => {
              const price = item.reducedPrice || item.price || 0;
              return (
                <Card key={item.id || item._id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={4} sm={3}>
                        <img
                          src={item.image || "/no-image.png"}
                          alt={item.name || "Product"}
                          style={{
                            width: "100%",
                            maxHeight: 100,
                            objectFit: "cover",
                            borderRadius: 8,
                          }}
                        />
                      </Grid>
                      <Grid item xs={8} sm={6}>
                        <Typography variant="h6" noWrap>
                          {item.name || "Unnamed Product"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ₹{price.toFixed(2)} × {item.quantity || 1}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography align="right" fontWeight={600}>
                          ₹{(price * (item.quantity || 1)).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })
          )}
        </Grid>

        {/* Right: Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 1 }} />

            <Box display="flex" justifyContent="space-between" my={1}>
              <Typography>Total Items</Typography>
              <Typography>{calculateTotalItems()}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" my={1}>
              <Typography>Subtotal</Typography>
              <Typography>₹{calculateSubtotal()}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" my={1}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">₹{calculateSubtotal()}</Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={cart.length === 0}
              onClick={() => navigate("/payment")}
            >
              Proceed to Payment
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;
