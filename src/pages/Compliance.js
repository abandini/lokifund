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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Button,
  IconButton,
  LinearProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  CalendarToday,
  Assignment,
  AttachFile,
  Add as AddIcon,
  Edit as EditIcon
} from '@mui/icons-material';

// Mock compliance data
const complianceItems = [
  {
    id: 1,
    title: 'Form ADV Annual Update',
    description: 'Annual update to Form ADV required by the SEC for registered investment advisers',
    dueDate: '2025-06-15',
    status: 'upcoming',
    category: 'sec'
  },
  {
    id: 2,
    title: 'Quarterly Investor Reports',
    description: 'Prepare and distribute quarterly reports to all investors',
    dueDate: '2025-04-15',
    status: 'urgent',
    category: 'investor'
  },
  {
    id: 3,
    title: 'Annual Privacy Notice',
    description: 'Distribute annual privacy policy notice to all investors',
    dueDate: '2025-05-30',
    status: 'upcoming',
    category: 'investor'
  },
  {
    id: 4,
    title: 'Form PF Filing',
    description: 'File Form PF with the SEC (for funds with over $150M AUM)',
    dueDate: '2025-07-15',
    status: 'upcoming',
    category: 'sec'
  },
  {
    id: 5,
    title: 'Annual Compliance Review',
    description: 'Conduct annual review of compliance policies and procedures',
    dueDate: '2025-12-31',
    status: 'completed',
    category: 'internal'
  },
  {
    id: 6,
    title: 'Anti-Money Laundering Review',
    description: 'Conduct periodic review of AML procedures and investor verification',
    dueDate: '2025-08-15',
    status: 'upcoming',
    category: 'internal'
  },
  {
    id: 7,
    title: 'Form 13F Filing',
    description: 'Quarterly filing for institutional investment managers with over $100M in assets',
    dueDate: '2025-05-15',
    status: 'upcoming',
    category: 'sec'
  }
];

// Mock regulatory filings
const regulatoryFilings = [
  {
    id: 1,
    name: 'Form ADV Part 1',
    authority: 'SEC',
    frequency: 'Annual',
    lastFiled: '2024-03-15',
    nextDue: '2025-03-15',
    status: 'completed'
  },
  {
    id: 2,
    name: 'Form ADV Part 2A',
    authority: 'SEC',
    frequency: 'Annual',
    lastFiled: '2024-03-15',
    nextDue: '2025-03-15',
    status: 'completed'
  },
  {
    id: 3,
    name: 'Form PF',
    authority: 'SEC',
    frequency: 'Annual',
    lastFiled: '2024-04-30',
    nextDue: '2025-04-30',
    status: 'upcoming'
  },
  {
    id: 4,
    name: 'Form 13F',
    authority: 'SEC',
    frequency: 'Quarterly',
    lastFiled: '2025-01-15',
    nextDue: '2025-04-15',
    status: 'urgent'
  }
];

