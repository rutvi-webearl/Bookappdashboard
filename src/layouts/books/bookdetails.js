// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Grid, Card } from "@mui/material";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import CircularProgress from "@mui/material/CircularProgress";

// function Bookdetails() {
//   const navigate = useNavigate();
//   const { bookId } = useParams(); // Retrieve bookId from route parameter
//   const [bookDetails, setBookDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc0MjQ5MDc0MTkwOWE0NDA4NTIwOTUiLCJpYXQiOjE3MTk1NTY5NzMsImV4cCI6MTcyMDQyMDk3M30.BcQ3tLRJs7Qs_0Eb-2o0ZVAmcKBJry1kd4kLYDyVho4';
//         const response = await fetch(
//           `https://bookingreadingapp.onrender.com/api/book/bookDetail/${bookId}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: token,
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch book details");
//         }
//         const data = await response.json();
//         setBookDetails(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching the book details", error);
//         setLoading(false);
//         setBookDetails(null); // Set bookDetails to null on error
//       }
//     };

//     fetchBookDetails();
//   }, [bookId]);

//   const handleStatusChange = async (newStatus) => {
//     try {
//       const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc0MjQ5MDc0MTkwOWE0NDA4NTIwOTUiLCJpYXQiOjE3MTk1NTY5NzMsImV4cCI6MTcyMDQyMDk3M30.BcQ3tLRJs7Qs_0Eb-2o0ZVAmcKBJry1kd4kLYDyVho4';
//       const response = await fetch(
//         `https://bookingreadingapp.onrender.com/api/admin/changeStatusBook/${bookId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//           body: JSON.stringify({ status: newStatus }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to update book status");
//       }
//       // Update bookDetails with new status
//       setBookDetails({ ...bookDetails, status: newStatus });
      
//       // Redirect to /booklist page
//       navigate('/booklist');
//     } catch (error) {
//       console.error("Error updating the book status", error);
//     }
//   };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <DashboardNavbar />
//         <MDBox mt={6} mb={3} sx={{ display: "flex", justifyContent: "center" }}>
//           <CircularProgress />
//         </MDBox>
//         <Footer />
//       </DashboardLayout>
//     );
//   }

//   if (!bookDetails) {
//     return (
//       <DashboardLayout>
//         <DashboardNavbar />
//         <MDBox mt={6} mb={3}>
//           <MDTypography variant="h6">Book details not found.</MDTypography>
//         </MDBox>
//         <Footer />
//       </DashboardLayout>
//     );
//   }

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
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//               >
//                 <MDTypography variant="h6" color="white">
//                   Book Details
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3} px={2}>
//                 <MDTypography variant="h6">Title: {bookDetails.book_title}</MDTypography>
//                 <MDTypography variant="body1">Description: {bookDetails.book_description}</MDTypography>
//                 <img src={bookDetails.book_cover_photo} alt="Book Cover" style={{ width: '200px', height: 'auto', borderRadius: '5px', marginTop: '10px' }} />
//                 <MDTypography variant="body2" mt={2}>
//                   Status: {bookDetails.status}
//                 </MDTypography>
//                 <MDTypography variant="body1">
//                 Book Content:
//                 {bookDetails.book_page.map((page, index) => (
//                     <div key={index}>
//                     Page {page.page_no}: {page.content}
//                     </div>
//                 ))}
//                 </MDTypography>
//                 <MDBox mt={2}>
//                   <MDButton onClick={() => handleStatusChange("approve")} color="success">Approve</MDButton>
//                   <MDButton onClick={() => handleStatusChange("decline")} color="error">Decline</MDButton>
//                 </MDBox>
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Bookdetails;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Grid, Card } from "@mui/material";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import CircularProgress from "@mui/material/CircularProgress";

// function Bookdetails() {
//   const navigate = useNavigate();
//   const { bookId } = useParams(); // Retrieve bookId from route parameter
//   const [bookDetails, setBookDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc0MjQ5MDc0MTkwOWE0NDA4NTIwOTUiLCJpYXQiOjE3MTk1NTY5NzMsImV4cCI6MTcyMDQyMDk3M30.BcQ3tLRJs7Qs_0Eb-2o0ZVAmcKBJry1kd4kLYDyVho4';
//         const response = await fetch(
//           `https://bookingreadingapp.onrender.com/api/book/bookDetail/${bookId}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: token,
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch book details");
//         }
//         const data = await response.json();
//         setBookDetails(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching the book details", error);
//         setLoading(false);
//         setBookDetails(null); // Set bookDetails to null on error
//       }
//     };

//     fetchBookDetails();
//   }, [bookId]);

//   const handleStatusChange = async (newStatus) => {
//     try {
//       const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc0MjQ5MDc0MTkwOWE0NDA4NTIwOTUiLCJpYXQiOjE3MTk1NTY5NzMsImV4cCI6MTcyMDQyMDk3M30.BcQ3tLRJs7Qs_0Eb-2o0ZVAmcKBJry1kd4kLYDyVho4';
//       const response = await fetch(
//         `https://bookingreadingapp.onrender.com/api/admin/changeStatusBook/${bookId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//           body: JSON.stringify({ status: newStatus }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to update book status");
//       }
//       // Update bookDetails with new status
//       setBookDetails({ ...bookDetails, status: newStatus });
      
//       // Redirect to /booklist page
//       navigate('/booklist');
//     } catch (error) {
//       console.error("Error updating the book status", error);
//     }
//   };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <DashboardNavbar />
//         <MDBox mt={6} mb={3} sx={{ display: "flex", justifyContent: "center" }}>
//           <CircularProgress />
//         </MDBox>
//         <Footer />
//       </DashboardLayout>
//     );
//   }

