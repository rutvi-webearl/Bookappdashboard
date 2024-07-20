
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  Grid
} from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import CountryStateCity from './CountryStateCity.json';
import MDSnackbar from 'components/MDSnackbar';
import { useMaterialUIController } from 'context';
import MDButton from 'components/MDButton';

const AddWriter = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    city: '',
    state: '',
    country: '',
    gender: '',
    file: null,
    status: true,
    mobile: '',
    email: ''
  });
  const [countriesArray, setCountriesArray] = useState([]);
  const [statesArray, setStatesArray] = useState([]);
  const [citiesArray, setCitiesArray] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('info');

  const [controller] = useMaterialUIController();
  const { sidenavColor } = controller;

  useEffect(() => {
    setCountriesArray(CountryStateCity.map(country => country.name));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'country') {
      const selectedCountry = CountryStateCity.find((country) => country.name === value);
      if (selectedCountry) {
        setStatesArray(selectedCountry.states.map(state => state.name));
        setCitiesArray([]);
        setFormData((prevState) => ({
          ...prevState,
          state: '',
          city: '',
        }));
      }
    }

    if (name === 'state') {
      const selectedCountry = CountryStateCity.find((country) => country.name === formData.country);
      const selectedState = selectedCountry?.states.find((state) => state.name === value);
      if (selectedState) {
        setCitiesArray(selectedState.cities.map(city => city.name));
        setFormData((prevState) => ({
          ...prevState,
          city: '',
        }));
      }
    }
  };

  const handleInsert = async () => {
    const requiredFields = ['name', 'dob', 'country', 'state', 'city', 'gender', 'mobile', 'email', 'file'];
    for (const field of requiredFields) {
      if (!formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())) {
        setSnackbarMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        setSnackbarColor('error');
        setSnackbarOpen(true);
        return;
      }
    }

    if (!validateEmail(formData.email)) {
      setSnackbarMessage('Invalid email format');
      setSnackbarColor('error');
      setSnackbarOpen(true);
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      setSnackbarMessage('Mobile number should be exactly 10 digits');
      setSnackbarColor('error');
      setSnackbarOpen(true);
      return;
    }

    const authToken = localStorage.getItem('token');
    if (!authToken) {
      console.error('No auth token found in local storage');
      return;
    }

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const response = await fetch('https://bookreading-app.onrender.com/api/author/registerAuthor', {
        method: 'POST',
        headers: {
          'Authorization': authToken
        },
        body: data
      });

      if (response.ok) {
        console.log('Writer added successfully');
        setSnackbarMessage('Writer added successfully');
        setSnackbarColor('success');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/writer'), 2000);
      } else {
        const errorData = await response.json();
        setSnackbarMessage(`Failed to add writer: ${errorData.message}`);
        setSnackbarColor('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error adding writer:', error);
      setSnackbarMessage('An error occurred while adding the writer');
      setSnackbarColor('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    if (value.startsWith(' ')) {
      setSnackbarOpen(true);
      setSnackbarMessage('Name should not start with a space');
      setSnackbarColor('error');
    } else {
      setFormData({ ...formData, name: value });
    }
  };

  const handleMobileChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setFormData({ ...formData, mobile: value });
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage('Mobile number should be exactly 10 digits');
      setSnackbarColor('error');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file: file });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card>
              <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                <MDTypography variant="h6" color="white">
                  Add Writer
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <form>
                  <TextField
                    fullWidth
                    label="Name"
                    margin="normal"
                    name="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="DOB"
                    type="date"
                    margin="normal"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel htmlFor="country-select">Country</InputLabel>
                        <Select
                          style={{ height: "40px" }}
                          value={formData.country}
                          onChange={handleChange}
                          name="country"
                          label="Country"
                          inputProps={{ id: 'country-select', }}
                        >
                          {countriesArray.map((country) => (
                            <MenuItem key={country} value={country}>
                              {country}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel htmlFor="state-select">State</InputLabel>
                        <Select
                          style={{ height: "40px" }}
                          value={formData.state}
                          onChange={handleChange}
                          name="state"
                          disabled={!formData.country}
                          label="State"
                          inputProps={{
                            id: 'state-select',
                          }}

                        >
                          {statesArray.map((state) => (
                            <MenuItem key={state} value={state}>
                              {state}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel htmlFor="city-select">City</InputLabel>
                        <Select
                          style={{ height: "40px" }}
                          value={formData.city}
                          onChange={handleChange}
                          name="city"
                          disabled={!formData.state}
                          label="City"
                          inputProps={{
                            id: 'city-select',
                          }}

                        >
                          {citiesArray.map((city) => (
                            <MenuItem key={city} value={city}>
                              {city}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel htmlFor="gender-select">Gender</InputLabel>
                    <Select
                      style={{ height: "40px" }}
                      value={formData.gender}
                      onChange={handleChange}
                      name="gender"
                      label="Gender"
                      inputProps={{ id: 'gender-select' }}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel htmlFor="status-select">Status</InputLabel>
                    <Select
                    style={{ height: "40px" }}
                    value={formData.status}
                    onChange={handleChange}
                    name="status"
                    label="Status"
                    inputProps={{ id: 'status-select' }}
                    >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                  <input
                    type="file"
                    onChange={handlePhotoChange}
                    accept="image/*"
                    style={{ display: 'block', margin: '20px 0' }}
                  />
                  <TextField
                    fullWidth
                    label="Mobile"
                    margin="normal"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleMobileChange}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  <Grid container justifyContent="flex-end">
                    <Grid item xs={3}>
                      <MDButton
                        variant="contained"
                        color={sidenavColor}
                        onClick={handleInsert}
                        fullWidth
                        sx={{
                          mt: 2,
                          height: "40px",
                          backgroundColor: '#2196f3',
                          '&:hover': {
                            backgroundColor: '#1976d2',
                          },
                        }}
                      >
                        Save
                      </MDButton>
                    </Grid>
                  </Grid>
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <MDSnackbar
        color={snackbarColor}
        icon="notifications"
        title="Author Registration"
        content={snackbarMessage}
        dateTime=""
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        close={() => setSnackbarOpen(false)}
        bgWhite
      />
    </DashboardLayout>
  );
};

export default AddWriter;