const Compliance = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (task = null) => {
    setCurrentTask(task || {
      title: '',
      description: '',
      dueDate: '',
      status: 'upcoming',
      category: 'internal'
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'upcoming':
        return 'primary';
      case 'urgent':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle color="success" />;
      case 'upcoming':
        return <CalendarToday color="primary" />;
      case 'urgent':
        return <Warning color="error" />;
      default:
        return <Assignment />;
    }
  };

  // Calculate compliance score
  const completedTasks = complianceItems.filter(item => item.status === 'completed').length;
  const totalTasks = complianceItems.length;
  const complianceScore = Math.round((completedTasks / totalTasks) * 100);

  // Filter tasks based on status
  const urgentTasks = complianceItems.filter(item => item.status === 'urgent');
  const upcomingTasks = complianceItems.filter(item => item.status === 'upcoming');
  const completedTasksList = complianceItems.filter(item => item.status === 'completed');

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Compliance Dashboard
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Compliance Task
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Compliance Score Card */}
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
              Compliance Score
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {complianceScore}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={complianceScore} 
              color={complianceScore > 80 ? "success" : complianceScore > 50 ? "primary" : "error"}
              sx={{ height: 8, borderRadius: 4 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {completedTasks} of {totalTasks} tasks completed
            </Typography>
          </Paper>
        </Grid>

        {/* Upcoming Deadlines Card */}
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
              Upcoming Deadlines
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {upcomingTasks.length}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Next deadline: {upcomingTasks.length > 0 ? upcomingTasks[0].dueDate : 'None'}
            </Typography>
          </Paper>
        </Grid>

        {/* Urgent Items Card */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column',
              height: 140,
              borderRadius: 2,
              border: '1px solid rgba(0, 0, 0, 0.12)',
              bgcolor: urgentTasks.length > 0 ? 'error.50' : 'inherit'
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Urgent Items
            </Typography>
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                color: urgentTasks.length > 0 ? 'error.main' : 'inherit'
              }}
            >
              {urgentTasks.length}
            </Typography>
            <Typography 
              variant="body2" 
              color={urgentTasks.length > 0 ? "error" : "text.secondary"}
              sx={{ mt: 1 }}
            >
              {urgentTasks.length > 0 ? 'Requires immediate attention!' : 'No urgent items'}
            </Typography>
          </Paper>
        </Grid>

        {/* Compliance Tasks */}
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: 2,
              border: '1px solid rgba(0, 0, 0, 0.12)',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="All Tasks" />
                <Tab label="Urgent" />
                <Tab label="Upcoming" />
                <Tab label="Completed" />
              </Tabs>
            </Box>
            <List>
              {(tabValue === 0 ? complianceItems :
                tabValue === 1 ? urgentTasks :
                tabValue === 2 ? upcomingTasks :
                completedTasksList).map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem>
                    <ListItemIcon>
                      {getStatusIcon(item.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Due: {item.dueDate}
                          </Typography>
                          {" — "}{item.description}
                        </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Chip 
                        label={item.status.charAt(0).toUpperCase() + item.status.slice(1)} 
                        color={getStatusColor(item.status)}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <IconButton edge="end" onClick={() => handleOpenDialog(item)}>
                        <EditIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Regulatory Filings */}
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 0,
              borderRadius: 2,
              border: '1px solid rgba(0, 0, 0, 0.12)',
              overflow: 'hidden'
            }}
          >
            <CardHeader 
              title="Regulatory Filings" 
              action={
                <Button 
                  size="small" 
                  startIcon={<AddIcon />}
                >
                  Add Filing
                </Button>
              }
            />
            <Divider />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Filing Name</TableCell>
                    <TableCell>Regulatory Authority</TableCell>
                    <TableCell>Frequency</TableCell>
                    <TableCell>Last Filed</TableCell>
                    <TableCell>Next Due</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {regulatoryFilings.map((filing) => (
                    <TableRow key={filing.id}>
                      <TableCell>{filing.name}</TableCell>
                      <TableCell>{filing.authority}</TableCell>
                      <TableCell>{filing.frequency}</TableCell>
                      <TableCell>{filing.lastFiled}</TableCell>
                      <TableCell>{filing.nextDue}</TableCell>
                      <TableCell>
                        <Chip 
                          label={filing.status.charAt(0).toUpperCase() + filing.status.slice(1)} 
                          color={getStatusColor(filing.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <AttachFile fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Compliance Task Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentTask && currentTask.id ? 'Edit Compliance Task' : 'Add Compliance Task'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Title"
                name="title"
                value={currentTask?.title || ''}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={currentTask?.description || ''}
                multiline
                rows={3}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Due Date"
                name="dueDate"
                type="date"
                value={currentTask?.dueDate || ''}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                select
                SelectProps={{
                  native: true,
                }}
                value={currentTask?.category || 'internal'}
                margin="normal"
              >
                <option value="sec">SEC</option>
                <option value="investor">Investor</option>
                <option value="internal">Internal</option>
                <option value="tax">Tax</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Status"
                name="status"
                select
                SelectProps={{
                  native: true,
                }}
                value={currentTask?.status || 'upcoming'}
                margin="normal"
              >
                <option value="upcoming">Upcoming</option>
                <option value="urgent">Urgent</option>
                <option value="completed">Completed</option>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Compliance;
