import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Container,
  Stack,
  Paper,
} from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
// adjust path as needed
import { Add, Remove, Delete, ArrowBack } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const AddToCartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = item.price || 0;
      const qty = item.quantity || 0;
      return acc + price * qty;
    }, 0);
  };

  const calculateOriginalTotal = () => {
    return cartItems.reduce((acc, item) => {
      const original_price = item.original_price || item.price || 0;
      const qty = item.quantity || 0;
      return acc + original_price * qty;
    }, 0);
  };

  const total = calculateSubtotal();
  const { user } = useAuth();
  const originalTotal = calculateOriginalTotal();
  const savings = (originalTotal - total).toFixed(2);
  const grandTotal = (total + 2).toFixed(2);

  return (
    <Container
      maxWidth="sm"
      disableGutters
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Header */}
      <Box
        px={2}
        py={1}
        boxShadow={1}
        bgcolor="#fff"
        position="sticky"
        top={0}
        zIndex={1000}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <IconButton onClick={() => navigate(-1)} size="small">
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" fontWeight={600}>
          My Cart
        </Typography>
      </Box>

      {/* Scrollable Cart Items */}
      <Box
        px={2}
        py={2}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Paper variant="outlined" sx={{ borderRadius: 2, p: 2, mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Delivery in 30 minutes
          </Typography>
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id} disableGutters alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    src={item.image}
                    variant="rounded"
                    sx={{ width: 60, height: 60, mr: 1 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight={600}>
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        ₹{item.price} × {item.quantity}&nbsp;
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ textDecoration: "line-through", color: "blue" }}
                        >
                          ₹{item.original_price || item.price}
                        </Typography>
                      </Typography>
                      <Typography fontWeight={600} mt={0.5}>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </>
                  }
                />
                <Stack direction="column" alignItems="center" spacing={0.5}>
                  <Stack direction="row" alignItems="center">
                    <IconButton
                      size="small"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Stack>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    <Delete fontSize="small" color="error" />
                  </IconButton>
                </Stack>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Bill Details */}
        <Paper variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Bill Details
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography>Items total</Typography>
            <Typography>₹{originalTotal.toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography color="success.main">You save</Typography>
            <Typography color="success.main">₹{savings}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography>Delivery charge</Typography>
            <Typography color="success.main">FREE</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography>Handling charge</Typography>
            <Typography>₹2</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" fontWeight={600}>
              Grand total
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              ₹{grandTotal}
            </Typography>
          </Box>
        </Paper>

        {/* Cancellation Policy */}
        <Paper variant="outlined" sx={{ borderRadius: 2, p: 2, mt: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Cancellation Policy
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Orders cannot be cancelled once packed for delivery. In case of
            unexpected delays, a refund will be provided, if applicable.
          </Typography>
        </Paper>
      </Box>

      {/* Footer */}
      {/* Footer */}
      <Box
        px={2}
        py={1.5}
        boxShadow={3}
        bgcolor="#fff"
        position="sticky"
        bottom={0}
        zIndex={1000}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              ₹{grandTotal}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              TOTAL
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => {
              if (user) {
                navigate("/checkout");
              } else {
                navigate("/login");
              }
            }}
          >
            {user ? "Proceed to Checkout" : "Login to Proceed"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddToCartPage;
