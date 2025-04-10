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
  Chip,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slider,
  Switch,
  FormControlLabel,
  Alert
} from '@mui/material';
import {
  TrendingUp,
  Psychology,
  Code,
  Settings as SettingsIcon,
  Tune,
  PlayArrow,
  Save,
  CheckCircle,
  Warning
} from '@mui/icons-material';

// Mock AI model options
const aiModels = [
  { id: 'lstm', name: 'LSTM Neural Network', description: 'Long Short-Term Memory networks for time series prediction' },
  { id: 'transformer', name: 'Transformer Model', description: 'Attention-based model for market pattern recognition' },
  { id: 'ensemble', name: 'Ensemble Learning', description: 'Combines multiple models for improved prediction accuracy' },
  { id: 'reinforcement', name: 'Reinforcement Learning', description: 'Learns optimal trading strategies through reward-based training' }
];

// Mock market indicators
const marketIndicators = [
  { id: 'price', name: 'Price Action', description: 'Raw price movements and patterns' },
  { id: 'volume', name: 'Volume', description: 'Trading volume analysis' },
  { id: 'macd', name: 'MACD', description: 'Moving Average Convergence Divergence' },
  { id: 'rsi', name: 'RSI', description: 'Relative Strength Index' },
  { id: 'bollinger', name: 'Bollinger Bands', description: 'Volatility-based bands around price' },
  { id: 'sentiment', name: 'Market Sentiment', description: 'News and social media sentiment analysis' }
];

// Mock data sources
const dataSources = [
  { id: 'yahoo', name: 'Yahoo Finance', description: 'Historical market data' },
  { id: 'alpha', name: 'Alpha Vantage', description: 'Real-time and historical market data' },
  { id: 'news', name: 'Financial News API', description: 'News articles and sentiment data' },
  { id: 'social', name: 'Social Media', description: 'Twitter and Reddit sentiment data' }
];

