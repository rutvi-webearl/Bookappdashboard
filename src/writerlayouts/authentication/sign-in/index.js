
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
// import IconButton from "@material-ui/core/IconButton";
// import InputLabel from "@material-ui/core/InputLabel";
// import Visibility from "@material-ui/icons/Visibility";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import Input from "@material-ui/core/Input";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
// import BasicLayout from "writerlayouts/authentication/components/BasicLayout";
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// import MDSnackbar from "components/MDSnackbar";

// function WriterSignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", color: "" });
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!email.trim()) {
//       setSnackbar({ open: true, message: "Email cannot be empty.", color: "error" });
//       return;
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setSnackbar({ open: true, message: "Invalid email format.", color: "error" });
//       return;
//     }
//     try {
//       // Simulating a login request
//       const response = await fetch("https://bookreading-app.onrender.com/api/author/loginAuthor", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const { token, author } = data;
//         if (token && author && author._id) {
//           localStorage.setItem("token", token);
//           localStorage.setItem("email", email);
//           localStorage.setItem("id", author._id);

//           // Navigate to a route handled by writerroutes
//           navigate("/wDashboard"); // Example route handled by writerroutes
//         } else {
//           setSnackbar({ open: true, message: "Login failed. Please check your credentials.", color: "error" });
//         }
//       } else {
//         const errorText = await response.text();
//         throw new Error(`Login failed: ${response.status} - ${errorText || response.statusText}`);
//       }
//     } catch (error) {
//       console.error("There was an error logging in:", error);
//       setSnackbar({ open: true, message: "An error occurred. Please try again.", color: "error" });
//     }
//   };

//   const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
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
//               <Input
//                 variant="outlined"
//                 type="email"
//                 label="Email"
//                 placeholder="Enter email"
//                 fullWidth
//                 value={email}
//                 onChange={handleEmailChange}
//               />
//             </MDBox>
//             <MDBox mb={2}>
//               <Input
//                 // id="standard-adornment-password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 placeholder="Enter password"
//                 onChange={handlePasswordChange}
//                 fullWidth
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       size="small"
//                     >
//                       {showPassword ? <Visibility /> : <VisibilityOff />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//               />
//             </MDBox>
//             {/* <MDBox display="flex" alignItems="center" ml={-1}>
//               <Switch checked={false} onChange={() => {}} />
//               <MDTypography
//                 variant="button"
//                 fontWeight="regular"
//                 color="text"
//                 sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
//               >
//                 &nbsp;&nbsp;Remember me
//               </MDTypography>
//             </MDBox> */}
//             <MDBox mt={4} mb={1}>
//               <MDButton variant="gradient" color="info" fullWidth type="submit">
//                 Sign in
//               </MDButton>
//             </MDBox>
//             {/* <MDBox mt={3} mb={1} textAlign="center">
//               <MDTypography variant="button" color="text">
//                 Don't have an account?{" "}
//                 <MDTypography
//                   component={Link}
//                   to="/writer-signup"
//                   variant="button"
//                   color="info"
//                   fontWeight="medium"
//                   textGradient
//                 >
//                   Sign up
//                 </MDTypography>
//               </MDTypography>
//             </MDBox> */}
//           </MDBox>
//         </MDBox>
//       </Card>
//       <MDSnackbar
//         color={snackbar.color}
//         icon="notifications"
//         title="Login"
//         content={snackbar.message}
//         open={snackbar.open}
//         onClose={handleSnackbarClose}
//         close={handleSnackbarClose}
//         bgWhite
//       />
//     </BasicLayout>
//   );
// }

// export default WriterSignIn;



// import { useState } from "react";

// // react-router-dom components
// import { Link } from "react-router-dom";

// // @mui material components
// import Card from "@mui/material/Card";
// import Grid from "@mui/material/Grid";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
// import MDSnackbar from "components/MDSnackbar";

// // Authentication layout components
// import BasicLayout from "layouts/authentication/components/BasicLayout";

// // Images
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// import { useNavigate } from "react-router";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { IconButton, InputAdornment } from "@mui/material";

// function WriterSignIn() {
//   // const [rememberMe, setRememberMe] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // const handleSetRememberMe = () => setRememberMe(!rememberMe);
//   const navigate = useNavigate();

//   //custom alert
//   const [successSB, setSuccessSB] = useState(false);
//   const [errorSB, setErrorSB] = useState(false);

//   const openSuccessSB = () => setSuccessSB(true);
//   const closeSuccessSB = () => setSuccessSB(false);
//   const openErrorSB = () => setErrorSB(true);
//   const closeErrorSB = () => setErrorSB(false);

//   const [errorMessage, setErrorMessage] = useState("");
//   // const navigate = useNavigate();

//   const renderSuccessSB = (
//     <MDSnackbar
//       color="success"
//       icon="check"
//       title="Successfully Added"
//       content="Login successfull."
//       dateTime="1 sec"
//       open={successSB}
//       onClose={closeSuccessSB}
//       close={closeSuccessSB}
//       bgWhite
//     />
//   );

//   const renderErrorSB = (
//     <MDSnackbar
//       color="error"
//       icon="warning"
//       title="Filled Error"
//       content={errorMessage}
//       dateTime="1 sec ago"
//       open={errorSB}
//       onClose={closeErrorSB}
//       close={closeErrorSB}
//       bgWhite
//     />
//   );

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!email && !password) {
//       setErrorMessage("Please Enter Email And Password");
//       openErrorSB();
//       return;
//     }
//     if (!email) {
//       setErrorMessage("Please Enter Email");
//       openErrorSB();
//       return;
//     }
//     if (!password) {
//       setErrorMessage("Please Enter Password");
//       openErrorSB();
//       return;
//     }

//     try {
//       const response = await fetch(`https://bookreading-app.onrender.com/api/author/loginAuthor`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });
        
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       const { token, author } = data;
//       if (token && author && author._id) {
//         localStorage.setItem("token", token);
//         localStorage.setItem("email", email);
//         localStorage.setItem("id", author._id);
//         openSuccessSB();
//         setTimeout(() => {
//           navigate("/wDashboard");
//         }, 1000); // Delay the navigation by 1 second to allow snackbar display
//       } else {
//         setErrorMessage("Login unsuccessful. Please try again later.");
//         openErrorSB();
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setErrorMessage("Please enter valid email and password!");
//       openErrorSB();
//     }
//   };
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   // Separate functions to toggle the visibility of each password field
//   const handleShowNewPassword = () => {
//     setShowNewPassword(!showNewPassword);
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
//             Author Sign in
//           </MDTypography>
//           <Grid
//             container
//             spacing={3}
//             justifyContent="center"
//             sx={{ mt: 1, mb: 2 }}
//           ></Grid>
//         </MDBox>
//         <MDBox pt={4} pb={3} px={3}>
//           <MDBox component="form" role="form">
//             <MDBox mb={2}>
//               <MDInput
//                 type="text"
//                 label="Email"
//                 value={email}
//                 onChange={(event) => setEmail(event.target.value.trim())}
//                 fullWidth
//               />
//             </MDBox>
//             <MDBox mb={2}>
//               <MDInput
//                 type={showNewPassword ? "text" : "password"}
//                 label="Password"
//                 name="password"
//                 fullWidth
//                 value={password}
//                 onChange={(event) => setPassword(event.target.value.trim())}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={handleShowNewPassword}>
//                         {showNewPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 style={{ marginBottom: "20px" }}
//               />
//             </MDBox>
//             <MDBox mt={4} mb={1}>
//               <MDButton
//                 variant="gradient"
//                 color="info"
//                 fullWidth
//                 onClick={handleSubmit}
//                 style={{ color: "white", borderRadius: "0.5rem" }}
//               >
//                 sign in
//               </MDButton>
//             </MDBox>

//             <MDBox mt={3} mb={1} textAlign="center">
//               <MDTypography variant="button" color="text">
                
//                 <MDTypography
//                   component={Link}
//                   variant="button"
//                   to="/forgot-pass"
//                   color="info"
//                   fontWeight="medium"
//                   textGradient
//                 >
//                   Forgot password?
//                 </MDTypography>
//                 <MDBox mt={3} mb={1} textAlign="center">
//                   <MDTypography variant="button" color="text" mt={1}>
//                     <Link to="/authentication/sign-in" style={{ color: "inherit" }}>
//                       If you are admin, click here
//                     </Link>
//                   </MDTypography>
//               </MDBox>
//               </MDTypography>
//               {renderErrorSB}
//               {renderSuccessSB}
//             </MDBox>
//           </MDBox>
//         </MDBox>
//       </Card>
//     </BasicLayout>
//   );
// }

// export default WriterSignIn;

import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useNavigate } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";

