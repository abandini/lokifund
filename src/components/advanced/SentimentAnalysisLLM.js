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
  Divider,
  Chip,
  Card,
  CardContent,
  Tooltip,
  IconButton,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  CircularProgress,
  Tab,
  Tabs
} from '@mui/material';
import {
  Info as InfoIcon,
  PlayArrow as PlayArrowIcon,
  Save as SaveIcon,
  Language as LanguageIcon,
  Article as ArticleIcon,
  Twitter as TwitterIcon,
  Feed as FeedIcon,
  Insights as InsightsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const SentimentAnalysisLLM = () => {
  // State for model configuration
  const [selectedModel, setSelectedModel] = useState('finbert');
  const [customPrompt, setCustomPrompt] = useState(false);
  const [promptTemplate, setPromptTemplate] = useState(
    'Analyze the sentiment of the following financial text. Classify as positive, negative, or neutral, and provide a confidence score between 0 and 1. Explain your reasoning in one sentence.'
  );
  const [dataSources, setDataSources] = useState({
    news: true,
    social: true,
    earnings: true,
    sec: false,
    research: false
  });
  const [analysisFrequency, setAnalysisFrequency] = useState('daily');
  const [assetFocus, setAssetFocus] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  // Mock sentiment data
  const sentimentResults = [
    {
      asset: 'AAPL',
      overall: 0.68,
      trend: 'up',
      sources: {
        news: 0.72,
        social: 0.65,
        earnings: 0.74,
        sec: 0.62,
        research: 0.67
      },
      recentEvents: [
        {
          title: 'Apple announces new product line',
          source: 'Bloomberg',
          date: '2025-04-08',
          sentiment: 0.85,
          snippet: 'Apple unveiled its latest product line, exceeding analyst expectations...'
        },
        {
          title: 'Q1 Earnings Call',
          source: 'Company Transcript',
          date: '2025-04-05',
          sentiment: 0.74,
          snippet: 'Revenue grew 12% year-over-year, with services reaching an all-time high...'
        },
        {
          title: 'Supply chain concerns in Asia',
          source: 'Reuters',
          date: '2025-04-02',
          sentiment: 0.42,
          snippet: 'Manufacturing delays could impact product availability in the coming quarter...'
        }
      ]
    },
    {
      asset: 'MSFT',
      overall: 0.76,
      trend: 'up',
      sources: {
        news: 0.78,
        social: 0.72,
        earnings: 0.82,
        sec: 0.71,
        research: 0.77
      },
      recentEvents: [
        {
          title: 'Microsoft Cloud revenue surges',
          source: 'CNBC',
          date: '2025-04-09',
          sentiment: 0.88,
          snippet: 'Azure growth accelerated to 42% in constant currency...'
        },
        {
          title: 'New AI capabilities announced',
          source: 'TechCrunch',
          date: '2025-04-07',
          sentiment: 0.81,
          snippet: 'Microsoft unveiled groundbreaking AI features for its productivity suite...'
        }
      ]
    },
    {
      asset: 'TSLA',
      overall: 0.52,
      trend: 'flat',
      sources: {
        news: 0.48,
        social: 0.62,
        earnings: 0.45,
        sec: 0.51,
        research: 0.54
      },
      recentEvents: [
        {
          title: 'Tesla production numbers miss estimates',
          source: 'Wall Street Journal',
          date: '2025-04-10',
          sentiment: 0.38,
          snippet: 'Q1 deliveries fell short of analyst expectations...'
        },
        {
          title: 'New factory opening ahead of schedule',
          source: 'Electrek',
          date: '2025-04-06',
          sentiment: 0.79,
          snippet: 'The new gigafactory will begin production next month...'
        },
        {
          title: 'Regulatory investigation announced',
          source: 'Reuters',
          date: '2025-04-03',
          sentiment: 0.31,
          snippet: 'Safety regulators opened a new investigation into autopilot features...'
        }
      ]
    },
    {
      asset: 'AMZN',
      overall: 0.71,
      trend: 'up',
      sources: {
        news: 0.73,
        social: 0.68,
        earnings: 0.76,
        sec: 0.69,
        research: 0.70
      },
      recentEvents: [
        {
          title: 'Amazon Web Services expands market share',
          source: 'Business Insider',
          date: '2025-04-09',
          sentiment: 0.82,
          snippet: 'AWS continues to dominate the cloud infrastructure market...'
        }
      ]
    },
    {
      asset: 'META',
      overall: 0.59,
      trend: 'up',
      sources: {
        news: 0.61,
        social: 0.64,
        earnings: 0.57,
        sec: 0.55,
        research: 0.58
      },
      recentEvents: [
        {
          title: 'Meta\'s Reality Labs division reduces losses',
          source: 'The Verge',
          date: '2025-04-08',
          sentiment: 0.67,
          snippet: 'The metaverse investment is beginning to show signs of profitability...'
        }
      ]
    }
  ];
  
  // Handle model change
  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };
  
  // Handle data source toggle
  const handleDataSourceToggle = (source) => {
    setDataSources({
      ...dataSources,
      [source]: !dataSources[source]
    });
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Get sentiment icon based on score
  const getSentimentIcon = (score) => {
    if (score >= 0.6) return <TrendingUpIcon sx={{ color: 'success.main' }} />;
    if (score <= 0.4) return <TrendingDownIcon sx={{ color: 'error.main' }} />;
    return <TrendingFlatIcon sx={{ color: 'warning.main' }} />;
  };
  
  // Get sentiment color based on score
  const getSentimentColor = (score) => {
    if (score >= 0.6) return 'success.main';
    if (score <= 0.4) return 'error.main';
    return 'warning.main';
  };
  
  // Get trend icon based on trend
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon sx={{ color: 'success.main' }} />;
      case 'down':
        return <TrendingDownIcon sx={{ color: 'error.main' }} />;
      case 'flat':
      default:
        return <TrendingFlatIcon sx={{ color: 'warning.main' }} />;
    }
  };
  
  // Get model description
  const getModelDescription = () => {
    switch (selectedModel) {
      case 'finbert':
        return 'FinBERT is a pre-trained NLP model for financial text analysis, fine-tuned on financial communications.';
      case 'gpt4':
        return 'GPT-4 is a large language model with strong capabilities for understanding context and nuance in financial texts.';
      case 'roberta':
        return 'RoBERTa-Financial is an optimized BERT model specifically trained on financial documents and news.';
      case 'ensemble':
        return 'Ensemble approach combines multiple models to improve accuracy and reduce bias in sentiment analysis.';
      default:
        return '';
    }
  };
  
  // Simulate starting analysis
  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };
  
  // Count active data sources
  const activeSourceCount = Object.values(dataSources).filter(Boolean).length;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Sentiment Analysis with Large Language Models
        <Tooltip title="Analyzes news, social media, and financial reports using advanced NLP to gauge market sentiment">
          <IconButton size="small">
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
      
      <Grid container spacing={3}>
        {/* Model Configuration */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <LanguageIcon sx={{ mr: 1 }} />
              Model Configuration
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Language Model</InputLabel>
              <Select
                value={selectedModel}
                label="Language Model"
                onChange={handleModelChange}
              >
                <MenuItem value="finbert">FinBERT</MenuItem>
                <MenuItem value="gpt4">GPT-4</MenuItem>
                <MenuItem value="roberta">RoBERTa-Financial</MenuItem>
                <MenuItem value="ensemble">Model Ensemble</MenuItem>
              </Select>
            </FormControl>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {getModelDescription()}
            </Typography>
            
            <FormControlLabel
              control={
                <Switch 
                  checked={customPrompt}
                  onChange={() => setCustomPrompt(!customPrompt)}
                />
              }
              label="Custom Prompt Template"
            />
            
            {customPrompt && (
              <TextField
                fullWidth
                multiline
                rows={4}
                value={promptTemplate}
                onChange={(e) => setPromptTemplate(e.target.value)}
                placeholder="Enter custom prompt template..."
                sx={{ mt: 2, mb: 3 }}
              />
            )}
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Data Sources ({activeSourceCount}/{Object.keys(dataSources).length} active)
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={dataSources.news}
                      onChange={() => handleDataSourceToggle('news')}
                    />
                  }
                  label="Financial News"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={dataSources.social}
                      onChange={() => handleDataSourceToggle('social')}
                    />
                  }
                  label="Social Media"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={dataSources.earnings}
                      onChange={() => handleDataSourceToggle('earnings')}
                    />
                  }
                  label="Earnings Calls"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={dataSources.sec}
                      onChange={() => handleDataSourceToggle('sec')}
                    />
                  }
                  label="SEC Filings"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={dataSources.research}
                      onChange={() => handleDataSourceToggle('research')}
                    />
                  }
                  label="Analyst Reports"
                />
              </Grid>
            </Grid>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Analysis Frequency</InputLabel>
                  <Select
                    value={analysisFrequency}
                    label="Analysis Frequency"
                    onChange={(e) => setAnalysisFrequency(e.target.value)}
                  >
                    <MenuItem value="realtime">Real-time</MenuItem>
                    <MenuItem value="hourly">Hourly</MenuItem>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Asset Focus</InputLabel>
                  <Select
                    value={assetFocus}
                    label="Asset Focus"
                    onChange={(e) => setAssetFocus(e.target.value)}
                  >
                    <MenuItem value="all">All Portfolio Assets</MenuItem>
                    <MenuItem value="watchlist">Watchlist Only</MenuItem>
                    <MenuItem value="indices">Market Indices</MenuItem>
                    <MenuItem value="sectors">Sector Analysis</MenuItem>
                    <MenuItem value="custom">Custom Selection</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            {isAnalyzing && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Analysis Progress
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={analysisProgress} 
                  sx={{ height: 10, borderRadius: 5 }}
                />
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                  {Math.round(analysisProgress)}% Complete
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Sentiment Analysis Results */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Asset Sentiment" />
                <Tab label="Recent Events" />
                <Tab label="Sentiment Trends" />
              </Tabs>
            </Box>
            
            {/* Asset Sentiment Tab */}
            {tabValue === 0 && (
              <>
                <Typography variant="subtitle2" gutterBottom>
                  Current Sentiment by Asset
                </Typography>
                
                <List>
                  {sentimentResults.map((asset) => (
                    <ListItem 
                      key={asset.asset}
                      sx={{ 
                        mb: 1, 
                        border: 1, 
                        borderColor: 'divider', 
                        borderRadius: 1,
                        '&:hover': { bgcolor: 'action.hover' }
                      }}
                    >
                      <ListItemIcon>
                        {getTrendIcon(asset.trend)}
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle1" sx={{ mr: 1 }}>
                              {asset.asset}
                            </Typography>
                            <Chip 
                              size="small"
                              label={`${(asset.overall * 100).toFixed(0)}%`}
                              sx={{ 
                                bgcolor: getSentimentColor(asset.overall),
                                color: 'white'
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', mt: 1 }}>
                            {Object.entries(asset.sources)
                              .filter(([source, _]) => dataSources[source])
                              .map(([source, score]) => (
                                <Tooltip key={source} title={`${source}: ${(score * 100).toFixed(0)}%`}>
                                  <Chip
                                    size="small"
                                    label={source.charAt(0).toUpperCase() + source.slice(1)}
                                    variant="outlined"
                                    sx={{ 
                                      mr: 0.5,
                                      borderColor: getSentimentColor(score),
                                      color: getSentimentColor(score)
                                    }}
                                  />
                                </Tooltip>
                              ))}
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
            
            {/* Recent Events Tab */}
            {tabValue === 1 && (
              <>
                <Typography variant="subtitle2" gutterBottom>
                  Recent Events with Sentiment Impact
                </Typography>
                
                <List>
                  {sentimentResults.flatMap(asset => 
                    asset.recentEvents.map((event, index) => (
                      <ListItem 
                        key={`${asset.asset}-${index}`}
                        sx={{ 
                          mb: 1, 
                          border: 1, 
                          borderColor: 'divider', 
                          borderRadius: 1,
                          '&:hover': { bgcolor: 'action.hover' }
                        }}
                      >
                        <ListItemIcon>
                          {getSentimentIcon(event.sentiment)}
                        </ListItemIcon>
                        <ListItemText 
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="subtitle2" sx={{ mr: 1 }}>
                                {event.title}
                              </Typography>
                              <Chip 
                                size="small"
                                label={asset.asset}
                                color="primary"
                                variant="outlined"
                              />
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {event.snippet}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                  {event.source} | {event.date}
                                </Typography>
                                <Chip 
                                  size="small"
                                  label={`${(event.sentiment * 100).toFixed(0)}%`}
                                  sx={{ 
                                    bgcolor: getSentimentColor(event.sentiment),
                                    color: 'white'
                                  }}
                                />
                              </Box>
                            </>
                          }
                        />
                      </ListItem>
                    ))
                  )}
                </List>
              </>
            )}
            
            {/* Sentiment Trends Tab */}
            {tabValue === 2 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                <Button
                  variant="outlined"
                  startIcon={<InsightsIcon />}
                >
                  View Sentiment Trends
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<SaveIcon />}
              sx={{ mr: 2 }}
            >
              Save Configuration
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={isAnalyzing ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
              onClick={handleStartAnalysis}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Run Sentiment Analysis'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SentimentAnalysisLLM;
