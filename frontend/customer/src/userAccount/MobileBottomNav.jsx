import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Badge,
} from '@mui/material';
import {
  PersonOutline,
  ShoppingBagOutlined,
  LocationOnOutlined,
  FavoriteBorder,
  SettingsOutlined,
} from '@mui/icons-material';

const MobileBottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'profile', icon: <PersonOutline />, label: 'Profile' },
    { id: 'orders', icon: <ShoppingBagOutlined />, label: 'Orders' },
    { id: 'addresses', icon: <LocationOnOutlined />, label: 'Addresses' },
    { id: 'favorites', icon: <FavoriteBorder />, label: 'Favorites' },
    { id: 'settings', icon: <SettingsOutlined />, label: 'Settings' },
  ];

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: 'block', md: 'none' },
        zIndex: 1000,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.id}
            label={item.label}
            value={item.id}
            icon={
              item.id === 'orders' ? (
                <Badge badgeContent={4} color="primary" max={9}>
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )
            }
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default MobileBottomNav;
