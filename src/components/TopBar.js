import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Badge, 
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  AccountCircle,
  Help as HelpIcon
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

const TopBar = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to get page title based on current path
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return 'Dashboard';
      case '/fund-setup':
        return 'Fund Setup Wizard';
      case '/investors':
        return 'Investor Management';
      case '/compliance':
        return 'Compliance Dashboard';
      case '/documents':
        return 'Document Management';
      case '/analytics':
        return 'Performance Analytics';
      case '/settings':
        return 'Settings';
      default:
        return 'Fund Management Tool';
    }
  };

  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0}
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        mb: 3
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {getPageTitle()}
        </Typography>
        
        <Box sx={{ display: 'flex' }}>
          <Tooltip title="Help & Resources">
            <IconButton color="inherit">
              <HelpIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Account">
            <IconButton
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>JD</Avatar>
            </IconButton>
          </Tooltip>
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My Account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
