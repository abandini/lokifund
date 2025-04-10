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
  Slider,
  Divider,
  Chip,
  Card,
  CardContent,
  Tooltip,
  IconButton,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress
} from '@mui/material';
import {
  Info as InfoIcon,
  PlayArrow as PlayArrowIcon,
  Settings as SettingsIcon,
  Timeline as TimelineIcon,
  Visibility as VisibilityIcon,
  Code as CodeIcon,
  DataArray as DataArrayIcon,
  Tune as TuneIcon
} from '@mui/icons-material';

const TransformerMarketPredictor = () => {
  // Model configuration state
  const [modelSize, setModelSize] = useState('medium');
  const [attentionHeads, setAttentionHeads] = useState(8);
  const [timeSteps, setTimeSteps] = useState(60);
  const [predictionHorizon, setPredictionHorizon] = useState(5);
  const [batchSize, setBatchSize] = useState(64);
  const [epochs, setEpochs] = useState(100);
  const [learningRate, setLearningRate] = useState(0.0001);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  
  // Data configuration state
  const [selectedAsset, setSelectedAsset] = useState('SPY');
  const [timeframe, setTimeframe] = useState('daily');
  const [featureGroups, setFeatureGroups] = useState({
    price: true,
    volume: true,
    technical: true,
    fundamental: false,
    sentiment: true,
    volatility: true,
    breadth: false
  });
  
  // Mock assets for selection
  const availableAssets = [
    { symbol: 'SPY', name: 'S&P 500 ETF', type: 'ETF', category: 'Equity Index' },
    { symbol: 'QQQ', name: 'Nasdaq 100 ETF', type: 'ETF', category: 'Equity Index' },
    { symbol: 'IWM', name: 'Russell 2000 ETF', type: 'ETF', category: 'Equity Index' },
    { symbol: 'AAPL', name: 'Apple Inc.', type: 'Stock', category: 'Technology' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'Stock', category: 'Technology' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'Stock', category: 'Consumer Cyclical' },
    { symbol: 'TSLA', name: 'Tesla Inc.', type: 'Stock', category: 'Automotive' },
    { symbol: 'BTC-USD', name: 'Bitcoin', type: 'Crypto', category: 'Digital Asset' },
    { symbol: 'ETH-USD', name: 'Ethereum', type: 'Crypto', category: 'Digital Asset' },
    { symbol: 'EUR/USD', name: 'Euro/US Dollar', type: 'Forex', category: 'Currency Pair' }
  ];
  
  // Mock performance metrics
  const performanceMetrics = [
    { metric: 'Mean Absolute Error (MAE)', value: '0.0124', benchmark: '0.0189', improvement: '+34.4%' },
    { metric: 'Root Mean Squared Error (RMSE)', value: '0.0183', benchmark: '0.0251', improvement: '+27.1%' },
    { metric: 'Directional Accuracy', value: '68.2%', benchmark: '58.7%', improvement: '+9.5%' },
    { metric: 'Sharpe Ratio (Trading Sim)', value: '1.87', benchmark: '1.21', improvement: '+54.5%' },
    { metric: 'Maximum Drawdown', value: '-8.3%', benchmark: '-12.7%', improvement: '+34.6%' }
  ];

  // Handle model size change
  const handleModelSizeChange = (event) => {
    const size = event.target.value;
    setModelSize(size);
    
    // Update related parameters based on model size
    switch (size) {
      case 'small':
        setAttentionHeads(4);
        break;
      case 'medium':
        setAttentionHeads(8);
        break;
      case 'large':
        setAttentionHeads(12);
        break;
      case 'xlarge':
        setAttentionHeads(16);
        break;
      default:
        break;
    }
  };
  
  // Handle feature group toggle
  const handleFeatureGroupToggle = (group) => {
    setFeatureGroups({
      ...featureGroups,
      [group]: !featureGroups[group]
    });
  };
  
  // Get model size description
  const getModelSizeDescription = () => {
    switch (modelSize) {
      case 'small':
        return 'Small model (4 layers, 128 hidden units) - Fast training, suitable for limited data.';
      case 'medium':
        return 'Medium model (6 layers, 256 hidden units) - Good balance of accuracy and training time.';
      case 'large':
        return 'Large model (8 layers, 512 hidden units) - Higher accuracy, requires more training data.';
      case 'xlarge':
        return 'Extra large model (12 layers, 768 hidden units) - Highest accuracy, requires substantial data and compute.';
      default:
        return '';
    }
  };
  
  // Simulate starting training
  const handleStartTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };
  
  // Count active feature groups
  const activeFeatureCount = Object.values(featureGroups).filter(Boolean).length;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Transformer-Based Market Predictor
        <Tooltip title="Uses self-attention mechanisms to capture complex temporal dependencies in market data, similar to architectures used in large language models">
          <IconButton size="small">
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
      
      <Grid container spacing={3}>
        {/* Model Configuration */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <CodeIcon sx={{ mr: 1 }} />
              Model Configuration
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Model Size</InputLabel>
              <Select
                value={modelSize}
                label="Model Size"
                onChange={handleModelSizeChange}
              >
                <MenuItem value="small">Small (4 layers)</MenuItem>
                <MenuItem value="medium">Medium (6 layers)</MenuItem>
                <MenuItem value="large">Large (8 layers)</MenuItem>
                <MenuItem value="xlarge">Extra Large (12 layers)</MenuItem>
              </Select>
            </FormControl>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {getModelSizeDescription()}
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Attention Heads"
                  type="number"
                  value={attentionHeads}
                  onChange={(e) => setAttentionHeads(parseInt(e.target.value))}
                  InputProps={{ inputProps: { min: 1, max: 16 } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Time Steps"
                  type="number"
                  value={timeSteps}
                  onChange={(e) => setTimeSteps(parseInt(e.target.value))}
                  InputProps={{ inputProps: { min: 10, max: 252 } }}
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3, mb: 3 }}>
              <Typography gutterBottom>Prediction Horizon (Days)</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Slider
                    value={predictionHorizon}
                    onChange={(e, val) => setPredictionHorizon(val)}
                    min={1}
                    max={30}
                    step={1}
                    marks={[
                      { value: 1, label: '1' },
                      { value: 5, label: '5' },
                      { value: 10, label: '10' },
                      { value: 20, label: '20' },
                      { value: 30, label: '30' }
                    ]}
                  />
                </Grid>
                <Grid item>
                  <Typography>{predictionHorizon}</Typography>
                </Grid>
              </Grid>
            </Box>
            
            <FormControlLabel
              control={
                <Switch 
                  checked={advancedMode}
                  onChange={() => setAdvancedMode(!advancedMode)}
                />
              }
              label="Advanced Mode"
            />
            
            {advancedMode && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Training Hyperparameters
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Batch Size"
                      type="number"
                      value={batchSize}
                      onChange={(e) => setBatchSize(parseInt(e.target.value))}
                      InputProps={{ inputProps: { min: 8, max: 512, step: 8 } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Epochs"
                      type="number"
                      value={epochs}
                      onChange={(e) => setEpochs(parseInt(e.target.value))}
                      InputProps={{ inputProps: { min: 10, max: 1000 } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Learning Rate"
                      type="number"
                      value={learningRate}
                      onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                      InputProps={{ inputProps: { min: 0.00001, max: 0.01, step: 0.00001 } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Optimizer</InputLabel>
                      <Select defaultValue="adam" label="Optimizer">
                        <MenuItem value="adam">Adam</MenuItem>
                        <MenuItem value="adamw">AdamW</MenuItem>
                        <MenuItem value="sgd">SGD</MenuItem>
                        <MenuItem value="rmsprop">RMSprop</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {isTraining && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Training Progress
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={trainingProgress} 
                  sx={{ height: 10, borderRadius: 5 }}
                />
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                  {Math.round(trainingProgress)}% Complete
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Data Configuration */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <DataArrayIcon sx={{ mr: 1 }} />
              Data Configuration
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={7}>
                <FormControl fullWidth>
                  <InputLabel>Asset</InputLabel>
                  <Select
                    value={selectedAsset}
                    label="Asset"
                    onChange={(e) => setSelectedAsset(e.target.value)}
                  >
                    {availableAssets.map((asset) => (
                      <MenuItem key={asset.symbol} value={asset.symbol}>
                        {asset.symbol} - {asset.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <FormControl fullWidth>
                  <InputLabel>Timeframe</InputLabel>
                  <Select
                    value={timeframe}
                    label="Timeframe"
                    onChange={(e) => setTimeframe(e.target.value)}
                  >
                    <MenuItem value="minute">1-Minute</MenuItem>
                    <MenuItem value="hour">Hourly</MenuItem>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <Typography variant="subtitle2" gutterBottom>
              Feature Groups ({activeFeatureCount}/{Object.keys(featureGroups).length} active)
            </Typography>
            
            <Grid container spacing={1} sx={{ mb: 3 }}>
              {Object.entries(featureGroups).map(([group, isActive]) => (
                <Grid item key={group}>
                  <Chip
                    label={group.charAt(0).toUpperCase() + group.slice(1)}
                    color={isActive ? "primary" : "default"}
                    onClick={() => handleFeatureGroupToggle(group)}
                    variant={isActive ? "filled" : "outlined"}
                  />
                </Grid>
              ))}
            </Grid>
            
            <Divider sx={{ mb: 3 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Performance Metrics
            </Typography>
            
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell align="right">Value</TableCell>
                    <TableCell align="right">Benchmark</TableCell>
                    <TableCell align="right">Improvement</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {performanceMetrics.map((row) => (
                    <TableRow key={row.metric}>
                      <TableCell component="th" scope="row">
                        {row.metric}
                      </TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                      <TableCell align="right">{row.benchmark}</TableCell>
                      <TableCell align="right" sx={{ color: 'success.main' }}>
                        {row.improvement}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <Typography variant="subtitle2" gutterBottom>
              Attention Visualization
            </Typography>
            
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 120 }}>
                <Button
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  disabled={isTraining}
                >
                  View Attention Patterns
                </Button>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        
        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<TuneIcon />}
              sx={{ mr: 2 }}
            >
              Save Configuration
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<PlayArrowIcon />}
              onClick={handleStartTraining}
              disabled={isTraining}
            >
              {isTraining ? 'Training...' : 'Train Model'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransformerMarketPredictor;
