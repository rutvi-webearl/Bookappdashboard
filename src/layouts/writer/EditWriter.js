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
  Grid
} from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

const EditWriter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    city: '',
    state: '',
    country: '',
    gender: 'Male', // Ensure a valid initial value
    photo: '',
    status: '',
    mobile: '',
    email: ''
  });

  useEffect(() => {
    const fetchWriter = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          console.error('No auth token found in local storage');
          return;
        }

        const response = await fetch(`https://bookingreadingapp.onrender.com/api/author/profileDisplay/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
          }
        });

        if (response.ok) {
          const writerData = await response.json();
          console.log('Fetched Writer Data:', writerData);
          setFormData(writerData);
        } else {
          console.error('Failed to fetch writer data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching writer data:', error);
      }
    };

    fetchWriter();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('No auth token found in local storage');
        return;
      }

      const response = await fetch(`https://bookingreadingapp.onrender.com/api/author/editAuthor/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Writer data updated successfully');
        navigate('/writer'); // Redirect to writers list after saving
      } else {
        console.error('Failed to update writer data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating writer data:', error);
    }
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
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="DOB"
                    type="date"
                    margin="normal"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="City"
                    margin="normal"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="State"
                    margin="normal"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Country"
                    margin="normal"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={formData.gender}
                      onChange={handleChange}
                      name="gender"
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Photo"
                    margin="normal"
                    name="photo"
                    value={formData.photo}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Status"
                    margin="normal"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Mobile"
                    margin="normal"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <MDBox mt={2} display="flex" justifyContent="space-between">
                    <Button variant="contained" color="secondary" onClick={() => navigate('/writer')}>
                      Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                      Save
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

export default EditWriter;

// Example of storing the token in local storage:
localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc0MjQ5MDc0MTkwOWE0NDA4NTIwOTUiLCJpYXQiOjE3MTg5NTcwNzIsImV4cCI6MTcxODk2MDY3Mn0.iZcbnY2NgOzyvmABh51mC2QNuElR-lgcyRDrYR1d3MU');
