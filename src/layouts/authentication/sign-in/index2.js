// // import { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import Card from "@mui/material/Card";
// // import Switch from "@mui/material/Switch";
// // import Grid from "@mui/material/Grid";
// // import MuiLink from "@mui/material/Link";
// // import FacebookIcon from "@mui/icons-material/Facebook";
// // import GitHubIcon from "@mui/icons-material/GitHub";
// // import GoogleIcon from "@mui/icons-material/Google";
// // import MDBox from "components/MDBox";
// // import MDTypography from "components/MDTypography";
// // import MDInput from "components/MDInput";
// // import MDButton from "components/MDButton";
// // import BasicLayout from "layouts/authentication/components/BasicLayout";
// // import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// // function Basic() {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     try {
// //       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY2NWYwNTlmM2UwNGRjNmU2ODcyNGQwMSJ9LCJpYXQiOjE3MTc1MDMzOTF9.qDflDqxd2PE4YO9VSNjiV7mMEOrn3ZF3X1nHcxx6YTk";
// //       const response = await fetch("https://ecomm-backend-2xs6.onrender.com/api/admin/login", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           "auth-token": token,
// //         },
// //         body: JSON.stringify({ username, password }),
// //       });

// //       const data = await response.json();
// //       console.log(data); 
// //       if (data.authtoken) {
// //         navigate("/dashboard");
// //       } else {
// //         alert("Login failed. Please check your username and password.");
// //       }
// //     } catch (error) {
// //       console.error("There was an error logging in!", error);
// //       alert("An error occurred. Please try again.");
// //     }
// //   };

// //   return (
// //     <BasicLayout image={bgImage}>
// //       <Card>
// //         <MDBox
// //           variant="gradient"
// //           bgColor="info"
// //           borderRadius="lg"
// //           coloredShadow="info"
// //           mx={2}
// //           mt={-3}
// //           p={2}
// //           mb={1}
// //           textAlign="center"
// //         >
// //           <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
// //             Sign in
// //           </MDTypography>
// //           <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
// //             <Grid item xs={2}>
// //               <MDTypography component={MuiLink} href="#" variant="body1" color="white">
// //                 <FacebookIcon color="inherit" />
// //               </MDTypography>
// //             </Grid>
// //             <Grid item xs={2}>
// //               <MDTypography component={MuiLink} href="#" variant="body1" color="white">
// //                 <GitHubIcon color="inherit" />
// //               </MDTypography>
// //             </Grid>
// //             <Grid item xs={2}>
// //               <MDTypography component={MuiLink} href="#" variant="body1" color="white">
// //                 <GoogleIcon color="inherit" />
// //               </MDTypography>
// //             </Grid>
// //           </Grid>
// //         </MDBox>
// //         <MDBox pt={4} pb={3} px={3}>
// //           <MDBox component="form" role="form" onSubmit={handleSubmit}>
// //             <MDBox mb={2}>
// //               <MDInput
// //                 type="text"
// //                 label="Username"
// //                 fullWidth
// //                 value={username}
// //                 onChange={(e) => setUsername(e.target.value)}
// //               />
// //             </MDBox>
// //             <MDBox mb={2}>
// //               <MDInput
// //                 type="password"
// //                 label="Password"
// //                 fullWidth
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //               />
// //             </MDBox>
// //             <MDBox display="flex" alignItems="center" ml={-1}>
// //               <Switch checked={false} />
// //               <MDTypography
// //                 variant="button"
// //                 fontWeight="regular"
// //                 color="text"
// //                 sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
// //               >
// //                 &nbsp;&nbsp;Remember me
// //               </MDTypography>
// //             </MDBox>
// //             <MDBox mt={4} mb={1}>
// //               <MDButton variant="gradient" color="info" fullWidth type="submit">
// //                 Sign in
// //               </MDButton>
// //             </MDBox>
// //             <MDBox mt={3} mb={1} textAlign="center">
// //               {/* <MDTypography variant="button" color="text">
// //                 Don&apos;t have an account?{" "}
// //                 <MDTypography
// //                   component={Link}
// //                   to="/authentication/sign-up"
// //                   variant="button"
// //                   color="info"
// //                   fontWeight="medium"
// //                   textGradient
// //                 >
// //                   Sign up
// //                 </MDTypography> */}
// //               {/* </MDTypography> */}
// //               <MDTypography variant="button" color="text" mt={1}>
// //                 <Link to="/reset-password" style={{ color: "inherit" }}>
// //                   Forgot Password?
// //                 </Link>
// //               </MDTypography>
// //             </MDBox>
// //           </MDBox>
// //         </MDBox>
// //       </Card>
// //     </BasicLayout>
// //   );
// // }

// // export default Basic;








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
//           <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
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
//           </Grid>
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
//                 <Link to="/reset-password" style={{ color: "inherit" }}>
//                   Forgot Password?
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


/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { useNavigate } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";

function Basic() {
  // const [rememberMe, setRememberMe] = useState(false);
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const navigate = useNavigate();

  //custom alert
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate();

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Successfull Added"
      content="successfully login."
      dateTime="1 sec"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Filled Error"
      content={errorMessage}
      dateTime="1 sec ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name && !password) {
      setErrorMessage("Please Enter Username And Password");
      openErrorSB();
      return;
    }
    if (!name) {
      setErrorMessage("Please Enter Username");
      openErrorSB();
      return;
    }
    if (!password) {
      setErrorMessage("Please Enter Password");
      openErrorSB();
      return;
    }

    try {
      const response = await fetch(`https://bookingreadingapp.onrender.com/api/admin/login`, {
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
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      if (data.success) {
        // localStorage.setItem("admin_id", data.user._id)
        navigate("/dashboard");
        openSuccessSB();
        localStorage.setItem("token", data.token);
        // localStorage.setItem("userName", name);
      } else {
        setErrorMessage("Login unsuccessful. Please try again later.");
        openErrorSB();
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Please enter valid username and password!");
      openErrorSB();
    }
  };
  const [showNewPassword, setShowNewPassword] = useState(false);
  // Separate functions to toggle the visibility of each password field
  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
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
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ mt: 1, mb: 2 }}
          ></Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                value={name}
                onChange={(event) => setUsername(event.target.value.trim())}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type={showNewPassword ? "text" : "password"}
                label="Password"
                name="password"
                fullWidth
                value={password}
                onChange={(event) => setPassword(event.target.value.trim())}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowNewPassword}>
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                style={{ marginBottom: "20px" }}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleSubmit}
                style={{ color: "white", borderRadius: "0.5rem" }}
              >
                sign in
              </MDButton>
            </MDBox>

            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Do you forget password?{" "}
                <MDTypography
                  component={Link}
                  variant="button"
                  to="/authentication/forget-password"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  forget password
                </MDTypography>
              </MDTypography>
              {renderErrorSB}
              {renderSuccessSB}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
