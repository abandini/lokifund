import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Code as CodeIcon,
  Api as ApiIcon,
  Description as DescriptionIcon,
  Security as SecurityIcon,
  Storage as StorageIcon,
  ShowChart as ShowChartIcon,
  Psychology as PsychologyIcon,
  Language as LanguageIcon,
  Webhook as WebhookIcon,
  LibraryBooks as LibraryBooksIcon,
  History as HistoryIcon,
  Search as SearchIcon,
  ContentCopy as ContentCopyIcon
} from '@mui/icons-material';

const APIReference = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle copy to clipboard
  const handleCopyEndpoint = (endpoint) => {
    navigator.clipboard.writeText(`https://api.fundmanagementtool.com/v1${endpoint}`);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  // API endpoints by category
  const apiEndpoints = {
    funds: [
      { method: 'GET', endpoint: '/funds', description: 'List all funds' },
      { method: 'GET', endpoint: '/funds/{fund_id}', description: 'Get fund details' },
      { method: 'POST', endpoint: '/funds', description: 'Create a new fund' },
      { method: 'PUT', endpoint: '/funds/{fund_id}', description: 'Update fund details' },
      { method: 'DELETE', endpoint: '/funds/{fund_id}', description: 'Delete a fund' }
    ],
    investors: [
      { method: 'GET', endpoint: '/investors', description: 'List all investors' },
      { method: 'GET', endpoint: '/investors/{investor_id}', description: 'Get investor details' },
      { method: 'POST', endpoint: '/investors', description: 'Create a new investor' },
      { method: 'PUT', endpoint: '/investors/{investor_id}', description: 'Update investor details' },
      { method: 'DELETE', endpoint: '/investors/{investor_id}', description: 'Delete an investor' }
    ],
    portfolio: [
      { method: 'GET', endpoint: '/funds/{fund_id}/portfolio', description: 'Get portfolio holdings' },
      { method: 'POST', endpoint: '/funds/{fund_id}/trades', description: 'Execute trades' },
      { method: 'GET', endpoint: '/funds/{fund_id}/trades', description: 'Get trade history' },
      { method: 'GET', endpoint: '/funds/{fund_id}/performance', description: 'Get portfolio performance' }
    ],
    ai: [
      { method: 'GET', endpoint: '/ai/strategies', description: 'List all AI strategies' },
      { method: 'GET', endpoint: '/ai/strategies/{strategy_id}', description: 'Get strategy details' },
      { method: 'POST', endpoint: '/ai/strategies/{strategy_id}/train', description: 'Train AI strategy' },
      { method: 'GET', endpoint: '/ai/strategies/{strategy_id}/predictions', description: 'Get strategy predictions' },
      { method: 'POST', endpoint: '/ai/sentiment/analyze', description: 'Analyze sentiment' }
    ],
    analytics: [
      { method: 'GET', endpoint: '/analytics/performance', description: 'Get performance analytics' },
      { method: 'GET', endpoint: '/analytics/attribution', description: 'Get performance attribution' },
      { method: 'GET', endpoint: '/analytics/risk', description: 'Get risk metrics' },
      { method: 'GET', endpoint: '/analytics/exposure', description: 'Get exposure analysis' }
    ],
    documents: [
      { method: 'GET', endpoint: '/documents', description: 'List all documents' },
      { method: 'GET', endpoint: '/documents/{document_id}', description: 'Get document details' },
      { method: 'POST', endpoint: '/documents', description: 'Upload a document' },
      { method: 'DELETE', endpoint: '/documents/{document_id}', description: 'Delete a document' }
    ],
    compliance: [
      { method: 'GET', endpoint: '/compliance/tasks', description: 'List compliance tasks' },
      { method: 'POST', endpoint: '/compliance/tasks/{task_id}/complete', description: 'Complete a task' },
      { method: 'GET', endpoint: '/compliance/reports', description: 'Get compliance reports' }
    ]
  };

  // Filter endpoints based on search query
  const filterEndpoints = (endpoints) => {
    if (!searchQuery) return endpoints;
    
    return endpoints.filter(endpoint => 
      endpoint.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.method.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Get method color
  const getMethodColor = (method) => {
    switch (method) {
      case 'GET':
        return '#4CAF50';
      case 'POST':
        return '#2196F3';
      case 'PUT':
        return '#FF9800';
      case 'DELETE':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  // Tab panel component
  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`api-tabpanel-${index}`}
        aria-labelledby={`api-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <ApiIcon sx={{ mr: 1 }} />
        API Reference
      </Typography>
      
      <Paper sx={{ mb: 3, p: 2 }}>
        <Typography variant="body1" paragraph>
          The Fund Management Tool API provides programmatic access to all features of the platform, including portfolio management, investor relations, compliance tracking, document management, analytics, and advanced AI trading strategies.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader 
                title="Base URL" 
                avatar={<CodeIcon />}
              />
              <CardContent>
                <Box sx={{ 
                  bgcolor: 'grey.100', 
                  p: 2, 
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography variant="body2">
                    https://api.fundmanagementtool.com/v1
                  </Typography>
                  <IconButton 
                    size="small"
                    onClick={() => navigator.clipboard.writeText('https://api.fundmanagementtool.com/v1')}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader 
                title="Authentication" 
                avatar={<SecurityIcon />}
              />
              <CardContent>
                <Typography variant="body2" paragraph>
                  All API requests require an API key in the Authorization header:
                </Typography>
                <Box sx={{ 
                  bgcolor: 'grey.100', 
                  p: 2, 
                  borderRadius: 1,
                  fontFamily: 'monospace'
                }}>
                  <Typography variant="body2">
                    Authorization: Bearer YOUR_API_KEY
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button 
            variant="contained" 
            href="/docs/api-reference.html" 
            target="_blank"
            startIcon={<DescriptionIcon />}
          >
            View Full Documentation
          </Button>
          
          <Button 
            variant="outlined"
            href="/docs/api-reference.md" 
            target="_blank"
            startIcon={<LibraryBooksIcon />}
          >
            Download Markdown
          </Button>
        </Box>
      </Paper>
      
      <Paper sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{ flexGrow: 1 }}
          >
            <Tab icon={<StorageIcon />} label="Funds" />
            <Tab icon={<PsychologyIcon />} label="Investors" />
            <Tab icon={<ShowChartIcon />} label="Portfolio" />
            <Tab icon={<LanguageIcon />} label="AI Strategies" />
            <Tab icon={<WebhookIcon />} label="Analytics" />
            <Tab icon={<DescriptionIcon />} label="Documents" />
            <Tab icon={<SecurityIcon />} label="Compliance" />
          </Tabs>
          
          <Box sx={{ p: 1, mr: 2 }}>
            <TextField
              size="small"
              placeholder="Search endpoints"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Box>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <EndpointList 
            endpoints={filterEndpoints(apiEndpoints.funds)} 
            getMethodColor={getMethodColor}
            copiedEndpoint={copiedEndpoint}
            onCopyEndpoint={handleCopyEndpoint}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <EndpointList 
            endpoints={filterEndpoints(apiEndpoints.investors)} 
            getMethodColor={getMethodColor}
            copiedEndpoint={copiedEndpoint}
            onCopyEndpoint={handleCopyEndpoint}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <EndpointList 
            endpoints={filterEndpoints(apiEndpoints.portfolio)} 
            getMethodColor={getMethodColor}
            copiedEndpoint={copiedEndpoint}
            onCopyEndpoint={handleCopyEndpoint}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <EndpointList 
            endpoints={filterEndpoints(apiEndpoints.ai)} 
            getMethodColor={getMethodColor}
            copiedEndpoint={copiedEndpoint}
            onCopyEndpoint={handleCopyEndpoint}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={4}>
          <EndpointList 
            endpoints={filterEndpoints(apiEndpoints.analytics)} 
            getMethodColor={getMethodColor}
            copiedEndpoint={copiedEndpoint}
            onCopyEndpoint={handleCopyEndpoint}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={5}>
          <EndpointList 
            endpoints={filterEndpoints(apiEndpoints.documents)} 
            getMethodColor={getMethodColor}
            copiedEndpoint={copiedEndpoint}
            onCopyEndpoint={handleCopyEndpoint}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={6}>
          <EndpointList 
            endpoints={filterEndpoints(apiEndpoints.compliance)} 
            getMethodColor={getMethodColor}
            copiedEndpoint={copiedEndpoint}
            onCopyEndpoint={handleCopyEndpoint}
          />
        </TabPanel>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          <HistoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Recent Updates
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <List>
          <ListItem>
            <ListItemIcon>
              <Chip 
                label="v1.5.0" 
                size="small" 
                color="primary"
              />
            </ListItemIcon>
            <ListItemText 
              primary="Added Advanced AI Trading Strategies endpoints" 
              secondary="May 1, 2025"
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <Chip 
                label="v1.4.0" 
                size="small" 
                color="primary"
              />
            </ListItemIcon>
            <ListItemText 
              primary="Added performance attribution analysis" 
              secondary="March 15, 2025"
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <Chip 
                label="v1.3.0" 
                size="small" 
                color="primary"
              />
            </ListItemIcon>
            <ListItemText 
              primary="Added support for multi-currency portfolios" 
              secondary="February 1, 2025"
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

// Endpoint list component
const EndpointList = ({ endpoints, getMethodColor, copiedEndpoint, onCopyEndpoint }) => {
  if (endpoints.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography variant="body1" color="text.secondary">
          No endpoints match your search criteria
        </Typography>
      </Box>
    );
  }
  
  return (
    <List>
      {endpoints.map((endpoint, index) => (
        <React.Fragment key={endpoint.endpoint}>
          <ListItem 
            sx={{ 
              borderLeft: `4px solid ${getMethodColor(endpoint.method)}`,
              bgcolor: 'background.paper',
              mb: 1,
              borderRadius: '0 4px 4px 0',
              boxShadow: 1
            }}
          >
            <ListItemIcon>
              <Chip 
                label={endpoint.method} 
                size="small" 
                sx={{ 
                  bgcolor: getMethodColor(endpoint.method),
                  color: 'white',
                  fontWeight: 'bold',
                  minWidth: 60
                }}
              />
            </ListItemIcon>
            
            <ListItemText 
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography 
                    variant="body1" 
                    component="span"
                    sx={{ 
                      fontFamily: 'monospace',
                      fontWeight: 'medium'
                    }}
                  >
                    {endpoint.endpoint}
                  </Typography>
                  <Tooltip title={copiedEndpoint === endpoint.endpoint ? "Copied!" : "Copy endpoint"}>
                    <IconButton 
                      size="small" 
                      onClick={() => onCopyEndpoint(endpoint.endpoint)}
                      sx={{ ml: 1 }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
              secondary={endpoint.description}
            />
            
            <Button 
              variant="outlined" 
              size="small"
              href={`/docs/api-reference.html#${endpoint.endpoint.replace(/\//g, '-').replace(/[{}]/g, '')}`}
              target="_blank"
            >
              Details
            </Button>
          </ListItem>
          
          {index < endpoints.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default APIReference;
