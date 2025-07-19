import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";


const ShopCard = ({ shop }) => {
  return (
    <Card sx={{ position: "relative" }}>
      <CardContent>
        <Typography variant="h6">{shop.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {shop.address}
        </Typography>
      </CardContent>

      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <FavoriteToggle
          itemId={shop.id}
          isFavorite={shop.is_favorite}
          type="shop"
        />
      </Box>
    </Card>
  );
};

export default ShopCard;
