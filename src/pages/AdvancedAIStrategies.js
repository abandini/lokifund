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
  CardActions,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Science as ScienceIcon,
  Psychology as PsychologyIcon,
  Insights as InsightsIcon,
  Timeline as TimelineIcon,
  Language as LanguageIcon,
  ShowChart as ShowChartIcon,
  AutoGraph as AutoGraphIcon,
  BarChart as BarChartIcon,
  Info as InfoIcon,
  Add as AddIcon
} from '@mui/icons-material';

// Import advanced AI components
import DRLPortfolioOptimizer from '../components/advanced/DRLPortfolioOptimizer';
import TransformerMarketPredictor from '../components/advanced/TransformerMarketPredictor';
import SentimentAnalysisLLM from '../components/advanced/SentimentAnalysisLLM';
import SolomonoffReinforcementLearning from '../components/advanced/SolomonoffReinforcementLearning';

const AdvancedAIStrategies = () => {
  const [activeStrategy, setActiveStrategy] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle strategy selection
  const handleStrategySelect = (strategyId) => {
    setActiveStrategy(strategyId);
  };

  // Handle close strategy
  const handleCloseStrategy = () => {
    setActiveStrategy(null);
  };

  // Strategy cards data
  const strategyCards = [
    {
      id: 'solomonoff',
      title: 'Solomonoff Induction',
      subtitle: 'Reinforcement Learning',
      description: 'Combines reinforcement learning with Solomonoff\'s theory of inductive inference to find the simplest model that explains market patterns.',
      icon: <ScienceIcon />,
      tags: ['Algorithmic Information Theory', 'Bayesian', 'Minimum Description Length'],
      component: <SolomonoffReinforcementLearning />
    },
    {
      id: 'drl',
      title: 'Deep Reinforcement Learning',
      subtitle: 'Portfolio Optimization',
      description: 'Uses deep reinforcement learning to dynamically allocate assets in a portfolio based on market conditions.',
      icon: <PsychologyIcon />,
      tags: ['Portfolio Allocation', 'Risk Management', 'Multi-Asset'],
      component: <DRLPortfolioOptimizer />
    },
    {
      id: 'transformer',
      title: 'Transformer Architecture',
      subtitle: 'Market Prediction',
      description: 'Leverages transformer architecture to capture complex temporal dependencies in market data.',
      icon: <TimelineIcon />,
      tags: ['Time Series', 'Attention Mechanism', 'Multi-Timeframe'],
      component: <TransformerMarketPredictor />
    },
    {
      id: 'sentiment',
      title: 'Large Language Models',
      subtitle: 'Sentiment Analysis',
      description: 'Analyzes news, social media, and financial reports using advanced NLP to gauge market sentiment.',
      icon: <LanguageIcon />,
      tags: ['NLP', 'News Analysis', 'Social Media'],
      component: <SentimentAnalysisLLM />
    },
    {
      id: 'multiagent',
      title: 'Multi-Agent Systems',
      subtitle: 'Competitive Trading',
      description: 'Simulates market dynamics using multiple AI agents with different strategies competing in a virtual market.',
      icon: <AutoGraphIcon />,
      tags: ['Agent-Based', 'Evolutionary', 'Market Simulation'],
      component: null // To be implemented
    },
    {
      id: 'quantum',
      title: 'Quantum-Inspired',
      subtitle: 'Feature Selection',
      description: 'Uses quantum-inspired algorithms to identify the most relevant features for market prediction.',
      icon: <ScienceIcon />,
      tags: ['Feature Engineering', 'Dimensionality Reduction', 'Optimization'],
      component: null // To be implemented
    },
    {
      id: 'explainable',
      title: 'Explainable AI',
      subtitle: 'Trading Decisions',
      description: 'Provides human-understandable explanations for AI trading decisions to build trust and meet regulatory requirements.',
      icon: <InsightsIcon />,
      tags: ['Interpretability', 'Regulatory', 'Decision Trees'],
      component: null // To be implemented
    },
    {
      id: 'adaptive',
      title: 'Adaptive Time Series',
      subtitle: 'Regime-Based Forecasting',
      description: 'Combines multiple forecasting models that adapt to different market regimes.',
      icon: <ShowChartIcon />,
      tags: ['Ensemble Learning', 'Regime Detection', 'Adaptive Models'],
      component: null // To be implemented
    },
    {
      id: 'hierarchical',
      title: 'Hierarchical Risk Parity',
      subtitle: 'ML-Enhanced Allocation',
      description: 'Advanced portfolio construction technique that uses machine learning for hierarchical clustering of assets.',
      icon: <BarChartIcon />,
      tags: ['Clustering', 'Risk Allocation', 'Correlation Structure'],
      component: null // To be implemented
    }
  ];

  // Render strategy component based on active strategy
  const renderStrategyComponent = () => {
    if (!activeStrategy) return null;
    
    const strategy = strategyCards.find(s => s.id === activeStrategy);
    if (!strategy || !strategy.component) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Coming Soon
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This advanced AI strategy is currently under development and will be available in a future update.
          </Typography>
        </Box>
      );
    }
    
    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button onClick={handleCloseStrategy} sx={{ mr: 2 }}>
            Back to Strategies
          </Button>
          <Typography variant="h5">
            {strategy.title}: {strategy.subtitle}
          </Typography>
        </Box>
        {strategy.component}
      </Box>
    );
  };

  // If a strategy is active, render its component
  if (activeStrategy) {
    return renderStrategyComponent();
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <ScienceIcon sx={{ mr: 1 }} />
        Advanced AI Trading Strategies
        <Tooltip title="These cutting-edge AI strategies represent the frontier of quantitative finance, combining the latest advances in artificial intelligence with financial theory.">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="All Strategies" />
          <Tab label="Portfolio Optimization" />
          <Tab label="Market Prediction" />
          <Tab label="Sentiment Analysis" />
          <Tab label="Risk Management" />
          <Tab label="Theoretical Models" />
        </Tabs>
      </Paper>
      
      <Grid container spacing={3}>
        {strategyCards
          .filter(strategy => {
            if (tabValue === 0) return true;
            if (tabValue === 1) return strategy.id === 'drl' || strategy.id === 'hierarchical';
            if (tabValue === 2) return strategy.id === 'transformer' || strategy.id === 'adaptive';
            if (tabValue === 3) return strategy.id === 'sentiment' || strategy.id === 'explainable';
            if (tabValue === 4) return strategy.id === 'multiagent' || strategy.id === 'quantum';
            if (tabValue === 5) return strategy.id === 'solomonoff';
            return true;
          })
          .map((strategy) => (
            <Grid item xs={12} sm={6} md={4} key={strategy.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardHeader
                  avatar={strategy.icon}
                  title={strategy.title}
                  subheader={strategy.subtitle}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {strategy.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {strategy.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    onClick={() => handleStrategySelect(strategy.id)}
                    startIcon={strategy.component ? <ShowChartIcon /> : <InfoIcon />}
                  >
                    {strategy.component ? 'Open Strategy' : 'Learn More'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          
        {/* Add New Strategy Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'action.hover',
              border: '2px dashed',
              borderColor: 'divider'
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <IconButton 
                sx={{ 
                  bgcolor: 'background.paper', 
                  width: 60, 
                  height: 60,
                  mb: 2
                }}
              >
                <AddIcon fontSize="large" />
              </IconButton>
              <Typography variant="h6" gutterBottom>
                Create Custom Strategy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Build your own advanced AI trading strategy by combining multiple techniques and models.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Start Building</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdvancedAIStrategies;
