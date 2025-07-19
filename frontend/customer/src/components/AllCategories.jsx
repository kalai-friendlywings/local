import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme
} from "@mui/material";
import {
  MusicNote,
  FitnessCenter,
  Laptop,
  Favorite,
  Restaurant,
  LocalGroceryStore
} from "@mui/icons-material";

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

function AllCategories() {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleCategoryClick = (slug) => {
    navigate(`/categories/${slug}`);
  };

  return (
    <Box sx={{ px: 3, py: 5, maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        All Categories
      </Typography>

      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Card
              onClick={() => handleCategoryClick(category.slug)}
              sx={{
                cursor: "pointer",
                textAlign: "center",
                py: 3,
                px: 2,
                borderRadius: 3,
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
                }
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    mx: "auto",
                    mb: 1.5,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {category.icon}
                </Box>
                <Typography variant="subtitle1" fontWeight="medium">
                  {category.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {Math.floor(Math.random() * 50) + 10} products
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AllCategories;
