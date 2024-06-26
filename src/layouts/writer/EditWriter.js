// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   FormControlLabel,
//   Checkbox,
//   Card,
//   Grid
// } from '@mui/material';
// import MDBox from 'components/MDBox';
// import MDTypography from 'components/MDTypography';
// import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
// import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
// import Footer from 'examples/Footer';

// const EditWriter = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     dob: '',
//     city: '',
//     state: '',
//     country: '',
//     gender: '', // Ensure a valid initial value
//     photo: '',
//     status: '',
//     mobile: '',
//     email: ''
//   });

//   useEffect(() => {
//     const fetchWriter = async () => {
//       try {
//         const authToken = localStorage.getItem('token');
//         if (!authToken) {
//           console.error('No auth token found in local storage');
//           return;
//         }

//         const response = await fetch(`https://bookingreadingapp.onrender.com/api/author/profileDisplay/${id}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': authToken
//           }
//         });

//         if (response.ok) {
//           const writerData = await response.json();
//           console.log('Fetched Writer Data:', writerData);
//           setFormData(writerData);
//         } else {
//           console.error('Failed to fetch writer data:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching writer data:', error);
//       }
//     };

//     fetchWriter();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSave = async () => {
//     try {
//       const authToken = localStorage.getItem('token');
//       if (!authToken) {
//         console.error('No auth token found in local storage');
//         return;
//       }

//       const response = await fetch(`https://bookingreadingapp.onrender.com/api/author/editAuthor/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': authToken
//         },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         console.log('Writer data updated successfully');
//         navigate('/writer'); // Redirect to writers list after saving
//       } else {
//         console.error('Failed to update writer data:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error updating writer data:', error);
//     }
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox pt={6} pb={3}>
//         <Grid container spacing={6} justifyContent="center">
//           <Grid item xs={12} md={8}>
//             <Card>
//               <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
//                 <MDTypography variant="h6" color="white">
//                   Edit Writer
//                 </MDTypography>
//               </MDBox>
//               <MDBox p={3}>
//                 <form>
//                   <TextField
//                     fullWidth
//                     label="Name"
//                     margin="normal"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                   />
//                   <TextField
//                     fullWidth
//                     label="DOB"
//                     type="date"
//                     margin="normal"
//                     name="dob"
//                     value={formData.dob}
//                     onChange={handleChange}
//                   />
//                   <TextField
//                     fullWidth
//                     label="City"
//                     margin="normal"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                   />
//                   <TextField
//                     fullWidth
//                     label="State"
//                     margin="normal"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Country"
//                     margin="normal"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                   />
//                   <FormControl fullWidth margin="normal">
//                     <InputLabel>Gender</InputLabel>
//                     <Select
//                       value={formData.gender}
//                       onChange={handleChange}
//                       name="gender"
//                     >
//                       <MenuItem value="Male">Male</MenuItem>
//                       <MenuItem value="Female">Female</MenuItem>
//                       <MenuItem value="Other">Other</MenuItem>
//                     </Select>
//                   </FormControl>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={formData.status}
//                         onChange={(e) =>
//                           setFormData({ ...formData, status: e.target.checked })
//                         }
//                         color="primary"
//                       />
//                     }
//                     label="Status"
//                   />
//                   <TextField
//                     fullWidth
//                     label="Photo"
//                     margin="normal"
//                     name="photo"
//                     value={formData.photo}
//                     onChange={handleChange}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Status"
//                     margin="normal"
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Mobile"
//                     margin="normal"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Email"
//                     margin="normal"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                   <MDBox mt={2} display="flex" justifyContent="space-between">
//                     <Button variant="contained" color="primary" onClick={() => navigate('/writer')}>
//                       Cancel
//                     </Button>
//                     <Button variant="contained" color="primary" onClick={handleSave}>
//                       Save
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

// export default EditWriter;

// // Example of storing the token in local storage:
// // localStorage.getItem('token');

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   FormControlLabel,
//   Checkbox,
//   Card,
//   Grid,
//   Snackbar,
//   SnackbarContent
// } from '@mui/material';
// import MDBox from 'components/MDBox';
// import MDTypography from 'components/MDTypography';
// import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
// import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
// import Footer from 'examples/Footer';
// import CountryStateCity from './CountryStateCity.json';

// const EditWriter = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [writers, setWriters] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     dob: '',
//     city: '',
//     state: '',
//     country: '',
//     gender: '',
//     file: null,
//     status: true,
//     mobile: '',
//     email: ''
//   });
//   const [countriesArray, setCountriesArray] = useState([]);
//   const [statesArray, setStatesArray] = useState([]);
//   const [citiesArray, setCitiesArray] = useState([]);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   useEffect(() => {
//     const fetchWriter = async () => {
//       try {
//         const authToken = localStorage.getItem('token');
//         if (!authToken) {
//           console.error('No auth token found in local storage');
//           return;
//         }

