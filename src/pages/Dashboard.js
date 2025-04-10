import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import { 
  TrendingUp, 
  People, 
  AttachMoney,
  Assignment,
  CheckCircle,
  Warning
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Mock data for the dashboard
const fundPerformance = {
  currentValue: '$2,450,000',
  change: '+3.2%',
  timeframe: 'This Month'
};

const investorMetrics = {
  total: 12,
  new: 2,
  pending: 3
};

const complianceItems = [
  { id: 1, title: 'Annual Form ADV Filing', dueDate: '2025-06-15', status: 'upcoming' },
  { id: 2, title: 'Quarterly Investor Reports', dueDate: '2025-04-15', status: 'urgent' },
  { id: 3, title: 'Tax Documentation', dueDate: '2025-04-30', status: 'upcoming' }
];

const recentActivities = [
  { id: 1, description: 'New investor onboarded: John Smith', date: '2025-04-09' },
  { id: 2, description: 'Performance report generated', date: '2025-04-08' },
  { id: 3, description: 'Compliance check completed', date: '2025-04-07' },
  { id: 4, description: 'Fund strategy updated', date: '2025-04-05' }
];

const Dashboard = () => {
  return (
    <div>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Your Fund Dashboard
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          component={Link}
          to="/fund-setup"
        >
          Launch New Fund
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Fund Performance Card */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column',
              height: 140,
              borderRadius: 2,
              border: '1px solid rgba(0, 0, 0, 0.12)'
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Fund Performance
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {fundPerformance.currentValue}
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
              <TrendingUp color="success" sx={{ mr: 1 }} />
              <Typography variant="body2" color="success.main" component="span">
                {fundPerformance.change}
              </Typography>
              <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 1 }}>
                {fundPerformance.timeframe}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Investor Metrics Card */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column',
              height: 140,
              borderRadius: 2,
              border: '1px solid rgba(0, 0, 0, 0.12)'
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Investor Metrics
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <People sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {investorMetrics.total}
              </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {investorMetrics.new} new, {investorMetrics.pending} pending approval
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* AUM Card */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column',
              height: 140,
              borderRadius: 2,
              border: '1px solid rgba(0, 0, 0, 0.12)'
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Assets Under Management
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoney sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                $2.45M
              </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                $250K new capital this month
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Compliance Tasks */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <CardHeader 
              title="Compliance Tasks" 
              action={
                <Button 
                  size="small" 
                  component={Link}
                  to="/compliance"
                >
                  View All
                </Button>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List>
                {complianceItems.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem>
                      <ListItemIcon>
                        {item.status === 'urgent' ? 
                          <Warning color="error" /> : 
                          <CheckCircle color="primary" />
                        }
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.title}
                        secondary={`Due: ${item.dueDate}`}
                      />
                      <Button 
                        variant="outlined" 
                        size="small"
                        color={item.status === 'urgent' ? 'error' : 'primary'}
                      >
                        {item.status === 'urgent' ? 'Urgent' : 'Complete'}
                      </Button>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <CardHeader 
              title="Recent Activity" 
              action={
                <Button size="small">View All</Button>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List>
                {recentActivities.map((activity) => (
                  <React.Fragment key={activity.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Assignment color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={activity.description}
                        secondary={activity.date}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              borderRadius: 2,
              border: '1px solid rgba(0, 0, 0, 0.12)'
            }}
          >
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="outlined" component={Link} to="/investors">
                Add New Investor
              </Button>
              <Button variant="outlined" component={Link} to="/documents">
                Generate Report
              </Button>
              <Button variant="outlined" component={Link} to="/analytics">
                View Performance
              </Button>
              <Button variant="outlined" component={Link} to="/compliance">
                Check Compliance
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
