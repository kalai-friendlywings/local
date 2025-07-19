// src/pages/AddToCartPage.jsx
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateQuantity } from "../redux/cartSlice";
import { useState, useEffect, useRef } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Divider,
  Box,
  TextField,
  Badge,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  useTheme,
  useMediaQuery,
  Drawer,
  SwipeableDrawer,
} from "@mui/material";
import {
  Add,
  Remove,
  ShoppingCart,
  ArrowBack,
  Delete,
  LocalShipping,
  Discount,
  Close,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AddToCartPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  // Sample products data
 const [products] = useState([
  {
    id: 1,
    name: "Organic Apples",
    price: 2.99,
    image: "/image/apple.jpg",
    description: "Fresh organic apples",
    stock: 10,
    category: "Fruits",
  },
  {
    id: 2,
    name: "Bananas",
    price: 1.5,
    image: "/image/banana.jpg",
    description: "Ripe bananas",
    stock: 15,
    category: "Fruits",
  },
  {
    id: 3,
    name: "Almond Milk",
    price: 3.99,
    image: "/image/almondmilk.jpg",
    description: "Dairy-free milk alternative",
    stock: 8,
    category: "Beverages",
  },
  // Add more...
]);

  const cart = useSelector((state) => state.cart.items);
  const [quantities, setQuantities] = useState({});
  const [note, setNote] = useState("");

  // Initialize quantities
  useEffect(() => {
    const initialQuantities = {};
    products.forEach((product) => {
      initialQuantities[product.id] = 1;
    });
    setQuantities(initialQuantities);
  }, [products]);

  // Mobile-friendly handlers
  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => {
      const newValue = (prev[productId] || 1) + change;
      const product = products.find(p => p.id === productId);
      
      if (newValue < 1 || newValue > product.stock) return prev;
      
      return { ...prev, [productId]: newValue };
    });
  };

 const addToCart = (product) => {
  const existingItem = cart.find(item => item.id === product.id);
  const newQuantity = (existingItem?.quantity || 0) + (quantities[product.id] || 1);

  if (newQuantity <= product.stock) {
    dispatch(addItem({ ...product, quantity: newQuantity }));
    if (isMobile) setMobileCartOpen(true);
  }
};

  // Mobile cart drawer
  const toggleCartDrawer = (open) => () => {
    setMobileCartOpen(open);
  };

  // Calculations
  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => 
      total + item.price * item.quantity, 0);
    return (subtotal + 2.99).toFixed(2); // + delivery
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
      {/* Mobile Header */}
      {isMobile && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          position: 'sticky',
          top: 0,
          backgroundColor: 'background.paper',
          zIndex: 1,
          py: 1
        }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Badge 
            badgeContent={cart.length} 
            color="primary" 
            overlap="circular"
            onClick={toggleCartDrawer(true)}
            sx={{ cursor: 'pointer' }}
          >
            <ShoppingCart fontSize="medium" />
          </Badge>
        </Box>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
            Back
          </Button>
          <Badge badgeContent={cart.length} color="primary">
            <Button 
              startIcon={<ShoppingCart />}
              onClick={() => navigate("/checkout")}
              disabled={cart.length === 0}
              variant="contained"
            >
              Checkout
            </Button>
          </Badge>
        </Box>
      )}

      {/* Main Content */}
      <Grid container spacing={2}>
        {/* Products Grid - Full width on mobile */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Available Products
          </Typography>

          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={6} sm={4} key={product.id}>
                <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: 1,
                  '&:hover': {
                    boxShadow: 3,
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography 
                      gutterBottom 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        mb: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      color="primary" 
                      sx={{ fontWeight: 700 }}
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      onClick={() => handleQuantityChange(product.id, -1)}
                      disabled={quantities[product.id] <= 1}
                      size="small"
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography 
                      sx={{ 
                        mx: 1, 
                        minWidth: 24, 
                        textAlign: 'center' 
                      }}
                    >
                      {quantities[product.id] || 1}
                    </Typography>
                    <IconButton
                      onClick={() => handleQuantityChange(product.id, 1)}
                      disabled={quantities[product.id] >= product.stock}
                      size="small"
                    >
                      <Add fontSize="small" />
                    </IconButton>
                    <Button
                      variant="contained"
                      onClick={() => addToCart(product)}
                      size="small"
                      disabled={product.stock === 0}
                      sx={{ ml: 'auto', whiteSpace: 'nowrap' }}
                    >
                      Add
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Desktop Cart Sidebar */}
        {!isMobile && (
          <Grid item xs={12} md={4}>
            <CartSidebar 
              cart={cart} 
              note={note} 
              setNote={setNote} 
              calculateTotal={calculateTotal}
              dispatch={dispatch}
              products={products}
              navigate={navigate}
            />
          </Grid>
        )}
      </Grid>

      {/* Mobile Cart Drawer */}
      {isMobile && (
        <SwipeableDrawer
          anchor="right"
          open={mobileCartOpen}
          onClose={toggleCartDrawer(false)}
          onOpen={toggleCartDrawer(true)}
          PaperProps={{
            sx: { 
              width: '100%',
              maxWidth: 400,
              p: 2,
              boxSizing: 'border-box'
            }
          }}
        >
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Your Cart ({cart.length})
            </Typography>
            <IconButton onClick={toggleCartDrawer(false)}>
              <Close />
            </IconButton>
          </Box>
          
          <CartSidebar 
            cart={cart} 
            note={note} 
            setNote={setNote} 
            calculateTotal={calculateTotal}
            dispatch={dispatch}
            products={products}
            navigate={navigate}
            isMobile={true}
          />
        </SwipeableDrawer>
      )}

      {/* Floating Checkout Button for Mobile */}
      {isMobile && cart.length > 0 && (
        <Box sx={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          right: 16,
          zIndex: 1000
        }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<ShoppingCart />}
            onClick={() => navigate("/checkout")}
            sx={{
              borderRadius: 2,
              py: 1.5,
              boxShadow: 3,
              fontWeight: 600
            }}
          >
            Checkout (${calculateTotal()})
          </Button>
        </Box>
      )}
    </Container>
  );
};

