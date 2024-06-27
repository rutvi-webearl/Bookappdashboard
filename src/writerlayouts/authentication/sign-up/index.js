import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  Card,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import BasicLayout from "writerlayouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import MDSnackbar from "components/MDSnackbar";
import CountryStateCity from "./CountryStateCity.json";
import { Height } from "@mui/icons-material";

const AddWriter = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    city: "",
    state: "",
    country: "",
    gender: "",
    photo: null,
    status: false,
    mobile: "",
    email: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "success",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCountries(CountryStateCity);
  }, []);

  const handleInsert = async () => {
    try {
      if (!formData.name.trim()) {
        handleSnackbarOpen("Name cannot be empty.", "error");
        return;
      }
      if (!formData.email.trim()) {
        handleSnackbarOpen("Email cannot be empty.", "error");
        return;
      }
      if (!isValidEmail(formData.email)) {
        handleSnackbarOpen("Please enter a valid email.", "error");
        return;
      }
   
      if (!formData.dob) {
        handleSnackbarOpen("DOB cannot be empty.", "error");
        return;
      }
      if (!formData.country) {
        handleSnackbarOpen("Please select a Country.", "error");
        return;
      }
      if (!formData.state) {
        handleSnackbarOpen("Please select a State.", "error");
        return;
      }
      if (!formData.city) {
        handleSnackbarOpen("Please select a City.", "error");
        return;
      }
      if (!formData.gender) {
        handleSnackbarOpen("Please select Gender.", "error");
        return;
      }
      if (!formData.mobile.trim()) {
        handleSnackbarOpen("Mobile cannot be empty.", "error");
        return;
      }
      if (!isValidMobile(formData.mobile)) {
        handleSnackbarOpen(
          "Mobile number must be 10 digits long without spaces.",
          "error"
        );
        return;
      }
      
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("dob", formData.dob);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("state", formData.state);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("email", formData.email);

      if (formData.photo instanceof File) {
        formDataToSend.append("file", formData.photo, formData.photo.name);
      }

      const response = await fetch(
        "https://bookingreadingapp.onrender.com/api/author/registerAuthor",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setFormData({
        name: "",
        dob: "",
        city: "",
        state: "",
        country: "",
        gender: "",
        photo: null,
        status: false,
        mobile: "",
        email: "",
      });

      handleSnackbarOpen("Successfully signed up!", "success", true);
    } catch (error) {
      console.error("Error:", error);
      handleSnackbarOpen("An error occurred. Please try again.", "error");
    }
  };

  const handleSnackbarOpen = (message, color, navigateToSignIn = false) => {
    setSnackbar({ open: true, message, color });
    if (navigateToSignIn) {
      setTimeout(() => {
        setSnackbar({ open: false, message: "", color: "success" });
        navigate("/writer-signin");
      }, 1500);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidMobile = (mobile) => {
    return /^\d{10}$/.test(mobile);
  };

  const handleCountryChange = (event) => {
    const selectedCountryName = event.target.value;
    const selectedCountry = countries.find(
      (country) => country.name === selectedCountryName
    );
    if (selectedCountry) {
      setStates(selectedCountry.states);
      setCities([]);
      setFormData({ ...formData, country: selectedCountryName, state: "", city: "" });
    }
  };

  const handleStateChange = (event) => {
    const selectedStateName = event.target.value;
    const selectedState = states.find((state) => state.name === selectedStateName);
    if (selectedState) {
      setCities(selectedState.cities);
      setFormData({ ...formData, state: selectedStateName, city: "" });
    }
  };

  return (
    <BasicLayout
    image={bgImage}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      paddingTop: '100px', 
      paddingBottom: '-100px', 
    }}
  >
      <Card
      style={{
        width: '500px',
        marginTop: '30px', 
        marginBottom: '30px', 
        transform: 'translateX(-70px)', 
      }}
    >
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign Up
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value.trimStart() })
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="dense"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value.trim() })
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="dense"
                  id="dob"
                  label="DOB"
                  type="date"
                  fullWidth
                  value={formData.dob}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  margin="dense"
                  id="country"
                  label="Country"
                  type="text"
                  fullWidth
                  value={formData.country}
                  onChange={handleCountryChange}
                  select
                  sx={{ height: "40px", 
                    '.MuiInputBase-root': { height: '100%' }, 
                    '.MuiSelect-select': { height: '100%', display: 'flex', alignItems: 'center' } 
                  }}
            >
                  {countries.map((country) => (
                    <MenuItem key={country.name} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="dense"
                  id="state"
                  label="State"
                  type="text"
                  fullWidth
                  value={formData.state}
                  onChange={handleStateChange}
                  select
                  sx={{ height: "40px", 
                    '.MuiInputBase-root': { height: '100%' }, 
                    '.MuiSelect-select': { height: '100%', display: 'flex', alignItems: 'center' } 
                  }}
            >
                  {states.map((state) => (
                    <MenuItem key={state.name} value={state.name}>
                      {state.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="dense"
                  id="city"
                  label="City"
                  type="text"
                  fullWidth
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  select
                  sx={{ height: "40px", 
                    '.MuiInputBase-root': { height: '100%' }, 
                    '.MuiSelect-select': { height: '100%', display: 'flex', alignItems: 'center' } 
                  }}
            >
                  {cities.map((city) => (
                    <MenuItem key={city.name} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={100}>
                <TextField
                  margin="dense"
                  id="gender"
                  label="Gender"
                  select
                  fullWidth
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  sx={{ height: "40px", 
                    '.MuiInputBase-root': { height: '100%' }, 
                    '.MuiSelect-select': { height: '100%', display: 'flex', alignItems: 'center' } 
                  }}
            >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={ <Checkbox
                    checked={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.checked })
                    }
                    color="primary"
                  />
                }
                label="Status"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="photo"
                label="Photo"
                type="file"
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setFormData({ ...formData, photo: e.target.files[0] })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="mobile"
                label="Mobile"
                type="text"
                fullWidth
                value={formData.mobile}
                inputProps={{ maxLength: 10 }}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <MDBox mt={3} display="flex" justifyContent="space-between">
                <Button onClick={() => navigate("/writer-signup")}>Cancel</Button>
                <Button
                  onClick={handleInsert}
                  color="primary"
                  variant="contained"
                  style={{ color: "white" }}
                >
                  Sign Up
                </Button>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
    <MDSnackbar
      color={snackbar.color}
      icon="notifications"
      title="Sign Up"
      content={snackbar.message}
      open={snackbar.open}
      onClose={handleSnackbarClose}
      close={handleSnackbarClose}
      bgWhite
    />
  </BasicLayout>
);
};

export default AddWriter;


