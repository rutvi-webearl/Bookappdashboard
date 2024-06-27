// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
// import BasicLayout from "layouts/authentication/components/BasicLayout";
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// function Basic() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch("https://bookingreadingapp.onrender.com/api/admin/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           password
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const data = await response.json();
//       console.log("Response from server:", data);
  
//       if (data.token) { // Ensure you're checking the correct field from the response
//         // Assuming data.token is your auth token
//         // Store the token in localStorage or sessionStorage for later use
//         localStorage.setItem('token', data.token);
//         navigate("/dashboard");
//       } else {
//         console.error("Login failed. Response:", data);
//         alert("Login failed. Please check your username and password.");
//       }
//     } catch (error) {
//       console.error("There was an error logging in!", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <BasicLayout image={bgImage}>
//       <Card>
//         <MDBox
//           variant="gradient"
//           bgColor="info"
//           borderRadius="lg"
//           coloredShadow="info"
//           mx={2}
//           mt={-3}
//           p={2}
//           mb={1}
//           textAlign="center"
//         >
//           <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
//             Sign in
//           </MDTypography>
//           {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
//             <Grid item xs={2}>
//               <MDTypography component={MuiLink} href="#" variant="body1" color="white">
//                 <FacebookIcon color="inherit" />
//               </MDTypography>
//             </Grid>
//             <Grid item xs={2}>
//               <MDTypography component={MuiLink} href="#" variant="body1" color="white">
//                 <GitHubIcon color="inherit" />
//               </MDTypography>
//             </Grid>
//             <Grid item xs={2}>
//               <MDTypography component={MuiLink} href="#" variant="body1" color="white">
//                 <GoogleIcon color="inherit" />
//               </MDTypography>
//             </Grid>
//           </Grid> */}
//         </MDBox>
//         <MDBox pt={4} pb={3} px={3}>
//           <MDBox component="form" role="form" onSubmit={handleSubmit}>
//             <MDBox mb={2}>
//               <MDInput
//                 type="text"
//                 label="Username"
//                 fullWidth
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </MDBox>
//             <MDBox mb={2}>
//               <MDInput
//                 type="password"
//                 label="Password"
//                 fullWidth
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </MDBox>
//             <MDBox display="flex" alignItems="center" ml={-1}>
//               <Switch checked={false} />
//               <MDTypography
//                 variant="button"
//                 fontWeight="regular"
//                 color="text"
//                 sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
//               >
//                 &nbsp;&nbsp;Remember me
//               </MDTypography>
//             </MDBox>
//             <MDBox mt={4} mb={1}>
//               <MDButton variant="gradient" color="info" fullWidth type="submit">
//                 Sign in
//               </MDButton>
//             </MDBox>
//             <MDBox mt={3} mb={1} textAlign="center">
//               <MDTypography variant="button" color="text" mt={1}>
//                 <Link to="/forgot-pass" style={{ color: "inherit" }}>
//                   Forgot Password?
//                 </Link>
//               </MDTypography>
//             </MDBox>
//             <MDBox mt={3} mb={1} textAlign="center">
//               <MDTypography variant="button" color="text" mt={1}>
//                 <Link to="/writer/signin" style={{ color: "inherit" }}>
//                   If you are author, click here
//                 </Link>
//               </MDTypography>
//             </MDBox>
//           </MDBox>
//         </MDBox>
//       </Card>
//     </BasicLayout>
//   );
// }

// export default Basic;


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
// import MuiLink from "@mui/material/Link";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
// import MDSnackbar from "components/MDSnackbar";
// import BasicLayout from "layouts/authentication/components/BasicLayout";
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// function Basic() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarColor, setSnackbarColor] = useState("info");
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch("https://bookingreadingapp.onrender.com/api/admin/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           password,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Response from server:", data);

//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         setSnackbarMessage("Login successful");
//         setSnackbarColor("success");
//         setSnackbarOpen(true); // Show success snackbar
//         setTimeout(() => {
//           setSnackbarOpen(false);
//           navigate("/dashboard");
//         }, 2000); // Delay navigation to show the snackbar for 2 seconds
//       } else {
//         console.error("Login failed. Response:", data);
//         setSnackbarMessage("Invalid credentials");
//         setSnackbarColor("error");
//         setSnackbarOpen(true); // Show error snackbar
//       }
//     } catch (error) {
//       console.error("There was an error logging in!", error);
//       setSnackbarMessage("An error occurred. Please try again.");
//       setSnackbarColor("error");
//       setSnackbarOpen(true); // Show error snackbar
//     }
//   };

