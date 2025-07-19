// src/userAccount/DesktopSideNav.jsx
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import {
  PersonOutline,
  ShoppingBagOutlined,
  FavoriteBorder,
  LocationOnOutlined,
//   CreditCardOutlined,
  SettingsOutlined
} from '@mui/icons-material'

const DesktopSideNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'profile', icon: <PersonOutline />, label: 'Profile' },
    { id: 'orders', icon: <ShoppingBagOutlined />, label: 'Orders' },
    { id: 'favorites', icon: <FavoriteBorder />, label: 'Favorites' },
    { id: 'addresses', icon: <LocationOnOutlined />, label: 'Addresses' },
    // { id: 'payments', icon: <CreditCardOutlined />, label: 'Payments' },
    { id: 'settings', icon: <SettingsOutlined />, label: 'Settings' }
  ]

  return (
    <Box sx={{
      width: 240,
      flexShrink: 0,
      display: { xs: 'none', md: 'block' },
      borderRight: '1px solid',
      borderColor: 'divider'
    }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
              sx={{
                px: 3,
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                  borderRight: '2px solid',
                  borderColor: 'primary.main'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default DesktopSideNav