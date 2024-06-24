// /**
// =========================================================
// * Material Dashboard 2 React - v2.2.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// // @mui material components
// import Card from "@mui/material/Card";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";

// // Authentication layout components
// import CoverLayout from "layouts/authentication/components/CoverLayout";

// // Images
// import bgImage from "assets/images/bg-reset-cover.jpeg";

// function Cover() {
//   return (
//     <CoverLayout coverHeight="50vh" image={bgImage}>
//       <Card>
//         <MDBox
//           variant="gradient"
//           bgColor="info"
//           borderRadius="lg"
//           coloredShadow="success"
//           mx={2}
//           mt={-3}
//           py={2}
//           mb={1}
//           textAlign="center"
//         >
//           <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
//             Reset Password
//           </MDTypography>
//           <MDTypography display="block" variant="button" color="white" my={1}>
//             You will receive an e-mail in maximum 60 seconds
//           </MDTypography>
//         </MDBox>
//         <MDBox pt={4} pb={3} px={3}>
//           <MDBox component="form" role="form">
//             <MDBox mb={4}>
//               <MDInput type="email" label="Email" variant="standard" fullWidth />
//             </MDBox>
//             <MDBox mt={6} mb={1}>
//               <MDButton variant="gradient" color="info" fullWidth>
//                 reset
//               </MDButton>
//             </MDBox>
//           </MDBox>
//         </MDBox>
//       </Card>
//     </CoverLayout>
//   );
// }

// export default Cover;

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

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

function Cover() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your reset password logic here
    console.log("Form submitted!");
    // Reset form fields or perform other actions
  };

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail in maximum 60 seconds
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={4}>
              <MDInput type="email" label="Email" variant="standard" fullWidth required />
            </MDBox>
            <MDBox mb={4}>
              <MDInput type="password" label="New Password" variant="standard" fullWidth required />
            </MDBox>
            <MDBox mb={4}>
              <MDInput type="password" label="Confirm Password" variant="standard" fullWidth required />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Reset
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