//   return (
//     <BasicLayout image={bgImage}>
//       <Card>
//         <MDBox
//           variant="gradient"
//           bgColor="info"
//           borderRadius="lg"
//           coloredShadow="info"
//           mx={2}
//           mt={-3}
//           p={2}
//           mb={1}
//           textAlign="center"
//         >
//           <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
//             Sign in
//           </MDTypography>
//         </MDBox>
//         <MDBox pt={4} pb={3} px={3}>
//           <MDBox component="form" role="form" onSubmit={handleSubmit}>
//             <MDBox mb={2}>
//               <MDInput
//                 type="text"
//                 label="Username"
//                 fullWidth
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </MDBox>
//             <MDBox mb={2}>
//               <MDInput
//                 type="password"
//                 label="Password"
//                 fullWidth
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </MDBox>
//             <MDBox display="flex" alignItems="center" ml={-1}>
//               <Switch checked={false} />
//               <MDTypography
//                 variant="button"
//                 fontWeight="regular"
//                 color="text"
//                 sx={{ cursor: "pointer", userSelect: "none", ml: 1 }}
//               >
//                 &nbsp;&nbsp;Remember me
//               </MDTypography>
//             </MDBox>
//             <MDBox mt={4} mb={1}>
//               <MDButton variant="gradient" color="info" fullWidth type="submit">
//                 Sign in
//               </MDButton>
//             </MDBox>
//             <MDBox mt={3} mb={1} textAlign="center">
//               <MDTypography variant="button" color="text" mt={1}>
//                 <Link to="/forgot-pass" style={{ color: "inherit" }}>
//                   Forgot Password?
//                 </Link>
//               </MDTypography>
//             </MDBox>
//             {/* <MDBox mt={3} mb={1} textAlign="center">
//               <MDTypography variant="button" color="text" mt={1}>
//                 <Link to="/writer/signin" style={{ color: "inherit" }}>
//                   If you are author, click here
//                 </Link>
//               </MDTypography>
//             </MDBox> */}
//           </MDBox>
//         </MDBox>
//       </Card>
//       <MDSnackbar
//         color={snackbarColor}
//         icon={snackbarColor === "success" ? "check" : "error"}
//         title="Login Notification"
//         content={snackbarMessage}
//         open={snackbarOpen}
//         onClose={() => setSnackbarOpen(false)}
//         close={true}
//         bgWhite
//       />
//     </BasicLayout>
//   );
// }

// export default Basic;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox"; // Ensure this is the correct path
import MDTypography from "components/MDTypography"; // Ensure this is the correct path
import MDInput from "components/MDInput"; // Ensure this is the correct path
import MDButton from "components/MDButton"; // Ensure this is the correct path
import MDSnackbar from "components/MDSnackbar"; // Ensure this is the correct path
import BasicLayout from "layouts/authentication/components/BasicLayout"; // Ensure this is the correct path
import bgImage from "assets/images/bg-sign-in-basic.jpeg"; // Ensure this is the correct path

function Basic() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("info");
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    if (!username && !password) {
      setSnackbarMessage("Username and password are required");
      setSnackbarColor("error");
      setSnackbarOpen(true);
      return;
    } else if (!username) {
      setSnackbarMessage("Enter username");
      setSnackbarColor("error");
      setSnackbarOpen(true);
      return;
    } else if (!password) {
      setSnackbarMessage("Enter password");
      setSnackbarColor("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await fetch("https://bookingreadingapp.onrender.com/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from server:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        setSnackbarMessage("Login successful");
        setSnackbarColor("success");
        setSnackbarOpen(true); // Show success snackbar
        setTimeout(() => {
          setSnackbarOpen(false);
          navigate("/dashboard");
        }, 2000); // Delay navigation to show the snackbar for 2 seconds
      } else {
        console.error("Login failed. Response:", data);
        setSnackbarMessage("Invalid credentials");
        setSnackbarColor("error");
        setSnackbarOpen(true); // Show error snackbar
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      setSnackbarMessage("An error occurred. Please try again.");
      setSnackbarColor("error");
      setSnackbarOpen(true); // Show error snackbar
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
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
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type={showPassword ? "text" : "password"}
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <Icon>visibility</Icon> : <Icon>visibility_off</Icon>}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={false} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: 1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text" mt={1}>
                <Link to="/forgot-pass" style={{ color: "inherit" }}>
                  Forgot Password?
                </Link>
              </MDTypography>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text" mt={1}>
                <Link to="/writer-signin" style={{ color: "inherit" }}>
                  If you are author, click here
                </Link>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDSnackbar
        color={snackbarColor}
        icon={snackbarColor === "success" ? "check" : "error"}
        title="Login Notification"
        content={snackbarMessage}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        close={true}
        bgWhite
      />
    </BasicLayout>
  );
}

export default Basic;

