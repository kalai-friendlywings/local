// src/components/ErrorBoundary.jsx
import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false)

  const handleTryAgain = () => {
    setHasError(false)
    window.location.reload()
  }

  if (hasError) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error" gutterBottom>
          Something went wrong
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleTryAgain}
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      </Box>
    )
  }

  return children
}

export default ErrorBoundary