// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Button,
//   TextField,
//   Grid,
//   Card,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   Checkbox,
//   FormControlLabel
// } from '@mui/material';
// import CountryStateCityData from './CountryStateCity.json'; // Adjust the path based on your folder structure

// import MDBox from 'components/MDBox';
// import MDTypography from 'components/MDTypography';
// import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
// import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
// import Footer from 'examples/Footer';
// import { useMaterialUIController } from 'context';
// import MDButton from 'components/MDButton';

// const AddWriter = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     dob: '',
//     city: '',
//     state: '',
//     country: '',
//     gender: '',
//     photo: null,
//     status: false,
//     mobile: '',
//     email: ''
//   });

//   const [formErrors, setFormErrors] = useState({
//     name: '',
//     dob: '',
//     city: '',
//     state: '',
//     country: '',
//     gender: '',
//     photo: '',
//     status: '',
//     mobile: '',
//     email: ''
//   });

//   const [countriesArray, setCountriesArray] = useState([]);
//   const [statesArray, setStatesArray] = useState([]);
//   const [citiesArray, setCitiesArray] = useState([]);

//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//   const [snackbarDuration, setSnackbarDuration] = useState(3000);

//   const [controller] = useMaterialUIController();
//   const { sidenavColor } = controller;

//   useEffect(() => {
//     // Initialize countries array from CountryStateCityData
//     if (CountryStateCityData && Array.isArray(CountryStateCityData)) {
//       setCountriesArray(CountryStateCityData.map(country => country.name));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === 'checkbox' ? checked : value;

//     // Update form data based on input change
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: newValue,
//     }));

//     // Clear previous error for the field
//     setFormErrors((prevState) => ({
//       ...prevState,
//       [name]: '',
//     }));

//     // Handle dynamic population of states and cities based on selected country and state
//     if (name === 'country') {
//       const selectedCountry = CountryStateCityData.find((country) => country.name === value);
//       if (selectedCountry) {
//         setStatesArray(selectedCountry.states || []);
//         setCitiesArray([]);
//         setFormData((prevState) => ({
//           ...prevState,
//           state: '',
//           city: '',
//         }));
//       }
//     }

//     if (name === 'state') {
//       const selectedCountry = CountryStateCityData.find((country) => country.name === formData.country);
//       const selectedState = selectedCountry?.states.find((state) => state.name === value);
//       if (selectedState) {
//         setCitiesArray(selectedState.cities || []);
//         setFormData((prevState) => ({
//           ...prevState,
//           city: '',
//         }));
//       }
//     }

