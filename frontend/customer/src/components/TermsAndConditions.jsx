import { Container, Typography, Box, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function TermsAndConditions() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBack />}
        sx={{ mb: 3 }}
      >
        Back to Home
      </Button>

      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
        Terms and Conditions
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Last Updated: {new Date().toLocaleDateString()}
      </Typography>

      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
          1. Acceptance of Terms
        </Typography>
        <Typography paragraph>
          By accessing or using the LocalPickup platform ("Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of the terms, you may not access the Service.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
          2. User Accounts
        </Typography>
        <Typography paragraph>
          When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
          3. Ordering and Payments
        </Typography>
        <Typography paragraph>
          a. All orders placed through LocalPickup are subject to product availability and confirmation of the order price.<br />
          b. You agree to pay all charges incurred by your account, including applicable taxes.<br />
          c. LocalPickup may cancel any order if we suspect fraudulent activity.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
          4. Pickup Policy
        </Typography>
        <Typography paragraph>
          a. You must pick up your order within the designated time window provided by the merchant.<br />
          b. Orders not picked up within 24 hours may be subject to cancellation and restocking fees.<br />
          c. Proper identification may be required for order pickup.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
          5. Prohibited Conduct
        </Typography>
        <Typography paragraph>
          You agree not to:<br />
          a. Use the Service for any illegal purpose<br />
          b. Harass merchants or other users<br />
          c. Attempt to gain unauthorized access to any part of the Service<br />
          d. Use any automated system to access the Service in a manner that sends more request messages than a human could reasonably produce
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
          6. Intellectual Property
        </Typography>
        <Typography paragraph>
          The Service and its original content, features, and functionality are owned by LocalPickup and are protected by international copyright, trademark, and other intellectual property laws.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
          7. Limitation of Liability
        </Typography>
        <Typography paragraph>
          LocalPickup shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use the Service or for the unavailability of any products.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
          8. Changes to Terms
        </Typography>
        <Typography paragraph>
          We reserve the right to modify these terms at any time. We will provide notice of any changes by updating the "Last Updated" date at the top of this page.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
          9. Governing Law
        </Typography>
        <Typography paragraph>
          These Terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
          10. Contact Information
        </Typography>
        <Typography paragraph>
          For questions about these Terms, please contact us at:<br />
          Email: legal@localpickup.example.com<br />
          Address: [Your Company Address]
        </Typography>
      </Box>

      <Box sx={{ mt: 4, borderTop: '1px solid #eee', pt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} LocalPickup. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}

export default TermsAndConditions;