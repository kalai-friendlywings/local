import { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, List, ListItem, ListItemAvatar,
  ListItemText, Avatar, Chip, Divider, CircularProgress,
  Alert, Button, Rating
} from '@mui/material';
import {
  ShoppingBagOutlined,
  LocalShipping,
  DoneAll,
  Star,
  Refresh
} from '@mui/icons-material';
import API from '@/api/client';
import { useAuth } from '@/contexts/AuthContext';

const Orders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get('orders/', {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
      setOrders(response.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError(err.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [currentUser.token]);

  useEffect(() => {
    if (currentUser?.token) {
      fetchOrders();
    }
  }, [fetchOrders, currentUser]);

  const handleRateOrder = async (orderId, rating) => {
    try {
      await API.patch(`orders/${orderId}/rate/`, { rating }, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
      fetchOrders();
    } catch (err) {
      console.error('Failed to rate order:', err);
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'ready':
        return <Chip icon={<DoneAll fontSize="small" />} label="Ready for pickup" color="success" size="small" />;
      case 'completed':
        return <Chip icon={<LocalShipping fontSize="small" />} label="Delivered" color="primary" size="small" />;
      case 'cancelled':
        return <Chip label="Cancelled" color="error" size="small" />;
      default:
        return <Chip label="Processing" size="small" />;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <Button
            color="inherit"
            size="small"
            startIcon={<Refresh />}
            onClick={fetchOrders}
          >
            Retry
          </Button>
        }
        sx={{ mb: 3 }}
      >
        {error}
      </Alert>
    );
  }

  if (orders.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <ShoppingBagOutlined sx={{ fontSize: 60, color: 'text.disabled', mb: 1 }} />
        <Typography variant="h6" color="text.secondary">
          No orders found
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={fetchOrders}
          startIcon={<Refresh />}
        >
          Refresh
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Order History
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={fetchOrders}
          startIcon={<Refresh />}
        >
          Refresh
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <List disablePadding>
        {orders.map((order, index) => (
          <Box key={order.id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                py: 2,
                px: 0,
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'background.default' }}>
                  <ShoppingBagOutlined color="primary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography fontWeight={600}>
                      {order.shop.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {new Date(order.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body2" component="span">
                      Order #{order.id} • {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 1
                    }}>
                      <Box>
                        {getStatusChip(order.status)}
                        {order.status === 'completed' && order.rating === null && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              Rate your order:
                            </Typography>
                            <Rating
                              name={`order-rating-${order.id}`}
                              value={0}
                              onChange={(event, newValue) => {
                                handleRateOrder(order.id, newValue);
                              }}
                              emptyIcon={<Star fontSize="inherit" />}
                            />
                          </Box>
                        )}
                        {order.rating !== null && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              Your rating:
                            </Typography>
                            <Rating
                              name={`order-rating-${order.id}`}
                              value={order.rating}
                              readOnly
                              emptyIcon={<Star fontSize="inherit" />}
                            />
                          </Box>
                        )}
                      </Box>
                      <Typography fontWeight={600}>
                        ${order.total_amount.toFixed(2)}
                      </Typography>
                    </Box>
                  </>
                }
              />
            </ListItem>
            {index < orders.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Orders;