//     // Example: Validation logic for each field
//     switch (name) {
//       case 'name':
//         if (!value.trim()) {
//           setFormErrors((prevState) => ({
//             ...prevState,
//             [name]: 'Name cannot be empty.',
//           }));
//         }
//         break;
//       case 'dob':
//         if (!value) {
//           setFormErrors((prevState) => ({
//             ...prevState,
//             [name]: 'DOB cannot be empty.',
//           }));
//         }
//         break;
//       case 'email':
//         if (!value.trim()) {
//           setFormErrors((prevState) => ({
//             ...prevState,
//             [name]: 'Email cannot be empty.',
//           }));
//         } else if (!isValidEmail(value)) {
//           setFormErrors((prevState) => ({
//             ...prevState,
//             [name]: 'Please enter a valid email.',
//           }));
//         }
//         break;
//       case 'country':
//         if (!value) {
//           setFormErrors((prevState) => ({
//             ...prevState,
//             [name]: 'Please select a Country.',
//           }));
//         }
//         break;
//       case 'state':
//         if (!value) {
//           setFormErrors((prevState) => ({
//             ...prevState,
//             [name]: 'Please select a State.',
//           }));
//         }
//         break;
//       case 'city':
//         if (!value) {
//           setFormErrors((prevState) => ({
//             ...prevState,
//             [name]: 'Please select a City.',
//           }));
//         }
//         break;
//       case 'gender':
//         if (!value) {
//           setFormErrors((prevState) => ({
//             ...prevState,
//             [name]: 'Please select Gender.',
//           }));
//         }
//         break;
//       case 'mobile':
//         if (!value.trim()) {
//           setFormErrors((prevState) => ({
//             ...prevState,
//             [name]: 'Mobile cannot be empty.',
//           }));
//         } else if (!isValidMobile(value)) {
//           setFormErrors((prevState) => ({
//             ...prevState,
//             [name]: 'Mobile number must be 10 digits long without spaces.',
//           }));
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   const handleInsert = async () => {
//     try {
//       // Check for form errors before proceeding
//       for (const key in formErrors) {
//         if (formErrors[key]) {
//           handleSnackbarOpen(formErrors[key], 'error');
//           return;
//         }
//       }

//       const formDataToSend = new FormData();
//       formDataToSend.append("name", formData.name);
//       formDataToSend.append("dob", formData.dob);
//       formDataToSend.append("city", formData.city);
//       formDataToSend.append("state", formData.state);
//       formDataToSend.append("country", formData.country);
//       formDataToSend.append("gender", formData.gender);
//       formDataToSend.append("status", formData.status);
//       formDataToSend.append("mobile", formData.mobile);
//       formDataToSend.append("email", formData.email);

//       if (formData.photo instanceof File) {
//         formDataToSend.append("file", formData.photo, formData.photo.name);
//       }

//       const response = await fetch(
//         "https://bookingreadingapp.onrender.com/api/author/registerAuthor",
//         {
//           method: "POST",
//           headers: {
//             'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk1NTc2OTYsImV4cCI6MTcyMDQyMTY5Nn0.WtsuE8Q43EDivE2xz51IroDiQoz022DK2yY73nL099I",
//           },
//           body: formDataToSend,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       setFormData({
//         name: "",
//         dob: "",
//         city: "",
//         state: "",
//         country: "",
//         gender: "",
//         photo: null,
//         status: false,
//         mobile: "",
//         email: "",
//       });

//       handleSnackbarOpen("Successfully registered!", "success", true);
//       navigate('/writer');
//     } catch (error) {
//       console.error("Error:", error);
//       handleSnackbarOpen("An error occurred. Please try again.", "error");
//     }
//   };

//   const handleSnackbarOpen = (message, severity) => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//   };

//   // Function to validate email format
//   const isValidEmail = (email) => {
//     // Regular expression for basic email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // Function to validate mobile number format
//   const isValidMobile = (mobile) => {
//     // Regular expression for basic mobile number validation (adjust as per your requirements)
//     const mobileRegex = /^[0-9]{10}$/;
//     return mobileRegex.test(mobile);
//   };

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     setFormData((prevState) => ({
//       ...prevState,
//       photo: file,
//     }));
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox pt={6} pb={3}>
//         <Grid container spacing={6}>
//           <Grid item xs={12}>
//             <Card>
//               <MDBox
//                 mx={2}
//                 mt={-3}
//                 py={3}
//                 px={2}
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//               >
//                 <MDTypography variant="h6" color="white">
//                   Add Writer
//                 </MDTypography>
//               </MDBox>
//               <MDBox p={3}>
//                 <form>
//                   <TextField
//                     autoFocus
//                     required
//                     margin="dense"
//                     id="name"
//                     name="name"
//                     label="Name"
//                     type="text"
//                     fullWidth
//                     value={formData.name}
//                     onChange={handleChange}
//                     error={!!formErrors.name}
//                     helperText={formErrors.name}
//                   />
//                   <TextField
//                     margin="dense"
//                     id="dob"
//                     name="dob"
//                     label="DOB"
//                     type="date"
//                     fullWidth
//                     value={formData.dob}
//                     onChange={handleChange}
//                     InputLabelProps={{ shrink: true }}
//                     error={!!formErrors.dob}
//                     helperText={formErrors.dob}
//                   />
//                   <FormControl fullWidth margin="dense">
//                     <InputLabel>Country</InputLabel>
//                     <Select
//                       value={formData.country}
//                       style={{ height: "40px" }}
//                       onChange={handleChange}
//                       name="country"
//                       error={!!formErrors.country}
//                       fullWidth
//                     >
//                       {countriesArray.map((country) => (
//                         <MenuItem key={country} value={country}>
//                           {country}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                     {formErrors.country && (
//                       <MDTypography variant="caption" color="error">
//                         {formErrors.country}
//                       </MDTypography>
//                     )}
//                   </FormControl>
//                   <FormControl fullWidth margin="dense">
//                     <InputLabel>State</InputLabel>
//                     <Select
//                       value={formData.state}
//                       style={{ height: "40px" }}
//                       onChange={handleChange}
//                       name="state"
//                       disabled={!formData.country}
//                       error={!!formErrors.state}
//                       fullWidth
//                     >
//                       {statesArray.map((state) => (
//                         <MenuItem key={state.name} value={state.name}>
//                           {state.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                     {formErrors.state && (
//                       <MDTypography variant="caption" color="error">
//                         {formErrors.state}
//                       </MDTypography>
//                     )}
//                   </FormControl>
//                   <FormControl fullWidth margin="dense">
//                     <InputLabel>City</InputLabel>
//                     <Select
//                       value={formData.city}
//                       style={{ height: "40px" }}
//                       onChange={handleChange}
//                       name="city"
//                       disabled={!formData.state}
//                       error={!!formErrors.city}
//                       fullWidth
//                     >
//                       {citiesArray.map((city) => (
//                         <MenuItem key={city.name} value={city.name}>
//                           {city.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                     {formErrors.city && (
//                       <MDTypography variant="caption" color="error">
//                         {formErrors.city}
//                       </MDTypography>
//                     )}
//                   </FormControl>
//                   <FormControl fullWidth margin="dense">
//                     <InputLabel>Gender</InputLabel>
//                     <Select
//                       style={{ height: "40px" }}
//                       value={formData.gender}
//                       onChange={handleChange}
//                       name="gender"
//                       error={!!formErrors.gender}
//                       fullWidth
//                     >
//                       <MenuItem value="Male">Male</MenuItem>
//                       <MenuItem value="Female">Female</MenuItem>
//                       <MenuItem value="Other">Other</MenuItem>
//                     </Select>
//                     {formErrors.gender && (
//                       <MDTypography variant="caption" color="error">
//                         {formErrors.gender}
//                       </MDTypography>
//                     )}
//                   </FormControl>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={formData.status}
//                         onChange={handleChange}
//                         name="status"
//                         color="primary"
//                       />
//                     }
//                     label="Status"
//                   />
//                   <input
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                     id="photo-upload"
//                     type="file"
//                     onChange={handlePhotoUpload}                 
//                   />
//                   <label htmlFor="photo-upload">
//                     <MDButton variant="gradient" color={sidenavColor} component="span">
//                       Upload Photo
//                     </MDButton>
//                   </label>
//                   {formData.photo && <p>{formData.photo.name}</p>}
//                   <TextField
//                     margin="dense"
//                     id="mobile"
//                     name="mobile"
//                     label="Mobile"
//                     type="text"
//                     fullWidth
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     error={!!formErrors.mobile}
//                     helperText={formErrors.mobile}
//                   />
//                   <TextField
//                     margin="dense"
//                     id="email"
//                     name="email"
//                     label="Email"
//                     type="email"
//                     fullWidth
//                     value={formData.email}
//                     onChange={handleChange}
//                     error={!!formErrors.email}
//                     helperText={formErrors.email}
//                   />
//                   <MDBox mt={3}>
//                     <Button onClick={() => navigate('/writer')}>Cancel</Button>
//                     <Button onClick={handleInsert} color="primary">
//                       Ok
//                     </Button>
//                   </MDBox>
//                 </form>
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// };

// export default AddWriter;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [controller] = useMaterialUIController();
  const { sidenavColor } = controller;

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

  const handleInsert = async () => {
    if (isSubmitting) {
      return;
    }
    try {
      setIsSubmitting(true);
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
  
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
  
      const response = await fetch('https://bookingreadingapp.onrender.com/api/author/registerAuthor', {
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
        console.error('Failed to add writer:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding writer:', error);
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
                  {/* <TextField
                    fullWidth
                    label="DOB"
                    type="date"
                    margin="normal"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    variant="outlined"
                  /> */}
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Country</InputLabel>
                    <Select
                      style={{ height: "40px" }}
                      value={formData.country}
                      onChange={handleChange}
                      name="country"
                      variant="outlined"
                    >
                      {countriesArray.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>State</InputLabel>
                    <Select
                      style={{ height: "40px" }}
                      value={formData.state}
                      onChange={handleChange}
                      name="state"
                      disabled={!formData.country}
                      variant="outlined"
                    >
                      {statesArray.map((state) => (
                        <MenuItem key={state.name} value={state.name}>
                          {state.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>City</InputLabel>
                    <Select
                      style={{ height: "40px" }}
                      value={formData.city}
                      onChange={handleChange}
                      name="city"
                      disabled={!formData.state}
                      variant="outlined"
                    >
                      {citiesArray.map((city) => (
                        <MenuItem key={city.name} value={city.name}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Gender</InputLabel>
                    <Select
                      style={{ height: "40px" }}
                      value={formData.gender}
                      onChange={handleChange}
                      name="gender"
                      variant="outlined"
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.checked })
                        }
                        color="primary"
                      />
                    }
                    label="Status"
                  />
                  <input
                    type="file"
                    name="photo"
                    onChange={handlePhotoChange}
                    accept="image/*"
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
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                  />
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
                      onClick={handleInsert} // Changed to handleInsert
                      disabled={isSubmitting}
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

export default AddWriter;
