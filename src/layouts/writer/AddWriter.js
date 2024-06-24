import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Grid,
  Card,
  MenuItem
} from '@mui/material';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

const AddWriter = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    city: '',
    state: '',
    country: '',
    gender: '',
    photo: '',
    status: '',
    mobile: '',
    email: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    dob: '',
    city: '',
    state: '',
    country: '',
    gender: '',
    photo: '',
    status: '',
    mobile: '',
    email: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    // Name validation (only alphabets)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    } else if (!/^[a-zA-Z]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name should only contain alphabetic characters';
      valid = false;
    } else {
      newErrors.name = '';
    }

    // DOB validation
    if (!formData.dob.trim()) {
      newErrors.dob = 'Date of Birth is required';
      valid = false;
    } else {
      newErrors.dob = '';
    }

    // City validation (only alphabets)
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    } else if (!/^[a-zA-Z]+$/.test(formData.city.trim())) {
      newErrors.city = 'City should only contain alphabetic characters';
      valid = false;
    } else {
      newErrors.city = '';
    }

    // State validation (only alphabets)
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
      valid = false;
    } else if (!/^[a-zA-Z]+$/.test(formData.state.trim())) {
      newErrors.state = 'State should only contain alphabetic characters';
      valid = false;
    } else {
      newErrors.state = '';
    }

    // Country validation (only alphabets)
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
      valid = false;
    } else if (!/^[a-zA-Z]+$/.test(formData.country.trim())) {
      newErrors.country = 'Country should only contain alphabetic characters';
      valid = false;
    } else {
      newErrors.country = '';
    }

    // Gender validation
    if (!formData.gender.trim()) {
      newErrors.gender = 'Gender is required';
      valid = false;
    } else if (!['Male', 'Female', 'Other'].includes(formData.gender.trim())) {
      newErrors.gender = 'Invalid gender selection';
      valid = false;
    } else {
      newErrors.gender = '';
    }

    // Photo validation
    if (!formData.photo.trim()) {
      newErrors.photo = 'Photo is required';
      valid = false;
    } else {
      newErrors.photo = '';
    }

    // Status validation
    if (!formData.status.trim()) {
      newErrors.status = 'Status is required';
      valid = false;
    } else if (!['active', 'inactive'].includes(formData.status.trim().toLowerCase())) {
      newErrors.status = 'Status should be active or inactive';
      valid = false;
    } else {
      newErrors.status = '';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Email is invalid';
      valid = false;
    } else {
      newErrors.email = '';
    }

    // Mobile validation (exactly 10 digits)
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile is required';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'Mobile should be exactly 10 digits';
      valid = false;
    } else {
      newErrors.mobile = '';
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleInsert = async () => {
    if (validateForm()) {
      try {
        const response = await fetch('https://bookingreadingapp.onrender.com/api/author/registerAuthor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        console.log('Success:', response);
        navigate('/');

      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Add Writer
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <form>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                  />
                  <TextField
                    margin="dense"
                    id="dob"
                    label="DOB"
                    type="date"
                    fullWidth
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    error={!!formErrors.dob}
                    helperText={formErrors.dob}
                  />
                  <TextField
                    margin="dense"
                    id="city"
                    label="City"
                    type="text"
                    fullWidth
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    error={!!formErrors.city}
                    helperText={formErrors.city}
                  />
                  <TextField
                    margin="dense"
                    id="state"
                    label="State"
                    type="text"
                    fullWidth
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    error={!!formErrors.state}
                    helperText={formErrors.state}
                  />
                  <TextField
                    margin="dense"
                    id="country"
                    label="Country"
                    type="text"
                    fullWidth
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    error={!!formErrors.country}
                    helperText={formErrors.country}
                  />
                  <TextField
                    margin="dense"
                    id="gender"
                    label="Gender"
                    select
                    fullWidth
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    error={!!formErrors.gender}
                    helperText={formErrors.gender}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                  <TextField
                    margin="dense"
                    id="photo"
                    label="Photo"
                    type="file"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      readOnly: true,
                      onClick: (e) => { e.target.value = null }
                    }}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.files[0]?.name || '' })}
                    error={!!formErrors.photo}
                    helperText={formErrors.photo}
                  />
                  <TextField
                    margin="dense"
                    id="status"
                    label="Status"
                    type="text"
                    fullWidth
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    error={!!formErrors.status}
                    helperText={formErrors.status}
                  />
                  <TextField
                    margin="dense"
                    id="mobile"
                    label="Mobile"
                    type="text"
                    fullWidth
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    error={!!formErrors.mobile}
                    helperText={formErrors.mobile}
                  />
                  <TextField
                    margin="dense"
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                  />
                  <MDBox mt={3}>
                    <Button onClick={() => navigate('/writer')}>Cancel</Button>
                    <Button onClick={handleInsert} color="primary">
                      Ok
                    </Button>
                  </MDBox>
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default AddWriter;
