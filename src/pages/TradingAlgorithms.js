import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Tabs,
  Tab,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress
} from '@mui/material';
import {
  Add as AddIcon,
  PlayArrow as PlayArrowIcon,
  Stop as StopIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  History as HistoryIcon,
  Refresh as RefreshIcon,
  Code as CodeIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

// Mock algorithms
const mockAlgorithms = [
  {
    id: 1,
    name: 'Momentum Strategy',
    description: 'Follows market trends using moving averages and momentum indicators',
    status: 'active',
    performance: '+8.3%',
    risk: 'medium',
    lastModified: '2025-04-05',
    created: '2025-03-10',
    type: 'momentum'
  },
  {
    id: 2,
    name: 'Mean Reversion',
    description: 'Capitalizes on price deviations from historical averages',
    status: 'inactive',
    performance: '+4.7%',
    risk: 'medium',
    lastModified: '2025-03-28',
    created: '2025-02-15',
    type: 'mean-reversion'
  },
  {
    id: 3,
    name: 'ML Sentiment Analyzer',
    description: 'Uses NLP to analyze news sentiment and predict market movements',
    status: 'backtesting',
    performance: 'N/A',
    risk: 'high',
    lastModified: '2025-04-08',
    created: '2025-04-01',
    type: 'ml'
  },
  {
    id: 4,
    name: 'Volatility Arbitrage',
    description: 'Exploits differences between implied and realized volatility',
    status: 'inactive',
    performance: '+2.1%',
    risk: 'high',
    lastModified: '2025-03-15',
    created: '2025-01-20',
    type: 'arbitrage'
  }
];

// Mock backtest results
const mockBacktestResults = [
  {
    id: 1,
    algorithmId: 1,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    totalReturn: '+12.4%',
    sharpeRatio: '1.8',
    maxDrawdown: '-5.2%',
    winRate: '62%',
    status: 'completed'
  },
  {
    id: 2,
    algorithmId: 2,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    totalReturn: '+7.9%',
    sharpeRatio: '1.3',
    maxDrawdown: '-4.1%',
    winRate: '58%',
    status: 'completed'
  },
  {
    id: 3,
    algorithmId: 3,
    startDate: '2024-06-01',
    endDate: '2024-12-31',
    totalReturn: 'N/A',
    sharpeRatio: 'N/A',
    maxDrawdown: 'N/A',
    winRate: 'N/A',
    status: 'running'
  }
];

const TradingAlgorithms = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openBacktestDialog, setOpenBacktestDialog] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [algorithmFilter, setAlgorithmFilter] = useState('all');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (algorithm = null) => {
    setSelectedAlgorithm(algorithm || {
      name: '',
      description: '',
      type: 'momentum',
      risk: 'medium'
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenBacktestDialog = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setOpenBacktestDialog(true);
  };

  const handleCloseBacktestDialog = () => {
    setOpenBacktestDialog(false);
  };

  const handleFilterChange = (event) => {
    setAlgorithmFilter(event.target.value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'backtesting':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'default';
    }
  };

  // Filter algorithms based on selected filter
  const filteredAlgorithms = mockAlgorithms.filter(algo => {
    if (algorithmFilter === 'all') return true;
    if (algorithmFilter === 'active') return algo.status === 'active';
    if (algorithmFilter === 'inactive') return algo.status === 'inactive';
    if (algorithmFilter === 'backtesting') return algo.status === 'backtesting';
    return true;
  });

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Trading Algorithms
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Create Algorithm
        </Button>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 3,
          borderRadius: 2,
          border: '1px solid rgba(0, 0, 0, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Algorithm Overview
          </Typography>
          <Chip 
            label={`${mockAlgorithms.filter(a => a.status === 'active').length} Active`} 
            color="success" 
            size="small"
            sx={{ mr: 1 }}
          />
          <Chip 
            label={`${mockAlgorithms.filter(a => a.status === 'backtesting').length} Backtesting`} 
            color="warning" 
            size="small"
          />
        </Box>
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel>Filter</InputLabel>
          <Select
            value={algorithmFilter}
            label="Filter"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">All Algorithms</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="backtesting">Backtesting</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 2,
          border: '1px solid rgba(0, 0, 0, 0.12)',
          overflow: 'hidden',
          mb: 3
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="My Algorithms" />
            <Tab label="Backtest Results" />
            <Tab label="Performance" />
          </Tabs>
        </Box>

        {/* My Algorithms Tab */}
        {tabValue === 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Algorithm Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Performance</TableCell>
                  <TableCell>Risk Level</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAlgorithms.map((algorithm) => (
                  <TableRow key={algorithm.id}>
                    <TableCell>{algorithm.name}</TableCell>
                    <TableCell>
                      <Chip 
                        label={algorithm.type.charAt(0).toUpperCase() + algorithm.type.slice(1).replace('-', ' ')} 
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{algorithm.description}</TableCell>
                    <TableCell>{algorithm.performance}</TableCell>
                    <TableCell>
                      <Chip 
                        label={algorithm.risk.charAt(0).toUpperCase() + algorithm.risk.slice(1)} 
                        color={getRiskColor(algorithm.risk)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={algorithm.status.charAt(0).toUpperCase() + algorithm.status.slice(1)} 
                        color={getStatusColor(algorithm.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        color={algorithm.status === 'active' ? 'error' : 'success'}
                        sx={{ mr: 1 }}
                      >
                        {algorithm.status === 'active' ? <StopIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenBacktestDialog(algorithm)}
                        sx={{ mr: 1 }}
                      >
                        <HistoryIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenDialog(algorithm)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Backtest Results Tab */}
        {tabValue === 1 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Algorithm</TableCell>
                  <TableCell>Date Range</TableCell>
                  <TableCell>Total Return</TableCell>
                  <TableCell>Sharpe Ratio</TableCell>
                  <TableCell>Max Drawdown</TableCell>
                  <TableCell>Win Rate</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockBacktestResults.map((result) => {
                  const algorithm = mockAlgorithms.find(a => a.id === result.algorithmId);
                  return (
                    <TableRow key={result.id}>
                      <TableCell>{algorithm?.name || 'Unknown'}</TableCell>
                      <TableCell>{`${result.startDate} to ${result.endDate}`}</TableCell>
                      <TableCell>{result.totalReturn}</TableCell>
                      <TableCell>{result.sharpeRatio}</TableCell>
                      <TableCell>{result.maxDrawdown}</TableCell>
                      <TableCell>{result.winRate}</TableCell>
                      <TableCell>
                        {result.status === 'running' ? (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LinearProgress 
                              sx={{ width: 60, mr: 1 }} 
                              color="primary" 
                            />
                            <Typography variant="body2">Running</Typography>
                          </Box>
                        ) : (
                          <Chip 
                            label="Completed" 
                            color="success"
                            size="small"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" sx={{ mr: 1 }}>
                          <TrendingUpIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Performance Tab */}
        {tabValue === 2 && (
          <Box sx={{ p: 3, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              Performance charts and metrics would be displayed here
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Algorithm Details Cards */}
      <Typography variant="h6" gutterBottom>
        Algorithm Insights
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <CardHeader 
              title="Top Performing Algorithms" 
              action={
                <IconButton>
                  <RefreshIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Algorithm</TableCell>
                      <TableCell>Return</TableCell>
                      <TableCell>Sharpe</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Momentum Strategy</TableCell>
                      <TableCell>+8.3%</TableCell>
                      <TableCell>1.8</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mean Reversion</TableCell>
                      <TableCell>+4.7%</TableCell>
                      <TableCell>1.3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Volatility Arbitrage</TableCell>
                      <TableCell>+2.1%</TableCell>
                      <TableCell>0.9</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <CardHeader 
              title="Recent Backtests" 
              action={
                <IconButton>
                  <RefreshIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Algorithm</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>ML Sentiment Analyzer</TableCell>
                      <TableCell>2025-04-08</TableCell>
                      <TableCell>
                        <Chip label="Running" size="small" color="warning" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Momentum Strategy</TableCell>
                      <TableCell>2025-04-05</TableCell>
                      <TableCell>
                        <Chip label="Completed" size="small" color="success" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mean Reversion</TableCell>
                      <TableCell>2025-03-28</TableCell>
                      <TableCell>
                        <Chip label="Completed" size="small" color="success" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Create/Edit Algorithm Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedAlgorithm && selectedAlgorithm.id ? 'Edit Algorithm' : 'Create New Algorithm'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Algorithm Name"
                value={selectedAlgorithm?.name || ''}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={selectedAlgorithm?.description || ''}
                multiline
                rows={3}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Algorithm Type</InputLabel>
                <Select
                  value={selectedAlgorithm?.type || 'momentum'}
                  label="Algorithm Type"
                >
                  <MenuItem value="momentum">Momentum</MenuItem>
                  <MenuItem value="mean-reversion">Mean Reversion</MenuItem>
                  <MenuItem value="arbitrage">Arbitrage</MenuItem>
                  <MenuItem value="ml">Machine Learning</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Risk Level</InputLabel>
                <Select
                  value={selectedAlgorithm?.risk || 'medium'}
                  label="Risk Level"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2, 
                  border: '1px solid rgba(0, 0, 0, 0.12)', 
                  borderRadius: 1,
                  bgcolor: '#f5f5f5'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CodeIcon sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">Algorithm Code</Typography>
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  placeholder="# Enter your algorithm code here
import pandas as pd
import numpy as np

def initialize(context):
    context.assets = [...]
    
def handle_data(context, data):
    # Your trading logic here
    pass"
                  InputProps={{
                    style: { fontFamily: 'monospace' }
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            Save Algorithm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Backtest Dialog */}
      <Dialog open={openBacktestDialog} onClose={handleCloseBacktestDialog} maxWidth="md" fullWidth>
        <DialogTitle>Run Backtest</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Algorithm: {selectedAlgorithm?.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                defaultValue="2024-01-01"
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                defaultValue="2024-12-31"
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Data Source</InputLabel>
                <Select
                  defaultValue="yahoo"
                  label="Data Source"
                >
                  <MenuItem value="yahoo">Yahoo Finance</MenuItem>
                  <MenuItem value="alpha">Alpha Vantage</MenuItem>
                  <MenuItem value="iex">IEX Cloud</MenuItem>
                  <MenuItem value="custom">Custom Data</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Initial Capital</InputLabel>
                <Select
                  defaultValue="100000"
                  label="Initial Capital"
                >
                  <MenuItem value="10000">$10,000</MenuItem>
                  <MenuItem value="50000">$50,000</MenuItem>
                  <MenuItem value="100000">$100,000</MenuItem>
                  <MenuItem value="1000000">$1,000,000</MenuItem>
                  <MenuItem value="custom">Custom Amount</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Chip label="Advanced Options" onClick={() => {}} />}
                label=""
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBacktestDialog}>Cancel</Button>
          <Button onClick={handleCloseBacktestDialog} variant="contained" color="primary">
            Run Backtest
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TradingAlgorithms;