// Extracted Cart Sidebar Component
const CartSidebar = ({ 
  cart, 
  note, 
  setNote, 
  calculateTotal,
  dispatch,
  products,
  navigate,
  isMobile 
}) => {
  const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeItem(productId));
    } else {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    }
  };

  return (
    <Paper sx={{ 
      height: isMobile ? 'calc(100vh - 120px)' : 'auto',
      overflow: 'auto',
      p: 2,
      borderRadius: 2
    }}>
      {cart.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: isMobile ? '60%' : '200px',
          textAlign: 'center'
        }}>
          <ShoppingCart sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
          <Typography variant="body1" color="text.secondary">
            Your cart is empty
          </Typography>
        </Box>
      ) : (
        <>
          <List disablePadding>
            {cart.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  py: 1,
                  px: 0,
                  '&:not(:last-child)': {
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={item.image}
                    variant="rounded"
                    sx={{ width: 56, height: 56, mr: 1 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography 
                      variant="subtitle2" 
                      sx={{ fontWeight: 600 }}
                    >
                      {item.name}
                    </Typography>
                  }
                  secondary={`$${item.price.toFixed(2)}`}
                />
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  ml: 'auto'
                }}>
                  <IconButton
                    size="small"
                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    disabled={
                      item.quantity >= 
                      (products.find((p) => p.id === item.id)?.stock || 0)
                    }
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <TextField
            label="Order note (optional)"
            multiline
            rows={2}
            fullWidth
            value={note}
            onChange={(e) => setNote(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 2 }}>
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1
            }}>
              <Typography>Subtotal:</Typography>
              <Typography>
                ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1
            }}>
              <Typography>Delivery:</Typography>
              <Typography>$2.99</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 600
            }}>
              <Typography>Total:</Typography>
              <Typography>${calculateTotal()}</Typography>
            </Box>
          </Box>

          {!isMobile && (
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => navigate("/checkout")}
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </Button>
          )}
        </>
      )}
    </Paper>
  );
};

export default AddToCartPage;