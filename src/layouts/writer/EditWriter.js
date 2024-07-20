

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  Grid,
  Box
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

const EditWriter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    city: '',
    state: '',
    country: '',
    gender: '',
    file: null,
    status: 'active', // Changed from boolean to string with dropdown values
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
    const fetchWriter = async () => {
      try {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          console.error('No auth token found in local storage');
          return;
        }

        const response = await fetch(`https://bookreading-app.onrender.com/api/author/profileDisplay/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
          }
        });

        if (response.ok) {
          const writerData = await response.json();
          console.log('Fetched Writer Data:', writerData);
          setFormData({
            ...writerData,
            file: writerData.photo ? { name: writerData.photo } : null // Assume 'photo' is the filename string
          });
          if (writerData.country) {
            const selectedCountry = CountryStateCity.find(
              (country) => country.name === writerData.country
            );
            if (selectedCountry) {
              setStatesArray(selectedCountry.states);
              if (writerData.state) {
                const selectedState = selectedCountry.states.find(
                  (state) => state.name === writerData.state
                );
                if (selectedState && selectedState.cities) {
                  setCitiesArray(selectedState.cities);
                }
              }
            }
          }
        } else {
          console.error('Failed to fetch writer data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching writer data:', error);
      }
    };

    fetchWriter();
  }, [id]);

  useEffect(() => {
    // Initialize countries array from CountryStateCity.json
    setCountriesArray(CountryStateCity.map(country => country.name));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== 'name') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  
    if (name === 'country') {
      const selectedCountry = CountryStateCity.find((country) => country.name === value);
      if (selectedCountry) {
        setStatesArray(selectedCountry.states);
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
        setCitiesArray(selectedState.cities);
        setFormData((prevState) => ({
          ...prevState,
          city: '',
        }));
      }
    }
  };

  const handleSave = async () => {
    try {
      // Check if any required field is empty
      const requiredFields = ['name', 'dob', 'country', 'state', 'city', 'gender', 'mobile', 'email'];
      for (const field of requiredFields) {
        if (!formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())) {
          setSnackbarMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
          setSnackbarColor('error');
          setSnackbarOpen(true);
          return;
        }
      }
  
      // Validate email format
      if (!validateEmail(formData.email)) {
        setSnackbarMessage('Invalid email format');
        setSnackbarColor('error');
        setSnackbarOpen(true);
        return;
      }
  
      // Validate mobile number format
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
  
      // Create a FormData object to handle file upload
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
  
      const response = await fetch(`https://bookreading-app.onrender.com/api/author/editAuthor/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': authToken
        },
        body: data
      });
  
      if (response.ok) {
        console.log('Writer data updated successfully');
        setSnackbarMessage('Updated successfully');
        setSnackbarColor('success');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/writer'), 2000); // Redirect after 2 seconds
      } else {
        console.error('Failed to update writer data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating writer data:', error);
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
    const files = e.target.files[0];
    if (files) {
      setFormData({ ...formData, file: files });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const handleFileChange = () => {
    document.getElementById('fileInput').click();
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
                  Edit Writer
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
                          inputProps={{ id: 'country-select' }}
                        >
                          {countriesArray.map((country, index) => (
                            <MenuItem key={index} value={country}>
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
                          label="State"
                          inputProps={{ id: 'state-select' }}
                        >
                          {statesArray.map((state, index) => (
                            <MenuItem key={index} value={state.name}>
                              {state.name}
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
                          label="City"
                          inputProps={{ id: 'city-select' }}
                        >
                          {citiesArray.map((city, index) => (
                            <MenuItem key={index} value={city.name}>
                              {city.name}
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
                  <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="status-select">Status</InputLabel>
                    <Select
                      value={formData.status}
                      onChange={handleChange}
                      name="status"
                      inputProps={{ id: 'status-select' }}
                      variant="outlined"
                      style={{ height: "40px" }}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                  <input
                    type="file"
                    name="photo"
                    onChange={handlePhotoChange}
                    accept="image/*"
                  />
                  {/* <FormControl fullWidth margin="normal">
                  <input
                    type="file"
                    onChange={handlePhotoChange}
                    style={{ display: 'none' }}
                    id="fileInput"
                  />
                  <label htmlFor="fileInput">
                    <MDButton
                      component="span"
                      variant="contained"
                      color="info"
                      style={{ height: "30px", backgroundColor: "#1976d2", color: "#fff" }} // Adjusted height and color to match 'primary' color
                    >
                      Change Photo
                    </MDButton>
                  </label> */}
                  {/* <span style={{ marginLeft: '10px', lineHeight: '30px' }}>
                    {formData.file ? (
                      formData.file.name.length > 20 ? (
                        `${formData.file.name.substring(0, 20)}...`
                      ) : (
                        formData.file.name
                      )
                    ) : (
                      'No file chosen'
                    )}
                  </span> */}
                {/* </FormControl> */}
                <MDBox mt={2} display="flex" justifyContent="space-between">
                   <MDButton
                      variant="gradient"
                      color={sidenavColor}
                      onClick={() => navigate('/writer')}
                      
                    >
                      Cancel
                    </MDButton>
                    <MDButton
                      variant="gradient"
                      color={sidenavColor}
                      onClick={handleSave}
                      
                    >
                      Save
                    </MDButton>
                  </MDBox>
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
              title="Notification"
              content={snackbarMessage}
              open={snackbarOpen}
              onClose={handleSnackbarClose}
              close={() => setSnackbarOpen(false)}
              bgWhite
      />
    </DashboardLayout>
  );
};

export default EditWriter;
