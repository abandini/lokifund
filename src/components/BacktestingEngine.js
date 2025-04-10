import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab
} from '@mui/material';
import {
  ExpandMore,
  PlayArrow,
  Stop,
  Download,
  TrendingUp,
  BarChart,
  ShowChart,
  Assessment,
  CalendarToday,
  AttachMoney,
  Speed
} from '@mui/icons-material';

// Mock algorithms for testing
const mockAlgorithms = [
  { id: 1, name: 'Momentum Strategy', type: 'momentum', status: 'active' },
  { id: 2, name: 'Mean Reversion', type: 'mean-reversion', status: 'inactive' },
  { id: 3, name: 'ML Sentiment Analyzer', type: 'ml', status: 'backtesting' },
  { id: 4, name: 'Volatility Arbitrage', type: 'arbitrage', status: 'inactive' }
];

// Mock market data sources
const marketDataSources = [
  { id: 'yahoo', name: 'Yahoo Finance', coverage: 'Global Equities, ETFs, Indices' },
  { id: 'alpha', name: 'Alpha Vantage', coverage: 'Stocks, Forex, Crypto' },
  { id: 'iex', name: 'IEX Cloud', coverage: 'US Equities, ETFs' },
  { id: 'polygon', name: 'Polygon.io', coverage: 'Stocks, Options, Forex, Crypto' }
];

// Mock benchmark indices
const benchmarkIndices = [
  { id: 'sp500', name: 'S&P 500', ticker: 'SPY' },
  { id: 'nasdaq', name: 'NASDAQ Composite', ticker: 'QQQ' },
  { id: 'russell', name: 'Russell 2000', ticker: 'IWM' },
  { id: 'dow', name: 'Dow Jones Industrial', ticker: 'DIA' }
];

