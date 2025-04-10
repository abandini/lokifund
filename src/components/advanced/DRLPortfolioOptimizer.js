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
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  IconButton,
  FormControlLabel,
  Switch
} from '@mui/material';
import {
  Info as InfoIcon,
  PlayArrow as PlayArrowIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
  ShowChart as ShowChartIcon,
  Code as CodeIcon
} from '@mui/icons-material';

const DRLPortfolioOptimizer = () => {
  const [selectedModel, setSelectedModel] = useState('ppo');
  const [assetCount, setAssetCount] = useState(10);
  const [trainingEpisodes, setTrainingEpisodes] = useState(1000);
  const [riskAversion, setRiskAversion] = useState(0.5);
  const [rewardFunction, setRewardFunction] = useState('sharpe');
  const [useMarketFeatures, setUseMarketFeatures] = useState(true);
  const [useMacroFeatures, setUseMacroFeatures] = useState(true);
  const [useSentimentFeatures, setUseSentimentFeatures] = useState(true);
  const [advancedMode, setAdvancedMode] = useState(false);

  // Mock assets for the portfolio
  const availableAssets = [
    { symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', sector: 'Technology' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'stock', sector: 'Technology' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'stock', sector: 'Consumer Cyclical' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock', sector: 'Communication Services' },
    { symbol: 'META', name: 'Meta Platforms Inc.', type: 'stock', sector: 'Communication Services' },
    { symbol: 'TSLA', name: 'Tesla Inc.', type: 'stock', sector: 'Consumer Cyclical' },
    { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', type: 'stock', sector: 'Financial Services' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'stock', sector: 'Technology' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', type: 'stock', sector: 'Financial Services' },
    { symbol: 'JNJ', name: 'Johnson & Johnson', type: 'stock', sector: 'Healthcare' },
    { symbol: 'V', name: 'Visa Inc.', type: 'stock', sector: 'Financial Services' },
    { symbol: 'PG', name: 'Procter & Gamble Co.', type: 'stock', sector: 'Consumer Defensive' },
    { symbol: 'UNH', name: 'UnitedHealth Group Inc.', type: 'stock', sector: 'Healthcare' },
    { symbol: 'HD', name: 'Home Depot Inc.', type: 'stock', sector: 'Consumer Cyclical' },
    { symbol: 'MA', name: 'Mastercard Inc.', type: 'stock', sector: 'Financial Services' }
  ];

  // Selected assets for the portfolio
  const [selectedAssets, setSelectedAssets] = useState(availableAssets.slice(0, assetCount));

  // Handle asset selection change
  const handleAssetCountChange = (event) => {
    const count = event.target.value;
    setAssetCount(count);
    setSelectedAssets(availableAssets.slice(0, count));
  };

  // Handle model selection change
  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  // Handle risk aversion slider change
  const handleRiskAversionChange = (event, newValue) => {
    setRiskAversion(newValue);
  };

  // Handle reward function change
  const handleRewardFunctionChange = (event) => {
    setRewardFunction(event.target.value);
  };

  // Toggle feature sets
  const handleFeatureToggle = (feature) => {
    switch (feature) {
      case 'market':
        setUseMarketFeatures(!useMarketFeatures);
        break;
      case 'macro':
        setUseMacroFeatures(!useMacroFeatures);
        break;
      case 'sentiment':
        setUseSentimentFeatures(!useSentimentFeatures);
        break;
      default:
        break;
    }
  };

  // Get model description based on selection
  const getModelDescription = () => {
    switch (selectedModel) {
      case 'ppo':
        return 'Proximal Policy Optimization (PPO) is a policy gradient method for reinforcement learning that alternates between sampling data through interaction with the environment and optimizing a surrogate objective function using stochastic gradient ascent.';
      case 'sac':
        return 'Soft Actor-Critic (SAC) is an off-policy maximum entropy deep reinforcement learning algorithm that provides sample-efficient learning while maintaining exploration and robustness.';
      case 'td3':
        return 'Twin Delayed Deep Deterministic Policy Gradient (TD3) is an algorithm that addresses function approximation error in actor-critic methods by introducing three key features: clipped double Q-learning, delayed policy updates, and target policy smoothing.';
      case 'a2c':
        return 'Advantage Actor-Critic (A2C) is a synchronous, deterministic variant of Asynchronous Advantage Actor-Critic (A3C) that uses a critic to estimate the advantage function and an actor to update the policy distribution in the direction suggested by the critic.';
      default:
        return '';
    }
  };

  // Get reward function description
  const getRewardDescription = () => {
    switch (rewardFunction) {
      case 'sharpe':
        return 'Sharpe Ratio: Optimizes for risk-adjusted returns by dividing excess return by volatility.';
      case 'sortino':
        return 'Sortino Ratio: Similar to Sharpe but only penalizes downside volatility.';
      case 'calmar':
        return 'Calmar Ratio: Measures return relative to maximum drawdown, focusing on downside risk.';
      case 'omega':
        return 'Omega Ratio: Considers the entire return distribution, not just mean and variance.';
      case 'custom':
        return 'Custom Reward: Define your own reward function with a weighted combination of metrics.';
      default:
        return '';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Deep Reinforcement Learning Portfolio Optimizer
        <Tooltip title="DRL uses neural networks to learn optimal portfolio allocation strategies through trial and error interaction with market environments">
          <IconButton size="small">
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
      
      <Grid container spacing={3}>
        {/* Model Configuration */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Model Configuration
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>RL Algorithm</InputLabel>
              <Select
                value={selectedModel}
                label="RL Algorithm"
                onChange={handleModelChange}
              >
                <MenuItem value="ppo">Proximal Policy Optimization (PPO)</MenuItem>
                <MenuItem value="sac">Soft Actor-Critic (SAC)</MenuItem>
                <MenuItem value="td3">Twin Delayed DDPG (TD3)</MenuItem>
                <MenuItem value="a2c">Advantage Actor-Critic (A2C)</MenuItem>
              </Select>
            </FormControl>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {getModelDescription()}
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Reward Function</InputLabel>
              <Select
                value={rewardFunction}
                label="Reward Function"
                onChange={handleRewardFunctionChange}
              >
                <MenuItem value="sharpe">Sharpe Ratio</MenuItem>
                <MenuItem value="sortino">Sortino Ratio</MenuItem>
                <MenuItem value="calmar">Calmar Ratio</MenuItem>
                <MenuItem value="omega">Omega Ratio</MenuItem>
                <MenuItem value="custom">Custom Reward</MenuItem>
              </Select>
            </FormControl>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {getRewardDescription()}
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Risk Aversion Parameter</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Slider
                    value={riskAversion}
                    onChange={handleRiskAversionChange}
                    min={0}
                    max={1}
                    step={0.01}
                    marks={[
                      { value: 0, label: 'Aggressive' },
                      { value: 0.5, label: 'Balanced' },
                      { value: 1, label: 'Conservative' }
                    ]}
                  />
                </Grid>
                <Grid item>
                  <Typography>{riskAversion.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Box>
            
            <TextField
              fullWidth
              label="Training Episodes"
              type="number"
              value={trainingEpisodes}
              onChange={(e) => setTrainingEpisodes(parseInt(e.target.value))}
              sx={{ mb: 2 }}
              InputProps={{ inputProps: { min: 100, max: 10000 } }}
            />
            
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
                  Advanced Hyperparameters
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Learning Rate"
                      type="number"
                      defaultValue={0.0003}
                      inputProps={{ step: 0.0001, min: 0.0001, max: 0.01 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Discount Factor"
                      type="number"
                      defaultValue={0.99}
                      inputProps={{ step: 0.01, min: 0.8, max: 0.999 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Batch Size"
                      type="number"
                      defaultValue={64}
                      inputProps={{ step: 8, min: 8, max: 512 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Entropy Coefficient"
                      type="number"
                      defaultValue={0.01}
                      inputProps={{ step: 0.001, min: 0, max: 0.1 }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Asset Selection */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Portfolio Assets
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Number of Assets</InputLabel>
              <Select
                value={assetCount}
                label="Number of Assets"
                onChange={handleAssetCountChange}
              >
                <MenuItem value={5}>5 Assets</MenuItem>
                <MenuItem value={10}>10 Assets</MenuItem>
                <MenuItem value={15}>15 Assets (All Available)</MenuItem>
              </Select>
            </FormControl>
            
            <Typography variant="subtitle2" gutterBottom>
              Selected Assets
            </Typography>
            
            <Box sx={{ maxHeight: 300, overflow: 'auto', mb: 3 }}>
              <List dense>
                {selectedAssets.map((asset) => (
                  <ListItem key={asset.symbol}>
                    <ListItemText 
                      primary={`${asset.symbol} - ${asset.name}`}
                      secondary={asset.sector}
                    />
                    <Chip 
                      label={asset.type}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Feature Sets
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={useMarketFeatures}
                      onChange={() => handleFeatureToggle('market')}
                    />
                  }
                  label="Market"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={useMacroFeatures}
                      onChange={() => handleFeatureToggle('macro')}
                    />
                  }
                  label="Macro"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={useSentimentFeatures}
                      onChange={() => handleFeatureToggle('sentiment')}
                    />
                  }
                  label="Sentiment"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Feature Details
              </Typography>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardHeader title="Market Features" avatar={<ShowChartIcon />} />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Technical indicators (MACD, RSI, Bollinger Bands), price data, volume, volatility, and cross-asset correlations.
                  </Typography>
                </CardContent>
              </Card>
              
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardHeader title="Macro Features" avatar={<TrendingUpIcon />} />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Interest rates, inflation metrics, GDP growth, unemployment data, and other economic indicators.
                  </Typography>
                </CardContent>
              </Card>
              
              <Card variant="outlined">
                <CardHeader title="Sentiment Features" avatar={<CodeIcon />} />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    News sentiment analysis, social media trends, analyst ratings, and institutional investor positioning.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Paper>
        </Grid>
        
        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<SettingsIcon />}
              sx={{ mr: 2 }}
            >
              Save Configuration
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<PlayArrowIcon />}
            >
              Train Model
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DRLPortfolioOptimizer;
