// src/components/BillSummary.jsx
import { Box, Typography, Divider } from '@mui/material';

const BillSummary = ({ cart, showNote = false, orderNote = '', setOrderNote = () => {} }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.18;
  const deliveryFee = 2.99;
  const total = subtotal + gst + deliveryFee;

  return (
    <Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Subtotal:</Typography>
        <Typography>${subtotal.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>GST (18%):</Typography>
        <Typography>${gst.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Delivery Fee:</Typography>
        <Typography>${deliveryFee.toFixed(2)}</Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h6">${total.toFixed(2)}</Typography>
      </Box>

      {showNote && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Order Note (optional)
          </Typography>
          <textarea
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
            placeholder="Leave a message for the shop..."
            rows={2}
            style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #ccc' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default BillSummary;