const AIAlgorithmBuilder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [selectedDataSources, setSelectedDataSources] = useState([]);
  const [hyperparameters, setHyperparameters] = useState({
    learningRate: 0.001,
    epochs: 100,
    batchSize: 32,
    dropout: 0.2
  });
  const [riskTolerance, setRiskTolerance] = useState(50);
  const [useAutoOptimize, setUseAutoOptimize] = useState(true);
  const [generationStatus, setGenerationStatus] = useState(null);

  const steps = ['Select AI Model', 'Configure Indicators', 'Data Sources', 'Hyperparameters', 'Risk Management', 'Generate & Test'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 5) {
      // Final step - generate algorithm
      handleGenerateAlgorithm();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleIndicatorToggle = (indicatorId) => {
    setSelectedIndicators(prev => {
      if (prev.includes(indicatorId)) {
        return prev.filter(id => id !== indicatorId);
      } else {
        return [...prev, indicatorId];
      }
    });
  };

  const handleDataSourceToggle = (sourceId) => {
    setSelectedDataSources(prev => {
      if (prev.includes(sourceId)) {
        return prev.filter(id => id !== sourceId);
      } else {
        return [...prev, sourceId];
      }
    });
  };

  const handleHyperparameterChange = (param, value) => {
    setHyperparameters(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const handleRiskToleranceChange = (event, newValue) => {
    setRiskTolerance(newValue);
  };

  const handleAutoOptimizeChange = (event) => {
    setUseAutoOptimize(event.target.checked);
  };

  const handleGenerateAlgorithm = () => {
    // Simulate algorithm generation
    setGenerationStatus('generating');
    setTimeout(() => {
      setGenerationStatus('complete');
    }, 3000);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select AI Model
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Choose the AI model that best fits your trading strategy requirements.
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>AI Model</InputLabel>
              <Select
                value={selectedModel}
                label="AI Model"
                onChange={handleModelChange}
              >
                {aiModels.map((model) => (
                  <MenuItem key={model.id} value={model.id}>
                    {model.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedModel && (
              <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12)' }}>
                <CardHeader 
                  title={aiModels.find(m => m.id === selectedModel)?.name}
                  avatar={<Psychology color="primary" />}
                />
                <Divider />
                <CardContent>
                  <Typography variant="body2">
                    {aiModels.find(m => m.id === selectedModel)?.description}
                  </Typography>
                  {selectedModel === 'lstm' && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        <strong>Best for:</strong> Time series prediction, pattern recognition in market data
                      </Typography>
                      <Typography variant="body2">
                        <strong>Strengths:</strong> Captures long-term dependencies, handles sequential data well
                      </Typography>
                    </Box>
                  )}
                  {selectedModel === 'transformer' && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        <strong>Best for:</strong> Complex pattern recognition, multi-factor analysis
                      </Typography>
                      <Typography variant="body2">
                        <strong>Strengths:</strong> Attention mechanism focuses on relevant data points, handles long sequences
                      </Typography>
                    </Box>
                  )}
                  {selectedModel === 'ensemble' && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        <strong>Best for:</strong> Robust predictions, reducing overfitting
                      </Typography>
                      <Typography variant="body2">
                        <strong>Strengths:</strong> Combines multiple models, reduces variance, improves stability
                      </Typography>
                    </Box>
                  )}
                  {selectedModel === 'reinforcement' && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        <strong>Best for:</strong> Dynamic trading environments, optimizing for specific reward functions
                      </Typography>
                      <Typography variant="body2">
                        <strong>Strengths:</strong> Learns through trial and error, adapts to changing market conditions
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Configure Market Indicators
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Select the technical and fundamental indicators to include in your algorithm.
            </Typography>
            <Grid container spacing={2}>
              {marketIndicators.map((indicator) => (
                <Grid item xs={12} sm={6} key={indicator.id}>
                  <Card 
                    elevation={0} 
                    sx={{ 
                      borderRadius: 2, 
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      bgcolor: selectedIndicators.includes(indicator.id) ? 'primary.50' : 'inherit',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleIndicatorToggle(indicator.id)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1">{indicator.name}</Typography>
                        <Chip 
                          label={selectedIndicators.includes(indicator.id) ? "Selected" : "Select"} 
                          color={selectedIndicators.includes(indicator.id) ? "primary" : "default"}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {indicator.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Selected Indicators: {selectedIndicators.length} of {marketIndicators.length}
              </Typography>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Data Sources
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Select the data sources to train and validate your AI model.
            </Typography>
            <Grid container spacing={2}>
              {dataSources.map((source) => (
                <Grid item xs={12} sm={6} key={source.id}>
                  <Card 
                    elevation={0} 
                    sx={{ 
                      borderRadius: 2, 
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      bgcolor: selectedDataSources.includes(source.id) ? 'primary.50' : 'inherit',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleDataSourceToggle(source.id)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1">{source.name}</Typography>
                        <Chip 
                          label={selectedDataSources.includes(source.id) ? "Selected" : "Select"} 
                          color={selectedDataSources.includes(source.id) ? "primary" : "default"}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {source.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Selected Data Sources: {selectedDataSources.length} of {dataSources.length}
              </Typography>
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Model Hyperparameters
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Configure the hyperparameters for your AI model or use auto-optimization.
            </Typography>
            <FormControlLabel
              control={
                <Switch 
                  checked={useAutoOptimize} 
                  onChange={handleAutoOptimizeChange}
                  color="primary"
                />
              }
              label="Auto-optimize hyperparameters"
              sx={{ mb: 3 }}
            />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>
                  Learning Rate: {hyperparameters.learningRate}
                </Typography>
                <Slider
                  value={hyperparameters.learningRate}
                  min={0.0001}
                  max={0.01}
                  step={0.0001}
                  onChange={(e, val) => handleHyperparameterChange('learningRate', val)}
                  valueLabelDisplay="auto"
                  disabled={useAutoOptimize}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>
                  Epochs: {hyperparameters.epochs}
                </Typography>
                <Slider
                  value={hyperparameters.epochs}
                  min={10}
                  max={500}
                  step={10}
                  onChange={(e, val) => handleHyperparameterChange('epochs', val)}
                  valueLabelDisplay="auto"
                  disabled={useAutoOptimize}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>
                  Batch Size: {hyperparameters.batchSize}
                </Typography>
                <Slider
                  value={hyperparameters.batchSize}
                  min={8}
                  max={128}
                  step={8}
                  onChange={(e, val) => handleHyperparameterChange('batchSize', val)}
                  valueLabelDisplay="auto"
                  disabled={useAutoOptimize}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>
                  Dropout Rate: {hyperparameters.dropout}
                </Typography>
                <Slider
                  value={hyperparameters.dropout}
                  min={0}
                  max={0.5}
                  step={0.05}
                  onChange={(e, val) => handleHyperparameterChange('dropout', val)}
                  valueLabelDisplay="auto"
                  disabled={useAutoOptimize}
                />
              </Grid>
            </Grid>
            {useAutoOptimize && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Auto-optimization will use Bayesian optimization to find the best hyperparameters for your model based on validation performance.
              </Alert>
            )}
          </Box>
        );
      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Risk Management
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Configure risk parameters to control the algorithm's trading behavior.
            </Typography>
            <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12)', mb: 3 }}>
              <CardContent>
                <Typography gutterBottom>
                  Risk Tolerance
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={riskTolerance}
                      onChange={handleRiskToleranceChange}
                      aria-labelledby="risk-tolerance-slider"
                      valueLabelDisplay="auto"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="text.secondary">
                      {riskTolerance < 30 ? 'Conservative' : riskTolerance < 70 ? 'Moderate' : 'Aggressive'}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Position Sizing</InputLabel>
                  <Select defaultValue="dynamic">
                    <MenuItem value="fixed">Fixed Size</MenuItem>
                    <MenuItem value="percent">Percentage of Portfolio</MenuItem>
                    <MenuItem value="dynamic">Dynamic (Kelly Criterion)</MenuItem>
                    <MenuItem value="volatility">Volatility-Adjusted</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Stop Loss Strategy</InputLabel>
                  <Select defaultValue="trailing">
                    <MenuItem value="fixed">Fixed Stop Loss</MenuItem>
                    <MenuItem value="trailing">Trailing Stop</MenuItem>
                    <MenuItem value="volatility">Volatility-Based</MenuItem>
                    <MenuItem value="time">Time-Based</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Max Drawdown Limit (%)"
                  type="number"
                  defaultValue="15"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Max Position Size (%)"
                  type="number"
                  defaultValue="10"
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 5:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Generate & Test Algorithm
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Review your configuration and generate your AI-powered trading algorithm.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12)' }}>
                  <CardHeader title="Model Configuration" />
                  <Divider />
                  <CardContent>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><Psychology fontSize="small" /></ListItemIcon>
                        <ListItemText 
                          primary="AI Model" 
                          secondary={aiModels.find(m => m.id === selectedModel)?.name || 'Not selected'} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><TrendingUp fontSize="small" /></ListItemIcon>
                        <ListItemText 
                          primary="Indicators" 
                          secondary={`${selectedIndicators.length} selected`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Code fontSize="small" /></ListItemIcon>
                        <ListItemText 
                          primary="Data Sources" 
                          secondary={`${selectedDataSources.length} selected`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><Tune fontSize="small" /></ListItemIcon>
                        <ListItemText 
                          primary="Hyperparameters" 
                          secondary={useAutoOptimize ? 'Auto-optimized' : 'Manually configured'} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
                        <ListItemText 
                          primary="Risk Profile" 
                          secondary={riskTolerance < 30 ? 'Conservative' : riskTolerance < 70 ? 'Moderate' : 'Aggressive'} 
                        />
                      </ListItem>
                    </List>
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
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3
                  }}
                >
                  {generationStatus === null && (
                    <>
                      <Typography variant="h6" gutterBottom align="center">
                        Ready to Generate
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph align="center">
                        Click the button below to generate your AI trading algorithm
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PlayArrow />}
                        onClick={handleGenerateAlgorithm}
                        size="large"
                      >
                        Generate Algorithm
                      </Button>
                    </>
                  )}
                  {generationStatus === 'generating' && (
                    <>
                      <Typography variant="h6" gutterBottom align="center">
                        Generating Algorithm
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph align="center">
                        This may take a few minutes...
                      </Typography>
                      <Box sx={{ width: '80%', mt: 2 }}>
                        <LinearProgress />
                      </Box>
                    </>
                  )}
                  {generationStatus === 'complete' && (
                    <>
                      <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
                      <Typography variant="h6" gutterBottom align="center">
                        Algorithm Generated Successfully
                      </Typography>
                      <Typography variant="body2" paragraph align="center">
                        Your AI trading algorithm is ready for backtesting and deployment.
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button
                          variant="outlined"
                          startIcon={<PlayArrow />}
                        >
                          Run Backtest
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<Save />}
                        >
                          Save Algorithm
                        </Button>
                      </Box>
                    </>
                  )}
                </Card>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
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
        AI Algorithm Builder
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Create sophisticated trading algorithms powered by artificial intelligence.
      </Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={
              (activeStep === 0 && !selectedModel) ||
              (activeStep === 1 && selectedIndicators.length === 0) ||
              (activeStep === 2 && selectedDataSources.length === 0) ||
              (activeStep === 5 && generationStatus === 'generating')
            }
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AIAlgorithmBuilder;
