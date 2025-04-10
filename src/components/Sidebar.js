import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Typography,
  Box,
  Divider
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  AddCircleOutline as FundSetupIcon,
  People as InvestorsIcon,
  Gavel as ComplianceIcon,
  Description as DocumentsIcon,
  BarChart as AnalyticsIcon,
  TrendingUp as TradingAlgorithmsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/'
    },
    {
      text: 'Fund Setup',
      icon: <FundSetupIcon />,
      path: '/fund-setup'
    },
    {
      text: 'Investor Management',
      icon: <InvestorsIcon />,
      path: '/investors'
    },
    {
      text: 'Compliance',
      icon: <ComplianceIcon />,
      path: '/compliance'
    },
    {
      text: 'Documents',
      icon: <DocumentsIcon />,
      path: '/documents'
    },
    {
      text: 'Analytics',
      icon: <AnalyticsIcon />,
      path: '/analytics'
    },
    {
      text: 'Trading Algorithms',
      icon: <TradingAlgorithmsIcon />,
      path: '/trading-algorithms'
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings'
    }
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Fund Manager
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              component={Link} 
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Fund Manager
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
