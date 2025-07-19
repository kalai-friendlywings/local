import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import ProfileTab from './Profile';
import OrdersTab from './MyOrders';
import AddressesTab from './Addresses';
import FavoritesTab from './Favorites';
import PaymentsTab from './PaymentMethods';
import SettingsTab from './Settings';
import MobileBottomNav from './MobileBottomNav';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabComponents = {
    profile: <ProfileTab />,
    orders: <OrdersTab />,
    addresses: <AddressesTab />,
    favorites: <FavoritesTab />,
    payments: <PaymentsTab />,
    settings: <SettingsTab />,
  };

  const tabLabels = ['profile', 'orders', 'addresses', 'favorites', 'payments', 'settings'];

  return (
    <Box sx={{ maxWidth: '1000px', mx: 'auto', mt: 4, px: 2, pb: { xs: 8, md: 0 } }}>
      {/* Desktop Tab Navigation */}
      <Paper elevation={3} sx={{ borderRadius: 2, display: { xs: 'none', md: 'block' } }}>
        <Tabs
          value={tabLabels.indexOf(activeTab)}
          onChange={(_, newValue) => setActiveTab(tabLabels[newValue])}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          <Tab label="Profile" />
          <Tab label="Orders" />
          <Tab label="Addresses" />
          <Tab label="Favorites" />
          <Tab label="Payments" />
          <Tab label="Settings" />
        </Tabs>
      </Paper>

      {/* ✅ Tab Content — now always visible on all screen sizes */}
      <Box sx={{ p: { xs: 1.5, md: 3 }, mt: { xs: 2, md: 0 } }}>
        {tabComponents[activeTab]}
      </Box>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Box>
  );
};

export default AccountPage;
