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
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       console.log("Attempting login with name:", name, "and mobile:", mobile);
//       const response = await fetch(
//         "https://bookingreadingapp.onrender.com/api/author/loginAuthor",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ name, mobile }),
//         }
//       );

//       console.log("Login response status:", response.status);

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Full login response:", data);

//         const { token, author } = data;
//         if (token && author && author._id) {
//           localStorage.setItem("token", token);
//           localStorage.setItem("name", name);
//           localStorage.setItem("id", author._id); // Store _id in localStorage
//           console.log(
//             "Authentication token, name, and _id received and stored:",
//             token,
//             name,
//             author._id
//           );

//           // Directly navigate to the dashboard or another route
//           navigate("/dashboard");
//         } else {
//           console.log("Login failed:", data);
//           alert("Login failed. Please check your name and mobile number.");
//         }
//       } else {
//         const errorText = await response.text();
//         throw new Error(
//           `Login failed: ${response.status} - ${errorText || response.statusText}`
//         );
//       }
//     } catch (error) {
//       console.error("There was an error logging in:", error);
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
//               <MDTypography
//                 component={MuiLink}
//                 href="#"
//                 variant="body1"
//                 color="white"
//               >
//                 <FacebookIcon color="inherit" />
//               </MDTypography>
//             </Grid>
//             <Grid item xs={2}>
//               <MDTypography
//                 component={MuiLink}
//                 href="#"
//                 variant="body1"
//                 color="white"
//               >
//                 <GitHubIcon color="inherit" />
//               </MDTypography>
//             </Grid>
//             <Grid item xs={2}>
//               <MDTypography
//                 component={MuiLink}
//                 href="#"
//                 variant="body1"
//                 color="white"
//               >
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
//                 label="Name"
//                 fullWidth
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </MDBox>
//             <MDBox mb={2}>
//               <MDInput
//                 type="text"
//                 label="Mobile"
//                 fullWidth
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
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
//               <MDTypography variant="button" color="text">
//                 Don't have an account?{" "}
//                 <MDTypography
//                   component={Link}
//                   to="/authentication/sign-up"
//                   variant="button"
//                   color="info"
//                   fontWeight="medium"
//                   textGradient
//                 >
//                   Sign up
//                 </MDTypography>
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
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
// import BasicLayout from "layouts/authentication/components/BasicLayout";
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// import MDSnackbar from "components/MDSnackbar"; 

