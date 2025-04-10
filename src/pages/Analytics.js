import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Tabs,
  Tab
} from '@mui/material';
import {
  Download as DownloadIcon,
  Share as ShareIcon
} from '@mui/icons-material';

// Mock chart components (in a real app, you'd use Chart.js or similar)
const PerformanceChart = () => (
  <Box sx={{ height: 300, bgcolor: '#f5f5f5', borderRadius: 1, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="body2" color="text.secondary">
      Performance Chart (Mock)
    </Typography>
  </Box>
);

const AllocationChart = () => (
  <Box sx={{ height: 300, bgcolor: '#f5f5f5', borderRadius: 1, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="body2" color="text.secondary">
      Asset Allocation Chart (Mock)
    </Typography>
  </Box>
);

const RiskMetricsChart = () => (
  <Box sx={{ height: 300, bgcolor: '#f5f5f5', borderRadius: 1, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="body2" color="text.secondary">
      Risk Metrics Chart (Mock)
    </Typography>
  </Box>
);

// Mock performance data
const performanceData = {
  mtd: {
    return: '+2.8%',
    benchmark: '+1.9%',
    alpha: '+0.9%'
  },
  qtd: {
    return: '+5.3%',
    benchmark: '+4.1%',
    alpha: '+1.2%'
  },
  ytd: {
    return: '+12.7%',
    benchmark: '+9.5%',
    alpha: '+3.2%'
  },
  oneYear: {
    return: '+18.4%',
    benchmark: '+14.2%',
    alpha: '+4.2%'
  },
  threeYear: {
    return: '+42.6%',
    benchmark: '+35.1%',
    alpha: '+7.5%'
  }
};

// Mock risk metrics
const riskMetrics = {
  sharpeRatio: '1.8',
  sortinoRatio: '2.3',
  beta: '0.85',
  alpha: '4.2%',
  volatility: '12.4%',
  maxDrawdown: '-8.7%',
  winRate: '62%'
};

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('ytd');
  const [tabValue, setTabValue] = useState(0);

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Performance Analytics
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<DownloadIcon />}
            sx={{ mr: 2 }}
          >
            Export Report
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<ShareIcon />}
          >
            Share
          </Button>
        </Box>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 3,
          borderRadius: 2,
          border: '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Performance Overview</Typography>
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Timeframe</InputLabel>
            <Select
              value={timeframe}
              label="Timeframe"
              onChange={handleTimeframeChange}
            >
              <MenuItem value="mtd">Month to Date</MenuItem>
              <MenuItem value="qtd">Quarter to Date</MenuItem>
              <MenuItem value="ytd">Year to Date</MenuItem>
              <MenuItem value="oneYear">1 Year</MenuItem>
              <MenuItem value="threeYear">3 Years</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Fund Return
              </Typography>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                {performanceData[timeframe].return}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Benchmark
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {performanceData[timeframe].benchmark}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Alpha
              </Typography>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                {performanceData[timeframe].alpha}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 2,
          border: '1px solid rgba(0, 0, 0, 0.12)',
          mb: 3,
          overflow: 'hidden'
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Performance" />
            <Tab label="Asset Allocation" />
            <Tab label="Risk Metrics" />
          </Tabs>
        </Box>
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && <PerformanceChart />}
          {tabValue === 1 && <AllocationChart />}
          {tabValue === 2 && <RiskMetricsChart />}
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Risk Metrics Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <CardHeader title="Risk Metrics" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Sharpe Ratio</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{riskMetrics.sharpeRatio}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Sortino Ratio</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{riskMetrics.sortinoRatio}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Beta</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{riskMetrics.beta}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Alpha</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{riskMetrics.alpha}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Volatility</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{riskMetrics.volatility}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Max Drawdown</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{riskMetrics.maxDrawdown}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Win Rate</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{riskMetrics.winRate}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Holdings Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <CardHeader title="Top Holdings" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Apple Inc. (AAPL)</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>8.2%</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Microsoft Corp. (MSFT)</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>7.5%</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Amazon.com Inc. (AMZN)</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>6.8%</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Nvidia Corp. (NVDA)</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>5.4%</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Alphabet Inc. (GOOGL)</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>4.9%</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Tesla Inc. (TSLA)</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>3.7%</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Meta Platforms Inc. (META)</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>3.2%</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Attribution Card */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <CardHeader 
              title="Performance Attribution" 
              action={
                <FormControl sx={{ minWidth: 150 }} size="small">
                  <InputLabel>Period</InputLabel>
                  <Select
                    value="ytd"
                    label="Period"
                  >
                    <MenuItem value="mtd">Month to Date</MenuItem>
                    <MenuItem value="qtd">Quarter to Date</MenuItem>
                    <MenuItem value="ytd">Year to Date</MenuItem>
                  </Select>
                </FormControl>
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Sector Selection</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'success.main' }}>+2.1%</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Security Selection</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'success.main' }}>+1.8%</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Market Timing</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'error.main' }}>-0.7%</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Currency Effect</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'success.main' }}>+0.3%</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Fees & Expenses</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'error.main' }}>-0.5%</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Total Alpha</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'success.main' }}>+3.0%</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