const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function WriterSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const [errorMessage, setErrorMessage] = useState("");

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Successfully Added"
      content="Login successful."
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
      title="Field Error"
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

    if (!email && !password) {
      setErrorMessage("Please Enter Email And Password");
      openErrorSB();
      return;
    }
    if (!email) {
      setErrorMessage("Please Enter Email");
      openErrorSB();
      return;
    }
    if (!validRegex.test(email)) {
      setErrorMessage("Please Enter a Valid Email");
      openErrorSB();
      return;
    }
    if (!password) {
      setErrorMessage("Please Enter Password");
      openErrorSB();
      return;
    }

    try {
      const response = await fetch(`https://bookreading-app.onrender.com/api/author/loginAuthor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const { token, author } = data;
      if (token && author && author._id) {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("id", author._id);
        openSuccessSB();
        setTimeout(() => {
          navigate("/wDashboard");
        }, 1000); // Delay the navigation by 1 second to allow snackbar display
      } else {
        setErrorMessage("Login unsuccessful. Please try again later.");
        openErrorSB();
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Please enter valid email and password!");
      openErrorSB();
    }
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleShowNewPassword = () => setShowNewPassword(!showNewPassword);

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
            Author Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}></Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value.trim())}
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
                <MDTypography
                  component={Link}
                  variant="button"
                  to="/forgot-pass"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Forgot password?
                </MDTypography>
                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text" mt={1}>
                    <Link to="/authentication/sign-in" style={{ color: "inherit" }}>
                      If you are admin, click here
                    </Link>
                  </MDTypography>
                </MDBox>
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

export default WriterSignIn;
