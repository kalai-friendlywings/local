// src/userAccount/PaymentMethods.jsx
import { Box, Typography, Button } from '@mui/material'
import { CreditCardOutlined } from '@mui/icons-material'

const PaymentMethods = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      p: 3
    }}>
      <CreditCardOutlined sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
      <Typography variant="h6" color="text.secondary" mb={1}>
        No payment methods saved
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Add your payment cards for faster checkout
      </Typography>
      <Button variant="contained">
        Add Payment Method
      </Button>
    </Box>
  )
}

export default PaymentMethods