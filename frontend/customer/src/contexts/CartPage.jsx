import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, List, ListItem } from '@mui/material';

const CartPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id}>
                {item.name} - ₹{item.price} × {item.quantity}
              </ListItem>
            ))}
          </List>
          <Button variant="contained" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
};

export default CartPage;