// function WriterSignIn() {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", color: "" }); 
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!name.trim()) {
//       setSnackbar({ open: true, message: "Name cannot be empty.", color: "error" });
//       return;
//     }
//     if (!/^\d+$/.test(mobile)) {
//       setSnackbar({ open: true, message: "Mobile number must be digits only with no spaces.", color: "error" });
//       return;
//     }
//     if (mobile.length !== 10) {
//       setSnackbar({ open: true, message: "Mobile number must be 10 digits long.", color: "error" });
//       return;
//     }
//     try {
//       const response = await fetch(
//         "https://bookingreadingapp.onrender.com/api/author/loginAuthor",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ name, mobile }),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         const { token, author } = data;
//         if (token && author && author._id) {
//           localStorage.setItem("token", token);
//           localStorage.setItem("name", name);
//           localStorage.setItem("id", author._id);
//           setSnackbar({ open: true, message: "Login successful!", color: "success" });
//           setTimeout(() => {
//             navigate("/dashboard");
//           }, 1500); 
//         } else {
//           setSnackbar({ open: true, message: "Login failed. Please check your name and mobile number.", color: "error" });
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

//   const handleMobileChange = (e) => {
//     const input = e.target.value;
//     // Remove non-numeric characters
//     const formattedInput = input.replace(/\D/g, "");
//     // Validate if input is only numeric and length is not more than 10 digits
//     if (!/^\d{0,10}$/.test(formattedInput)) {
//       setSnackbar({ open: true, message: "Mobile number can only contain digits and must be 10 digits long.", color: "error" });
//       return;
//     }
//     setMobile(formattedInput);
//   };

//   const handleNameChange = (e) => {
//     const input = e.target.value;
//     if (input.startsWith(" ")) {
//       return; // Do not allow leading spaces
//     }
//     setName(input);
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
//            {/* Commented out icons */}
//            {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
//              <Grid item xs={2}>
//                <MDTypography
//                  component={MuiLink}
//                  href="#"
//                  variant="body1"
//                  color="white"
//                >
//                  <FacebookIcon color="inherit" />
//                </MDTypography>
//              </Grid>
//              <Grid item xs={2}>
//                <MDTypography
//                  component={MuiLink}
//                  href="#"
//                  variant="body1"
//                  color="white"
//                >
//                  <GitHubIcon color="inherit" />
//                </MDTypography>
//              </Grid>
//              <Grid item xs={2}>
//                <MDTypography
//                  component={MuiLink}
//                  href="#"
//                  variant="body1"
//                  color="white"
//                >
//                  <GoogleIcon color="inherit" />
//                </MDTypography>
//              </Grid>
//            </Grid> */}
//         </MDBox>
//         <MDBox pt={4} pb={3} px={3}>
//           <MDBox component="form" role="form" onSubmit={handleSubmit}>
//             <MDBox mb={2}>
//               <MDInput
//                 type="text"
//                 label="Name"
//                 fullWidth
//                 value={name}
//                 onChange={handleNameChange}
//               />
//             </MDBox>
//             <MDBox mb={2}>
//               <MDInput
//                 type="text"
//                 label="Mobile"
//                 fullWidth
//                 value={mobile}
//                 onChange={handleMobileChange}
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
//             </MDBox>
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

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "writerlayouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import MDSnackbar from "components/MDSnackbar";

function WriterSignIn() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", color: "" });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) {
      setSnackbar({ open: true, message: "Name cannot be empty.", color: "error" });
      return;
    }
    if (!/^\d+$/.test(mobile)) {
      setSnackbar({ open: true, message: "Mobile number must be digits only with no spaces.", color: "error" });
      return;
    }
    if (mobile.length !== 10) {
      setSnackbar({ open: true, message: "Mobile number must be 10 digits long.", color: "error" });
      return;
    }
    try {
      // Simulating a login request
      const response = await fetch("https://bookingreadingapp.onrender.com/api/author/loginAuthor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, mobile }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, author } = data;
        if (token && author && author._id) {
          localStorage.setItem("token", token);
          localStorage.setItem("name", name);
          localStorage.setItem("id", author._id);

          // Navigate to a route handled by writerroutes
          navigate("/wDashboard"); // Example route handled by writerroutes
        } else {
          setSnackbar({ open: true, message: "Login failed. Please check your name and mobile number.", color: "error" });
        }
      } else {
        const errorText = await response.text();
        throw new Error(`Login failed: ${response.status} - ${errorText || response.statusText}`);
      }
    } catch (error) {
      console.error("There was an error logging in:", error);
      setSnackbar({ open: true, message: "An error occurred. Please try again.", color: "error" });
    }
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const handleMobileChange = (e) => {
    const input = e.target.value;
    // Remove non-numeric characters
    const formattedInput = input.replace(/\D/g, "");
    // Validate if input is only numeric and length is not more than 10 digits
    if (!/^\d{0,10}$/.test(formattedInput)) {
      setSnackbar({ open: true, message: "Mobile number can only contain digits and must be 10 digits long.", color: "error" });
      return;
    }
    setMobile(formattedInput);
  };

  const handleNameChange = (e) => {
    const input = e.target.value;
    if (input.startsWith(" ")) {
      return; // Do not allow leading spaces
    }
    setName(input);
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
                label="Name"
                fullWidth
                value={name}
                onChange={handleNameChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Mobile"
                fullWidth
                value={mobile}
                onChange={handleMobileChange}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={false} onChange={() => {}} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
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
              <MDTypography variant="button" color="text">
                Don't have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/writer-signup"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <MDSnackbar
        color={snackbar.color}
        icon="notifications"
        title="Login"
        content={snackbar.message}
        open={snackbar.open}
        onClose={handleSnackbarClose}
        close={handleSnackbarClose}
        bgWhite
      />
    </BasicLayout>
  );
}

export default WriterSignIn;

