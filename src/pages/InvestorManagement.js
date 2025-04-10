import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

// Mock data for investors
const mockInvestors = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    investmentAmount: '$500,000',
    status: 'active',
    joinDate: '2025-01-15',
    accredited: true,
    type: 'individual'
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    investmentAmount: '$750,000',
    status: 'active',
    joinDate: '2025-02-03',
    accredited: true,
    type: 'individual'
  },
  {
    id: 3,
    name: 'Acme Capital',
    email: 'investments@acmecapital.com',
    investmentAmount: '$1,200,000',
    status: 'active',
    joinDate: '2025-01-10',
    accredited: true,
    type: 'institutional'
  },
  {
    id: 4,
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    investmentAmount: '$250,000',
    status: 'pending',
    joinDate: '2025-04-05',
    accredited: true,
    type: 'individual'
  },
  {
    id: 5,
    name: 'Tech Ventures LLC',
    email: 'invest@techventures.com',
    investmentAmount: '$2,000,000',
    status: 'active',
    joinDate: '2025-03-22',
    accredited: true,
    type: 'institutional'
  }
];

const InvestorManagement = () => {
  const [investors, setInvestors] = useState(mockInvestors);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentInvestor, setCurrentInvestor] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (investor = null) => {
    setCurrentInvestor(investor || {
      name: '',
      email: '',
      investmentAmount: '',
      status: 'pending',
      accredited: false,
      type: 'individual'
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveInvestor = () => {
    if (currentInvestor.id) {
      // Update existing investor
      setInvestors(investors.map(inv => 
        inv.id === currentInvestor.id ? currentInvestor : inv
      ));
    } else {
      // Add new investor
      const newInvestor = {
        ...currentInvestor,
        id: investors.length + 1,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setInvestors([...investors, newInvestor]);
    }
    handleCloseDialog();
  };

  const handleDeleteInvestor = (id) => {
    setInvestors(investors.filter(inv => inv.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentInvestor({
      ...currentInvestor,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredInvestors = tabValue === 0 
    ? investors 
    : tabValue === 1 
      ? investors.filter(inv => inv.status === 'active') 
      : investors.filter(inv => inv.status === 'pending');

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Investor Management
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Investor
        </Button>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 2,
          border: '1px solid rgba(0, 0, 0, 0.12)',
          mb: 4
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="All Investors" />
          <Tab label="Active" />
          <Tab label="Pending" />
        </Tabs>
      </Paper>

      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 2,
          border: '1px solid rgba(0, 0, 0, 0.12)',
          overflow: 'hidden'
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Investment</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInvestors.map((investor) => (
                <TableRow key={investor.id}>
                  <TableCell>{investor.name}</TableCell>
                  <TableCell>
                    <Chip 
                      size="small"
                      label={investor.type === 'individual' ? 'Individual' : 'Institutional'} 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{investor.email}</TableCell>
                  <TableCell>{investor.investmentAmount}</TableCell>
                  <TableCell>{investor.joinDate}</TableCell>
                  <TableCell>
                    <Chip 
                      label={investor.status.charAt(0).toUpperCase() + investor.status.slice(1)} 
                      color={getStatusColor(investor.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleOpenDialog(investor)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <EmailIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteInvestor(investor.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="outlined" startIcon={<DownloadIcon />}>
          Export Investor Data
        </Button>
        <Button variant="outlined">
          Generate Investor Report
        </Button>
      </Box>

      {/* Investor Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentInvestor && currentInvestor.id ? 'Edit Investor' : 'Add New Investor'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={currentInvestor?.name || ''}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={currentInvestor?.email || ''}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Investment Amount"
                name="investmentAmount"
                value={currentInvestor?.investmentAmount || ''}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Investor Type</InputLabel>
                <Select
                  name="type"
                  value={currentInvestor?.type || 'individual'}
                  onChange={handleInputChange}
                  label="Investor Type"
                >
                  <MenuItem value="individual">Individual</MenuItem>
                  <MenuItem value="institutional">Institutional</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={currentInvestor?.status || 'pending'}
                  onChange={handleInputChange}
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Accredited Investor</InputLabel>
                <Select
                  name="accredited"
                  value={currentInvestor?.accredited ? 'yes' : 'no'}
                  onChange={(e) => handleInputChange({
                    target: {
                      name: 'accredited',
                      value: e.target.value === 'yes'
                    }
                  })}
                  label="Accredited Investor"
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveInvestor} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InvestorManagement;
