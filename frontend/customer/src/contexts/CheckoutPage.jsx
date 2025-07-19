// src/pages/CheckoutPage.jsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
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
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Chip
} from '@mui/material';
import {
  ShoppingCart,
  LocationOn,
  CreditCard,
  CheckCircle,
  ArrowBack,
  Schedule,
  LocalShipping
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const steps = ['Cart Review', 'Pickup Details', 'Payment', 'Confirmation'];

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const [activeStep, setActiveStep] = useState(0);
  const [pickupOption, setPickupOption] = useState('asap');
  const [pickupTime, setPickupTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [orderNote, setOrderNote] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log('Order submitted!');
      navigate('/order-confirmation');
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) navigate(-1);
    else setActiveStep((prev) => prev - 1);
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
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
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Your Order
            </Typography>
            <List disablePadding>
              {cart.map((item) => (
                <ListItem key={item.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{ width: 60, height: 60, borderRadius: 1, mr: 2 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight={500}>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹{item.price.toFixed(2)} × {item.quantity}
                      </Typography>
                    </Box>
                    <Typography fontWeight={500}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Subtotal:</Typography>
              <Typography>₹{calculateSubtotal()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Service Fee:</Typography>
              <Typography>₹0.99</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">₹{calculateTotal()}</Typography>
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
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Pickup Information
            </Typography>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Pickup Option</FormLabel>
              <RadioGroup
                value={pickupOption}
                onChange={(e) => setPickupOption(e.target.value)}
              >
                <FormControlLabel
                  value="asap"
                  control={<Radio />}
                  label="Pick up as soon as ready"
                />
                <FormControlLabel
                  value="later"
                  control={<Radio />}
                  label="Schedule for later"
                />
              </RadioGroup>
            </FormControl>
            {pickupOption === 'later' && (
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
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn color="primary" sx={{ mr: 1 }} />
                  <Typography fontWeight={500}>LocalPickup Store</Typography>
                </Box>
                <Typography variant="body2">123 Main Street, YourCity</Typography>
              </CardContent>
            </Card>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Payment Method
            </Typography>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel value="credit_card" control={<Radio />} label="Card" />
                <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                <FormControlLabel value="cash" control={<Radio />} label="Cash on Pickup" />
              </RadioGroup>
            </FormControl>
            {paymentMethod === 'credit_card' && (
              <Box>
                <TextField
                  label="Card Number"
                  fullWidth
                  placeholder="1234 5678 9012 3456"
                  sx={{ mb: 2 }}
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                />
                <TextField
                  label="Name on Card"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                />
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      label="Expiry Date"
                      placeholder="MM/YY"
                      fullWidth
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="CVV"
                      placeholder="123"
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
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Order Confirmed!
            </Typography>
            <Typography variant="body1" mb={2}>
              Your order has been placed successfully.
            </Typography>
            <Chip label={`Order #${Math.floor(100000 + Math.random() * 900000)}`} />
            <Typography variant="body1" mt={2}>
              {pickupOption === 'asap'
                ? 'Ready in about 30 minutes'
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
      <Box>
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleBack} startIcon={<ArrowBack />}>
            {activeStep === 0 ? 'Back to Cart' : 'Back'}
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={
              (activeStep === 1 && pickupOption === 'later' && !pickupTime) ||
              (activeStep === 2 &&
                paymentMethod === 'credit_card' &&
                (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv))
            }
            endIcon={activeStep === steps.length - 1 ? null : <ShoppingCart />}
          >
            {activeStep === steps.length - 1 ? 'Place Order' : 'Continue'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
