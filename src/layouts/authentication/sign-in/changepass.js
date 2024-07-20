// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Card from "@mui/material/Card";
// import Grid from "@mui/material/Grid";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";
// import BasicLayout from "layouts/authentication/components/BasicLayout";
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// function ChangePassword() {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (newPassword !== confirmNewPassword) {
//       alert("New password and confirm new password do not match.");
//       return;
//     }

//     try {
//       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY2NWYwNTlmM2UwNGRjNmU2ODcyNGQwMSJ9LCJpYXQiOjE3MTc1MDMzOTF9.qDflDqxd2PE4YO9VSNjiV7mMEOrn3ZF3X1nHcxx6YTk";
//       const response = await fetch("https://ecomm-backend-2xs6.onrender.com/api/admin/change-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": token,
//         },
//         body: JSON.stringify({ oldPassword, newPassword }),
//       });

//       const data = await response.json();
//       console.log(data);
//       if (data.success) {
//         alert("Password changed successfully.");
//         navigate("/dashboard");
//       } else {
//         alert("Password change failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("There was an error changing the password!", error);
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
//             Change Password
//           </MDTypography>
//         </MDBox>
//         <MDBox pt={4} pb={3} px={3}>
//           <MDBox component="form" role="form" onSubmit={handleSubmit}>
//             <MDBox mb={2}>
//               <MDInput
//                 type="password"
//                 label="Old Password"
//                 fullWidth
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//               />
//             </MDBox>
//             <MDBox mb={2}>
//               <MDInput
//                 type="password"
//                 label="New Password"
//                 fullWidth
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//             </MDBox>
//             <MDBox mb={2}>
//               <MDInput
//                 type="password"
//                 label="Confirm New Password"
//                 fullWidth
//                 value={confirmNewPassword}
//                 onChange={(e) => setConfirmNewPassword(e.target.value)}
//               />
//             </MDBox>
//             <MDBox mt={4} mb={1}>
//               <MDButton variant="gradient" color="info" fullWidth type="submit">
//                 Change Password
//               </MDButton>
//             </MDBox>
//           </MDBox>
//         </MDBox>
//       </Card>
//     </BasicLayout>
//   );
// }

// export default ChangePassword;


import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MDSnackbar from "components/MDSnackbar";
import { IconButton, InputAdornment } from "@mui/material";


// import
const Changepassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("chemToken");

  useEffect(() => {
    if (!token) {
      navigate("/authentication/sign-in");
    }
  }, [token, navigate]);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Successful"
      content="Password Changed Successfully."
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
      title="Error"
      content={errorMessage}
      dateTime="1 sec ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwords;

    if (!oldPassword.trim() && !newPassword.trim() && !confirmPassword.trim()) {
      setErrorMessage("Please Fill All Fields!");
      openErrorSB();
      return;
    }

    if (!oldPassword.trim()) {
      setErrorMessage("Please Enter Old Password!");
      openErrorSB();
      return;
    }

    if (!newPassword.trim()) {
      setErrorMessage("Please Enter New Password!");
      openErrorSB();
      return;
    }

    if (!confirmPassword.trim()) {
      setErrorMessage("Please Confirm Your Password!");
      openErrorSB();
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Please Enter Confirm Password as a New Password!");
      openErrorSB();
      return;
    }

    if (oldPassword === newPassword && newPassword === confirmPassword) {
      setErrorMessage("New password can't be the same as the old password.");
      openErrorSB();
      return;
    }

    const authToken = localStorage.getItem("token");
    const response = await fetch(`https://bookreading-app.onrender.com/api/admin/changePassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({
        currentPassword: oldPassword.trim(),
        newPassword: newPassword.trim(),
      }),
    });

    if (response.ok) {
      openSuccessSB();
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      const responseData = await response.json();
      if (response.status === 401) {
        setErrorMessage("Your Old Password Is Wrong!");
      } else {
        setErrorMessage(responseData.message || "An error occurred");
      }
      openErrorSB();
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
                style={{ position: "relative" }}
              >
                <MDTypography variant="h6" color="white">
                  Change Password
                </MDTypography>
              </MDBox>
              <MDBox py={3} px={2}>
                <Grid container pt={4} pb={3} px={3}>
                  <Grid item xs={12} md={6} xl={6} px={2} m={"auto"}>
                    <MDBox mb={2}>
                      <MDInput
                        type={showOldPassword ? "text" : "password"}
                        label="Old Password"
                        name="oldPassword"
                        fullWidth
                        value={passwords.oldPassword}
                        onChange={handlePasswordChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleShowOldPassword}>
                                {showOldPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        style={{ marginBottom: "20px" }}
                      />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput
                        type={showNewPassword ? "text" : "password"}
                        label="New Password"
                        name="newPassword"
                        fullWidth
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
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
                    <MDBox mb={2}>
                      <MDInput
                        type={showConfirmPassword ? "text" : "password"}
                        label="Confirm Password"
                        name="confirmPassword"
                        fullWidth
                        value={passwords.confirmPassword}
                        onChange={handlePasswordChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleShowConfirmPassword}>
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Submit
                      </MDButton>
                      {renderSuccessSB}
                      {renderErrorSB}
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default Changepassword;

