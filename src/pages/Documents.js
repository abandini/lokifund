import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Add as AddIcon,
  Description,
  Download,
  Share,
  Delete,
  Edit,
  FileCopy,
  Search
} from '@mui/icons-material';

// Mock document templates
const documentTemplates = [
  {
    id: 1,
    name: 'Limited Partnership Agreement',
    category: 'legal',
    description: 'Standard LP agreement for fund formation'
  },
  {
    id: 2,
    name: 'Private Placement Memorandum',
    category: 'legal',
    description: 'Disclosure document for potential investors'
  },
  {
    id: 3,
    name: 'Subscription Agreement',
    category: 'investor',
    description: 'Agreement for new investors to join the fund'
  },
  {
    id: 4,
    name: 'Quarterly Investor Report',
    category: 'reporting',
    description: 'Standard quarterly report for investors'
  },
  {
    id: 5,
    name: 'Annual Financial Statement',
    category: 'reporting',
    description: 'Annual audited financial statements'
  },
  {
    id: 6,
    name: 'Form ADV Part 2A',
    category: 'compliance',
    description: 'SEC-required disclosure brochure'
  },
  {
    id: 7,
    name: 'Investor Welcome Kit',
    category: 'investor',
    description: 'Onboarding materials for new investors'
  }
];

// Mock documents
const mockDocuments = [
  {
    id: 1,
    name: 'Alpha Fund - Limited Partnership Agreement',
    category: 'legal',
    created: '2025-01-15',
    modified: '2025-01-15',
    status: 'final',
    format: 'pdf'
  },
  {
    id: 2,
    name: 'Alpha Fund - Private Placement Memorandum',
    category: 'legal',
    created: '2025-01-15',
    modified: '2025-03-20',
    status: 'final',
    format: 'pdf'
  },
  {
    id: 3,
    name: 'Investor Subscription Agreement - John Smith',
    category: 'investor',
    created: '2025-02-10',
    modified: '2025-02-10',
    status: 'final',
    format: 'pdf'
  },
  {
    id: 4,
    name: 'Investor Subscription Agreement - Jane Doe',
    category: 'investor',
    created: '2025-02-15',
    modified: '2025-02-15',
    status: 'final',
    format: 'pdf'
  },
  {
    id: 5,
    name: 'Q1 2025 Investor Report',
    category: 'reporting',
    created: '2025-04-05',
    modified: '2025-04-08',
    status: 'draft',
    format: 'docx'
  },
  {
    id: 6,
    name: 'Form ADV Part 2A - 2025',
    category: 'compliance',
    created: '2025-03-10',
    modified: '2025-03-15',
    status: 'final',
    format: 'pdf'
  }
];

const Documents = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [documentCategory, setDocumentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenTemplateDialog = () => {
    setOpenTemplateDialog(true);
  };

  const handleCloseTemplateDialog = () => {
    setOpenTemplateDialog(false);
  };

  const handleCategoryChange = (event) => {
    setDocumentCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'final':
        return 'success';
      case 'draft':
        return 'warning';
      case 'pending':
        return 'info';
      default:
        return 'default';
    }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'pdf':
        return <Description color="error" />;
      case 'docx':
        return <Description color="primary" />;
      case 'xlsx':
        return <Description color="success" />;
      default:
        return <Description />;
    }
  };

  // Filter documents based on category and search query
  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesCategory = documentCategory === 'all' || doc.category === documentCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Document Management
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<AddIcon />}
            onClick={handleOpenTemplateDialog}
            sx={{ mr: 2 }}
          >
            Use Template
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          >
            Create Document
          </Button>
        </Box>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 3,
          borderRadius: 2,
          border: '1px solid rgba(0, 0, 0, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, maxWidth: 500 }}>
          <Search sx={{ color: 'action.active', mr: 1 }} />
          <TextField
            variant="outlined"
            placeholder="Search documents..."
            size="small"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={documentCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="all">All Documents</MenuItem>
            <MenuItem value="legal">Legal</MenuItem>
            <MenuItem value="investor">Investor</MenuItem>
            <MenuItem value="reporting">Reporting</MenuItem>
            <MenuItem value="compliance">Compliance</MenuItem>
          </Select>
        </FormControl>
      </Paper>

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
            <Tab label="All Documents" />
            <Tab label="Recent" />
            <Tab label="Shared" />
          </Tabs>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Modified</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDocuments.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getFormatIcon(document.format)}
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {document.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={document.category.charAt(0).toUpperCase() + document.category.slice(1)} 
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{document.created}</TableCell>
                  <TableCell>{document.modified}</TableCell>
                  <TableCell>
                    <Chip 
                      label={document.status.charAt(0).toUpperCase() + document.status.slice(1)} 
                      color={getStatusColor(document.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <Download fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <Share fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Create Document Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Create New Document</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Document Name"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                >
                  <MenuItem value="legal">Legal</MenuItem>
                  <MenuItem value="investor">Investor</MenuItem>
                  <MenuItem value="reporting">Reporting</MenuItem>
                  <MenuItem value="compliance">Compliance</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Format</InputLabel>
                <Select
                  label="Format"
                >
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="docx">Word Document</MenuItem>
                  <MenuItem value="xlsx">Excel Spreadsheet</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Template Selection Dialog */}
      <Dialog open={openTemplateDialog} onClose={handleCloseTemplateDialog} maxWidth="md" fullWidth>
        <DialogTitle>Select Document Template</DialogTitle>
        <DialogContent>
          <List>
            {documentTemplates.map((template) => (
              <ListItem button key={template.id}>
                <ListItemIcon>
                  <FileCopy />
                </ListItemIcon>
                <ListItemText 
                  primary={template.name} 
                  secondary={template.description} 
                />
                <ListItemSecondaryAction>
                  <Chip 
                    label={template.category.charAt(0).toUpperCase() + template.category.slice(1)} 
                    size="small"
                    variant="outlined"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTemplateDialog}>Cancel</Button>
          <Button onClick={handleCloseTemplateDialog} variant="contained" color="primary">
            Use Template
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Documents;
