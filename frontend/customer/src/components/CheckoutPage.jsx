import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Chip,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {
  ShoppingCart,
  LocationOn,
  CreditCard,
  CheckCircle,
  ArrowBack,
  Schedule,
  LocalShipping,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../pages/CheckoutPage.css";
const audio = new Audio("/sounds/success.wpv");
audio.play();
const steps = ["Cart Review", "Pickup Details", "Payment", "Confirmation"];
const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [cart, setCart] = useState([]);
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
  const navigate = useNavigate();

  useEffect(() => {
    const sampleCart = [
      {
        id: 1,
        name: "Organic Apples",
        price: 2.99,
        quantity: 3,
        image: "/images/apples.jpg",
      },
      {
        id: 2,
        name: "Whole Grain Bread",
        price: 3.49,
        quantity: 2,
        image: "/images/bread.jpg",
      },
    ];
    setCart(sampleCart);
  }, []);

  useEffect(() => {
    if (activeStep === 3) {
      const audio = new Audio("/sounds/success.mp3");
      audio.play().catch((err) => console.error("Audio play error:", err));
    }
  }, [activeStep]);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      if (activeStep === steps.length - 1) {
        console.log("Order submitted!");
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
    return cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const serviceFee = 0.99;
    return (subtotal + serviceFee).toFixed(2);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Your Order
            </Typography>
            <List disablePadding>
              {cart.map((item) => (
                <ListItem key={item.id} sx={{ py: 2, px: 0 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{ width: 60, height: 60, borderRadius: 1, mr: 2 }}
                    />
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
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Subtotal:</Typography>
              <Typography>${calculateSubtotal()}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Service Fee:</Typography>
              <Typography>$0.99</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${calculateTotal()}</Typography>
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
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Pickup Information
            </Typography>
            <FormControl component="fieldset" sx={{ width: "100%", mb: 3 }}>
              <FormLabel component="legend">Pickup Option</FormLabel>
              <RadioGroup
                value={pickupOption}
                onChange={(e) => setPickupOption(e.target.value)}
              >
                <FormControlLabel
                  value="asap"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Schedule color="primary" sx={{ mr: 1 }} />
                      <Box>
                        <Typography>Pick up as soon as ready</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Typically 15–30 minutes
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="later"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocalShipping color="primary" sx={{ mr: 1 }} />
                      <Box>
                        <Typography>Schedule for later</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Select your preferred time
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>

            {pickupOption === "later" && (
              <TextField
                label="Select Pickup Time"
                type="datetime-local"
                fullWidth
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
              />
            )}

            <Typography variant="subtitle1" fontWeight={500} mb={1}>
              Pickup Location
            </Typography>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocationOn color="primary" sx={{ mr: 1 }} />
                  <Typography fontWeight={500}>LocalPickup Store</Typography>
                </Box>
                <Typography variant="body2">
                  123 Main Street, San Francisco
                </Typography>
                <Typography variant="body2">
                  Open today until 9:00 PM
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Payment Method
            </Typography>
            <FormControl component="fieldset" sx={{ width: "100%", mb: 3 }}>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="credit_card"
                  control={<Radio />}
                  label="Credit/Debit Card"
                />
                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label="PayPal"
                />
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Cash on Pickup"
                />
              </RadioGroup>
            </FormControl>

            {paymentMethod === "credit_card" && (
              <Box>
                <TextField
                  label="Card Number"
                  fullWidth
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                  placeholder="1234 5678 9012 3456"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Name on Card"
                  fullWidth
                  value={cardDetails.name}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, name: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      label="Expiry Date"
                      fullWidth
                      value={cardDetails.expiry}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          expiry: e.target.value,
                        })
                      }
                      placeholder="MM/YY"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="CVV"
                      fullWidth
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, cvv: e.target.value })
                      }
                      placeholder="123"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {paymentMethod === "paypal" && (
              <Box textAlign="center" py={4}>
                <Typography>
                  You’ll be redirected to PayPal to complete your payment
                </Typography>
              </Box>
            )}

            {paymentMethod === "cash" && (
              <Box textAlign="center" py={4}>
                <Typography>
                  Pay with cash when you pick up your order
                </Typography>
              </Box>
            )}
          </Box>
        );

      case 3:
        return (
          <Box textAlign="center" py={4}>
            <Box className="pop-animation">
              <CheckCircle color="success" sx={{ fontSize: 80, mb: 2 }} />
            </Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Order Confirmed!
            </Typography>
            <Chip
              label={`Order #${Math.floor(100000 + Math.random() * 900000)}`}
              color="primary"
              sx={{ mb: 3 }}
            />
            <Typography variant="body1">
              {pickupOption === "asap"
                ? "Your order will be ready in about 30 minutes"
                : `Your order is scheduled for ${new Date(
                    pickupTime
                  ).toLocaleString()}`}
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card sx={{ p: 3, mb: 3 }}>
          <CardContent>{renderStepContent(activeStep)}</CardContent>
        </Card>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleBack} startIcon={<ArrowBack />} sx={{ mr: 1 }}>
            {activeStep === 0 ? "Back to Cart" : "Back"}
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={activeStep === steps.length - 1 ? null : <ShoppingCart />}
            disabled={
              (activeStep === 1 && pickupOption === "later" && !pickupTime) ||
              (activeStep === 2 &&
                paymentMethod === "credit_card" &&
                (!cardDetails.number ||
                  !cardDetails.name ||
                  !cardDetails.expiry ||
                  !cardDetails.cvv))
            }
          >
            {activeStep === steps.length - 1 ? "Place Order" : "Continue"}
          </Button>
        </Box>

        <Backdrop
          open={loading}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
