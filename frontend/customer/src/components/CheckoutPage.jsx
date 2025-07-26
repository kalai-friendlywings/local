// CheckoutPage.jsx
import { useState, useEffect } from "react";
import {
  Container, Box, Stepper, Step, StepLabel, Button, Grid, Card, CardContent,
  Typography, Divider, List, ListItem, TextField, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, Chip, Backdrop, CircularProgress,
} from "@mui/material";
import {
  ShoppingCart, LocationOn, CheckCircle, ArrowBack
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import "../pages/CheckoutPage.css";

const steps = ["Cart Review", "Pickup Details", "Payment", "Confirmation"];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [activeStep, setActiveStep] = useState(0);
  const [pickupOption, setPickupOption] = useState("asap");
  const [pickupTime, setPickupTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [orderNote, setOrderNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeStep === 3) {
      const audio = new Audio("/sounds/success.mp3");
      audio.play().catch((err) => console.error("Audio play error:", err));
      dispatch(clearCart()); // ✅ Clear cart after confirmation
    }
  }, [activeStep, dispatch]);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      if (activeStep === steps.length - 1) {
        navigate("/order-confirmation");
      } else {
        setActiveStep((prev) => prev + 1);
      }
      setLoading(false);
    }, 600);
  };

  const handleBack = () => {
    setLoading(true);
    setTimeout(() => {
      if (activeStep === 0) {
        navigate(-1);
      } else {
        setActiveStep((prev) => prev - 1);
      }
      setLoading(false);
    }, 300);
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom fontWeight={600}>Your Order</Typography>
            <List disablePadding>
              {cart.map((item) => (
                <ListItem key={item.id} sx={{ py: 2, px: 0 }}>
                  <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <Box component="img" src={item.image} alt={item.name}
                      sx={{ width: 60, height: 60, borderRadius: 1, mr: 2 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight={500}>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </Typography>
                    </Box>
                    <Typography fontWeight={500}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Subtotal:</Typography>
              <Typography>${calculateSubtotal()}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography>Service Fee:</Typography>
              <Typography>$0.99</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">
                ${(parseFloat(calculateSubtotal()) + 0.99).toFixed(2)}
              </Typography>
            </Box>
            <TextField
              label="Order Note (optional)"
              multiline
              rows={2}
              fullWidth
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              sx={{ mt: 3 }}
            />
          </Box>
        );

      case 1:
        return (
          <Box>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormLabel>Pickup Option</FormLabel>
              <RadioGroup value={pickupOption} onChange={(e) => setPickupOption(e.target.value)}>
                <FormControlLabel value="asap" control={<Radio />} label="Pick up as soon as ready" />
                <FormControlLabel value="later" control={<Radio />} label="Schedule for later" />
              </RadioGroup>
            </FormControl>
            {pickupOption === "later" && (
              <TextField
                label="Pickup Time"
                type="datetime-local"
                fullWidth
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            )}
            <Typography variant="subtitle1" fontWeight={500} mb={1}>Pickup Location</Typography>
            <Card variant="outlined">
              <CardContent>
                <Box display="flex" alignItems="center">
                  <LocationOn color="primary" sx={{ mr: 1 }} />
                  <Typography fontWeight={500}>123 Main Street, SF</Typography>
                </Box>
                <Typography variant="body2">Open until 9:00 PM</Typography>
              </CardContent>
            </Card>
          </Box>
        );

      case 2:
        return (
          <Box>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormLabel>Payment Method</FormLabel>
              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel value="credit_card" control={<Radio />} label="Card" />
                <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                <FormControlLabel value="cash" control={<Radio />} label="Cash" />
              </RadioGroup>
            </FormControl>
            {paymentMethod === "credit_card" && (
              <Box>
                <TextField
                  label="Card Number"
                  fullWidth
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Name on Card"
                  fullWidth
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Expiry"
                      fullWidth
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="CVV"
                      fullWidth
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        );

      case 3:
        return (
          <Box textAlign="center">
            <CheckCircle color="success" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h5">Order Confirmed!</Typography>
            <Chip
              label={`Order #${Math.floor(100000 + Math.random() * 900000)}`}
              color="primary"
              sx={{ mt: 2 }}
            />
            <Typography variant="body1" sx={{ mt: 2 }}>
              {pickupOption === "asap"
                ? "Ready in 30 minutes"
                : `Scheduled for ${new Date(pickupTime).toLocaleString()}`}
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card sx={{ p: 3, mb: 3 }}>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      <Box display="flex" justifyContent="space-between">
        <Button onClick={handleBack} startIcon={<ArrowBack />}>
          {activeStep === 0 ? "Back to Cart" : "Back"}
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          endIcon={activeStep < 3 ? <ShoppingCart /> : null}
          disabled={
            (activeStep === 1 && pickupOption === "later" && !pickupTime) ||
            (activeStep === 2 &&
              paymentMethod === "credit_card" &&
              (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv))
          }
        >
          {activeStep === 3 ? "Place Order" : "Continue"}
        </Button>
      </Box>

      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default CheckoutPage;