//         const response = await fetch(`https://bookingreadingapp.onrender.com/api/author/profileDisplay/${id}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': authToken
//           }
//         });

//         if (response.ok) {
//           const writerData = await response.json();
//           console.log('Fetched Writer Data:', writerData);
//           setFormData({
//             ...writerData,
//             file: writerData.photo ? { name: writerData.photo } : null // Assume 'photo' is the filename string
//           });
//           if (writerData.country) {
//             const selectedCountry = CountryStateCity.find(
//               (country) => country.name === writerData.country
//             );
//             if (selectedCountry) {
//               setStatesArray(selectedCountry.states);
//               if (writerData.state) {
//                 const selectedState = selectedCountry.states.find(
//                   (state) => state.name === writerData.state
//                 );
//                 if (selectedState && selectedState.cities) {
//                   setCitiesArray(selectedState.cities);
//                 }
//               }
//             }
//           }
//         } else {
//           console.error('Failed to fetch writer data:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching writer data:', error);
//       }
//     };

//     fetchWriter();
//   }, [id]);

//   useEffect(() => {
//     // Initialize countries array from CountryStateCity.json
//     setCountriesArray(CountryStateCity.map(country => country.name));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name !== 'name') {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
  
//     if (name === 'country') {
//       const selectedCountry = CountryStateCity.find((country) => country.name === value);
//       if (selectedCountry) {
//         setStatesArray(selectedCountry.states);
//         setCitiesArray([]);
//         setFormData((prevState) => ({
//           ...prevState,
//           state: '',
//           city: '',
//         }));
//       }
//     }
  
//     if (name === 'state') {
//       const selectedCountry = CountryStateCity.find((country) => country.name === formData.country);
//       const selectedState = selectedCountry?.states.find((state) => state.name === value);
//       if (selectedState) {
//         setCitiesArray(selectedState.cities);
//         setFormData((prevState) => ({
//           ...prevState,
//           city: '',
//         }));
//       }
//     }
//   };
  
//   const handleSave = async () => {
//     try {
//       if (!formData.name.trim()) {
//         setSnackbarMessage('Name should not be empty');
//         setSnackbarOpen(true);
//         return;
//       }
  
//       if (formData.email && !validateEmail(formData.email)) {
//         setSnackbarMessage('Invalid email format');
//         setSnackbarOpen(true);
//         return;
//       }
  
//       const authToken = localStorage.getItem('token');
//       if (!authToken) {
//         console.error('No auth token found in local storage');
//         return;
//       }
  
//       // Create a FormData object to handle file upload
//       const data = new FormData();
//       for (const key in formData) {
//         data.append(key, formData[key]);
//       }
  
//       const response = await fetch(`https://bookingreadingapp.onrender.com/api/author/editAuthor/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': authToken
//         },
//         body: data
//       });
  
//       if (response.ok) {
//         console.log('Writer data updated successfully');
//         setSnackbarMessage('Updated successfully');
//         setSnackbarOpen(true);
//         setTimeout(() => navigate('/writer'), 2000); // Redirect after 2 seconds
//       } else {
//         console.error('Failed to update writer data:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error updating writer data:', error);
//     }
//   };

