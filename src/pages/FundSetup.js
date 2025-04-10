import React, { useState } from 'react';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Typography, 
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  Alert
} from '@mui/material';

const steps = [
  'Fund Structure',
  'Legal & Compliance',
  'Banking Setup',
  'Fee Structure',
  'Review & Launch'
];

const FundSetup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [fundData, setFundData] = useState({
    fundName: '',
    fundType: '',
    fundStrategy: '',
    minInvestment: '',
    targetAUM: '',
    legalStructure: 'llc',
    jurisdiction: 'delaware',
    complianceLevel: 'exempt',
    bankName: '',
    bankAccountType: '',
    managementFee: '2',
    performanceFee: '20',
    hurdleRate: '0',
    lockupPeriod: '12',
    termsAccepted: false
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFundData({
      ...fundData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Fund Structure
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Define the basic structure and strategy of your fund.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Fund Name"
                  name="fundName"
                  value={fundData.fundName}
                  onChange={handleChange}
                  helperText="Choose a professional name that reflects your strategy"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Fund Type</InputLabel>
                  <Select
                    name="fundType"
                    value={fundData.fundType}
                    onChange={handleChange}
                    label="Fund Type"
                  >
                    <MenuItem value="hedge">Hedge Fund</MenuItem>
                    <MenuItem value="venture">Venture Capital</MenuItem>
                    <MenuItem value="private_equity">Private Equity</MenuItem>
                    <MenuItem value="real_estate">Real Estate</MenuItem>
                    <MenuItem value="crypto">Crypto Fund</MenuItem>
                  </Select>
                  <FormHelperText>Select the type of fund you want to create</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Fund Strategy</InputLabel>
                  <Select
                    name="fundStrategy"
                    value={fundData.fundStrategy}
                    onChange={handleChange}
                    label="Fund Strategy"
                  >
                    <MenuItem value="long_short">Long/Short Equity</MenuItem>
                    <MenuItem value="market_neutral">Market Neutral</MenuItem>
                    <MenuItem value="global_macro">Global Macro</MenuItem>
                    <MenuItem value="event_driven">Event Driven</MenuItem>
                    <MenuItem value="quant">Quantitative</MenuItem>
                    <MenuItem value="multi_strategy">Multi-Strategy</MenuItem>
                  </Select>
                  <FormHelperText>Select your primary investment strategy</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Minimum Investment"
                  name="minInvestment"
                  value={fundData.minInvestment}
                  onChange={handleChange}
                  helperText="Minimum amount an investor can contribute (e.g., $100,000)"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Target AUM"
                  name="targetAUM"
                  value={fundData.targetAUM}
                  onChange={handleChange}
                  helperText="Target assets under management (e.g., $5,000,000)"
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Legal & Compliance
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Set up the legal structure and compliance requirements for your fund.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography variant="subtitle2" gutterBottom>
                    Legal Structure
                  </Typography>
                  <RadioGroup
                    name="legalStructure"
                    value={fundData.legalStructure}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="llc" control={<Radio />} label="Limited Liability Company (LLC)" />
                    <FormControlLabel value="lp" control={<Radio />} label="Limited Partnership (LP)" />
                    <FormControlLabel value="statutory" control={<Radio />} label="Statutory Trust" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Jurisdiction</InputLabel>
                  <Select
                    name="jurisdiction"
                    value={fundData.jurisdiction}
                    onChange={handleChange}
                    label="Jurisdiction"
                  >
                    <MenuItem value="delaware">Delaware</MenuItem>
                    <MenuItem value="cayman">Cayman Islands</MenuItem>
                    <MenuItem value="bermuda">Bermuda</MenuItem>
                    <MenuItem value="bvi">British Virgin Islands</MenuItem>
                  </Select>
                  <FormHelperText>Select the jurisdiction for your fund entity</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography variant="subtitle2" gutterBottom>
                    Regulatory Status
                  </Typography>
                  <RadioGroup
                    name="complianceLevel"
                    value={fundData.complianceLevel}
                    onChange={handleChange}
                  >
                    <FormControlLabel 
                      value="exempt" 
                      control={<Radio />} 
                      label="Exempt Reporting Adviser (ERA)" 
                    />
                    <FormControlLabel 
                      value="registered" 
                      control={<Radio />} 
                      label="Registered Investment Adviser (RIA)" 
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Alert severity="info">
                  Most new fund managers can start as Exempt Reporting Advisers, which has lower regulatory requirements.
                </Alert>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Banking Setup
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Set up the banking and financial infrastructure for your fund.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  name="bankName"
                  value={fundData.bankName}
                  onChange={handleChange}
                  helperText="Select a bank that specializes in fund services"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Bank Account Type</InputLabel>
                  <Select
                    name="bankAccountType"
                    value={fundData.bankAccountType}
                    onChange={handleChange}
                    label="Bank Account Type"
                  >
                    <MenuItem value="business">Business Checking</MenuItem>
                    <MenuItem value="custody">Custody Account</MenuItem>
                    <MenuItem value="escrow">Escrow Account</MenuItem>
                  </Select>
                  <FormHelperText>Select the type of bank account for your fund</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Alert severity="info">
                  We recommend working with banks that have experience with investment funds. 
                  Popular options include Silicon Valley Bank, First Republic, and Mercury.
                </Alert>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Required Documents for Banking Setup:
                </Typography>
                <ul>
                  <li>Articles of Organization/Formation</li>
                  <li>Operating Agreement</li>
                  <li>EIN Confirmation Letter</li>
                  <li>Fund Manager ID and Proof of Address</li>
                </ul>
              </Grid>
            </Grid>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Fee Structure
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Define the fee structure for your fund.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Management Fee (%)"
                  name="managementFee"
                  type="number"
                  value={fundData.managementFee}
                  onChange={handleChange}
                  helperText="Annual fee as a percentage of assets under management"
                  InputProps={{
                    endAdornment: '%'
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Performance Fee (%)"
                  name="performanceFee"
                  type="number"
                  value={fundData.performanceFee}
                  onChange={handleChange}
                  helperText="Fee on profits above the hurdle rate"
                  InputProps={{
                    endAdornment: '%'
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Hurdle Rate (%)"
                  name="hurdleRate"
                  type="number"
                  value={fundData.hurdleRate}
                  onChange={handleChange}
                  helperText="Minimum return before performance fees apply"
                  InputProps={{
                    endAdornment: '%'
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Lockup Period (months)"
                  name="lockupPeriod"
                  type="number"
                  value={fundData.lockupPeriod}
                  onChange={handleChange}
                  helperText="Period during which investors cannot withdraw"
                />
              </Grid>
              <Grid item xs={12}>
                <Alert severity="info">
                  The traditional hedge fund fee structure is "2 and 20" (2% management fee and 20% performance fee),
                  but emerging managers often offer more competitive terms to attract initial investors.
                </Alert>
              </Grid>
            </Grid>
          </Box>
        );
      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review & Launch
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Review your fund setup and prepare for launch.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>Fund Information</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Fund Name:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{fundData.fundName || 'Not specified'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Fund Type:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{fundData.fundType || 'Not specified'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Strategy:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{fundData.fundStrategy || 'Not specified'}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
                
                <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>Legal Structure</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Entity Type:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {fundData.legalStructure === 'llc' ? 'Limited Liability Company (LLC)' : 
                         fundData.legalStructure === 'lp' ? 'Limited Partnership (LP)' : 
                         'Statutory Trust'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Jurisdiction:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {fundData.jurisdiction === 'delaware' ? 'Delaware' :
                         fundData.jurisdiction === 'cayman' ? 'Cayman Islands' :
                         fundData.jurisdiction === 'bermuda' ? 'Bermuda' : 
                         'British Virgin Islands'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Regulatory Status:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {fundData.complianceLevel === 'exempt' ? 'Exempt Reporting Adviser (ERA)' : 
                         'Registered Investment Adviser (RIA)'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
                
                <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>Fee Structure</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Management Fee:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{fundData.managementFee}%</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Performance Fee:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{fundData.performanceFee}%</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Hurdle Rate:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{fundData.hurdleRate}%</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Lockup Period:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{fundData.lockupPeriod} months</Typography>
                    </Grid>
                  </Grid>
                </Paper>
                
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={fundData.termsAccepted} 
                      onChange={handleChange} 
                      name="termsAccepted" 
                    />
                  }
                  label="I confirm that all information provided is accurate and I'm ready to proceed with fund setup"
                />
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          border: '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <Typography variant="h5" gutterBottom>
          Fund Setup Wizard
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Follow these steps to set up your investment fund with proper structure, compliance, and operations.
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
      
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          borderRadius: 2,
          border: '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        {activeStep === steps.length ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Congratulations! Your fund setup is complete.
            </Typography>
            <Typography paragraph>
              Your fund has been successfully configured. Our team will review your information and reach out with next steps.
            </Typography>
            <Button onClick={handleReset} variant="outlined">
              Set Up Another Fund
            </Button>
          </Box>
        ) : (
          <Box>
            {getStepContent(activeStep)}
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1 && !fundData.termsAccepted}
              >
                {activeStep === steps.length - 1 ? 'Launch Fund' : 'Next'}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default FundSetup;
