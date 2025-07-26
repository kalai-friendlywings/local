// components/FloatingCartButton.jsx
import React from 'react';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const FloatingCartButton = ({ count }) => {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => navigate("/cart")}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        backgroundColor: '#fff',
        boxShadow: 4,
        zIndex: 2000,
      }}
    >
      <Badge badgeContent={count} color="error">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default FloatingCartButton;