//   const fetchWriter = async () => {
//     try {
//       const authToken = localStorage.getItem('token');
//       if (!authToken) {
//         console.error('No auth token found in local storage');
//         return;
//       }
//       const response = await fetch('https://bookingreadingapp.onrender.com/api/author/allAuthor', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': authToken
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setWriters(data);
//       } else {
//         console.error('Failed to fetch writers:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Failed to fetch writers:', error);
//     }
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleNameChange = (e) => {
//     const { value } = e.target;
//     if (value.startsWith(' ')) {
//       setSnackbarOpen(true);
//       setSnackbarMessage('Name should not start with a space');
//     } else {
//       setFormData({ ...formData, name: value });
//     }
//   };

//   const handleMobileChange = (e) => {
//     const { value } = e.target;
//     if (/^\d{0,10}$/.test(value)) {
//       setFormData({ ...formData, mobile: value });
//     } else {
//       setSnackbarOpen(true);
//       setSnackbarMessage('Mobile number should be exactly 10 digits');
//     }
//   };

//   const handlePhotoChange = (e) => {
//     const files = e.target.files[0];
//     if (files) {
//       setFormData({ ...formData, file: files });
//     }
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@gmail\.com$/;
//     return emailRegex.test(email);
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox pt={6} pb={3}>
//         <Grid container spacing={6} justifyContent="center">
//           <Grid item xs={12} md={8}>
//             <Card>
//               <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
//                 <MDTypography variant="h6" color="white">
//                   Edit Writer
//                 </MDTypography>
//               </MDBox>
//               <MDBox p={3}>
//                 <form>
//                   <TextField
//                     fullWidth
//                     label="Name"
//                     margin="normal"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleNameChange}
//                     variant="outlined"
//                   />
//                   <TextField
//                     fullWidth
//                     label="DOB"
//                     type="date"
//                     margin="normal"
//                     name="dob"
//                     value={formData.dob}
//                     onChange={handleChange}
//                     variant="outlined"
//                   />
//                   <FormControl fullWidth margin="normal">
//                     <InputLabel>Country</InputLabel>
//                     <Select
//                       style={{ height: "40px" }}
//                       value={formData.country}
//                       onChange={handleChange}
//                       name="country"
//                       variant="outlined"
//                     >
//                       {countriesArray.map((country) => (
//                         <MenuItem key={country} value={country}>
//                           {country}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                   <FormControl fullWidth margin="normal">
//                     <InputLabel>State</InputLabel>
//                     <Select
//                       style={{ height: "40px" }}
//                       value={formData.state}
//                       onChange={handleChange}
//                       name="state"
//                       disabled={!formData.country}
//                       variant="outlined"
//                     >
//                       {statesArray.map((state) => (
//                         <MenuItem key={state.name} value={state.name}>
//                           {state.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                   <FormControl fullWidth margin="normal">
//                     <InputLabel>City</InputLabel>
//                     <Select
//                       style={{ height: "40px" }}
//                       value={formData.city}
//                       onChange={handleChange}
//                       name="city"
//                       disabled={!formData.state}
//                       variant="outlined"
//                     >
//                       {citiesArray.map((city) => (
//                         <MenuItem key={city.name} value={city.name}>
//                           {city.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                   <FormControl fullWidth margin="normal">
//                     <InputLabel>Gender</InputLabel>
//                     <Select
//                       style={{ height: "40px" }}
//                       value={formData.gender}
//                       onChange={handleChange}
//                       name="gender"
//                       variant="outlined"
//                     >
//                       <MenuItem value="Male">Male</MenuItem>
//                       <MenuItem value="Female">Female</MenuItem>
//                       <MenuItem value="Other">Other</MenuItem>
//                     </Select>
//                   </FormControl>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={formData.status}
//                         onChange={(e) =>
//                           setFormData({ ...formData, status: e.target.checked })
//                         }
//                         color="primary"
//                       />
//                     }
//                     label="Status"
//                   />
//                   <input
//                     type="file"
//                     name="photo"
//                     onChange={handlePhotoChange}
//                     accept="image/*"
//                   />
//                   <TextField
//                     fullWidth
//                     label="Mobile"
//                     margin="normal"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleMobileChange}
//                     variant="outlined"
//                   />
//                   <TextField
//                     fullWidth
//                     label="Email"
//                     margin="normal"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     variant="outlined"
//                   />
//                   <MDBox mt={2} display="flex" justifyContent="space-between">
//                     <Button variant="contained" color="primary" onClick={() => navigate('/writer')}>
//                       Cancel
//                     </Button>
//                     <Button variant="contained" color="primary" onClick={handleSave}>
//                       Save
//                     </Button>
//                   </MDBox>
//                 </form>
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//       <Snackbar
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//         open={snackbarOpen}
//         autoHideDuration={2000}
//         onClose={handleSnackbarClose}
//       >
//         <SnackbarContent
//           style={{ backgroundColor: 'white', color: 'black' }}
//           message={<span id="client-snackbar">{snackbarMessage}</span>}
//         />
//       </Snackbar>
//     </DashboardLayout>
//   );
// };

// export default EditWriter;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const EditWriter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [writers, setWriters] = useState([]);
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

  useEffect(() => {
    const fetchWriter = async () => {
      try {
        const authToken = localStorage.getItem('token');
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
      if (!formData.name.trim()) {
        setSnackbarMessage('Name should not be empty');
        setSnackbarColor('error');
        setSnackbarOpen(true);
        return;
      }
  
      if (formData.email && !validateEmail(formData.email)) {
        setSnackbarMessage('Invalid email format');
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
  
      const response = await fetch(`https://bookingreadingapp.onrender.com/api/author/editAuthor/${id}`, {
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

  const fetchWriter = async () => {
    try {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        console.error('No auth token found in local storage');
        return;
      }
      const response = await fetch('https://bookingreadingapp.onrender.com/api/author/allAuthor', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken
        }
      });

      if (response.ok) {
        const data = await response.json();
        setWriters(data);
      } else {
        console.error('Failed to fetch writers:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch writers:', error);
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
                  />
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
                    <Button
                      variant="contained"
                      color="white"
                      onClick={() => navigate('/writer')}
                      sx={{ color: 'blue' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="white"
                      onClick={handleSave}
                      sx={{ color: 'blue' }}
                    >
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
