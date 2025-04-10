import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import {
  Save as SaveIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  AccountBalance as AccountBalanceIcon
} from '@mui/icons-material';

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSaveSuccess(false);
  };

  const handleSave = () => {
    // Simulate saving settings
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 2,
              border: '1px solid rgba(0, 0, 0, 0.12)',
              overflow: 'hidden'
            }}
          >
            <Tabs
              orientation="vertical"
              value={tabValue}
              onChange={handleTabChange}
              sx={{ borderRight: 1, borderColor: 'divider' }}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab icon={<PersonIcon />} label="Profile" />
              <Tab icon={<AccountBalanceIcon />} label="Fund Settings" />
              <Tab icon={<SecurityIcon />} label="Security" />
              <Tab icon={<NotificationsIcon />} label="Notifications" />
              <Tab icon={<LanguageIcon />} label="Preferences" />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          {saveSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Settings saved successfully!
            </Alert>
          )}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3,
              borderRadius: 2,
              border: '1px solid rgba(0, 0, 0, 0.12)'
            }}
          >
            {/* Profile Settings */}
            {tabValue === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Profile Settings
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <Avatar
                      sx={{ width: 80, height: 80 }}
                      alt="User Profile"
                      src="/static/images/avatar/1.jpg"
                    />
                    <Button size="small" sx={{ mt: 1 }}>
                      Change Photo
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="First Name"
                          defaultValue="John"
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          defaultValue="Smith"
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          defaultValue="john.smith@example.com"
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Job Title"
                          defaultValue="Fund Manager"
                          margin="normal"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Fund Settings */}
            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Fund Settings
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Fund Name"
                      defaultValue="Alpha Capital Partners"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Fund ID"
                      defaultValue="ACP-2025-01"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Fund Type</InputLabel>
                      <Select
                        defaultValue="hedge"
                        label="Fund Type"
                      >
                        <MenuItem value="hedge">Hedge Fund</MenuItem>
                        <MenuItem value="private_equity">Private Equity</MenuItem>
                        <MenuItem value="venture">Venture Capital</MenuItem>
                        <MenuItem value="real_estate">Real Estate</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Base Currency"
                      defaultValue="USD"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Management Fee (%)"
                      defaultValue="2"
                      margin="normal"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Performance Fee (%)"
                      defaultValue="20"
                      margin="normal"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Fund Description"
                      defaultValue="Alpha Capital Partners is a global investment fund focused on technology and healthcare sectors."
                      margin="normal"
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Security Settings */}
            {tabValue === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Security Settings
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Change Password" 
                      secondary="Update your account password" 
                    />
                    <ListItemSecondaryAction>
                      <Button variant="outlined" size="small">
                        Change
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="Two-Factor Authentication" 
                      secondary="Add an extra layer of security to your account" 
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="Login History" 
                      secondary="View your recent login activity" 
                    />
                    <ListItemSecondaryAction>
                      <Button variant="outlined" size="small">
                        View
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="API Access" 
                      secondary="Manage API keys and permissions" 
                    />
                    <ListItemSecondaryAction>
                      <Button variant="outlined" size="small">
                        Manage
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Box>
            )}

            {/* Notification Settings */}
            {tabValue === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Notification Settings
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Email Notifications" 
                      secondary="Receive fund updates and alerts via email" 
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="Investor Activity" 
                      secondary="Get notified when investors view or download documents" 
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="Compliance Alerts" 
                      secondary="Receive notifications about upcoming compliance deadlines" 
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="Performance Reports" 
                      secondary="Get notified when new performance reports are available" 
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="" 
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Box>
            )}

            {/* Preferences */}
            {tabValue === 4 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Preferences
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Language</InputLabel>
                      <Select
                        defaultValue="en"
                        label="Language"
                      >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                        <MenuItem value="de">German</MenuItem>
                        <MenuItem value="zh">Chinese</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Time Zone</InputLabel>
                      <Select
                        defaultValue="est"
                        label="Time Zone"
                      >
                        <MenuItem value="est">Eastern Time (ET)</MenuItem>
                        <MenuItem value="cst">Central Time (CT)</MenuItem>
                        <MenuItem value="mst">Mountain Time (MT)</MenuItem>
                        <MenuItem value="pst">Pacific Time (PT)</MenuItem>
                        <MenuItem value="utc">Coordinated Universal Time (UTC)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Date Format</InputLabel>
                      <Select
                        defaultValue="mdy"
                        label="Date Format"
                      >
                        <MenuItem value="mdy">MM/DD/YYYY</MenuItem>
                        <MenuItem value="dmy">DD/MM/YYYY</MenuItem>
                        <MenuItem value="ymd">YYYY/MM/DD</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Theme</InputLabel>
                      <Select
                        defaultValue="light"
                        label="Theme"
                      >
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                        <MenuItem value="system">System Default</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Enable desktop notifications"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save Settings
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
