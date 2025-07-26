import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Rating,
  Stack,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteToggle from "./FavoriteToggle";
import { useNavigate } from "react-router-dom";

const ShopCard = ({ shop, disableNavigation = false }) => {
  const [isFollowing, setIsFollowing] = useState(shop.is_following || false);
  const navigate = useNavigate();

  const handleFollowToggle = (e) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);

    // LocalStorage logic for saving shop favorites
    const stored = JSON.parse(localStorage.getItem("favoriteShops")) || [];
    const exists = stored.find((s) => s.id === shop.id);
    const updated = exists
      ? stored.filter((s) => s.id !== shop.id)
      : [...stored, shop];

    localStorage.setItem("favoriteShops", JSON.stringify(updated));
  };

  const handleCardClick = () => {
    if (disableNavigation) return;
    navigate(`/shop/${shop.id}`);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: shop.name,
        text: "Check out this shop!",
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        width: "100%",
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#fff",
        cursor: disableNavigation ? "default" : "pointer",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: disableNavigation ? "none" : "scale(1.01)",
        },
      }}
    >
      {/* Banner */}
      <Box
        sx={{
          height: 90,
          background: shop.banner
            ? `url(${shop.banner}) center/cover no-repeat`
            : "linear-gradient(135deg, #4b6cb7, #182848)",
          position: "relative",
        }}
      >
        {shop.distance && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "#fff",
              borderRadius: 1,
              px: 1,
              py: 0.5,
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            {shop.distance} km away
          </Box>
        )}

        {/* Top-right actions */}
        <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 1 }}>
          <Tooltip title="Share">
            <IconButton onClick={handleShare} size="small">
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <FavoriteToggle item={shop} type="shop" />
        </Box>
      </Box>

      <Avatar
        src={shop.profile || "/default-profile.jpg"}
        sx={{
          width: 90,
          height: 90,
          border: "3px solid white",
          position: "absolute",
          top: 40,
          left: 10,
          zIndex: 1,
        }}
      />

      <CardContent sx={{ pt: 4, pb: 6, pl: 2, pr: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          {shop.name}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
          <LocationOnIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {shop.address || "Address not available"}
          </Typography>
        </Stack>

        {shop.categories?.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
            {shop.categories.map((cat, idx) => (
              <Chip
                key={idx}
                icon={<CategoryIcon fontSize="small" />}
                label={cat}
                size="small"
                sx={{ fontSize: "0.7rem" }}
              />
            ))}
          </Stack>
        )}
      </CardContent>

      <Box
        sx={{
          position: "absolute",
          right: 18,
          bottom: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Rating
          value={shop.rating || 0}
          precision={0.5}
          size="small"
          readOnly
          sx={{ mb: 0.5 }}
        />

        <Button
          variant={isFollowing ? "contained" : "outlined"}
          size="small"
          onClick={handleFollowToggle}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontSize: "0.75rem",
            px: 2,
            py: 0.5,
          }}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </Box>
    </Card>
  );
};

export default ShopCard;
