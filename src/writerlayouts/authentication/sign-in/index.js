

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
