import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ position: "relative" }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          ₹{product.price}
        </Typography>
      </CardContent>

      {/* Favorite Button in top-right */}
      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <FavoriteToggle
          itemId={product.id}
          isFavorite={product.is_favorite}
          type="product"
        />
      </Box>
    </Card>
  );
};

export default ProductCard;
