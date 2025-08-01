import React from "react";
import { useNavigate } from "react-router-dom";
import {
Box,
Typography,
IconButton,
Card,
CardContent,
useTheme
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

// Replace these image URLs with your own icon image URLs
const categories = [
  { name: "Offers", imgSrc: "/icons/70%.png", slug: "offers" },
{ name: "Grocery", imgSrc: "/icons/grocery.png", slug: "grocery" },
{ name: "Appliance", imgSrc: "/icons/furniture.png", slug: "fitness" },
{ name: "fashion", imgSrc: "/icons/Fashion.png", slug: "fashion" },
{ name: "Meet", imgSrc: "/icons/meet.png", slug: "Meet" },
{ name: "Food", imgSrc: "/icons/food.png", slug: "Food" },
{ name: "snacks", imgSrc: "/icons/snacks.png", slug: "snack" },
{ name: "Toys", imgSrc: "/icons/toys.png", slug: "Toys" },
{ name: "Books", imgSrc: "/icons/stationary.png", slug: "books" },


];

function CategoryScroller() {
const navigate = useNavigate();
const theme = useTheme();

const handleCategoryClick = (slug) => {
  navigate(`/categories/${slug}`);
};

return (
  <Box sx={{ px: 2, py: 3 }}>
    {/* Header */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Browse Categories
      </Typography>
      <IconButton
        onClick={() => navigate("/categories")}
        sx={{ color: theme.palette.primary.main }}
      >
        <ChevronRight />
      </IconButton>
    </Box>

    {/* Categories Scroll */}
    <Box
      sx={{
        display: "flex",
        gap: 2,
        overflowX: "auto",
        pb: 2,
        "&::-webkit-scrollbar": {
          height: "6px"
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.grey[300],
          borderRadius: "3px"
        }
      }}
        style={{
  scrollbarWidth: "none", // For Firefox
  msOverflowStyle: "none", // For IE and Edge
  overflowX: "auto",
}}
>
<style>
  {`
    /* Hide scrollbar for Chrome, Safari and Opera */
    .d-flex::-webkit-scrollbar {
      display: none;
    }
  `}
</style>
    
      {categories.map((category, index) => (
        <Card
          key={index}
          onClick={() => handleCategoryClick(category.slug)}
          sx={{
            minWidth: 120,
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            backgroundColor:"lightyellow",/* #F9CD05 */
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 6px 12px rgba(0,0,0,0.15)"
            }
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
              "&:last-child": { pb: 2 }
            }}
          >
            <img
              src={category.imgSrc}
              alt={category.name}
              style={{
                width: 90,
                height: 90,
                objectFit: "contain",
                marginBottom: 8,
              }}
            />
            <Typography variant="subtitle1" fontWeight="medium">
              {category.name}
            </Typography>
            
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
);
}

export default CategoryScroller;
