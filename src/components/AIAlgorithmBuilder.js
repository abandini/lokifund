import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  Slider,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Chip,
  Tooltip,
  Link
} from '@mui/material';
import {
  Psychology,
  Settings as SettingsIcon,
  Tune,
  PlayArrow,
  Save,
  CheckCircle,
  Warning,
  Launch as LaunchIcon,
  TrendingUp,
  Code
} from '@mui/icons-material';

// AI provider options
const aiProviders = [
  { 
    id: 'openai', 
    name: 'OpenAI', 
    description: 'GPT-4 and other advanced models for market analysis and prediction',
    models: [
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', description: 'Most powerful model for complex financial analysis' },
      { id: 'gpt-4', name: 'GPT-4', description: 'Advanced reasoning for market pattern recognition' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and cost-effective for routine analysis' }
    ],
    documentationUrl: 'https://platform.openai.com/docs/api-reference'
  },
  { 
    id: 'anthropic', 
    name: 'Anthropic', 
    description: 'Claude models for nuanced market sentiment analysis and forecasting',
    models: [
      { id: 'claude-3-opus', name: 'Claude 3 Opus', description: 'Highest capability model for sophisticated financial analysis' },
      { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', description: 'Balanced performance for most trading applications' },
      { id: 'claude-3-haiku', name: 'Claude 3 Haiku', description: 'Fast responses for real-time market monitoring' }
    ],
    documentationUrl: 'https://docs.anthropic.com/claude/reference/getting-started-with-the-api'
  },
  { 
    id: 'google', 
    name: 'Google AI', 
    description: 'Gemini models for comprehensive market analysis and prediction',
    models: [
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', description: 'Advanced model for multimodal financial analysis' },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: 'Fast inference for real-time trading signals' },
      { id: 'gemini-1.0-pro', name: 'Gemini 1.0 Pro', description: 'Reliable model for standard financial applications' }
    ],
    documentationUrl: 'https://ai.google.dev/docs'
  },
  { 
    id: 'custom', 
    name: 'Custom Models', 
    description: 'Traditional ML models trained on your specific data',
    models: [
      { id: 'lstm', name: 'LSTM Neural Network', description: 'Long Short-Term Memory networks for time series prediction' },
      { id: 'transformer', name: 'Transformer Model', description: 'Attention-based model for market pattern recognition' },
      { id: 'ensemble', name: 'Ensemble Learning', description: 'Combines multiple models for improved prediction accuracy' },
      { id: 'reinforcement', name: 'Reinforcement Learning', description: 'Learns optimal trading strategies through reward-based training' }
    ],
    documentationUrl: null
  }
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
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [apiKeys, setApiKeys] = useState({
    openai: localStorage.getItem('openai_api_key') || '',
    anthropic: localStorage.getItem('anthropic_api_key') || '',
    google: localStorage.getItem('google_api_key') || ''
  });
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [currentKeyProvider, setCurrentKeyProvider] = useState('');
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [selectedDataSources, setSelectedDataSources] = useState([]);
  const [hyperparameters, setHyperparameters] = useState({
    learningRate: 0.001,
    epochs: 100,
    batchSize: 32,
    dropout: 0.2,
    temperature: 0.7,
    maxTokens: 1000
  });
  const [algorithmName, setAlgorithmName] = useState('');
  const [algorithmDescription, setAlgorithmDescription] = useState('');
  const [trainingStatus, setTrainingStatus] = useState(null); // null, 'training', 'success', 'error'
  const [validationResults, setValidationResults] = useState(null);
  const [generationStatus, setGenerationStatus] = useState(null);
  const [useAutoOptimize, setUseAutoOptimize] = useState(true);
  const [riskTolerance, setRiskTolerance] = useState(50);

  const steps = ['Select AI Model', 'Configure Indicators', 'Data Sources', 'Hyperparameters', 'Risk Management', 'Generate & Test'];

  const handleNext = () => {
    if (activeStep === 0 && 
        selectedProvider && 
        selectedProvider !== 'custom' && 
        !hasApiKey(selectedProvider)) {
      handleOpenApiKeyDialog(selectedProvider);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 5) {
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
    setGenerationStatus('generating');
    setTimeout(() => {
      setGenerationStatus('complete');
    }, 3000);
  };

  const handleOpenApiKeyDialog = (providerId) => {
    setCurrentKeyProvider(providerId);
    setShowApiKeyDialog(true);
  };

  const handleCloseApiKeyDialog = () => {
    setShowApiKeyDialog(false);
  };

  const handleSaveApiKey = () => {
    localStorage.setItem(`${currentKeyProvider}_api_key`, apiKeys[currentKeyProvider]);
    handleCloseApiKeyDialog();
  };

  const handleApiKeyChange = (event) => {
    setApiKeys({
      ...apiKeys,
      [currentKeyProvider]: event.target.value
    });
  };

  const hasApiKey = (providerId) => {
    return apiKeys[providerId] && apiKeys[providerId].trim() !== '';
  };

  const handleProviderChange = (event) => {
    const provider = event.target.value;
    setSelectedProvider(provider);
    setSelectedModel(''); // Reset model when provider changes
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select an AI Provider and Model
            </Typography>
            
            {/* Provider selection */}
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>AI Provider</InputLabel>
              <Select
                value={selectedProvider}
                onChange={handleProviderChange}
                label="AI Provider"
              >
                {aiProviders.map((provider) => (
                  <MenuItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedProvider && (
              <>
                {/* Provider details */}
                <Box sx={{ mb: 3 }}>
                  <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6">
                        {aiProviders.find(p => p.id === selectedProvider)?.name}
                      </Typography>
                      
                      {selectedProvider !== 'custom' && (
                        <Box>
                          <Chip 
                            label={hasApiKey(selectedProvider) ? "API Key Set" : "API Key Required"}
                            color={hasApiKey(selectedProvider) ? "success" : "warning"}
                            sx={{ mr: 1 }}
                          />
                          <Button 
                            size="small" 
                            variant="outlined" 
                            onClick={() => handleOpenApiKeyDialog(selectedProvider)}
                          >
                            {hasApiKey(selectedProvider) ? "Update API Key" : "Set API Key"}
                          </Button>
                        </Box>
                      )}
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {aiProviders.find(p => p.id === selectedProvider)?.description}
                    </Typography>
                    
                    {aiProviders.find(p => p.id === selectedProvider)?.documentationUrl && (
                      <Button 
                        size="small" 
                        href={aiProviders.find(p => p.id === selectedProvider)?.documentationUrl}
                        target="_blank"
                        endIcon={<LaunchIcon />}
                      >
                        View Documentation
                      </Button>
                    )}
                  </Paper>
                </Box>

                {/* Model selection */}
                <Typography variant="subtitle1" gutterBottom>
                  Select a Model
                </Typography>
                <Grid container spacing={3}>
                  {aiProviders.find(p => p.id === selectedProvider)?.models.map((model) => (
                    <Grid item xs={12} md={6} key={model.id}>
                      <Card 
                        sx={{ 
                          cursor: 'pointer',
                          border: selectedModel === model.id ? '2px solid #1976d2' : 'none',
                          height: '100%'
                        }}
                        onClick={() => setSelectedModel(model.id)}
                      >
                        <CardContent>
                          <Typography variant="h6">{model.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {model.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
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
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>
                  Temperature: {hyperparameters.temperature}
                </Typography>
                <Slider
                  value={hyperparameters.temperature}
                  min={0}
                  max={2}
                  step={0.1}
                  onChange={(e, val) => handleHyperparameterChange('temperature', val)}
                  valueLabelDisplay="auto"
                  disabled={useAutoOptimize}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>
                  Max Tokens: {hyperparameters.maxTokens}
                </Typography>
                <Slider
                  value={hyperparameters.maxTokens}
                  min={100}
                  max={8000}
                  step={100}
                  onChange={(e, val) => handleHyperparameterChange('maxTokens', val)}
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
