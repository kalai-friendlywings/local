import { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';
import API from '@/api/client';
import ProductCard from '../components/ProductCard'; // or your component
import ShopCard from '../components/ShopCard';

const Favorites = () => {
  const [productFavorites, setProductFavorites] = useState([]);
  const [shopFavorites, setShopFavorites] = useState([]);

  useEffect(() => {
    API.get('favorite-products/').then((res) => setProductFavorites(res.data));
    API.get('favorite-shops/').then((res) => setShopFavorites(res.data));
  }, []);

  const isEmpty = productFavorites.length === 0 && shopFavorites.length === 0;

  return (
    <Box sx={{ p: 3 }}>
      {isEmpty ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
          }}
        >
          <FavoriteBorder sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" mb={1}>
            No favorites yet
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Save your favorite items for quick access
          </Typography>
          <Button variant="outlined">Browse Shops</Button>
        </Box>
      ) : (
        <>
          <Typography variant="h6" mb={2}>Favorite Products</Typography>
          <Grid container spacing={2}>
            {productFavorites.map((fav) => (
              <Grid item key={fav.id} xs={12} sm={6} md={4}>
                <ProductCard productId={fav.product} />
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" mt={4} mb={2}>Favorite Shops</Typography>
          <Grid container spacing={2}>
            {shopFavorites.map((fav) => (
              <Grid item key={fav.id} xs={12} sm={6} md={4}>
                <ShopCard shopId={fav.shop} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Favorites;