const BacktestingEngine = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [startDate, setStartDate] = useState('2020-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');
  const [initialCapital, setInitialCapital] = useState(100000);
  const [dataSource, setDataSource] = useState('yahoo');
  const [benchmark, setBenchmark] = useState('sp500');
  const [backtestStatus, setBacktestStatus] = useState(null); // null, 'running', 'complete'
  const [tabValue, setTabValue] = useState(0);

  // Mock backtest results
  const [backtestResults, setBacktestResults] = useState(null);

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleInitialCapitalChange = (event) => {
    setInitialCapital(event.target.value);
  };

  const handleDataSourceChange = (event) => {
    setDataSource(event.target.value);
  };

  const handleBenchmarkChange = (event) => {
    setBenchmark(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const runBacktest = () => {
    setBacktestStatus('running');
    setBacktestResults(null);
    
    // Simulate backtest running
    setTimeout(() => {
      setBacktestStatus('complete');
      
      // Mock backtest results
      setBacktestResults({
        summary: {
          totalReturn: '+18.7%',
          annualizedReturn: '+8.2%',
          benchmarkReturn: '+14.3%',
          alpha: '+4.4%',
          beta: 0.85,
          sharpeRatio: 1.82,
          sortinoRatio: 2.31,
          maxDrawdown: '-12.4%',
          volatility: '14.2%',
          winRate: '62%',
          profitFactor: 2.4
        },
        monthlyReturns: [
          { month: 'Jan 2023', return: '+2.1%', benchmark: '+1.8%' },
          { month: 'Feb 2023', return: '-0.8%', benchmark: '-1.2%' },
          { month: 'Mar 2023', return: '+3.4%', benchmark: '+2.7%' },
          { month: 'Apr 2023', return: '+1.6%', benchmark: '+1.2%' },
          { month: 'May 2023', return: '-1.2%', benchmark: '-1.5%' },
          { month: 'Jun 2023', return: '+2.8%', benchmark: '+2.2%' }
        ],
        trades: [
          { id: 1, symbol: 'AAPL', entry: '2023-01-15', exit: '2023-02-10', entryPrice: 142.53, exitPrice: 151.92, return: '+6.6%', type: 'long' },
          { id: 2, symbol: 'MSFT', entry: '2023-01-20', exit: '2023-03-05', entryPrice: 240.22, exitPrice: 267.70, return: '+11.4%', type: 'long' },
          { id: 3, symbol: 'AMZN', entry: '2023-02-05', exit: '2023-02-28', entryPrice: 103.39, exitPrice: 94.23, return: '-8.9%', type: 'long' },
          { id: 4, symbol: 'GOOGL', entry: '2023-03-10', exit: '2023-04-15', entryPrice: 94.17, exitPrice: 108.42, return: '+15.1%', type: 'long' },
          { id: 5, symbol: 'TSLA', entry: '2023-03-20', exit: '2023-05-01', entryPrice: 183.25, exitPrice: 160.31, return: '-12.5%', type: 'long' }
        ]
      });
    }, 3000);
  };

  const stopBacktest = () => {
    setBacktestStatus(null);
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3,
        borderRadius: 2,
        border: '1px solid rgba(0, 0, 0, 0.12)'
      }}
    >
      <Typography variant="h5" gutterBottom>
        Backtesting Engine
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Test your trading algorithms against historical market data to evaluate performance.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <CardHeader title="Backtest Configuration" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Algorithm</InputLabel>
                    <Select
                      value={selectedAlgorithm}
                      label="Algorithm"
                      onChange={handleAlgorithmChange}
                    >
                      {mockAlgorithms.map((algo) => (
                        <MenuItem key={algo.id} value={algo.id}>
                          {algo.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Initial Capital"
                    type="number"
                    value={initialCapital}
                    onChange={handleInitialCapitalChange}
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Data Source</InputLabel>
                    <Select
                      value={dataSource}
                      label="Data Source"
                      onChange={handleDataSourceChange}
                    >
                      {marketDataSources.map((source) => (
                        <MenuItem key={source.id} value={source.id}>
                          {source.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Benchmark</InputLabel>
                    <Select
                      value={benchmark}
                      label="Benchmark"
                      onChange={handleBenchmarkChange}
                    >
                      {benchmarkIndices.map((index) => (
                        <MenuItem key={index.id} value={index.id}>
                          {index.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Advanced Options</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Slippage Model</InputLabel>
                        <Select defaultValue="fixed">
                          <MenuItem value="fixed">Fixed (0.1%)</MenuItem>
                          <MenuItem value="volume">Volume-Based</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Commission Model</InputLabel>
                        <Select defaultValue="percentage">
                          <MenuItem value="fixed">Fixed ($0.005 per share)</MenuItem>
                          <MenuItem value="percentage">Percentage (0.1%)</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Data Frequency</InputLabel>
                        <Select defaultValue="daily">
                          <MenuItem value="minute">Minute</MenuItem>
                          <MenuItem value="hourly">Hourly</MenuItem>
                          <MenuItem value="daily">Daily</MenuItem>
                          <MenuItem value="weekly">Weekly</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Rebalance Frequency</InputLabel>
                        <Select defaultValue="daily">
                          <MenuItem value="minute">Minute</MenuItem>
                          <MenuItem value="hourly">Hourly</MenuItem>
                          <MenuItem value="daily">Daily</MenuItem>
                          <MenuItem value="weekly">Weekly</MenuItem>
                          <MenuItem value="monthly">Monthly</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                {backtestStatus === 'running' ? (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Stop />}
                    onClick={stopBacktest}
                  >
                    Stop Backtest
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PlayArrow />}
                    onClick={runBacktest}
                    disabled={!selectedAlgorithm}
                  >
                    Run Backtest
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 2, 
              border: '1px solid rgba(0, 0, 0, 0.12)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <CardHeader title="Backtest Status" />
            <Divider />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              {backtestStatus === null && (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  height: '100%',
                  p: 3
                }}>
                  <TrendingUp sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" align="center" gutterBottom>
                    Ready to Run Backtest
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Configure your backtest parameters and click "Run Backtest" to evaluate your algorithm's performance.
                  </Typography>
                </Box>
              )}

              {backtestStatus === 'running' && (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  height: '100%',
                  p: 3
                }}>
                  <Typography variant="h6" align="center" gutterBottom>
                    Backtest in Progress
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center" paragraph>
                    Processing historical data and evaluating algorithm performance...
                  </Typography>
                  <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
                    <LinearProgress />
                  </Box>
                  <Typography variant="body2" color="text.secondary" align="center">
                    This may take a few minutes depending on the date range and complexity of your algorithm.
                  </Typography>
                </Box>
              )}

              {backtestStatus === 'complete' && backtestResults && (
                <Box sx={{ p: 1 }}>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Backtest completed successfully!
                  </Alert>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={4}>
                      <Box sx={{ textAlign: 'center', p: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Total Return
                        </Typography>
                        <Typography variant="h6" color="primary.main">
                          {backtestResults.summary.totalReturn}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Box sx={{ textAlign: 'center', p: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Alpha
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          {backtestResults.summary.alpha}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Box sx={{ textAlign: 'center', p: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Sharpe Ratio
                        </Typography>
                        <Typography variant="h6">
                          {backtestResults.summary.sharpeRatio}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Box sx={{ textAlign: 'center', p: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Max Drawdown
                        </Typography>
                        <Typography variant="h6" color="error.main">
                          {backtestResults.summary.maxDrawdown}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Box sx={{ textAlign: 'center', p: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Win Rate
                        </Typography>
                        <Typography variant="h6">
                          {backtestResults.summary.winRate}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Box sx={{ textAlign: 'center', p: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Beta
                        </Typography>
                        <Typography variant="h6">
                          {backtestResults.summary.beta}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      startIcon={<Download />}
                      size="small"
                    >
                      Export Results
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {backtestStatus === 'complete' && backtestResults && (
          <Grid item xs={12}>
            <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12)' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab icon={<BarChart />} label="Performance" />
                  <Tab icon={<ShowChart />} label="Equity Curve" />
                  <Tab icon={<Assessment />} label="Monthly Returns" />
                  <Tab icon={<AttachMoney />} label="Trades" />
                </Tabs>
              </Box>
              
              {/* Performance Tab */}
              {tabValue === 0 && (
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Performance Metrics
                      </Typography>
                      <TableContainer>
                        <Table size="small">
                          <TableBody>
                            <TableRow>
                              <TableCell>Total Return</TableCell>
                              <TableCell>{backtestResults.summary.totalReturn}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Annualized Return</TableCell>
                              <TableCell>{backtestResults.summary.annualizedReturn}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Benchmark Return</TableCell>
                              <TableCell>{backtestResults.summary.benchmarkReturn}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Alpha</TableCell>
                              <TableCell>{backtestResults.summary.alpha}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Beta</TableCell>
                              <TableCell>{backtestResults.summary.beta}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Sharpe Ratio</TableCell>
                              <TableCell>{backtestResults.summary.sharpeRatio}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Sortino Ratio</TableCell>
                              <TableCell>{backtestResults.summary.sortinoRatio}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Max Drawdown</TableCell>
                              <TableCell>{backtestResults.summary.maxDrawdown}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Volatility</TableCell>
                              <TableCell>{backtestResults.summary.volatility}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Win Rate</TableCell>
                              <TableCell>{backtestResults.summary.winRate}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Profit Factor</TableCell>
                              <TableCell>{backtestResults.summary.profitFactor}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Performance Chart
                      </Typography>
                      <Box 
                        sx={{ 
                          height: 300, 
                          bgcolor: '#f5f5f5', 
                          borderRadius: 1, 
                          p: 2, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Performance chart would be displayed here
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              )}
              
              {/* Equity Curve Tab */}
              {tabValue === 1 && (
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Equity Curve
                  </Typography>
                  <Box 
                    sx={{ 
                      height: 400, 
                      bgcolor: '#f5f5f5', 
                      borderRadius: 1, 
                      p: 2, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Equity curve chart would be displayed here
                    </Typography>
                  </Box>
                </CardContent>
              )}
              
              {/* Monthly Returns Tab */}
              {tabValue === 2 && (
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Monthly Returns
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Month</TableCell>
                          <TableCell>Algorithm Return</TableCell>
                          <TableCell>Benchmark Return</TableCell>
                          <TableCell>Difference</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {backtestResults.monthlyReturns.map((month, index) => {
                          const algoReturn = parseFloat(month.return.replace('%', ''));
                          const benchReturn = parseFloat(month.benchmark.replace('%', ''));
                          const diff = (algoReturn - benchReturn).toFixed(1) + '%';
                          
                          return (
                            <TableRow key={index}>
                              <TableCell>{month.month}</TableCell>
                              <TableCell 
                                sx={{ 
                                  color: algoReturn >= 0 ? 'success.main' : 'error.main' 
                                }}
                              >
                                {month.return}
                              </TableCell>
                              <TableCell
                                sx={{ 
                                  color: benchReturn >= 0 ? 'success.main' : 'error.main' 
                                }}
                              >
                                {month.benchmark}
                              </TableCell>
                              <TableCell
                                sx={{ 
                                  color: algoReturn >= benchReturn ? 'success.main' : 'error.main' 
                                }}
                              >
                                {diff}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              )}
              
              {/* Trades Tab */}
              {tabValue === 3 && (
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Trade History
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Symbol</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Entry Date</TableCell>
                          <TableCell>Exit Date</TableCell>
                          <TableCell>Entry Price</TableCell>
                          <TableCell>Exit Price</TableCell>
                          <TableCell>Return</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {backtestResults.trades.map((trade) => {
                          const returnValue = parseFloat(trade.return.replace('%', ''));
                          
                          return (
                            <TableRow key={trade.id}>
                              <TableCell>{trade.symbol}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={trade.type.toUpperCase()} 
                                  color={trade.type === 'long' ? 'primary' : 'secondary'}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>{trade.entry}</TableCell>
                              <TableCell>{trade.exit}</TableCell>
                              <TableCell>${trade.entryPrice.toFixed(2)}</TableCell>
                              <TableCell>${trade.exitPrice.toFixed(2)}</TableCell>
                              <TableCell
                                sx={{ 
                                  color: returnValue >= 0 ? 'success.main' : 'error.main',
                                  fontWeight: 'bold'
                                }}
                              >
                                {trade.return}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              )}
            </Card>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default BacktestingEngine;