//   if (!bookDetails) {
//     return (
//       <DashboardLayout>
//         <DashboardNavbar />
//         <MDBox mt={6} mb={3}>
//           <MDTypography variant="h6">Book details not found.</MDTypography>
//         </MDBox>
//         <Footer />
//       </DashboardLayout>
//     );
//   }

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
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//               >
//                 <MDTypography variant="h6" color="white" fontWeight="bold">
//                   Book Details
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3} px={2} fontFamily="Roboto" fontSize="16px">
//                 <MDTypography variant="h4" fontWeight="bold">Title: {bookDetails.book_title}</MDTypography>
//                 <MDTypography variant="body1">Description: {bookDetails.book_description}</MDTypography>
//                 <img src={bookDetails.book_cover_photo} alt="Book Cover" style={{ width: '200px', height: 'auto', borderRadius: '5px', marginTop: '10px' }} />
//                 <MDTypography variant="body1">
//                   Book Content:
//                   {bookDetails.book_page.map((page, index) => (
//                     <div key={index}>
//                       Page {page.page_no}: {page.content}
//                     </div>
//                   ))}
//                 </MDTypography>
//                 <MDTypography variant="body1" mt={2}>
//                   Status: {bookDetails.status}
//                 </MDTypography>
//                 <MDBox mt={2}>
//                   <MDButton onClick={() => handleStatusChange("approve")} color="success" sx={{ mr: 2 }}>
//                     Approve
//                   </MDButton>
//                   <MDButton onClick={() => handleStatusChange("decline")} color="error">
//                     Decline
//                   </MDButton>
//                 </MDBox>
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Bookdetails;









import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Card, Grow } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CircularProgress from "@mui/material/CircularProgress";

function Bookdetails() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc0MjQ5MDc0MTkwOWE0NDA4NTIwOTUiLCJpYXQiOjE3MTk1NTY5NzMsImV4cCI6MTcyMDQyMDk3M30.BcQ3tLRJs7Qs_0Eb-2o0ZVAmcKBJry1kd4kLYDyVho4';
        const response = await fetch(
          `https://bookingreadingapp.onrender.com/api/book/bookDetail/${bookId}`,
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        setBookDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the book details", error);
        setLoading(false);
        setBookDetails(null);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleStatusChange = async (newStatus) => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc0MjQ5MDc0MTkwOWE0NDA4NTIwOTUiLCJpYXQiOjE3MTk1NTY5NzMsImV4cCI6MTcyMDQyMDk3M30.BcQ3tLRJs7Qs_0Eb-2o0ZVAmcKBJry1kd4kLYDyVho4';
      const response = await fetch(
        `https://bookingreadingapp.onrender.com/api/admin/changeStatusBook/${bookId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update book status");
      }
      setBookDetails({ ...bookDetails, status: newStatus });
      navigate('/booklist');
    } catch (error) {
      console.error("Error updating the book status", error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={6} mb={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  if (!bookDetails) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={6} mb={3}>
          <MDTypography variant="h6">Book details not found.</MDTypography>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Grow in={true}>
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
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MDTypography variant="h6" color="white" fontWeight="bold">
                    Book Details
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} px={2} fontFamily="Roboto" fontSize="16px">
                  <Grid container spacing={2}>
                    <Grid item xs={4} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                      <MDTypography
                        variant="h4"
                        fontWeight="bold"
                        fontFamily="Arial, Helvetica, sans-serif"
                        sx={{
                          color: '#3f51b5',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                          letterSpacing: '2px',
                          borderBottom: '2px solid #3f51b5',
                          paddingBottom: '10px',
                          display: 'inline-block',
                          marginBottom: '20px',
                          textAlign: 'left',
                        }}
                      >
                        Title: {bookDetails.book_title}
                      </MDTypography>
                      <img
                        src={bookDetails.book_cover_photo}
                        alt="Book Cover"
                        style={{ width: '300px', height: 'auto', borderRadius: '5px', marginTop: '10px' }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <MDTypography variant="body1" mt={2}>
                        Description: {bookDetails.book_description}
                      </MDTypography>
                      <MDTypography variant="body1" mt={2}>
                        Book Content:
                        {bookDetails.book_page.map((page, index) => (
                          <div key={index}>
                            Page {page.page_no}: {page.content}
                          </div>
                        ))}
                      </MDTypography>
                    </Grid>
                  </Grid>
                  <MDTypography variant="body1" mt={2} textAlign="right" color="text.secondary">
                    Status: {bookDetails.status}
                  </MDTypography>
                  <MDBox mt={2} display="flex" justifyContent="flex-end" mb={2}>
                    {bookDetails.status === "pending" && (
                      <>
                        <MDButton onClick={() => handleStatusChange("approve")} color="success" sx={{ mr: 2, mb: 1 }}>
                          Approve
                        </MDButton>
                        <MDButton onClick={() => handleStatusChange("decline")} color="error" sx={{ mb: 1 }}>
                          Decline
                        </MDButton>
                      </>
                    )}
                    {bookDetails.status === "approve" && (
                      <MDButton onClick={() => handleStatusChange("decline")} color="error" sx={{ mb: 1 }}>
                        Decline
                      </MDButton>
                    )}
                    {bookDetails.status === "decline" && (
                      <MDButton onClick={() => handleStatusChange("approve")} color="success" sx={{ mb: 1 }}>
                        Approve
                      </MDButton>
                    )}
                  </MDBox>
                </MDBox>
              </Card>
            </Grow>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
  
}

export default Bookdetails;
