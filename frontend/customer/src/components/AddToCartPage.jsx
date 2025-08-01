import React, { useEffect, useState, useMemo, useCallback } from "react";
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { Add, Remove, Delete, ArrowBack } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AddToCartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deliveryMode, setDeliveryMode] = useState("delivery");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const token = localStorage.getItem("access");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/addresses/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(res.data);
        const defaultAddr = res.data.find((addr) => addr.default);
        if (defaultAddr) setSelectedAddress(defaultAddr);
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      }
    };

    if (token) fetchAddresses();
  }, [token]);

  const handlePromoApply = () => {
    const code = promoCode.trim().toUpperCase();
    let discount = 0;
    let message = "";
    let severity = "success";

    if (code === "SAVE10") {
      discount = 10;
      message = "Promo SAVE10 applied! ₹10 off";
    } else if (code === "OFF20") {
      discount = 20;
      message = "Promo OFF20 applied! ₹20 off";
    } else {
      message = "Invalid promo code";
      severity = "error";
    }

    setPromoDiscount(discount);
    setPromoApplied(discount > 0);
    setSnackbar({ open: true, message, severity });
  };

  const calculateSubtotal = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        const price = parseFloat(item.discount_price) || 0;
        const qty = parseInt(item.quantity) || 0;
        return acc + price * qty;
      }, 0),
    [cartItems]
  );

  const calculateOriginalTotal = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        const original = parseFloat(item.original_price ?? item.price) || 0;
        const qty = parseInt(item.quantity) || 0;
        return acc + original * qty;
      }, 0),
    [cartItems]
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const savings = useMemo(() => {
    return Math.max(
      calculateOriginalTotal - calculateSubtotal + promoDiscount,
      0
    ).toFixed(2);
  }, [calculateOriginalTotal, calculateSubtotal, promoDiscount]);

  const isPickup = deliveryMode === "pickup";
  const handlingCharge = isPickup ? 4 : 2;
  const deliveryCharge = isPickup ? 0 : 30;

  const grandTotal = useMemo(() => {
    return (
      calculateSubtotal +
      handlingCharge +
      deliveryCharge -
      promoDiscount
    ).toFixed(2);
  }, [calculateSubtotal, handlingCharge, deliveryCharge, promoDiscount]);

  const handleIncrement = useCallback(
    (id) => dispatch(incrementQuantity(id)),
    [dispatch]
  );
  const handleDecrement = useCallback(
    (id) => dispatch(decrementQuantity(id)),
    [dispatch]
  );
  const handleRemove = useCallback(
    (id) => dispatch(removeItem(id)),
    [dispatch]
  );

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

      {/* Main Content */}
      <Box
        px={2}
        py={2}
        sx={{ flexGrow: 1, overflowY: "auto", backgroundColor: "#f9f9f9" }}
      >
        {/* Delivery Mode */}
        <Paper sx={{ mb: 2, p: 2 }} elevation={0}>
          <Typography variant="subtitle1" fontWeight={600}>
            Delivery Option
          </Typography>
          <RadioGroup
            row
            value={deliveryMode}
            onChange={(e) => setDeliveryMode(e.target.value)}
          >
            <FormControlLabel
              value="delivery"
              control={<Radio />}
              label="Delivery"
            />
            <FormControlLabel
              value="pickup"
              control={<Radio />}
              label="Self Pickup"
            />
          </RadioGroup>
        </Paper>

        {/* Address Select */}
        {deliveryMode === "delivery" && (
          <Paper variant="outlined" sx={{ borderRadius: 2, p: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Delivery Address
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Select Address</InputLabel>
              <Select
                value={selectedAddress?.id || ""}
                label="Select Address"
                onChange={(e) => {
                  const selected = addresses.find(
                    (a) => a.id === e.target.value
                  );
                  setSelectedAddress(selected);
                }}
              >
                {addresses.map((addr) => {
                  const formatted = `${addr.houseNo}, ${addr.city}, ${addr.village}, ${addr.pinCode}`;
                  return (
                    <MenuItem key={addr.id} value={addr.id}>
                      {formatted} {addr.default && "(Default)"}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Paper>
        )}

        {/* Cart Items */}
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
                    imgProps={{ loading: "lazy" }}
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
                      <Typography variant="body2">
                        ₹{item.discount_price} × {item.quantity}{" "}
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ textDecoration: "line-through", color: "gray" }}
                        >
                          ₹{item.original_price ?? item.price}
                        </Typography>
                      </Typography>
                      <Typography fontWeight={600} mt={0.5}>
                        ₹{(item.discount_price * item.quantity).toFixed(2)}
                      </Typography>
                    </>
                  }
                />
                <Stack direction="column" alignItems="center" spacing={0.5}>
                  <Stack direction="row" alignItems="center">
                    <IconButton
                      size="small"
                      onClick={() => handleDecrement(item.id)}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleIncrement(item.id)}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Stack>
                  <IconButton
                    size="small"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Delete fontSize="small" color="error" />
                  </IconButton>
                </Stack>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Promo Code */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Apply Promo Code
          </Typography>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            alignItems={{ xs: "stretch", sm: "flex-end" }}
          >
            <TextField
              label="Enter Promo Code"
              variant="outlined"
              fullWidth
              size="small"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button
              variant="contained"
              size="medium"
              sx={{ px: 4 }}
              onClick={handlePromoApply}
            >
              Apply
            </Button>
          </Box>
        </Paper>

        {/* Bill Summary */}
        <Paper variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Bill Details ({totalItems} {totalItems === 1 ? "item" : "items"})
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography>Items total</Typography>
            <Typography>₹{calculateSubtotal.toFixed(2)}</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            color="success.main"
          >
            <Typography>You save</Typography>
            <Typography>₹{savings}</Typography>
          </Box>
          {!isPickup && (
            <Box display="flex" justifyContent="space-between">
              <Typography>Delivery charge</Typography>
              <Typography>₹{deliveryCharge.toFixed(2)}</Typography>
            </Box>
          )}
          <Box display="flex" justifyContent="space-between">
            <Typography>Handling charge</Typography>
            <Typography>₹{handlingCharge}</Typography>
          </Box>
          {promoApplied && (
            <Box display="flex" justifyContent="space-between">
              <Typography>Promo discount</Typography>
              <Typography color="green">-₹{promoDiscount}</Typography>
            </Box>
          )}
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
          <Typography variant="subtitle2" fontWeight={600}>
            Cancellation Policy
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Orders cannot be cancelled once packed. Refunds apply for delivery
            delays.
          </Typography>
        </Paper>
      </Box>

      {/* Savings Banner */}
      {parseFloat(savings) > 0 && (
        <Box
          textAlign="center"
          py={1}
          bgcolor="#e0ffe0"
          color="green"
          fontWeight={600}
          borderTop="2px dashed green"
        >
          🎉 You’re saving ₹{savings} on this order!
        </Box>
      )}

      {/* Checkout Footer */}
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
              {totalItems} {totalItems === 1 ? "item" : "items"} • TOTAL
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() =>
              user
                ? navigate("/PaymentPage", { state: { amount: grandTotal } })
                : navigate("/login", {
                    state: { next: "/PaymentPage", amount: grandTotal },
                  })
            }
          >
            {user ? "Proceed to Checkout" : "Login to Proceed"}
          </Button>
        </Box>
      </Box>

      {/* Snackbar for promo codes */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddToCartPage;
