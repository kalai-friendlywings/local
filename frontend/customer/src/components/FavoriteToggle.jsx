import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const FavoriteToggle = ({ itemId, isFavorite = false, type = "shop" }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleToggle = () => {
    setFavorite(!favorite);
    // TODO: Call backend API here to update favorite status
    console.log(`Toggled ${type} ${itemId} to ${!favorite}`);
  };

  return (
    <IconButton onClick={handleToggle} color={favorite ? "error" : "default"}>
      {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteToggle;
