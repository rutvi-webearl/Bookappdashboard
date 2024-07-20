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

// import { useState, useEffect } from "react";
// import { Grid, Card } from "@mui/material";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAlert from "components/MDAlert";
// import MDButton from "components/MDButton";
// import MDSnackbar from "components/MDSnackbar";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import CircularProgress from '@mui/material/CircularProgress';
// import TableContainer from '@mui/material/TableContainer';
// import Table from '@mui/material/Table';
// import TableHead from '@mui/material/TableHead';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// // Assuming DataTable component exists and is imported correctly
// import DataTable from 'examples/Tables/DataTable';

// function Booklist() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch('https://bookingreadingapp.onrender.com/api/book/displayAllBook', {
//           method: 'GET',
//           headers: {
//             'Authorization': token
//           }
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch books');
//         }
//         const data = await response.json();
//         setBooks(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching the books", error);
//         setLoading(false);
//         setBooks([]); // Set books to empty array on error
//       }
//     };

//     fetchBooks();
//   }, []);

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <DashboardNavbar />
//         <MDBox mt={6} mb={3} sx={{ display: 'flex', justifyContent: 'center' }}>
//           <CircularProgress />
//         </MDBox>
//         <Footer />
//       </DashboardLayout>
//     );
//   }

//   const columns = [
//     {
//         Header: 'Cover Photo',
//         accessor: 'book_cover_photo',
//         width: '10%',
//         Cell: ({ value }) => (
//           <img
//             src={value} 
            
//             style={{
//               width: '50px',
//               height: '50px',
//               borderRadius: '50%',
//               objectFit: 'cover'
//             }}
//           />
//         )
//       },
//     { Header: 'Title', key: 'book_title', accessor: 'book_title' },
//     { Header: 'Description', key: 'book_description', accessor: 'book_description' },
//     // { Header: 'Cover Photo', key: 'book_cover_photo', accessor: 'book_cover_photo' },
//     { Header: 'Created At', key: 'createdAt', accessor: 'createdAt' },
//     { Header: 'Updated At', key: 'updatedAt', accessor: 'updatedAt' }
//   ];
  
//   const rows = books.map((book) => ({
//     book_title: book.book_title,
//     book_description: book.book_description,
//     book_cover_photo: <img src={book.book_cover_photo} alt={book.book_title} style={{ width: '100px', height: 'auto' }} />,
//     createdAt: new Date(book.createdAt).toLocaleString(),
//     updatedAt: new Date(book.updatedAt).toLocaleString(),
//   }));
  

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
//                   Book List
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3}>
//                 <DataTable
//                   table={{ columns, rows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Booklist;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
// import { Grid, Card } from "@mui/material";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import CircularProgress from "@mui/material/CircularProgress";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

// function Booklist() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(
//           "https://bookingreadingapp.onrender.com/api/book/displayAllBook",
//           {
//             method: "GET",
//             headers: {
//               Authorization: token,
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch books");
//         }
//         const data = await response.json();
//         setBooks(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching the books", error);
//         setLoading(false);
//         setBooks([]); // Set books to empty array on error
//       }
//     };

//     fetchBooks();
//   }, []);

//   const handleShowDetails = (bookId) => {
//     // Redirect to Bookdetails page with bookId as route parameter
//     navigate(`/bookdetails/${bookId}`);
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

//   const columns = [
//     {
//       Header: "Cover Photo",
//       accessor: "book_cover_photo",
//       width: "10%",
//       Cell: ({ value }) => (
//         <img
//           src={value}
//           style={{
//             width: "50px",
//             height: "50px",
//             borderRadius: "50%",
//             objectFit: "cover",
//           }}
//         />
//       ),
//     },
//     { Header: "Title", accessor: "book_title" },
//     { Header: "Author", accessor: "authorDetails.name" },
//     { Header: "Description", accessor: "book_description" },
//     { Header: "Created At", accessor: "createdAt" },
//     { Header: "Updated At", accessor: "updatedAt" },
//     {
//       Header: "Status",
//       accessor: "status",
//       Cell: ({ value }) => <span>{value}</span>, // Render status value
//     },
//     {
//       Header: "Actions",
//       accessor: "actions",
//       Cell: ({ row }) => (
//         <button onClick={() => handleShowDetails(row.original._id)}>
//           Show Details
//         </button>
//       ),
//     },
//   ];

//   const rows = books.map((book) => ({
//     book_title: book.book_title,
//     book_description: book.book_description,
//     book_cover_photo: book.book_cover_photo,
//     createdAt: new Date(book.createdAt).toLocaleString(),
//     updatedAt: new Date(book.updatedAt).toLocaleString(),
//     status: book.status, // Assuming you have a 'status' field in your book object
//     authorDetails: book.authorDetails,
//     actions: "actions", // Placeholder for actions, not used in data mapping
//     _id: book._id, // Store book ID for Show Details action
//   }));

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
//                   Book List
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3}>
//                 <DataTable
//                   table={{ columns, rows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Booklist;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import { Grid, Card } from "@mui/material";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import CircularProgress from "@mui/material/CircularProgress";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// function Booklist() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(
//           "https://bookingreadingapp.onrender.com/api/book/displayAllBook",
//           {
//             method: "GET",
//             headers: {
//               Authorization: token,
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch books");
//         }
//         const data = await response.json();
//         setBooks(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching the books", error);
//         setLoading(false);
//         setBooks([]); // Set books to empty array on error
//       }
//     };

//     fetchBooks();
//   }, []);

//   const handleShowDetails = (bookId) => {
//     // Redirect to Bookdetails page with bookId as route parameter
//     navigate(`/bookdetails/${bookId}`);
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

//   const columns = [
//     // {
//     //   Header: "Cover Photo",
//     //   accessor: "book_cover_photo",
//     //   width: "10%",
//     //   Cell: ({ value }) => (
//     //     <img
//     //       src={value}
//     //       style={{
//     //         width: "50px",
//     //         height: "50px",
//     //         borderRadius: "50%",
//     //         objectFit: "cover",
//     //       }}
//     //     />
//     //   ),
//     // },
//     {
//       Header: "Book",
//       accessor: "book_title",
//       Cell: ({ row }) => (
//         <>
//           <img
//             src={row.original.book_cover_photo}
//             style={{
//               width: "50px",
//               height: "50px",
//               borderRadius: "50%",
//               objectFit: "cover",
//               marginBottom: "5px",
//             }}
//           />
//           <div>{row.original.book_title}</div>
//         </>
//       ),
//     },
//     {
//       Header: "Author",
//       accessor: "authorDetails",
//       Cell: ({ row }) => (
//         <>
//           <img
//             src={row.original.authorDetails.photo}
//             style={{
//               width: "50px",
//               height: "50px",
//               borderRadius: "50%",
//               objectFit: "cover",
//               marginBottom: "5px",
//             }}
//           />
//           <div>{row.original.authorDetails.name}</div>
//         </>
//       ),
//     },
    
//     {
//       Header: "Description",
//       accessor: "book_description",
//     },
//     {
//       Header: "Created At",
//       accessor: "createdAt",
//       Cell: ({ value }) => {
//         const date = new Date(value);
//         const formattedDate = date.toLocaleDateString();
//         const formattedTime = date.toLocaleTimeString();
//         return (
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//           <div>{formattedDate}</div>
//           <div>{formattedTime}</div>
//         </div>
//         );
//       },
//     },
 
//     {
//       Header: "Status",
//       accessor: "status",
//       Cell: ({ value }) => <span>{value}</span>, 
//     },
//     {
//       Header: "Show Details",
//       accessor: "_id",
//       Cell: ({ value }) => (
//         <VisibilityIcon
//         sx={{ fontSize: '100px', cursor: 'pointer', color: 'blue' }}
//           onClick={() => handleShowDetails(value)}
//         />
//       ),
//     },
//   ];

//   const rows = books.map((book) => ({
//     book_title: book.book_title,
//     book_description: book.book_description,
//     book_cover_photo: book.book_cover_photo,
//     createdAt: book.createdAt,
//     updatedAt: book.updatedAt,
//     status: book.status,
//     authorDetails: {
//       name: book.authorDetails.name,
//       photo: book.authorDetails.photo, // Assuming photo field exists in authorDetails
//     },
//     _id: book._id,
//   }));

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
//                   Book List
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3} style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                 <DataTable
//                   table={{ columns, rows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Booklist;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Grid, Card } from "@mui/material";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import CircularProgress from "@mui/material/CircularProgress";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// function Booklist() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(
//           "https://bookingreadingapp.onrender.com/api/book/displayAllBook",
//           {
//             method: "GET",
//             headers: {
//               Authorization: token,
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch books");
//         }
//         const data = await response.json();
//         setBooks(data);
//         setLoading(false);
//         setFilteredBooks(data); // Initialize filtered books with all books
//       } catch (error) {
//         console.error("Error fetching the books", error);
//         setLoading(false);
//         setBooks([]);
//         setFilteredBooks([]);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const handleShowDetails = (bookId) => {
//     navigate(`/bookdetails/${bookId}`);
//   };

//   const handleSearch = (searchValue) => {
//     if (searchValue.trim() === "") {
//       setFilteredBooks(books); // Reset to all books if search is empty
//     } else {
//       const filtered = books.filter((book) =>
//         book.book_title.toLowerCase().includes(searchValue.toLowerCase()) ||
//         book.authorDetails.name.toLowerCase().includes(searchValue.toLowerCase())
//       );
//       setFilteredBooks(filtered);
//     }
//   };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <DashboardNavbar onSearch={handleSearch} />
//         <MDBox mt={6} mb={3} sx={{ display: "flex", justifyContent: "center" }}>
//           <CircularProgress />
//         </MDBox>
//         <Footer />
//       </DashboardLayout>
//     );
//   }

//   const columns = [
//     {
//       Header: "Book",
//       accessor: "book_title",
//       Cell: ({ row }) => (
//         <>
//           <img
//             src={row.original.book_cover_photo}
//             style={{
//               width: "50px",
//               height: "50px",
//               borderRadius: "50%",
//               objectFit: "cover",
//               marginBottom: "5px",
//             }}
//           />
//           <div>{row.original.book_title}</div>
//         </>
//       ),
//     },
//     {
//       Header: "Author",
//       accessor: "authorDetails",
//       Cell: ({ row }) => (
//         <>
//           <img
//             src={row.original.authorDetails.photo}
//             style={{
//               width: "50px",
//               height: "50px",
//               borderRadius: "50%",
//               objectFit: "cover",
//               marginBottom: "5px",
//             }}
//           />
//           <div>{row.original.authorDetails.name}</div>
//         </>
//       ),
//     },
//     {
//       Header: "Category",
//       accessor: "categoryDetails",
//       Cell: ({ row }) => (
//         <div>{row.original.categoryDetails.name}</div>
//       ),
//     },
//     {
//       Header: "Description",
//       accessor: "book_description",
//     },
//     {
//       Header: "Created At",
//       accessor: "createdAt",
//       Cell: ({ value }) => {
//         const date = new Date(value);
//         const formattedDate = date.toLocaleDateString();
//         const formattedTime = date.toLocaleTimeString();
//         return (
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//             <div>{formattedDate}</div>
//             <div>{formattedTime}</div>
//           </div>
//         );
//       },
//     },
//     {
//       Header: "Status",
//       accessor: "status",
//       Cell: ({ value }) => <span>{value}</span>,
//     },
//     {
//       Header: "Show Details",
//       accessor: "_id",
//       Cell: ({ value }) => (
//         <VisibilityIcon
//           sx={{ fontSize: "100px", cursor: "pointer", color: "blue" }}
//           onClick={() => handleShowDetails(value)}
//         />
//       ),
//     },
//   ];

//   const rows = filteredBooks.map((book) => ({
//     book_title: book.book_title,
//     book_description: book.book_description,
//     book_cover_photo: book.book_cover_photo,
//     createdAt: book.createdAt,
//     updatedAt: book.updatedAt,
//     status: book.status,
//     authorDetails: {
//       name: book.authorDetails.name,
//       photo: book.authorDetails.photo,
//     },
//     categoryDetails: {
//       name: book.categoryDetails.name,
//     },
//     _id: book._id,
//   }));

//   return (
//     <DashboardLayout>
//       <DashboardNavbar onSearch={handleSearch} />
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
//                   Book List
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3} style={{ maxHeight: "400px", overflowY: "auto" }}>
//                 <DataTable
//                   table={{ columns, rows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Booklist;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Grid, Card } from "@mui/material";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import CircularProgress from "@mui/material/CircularProgress";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// function Booklist() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(
//           "https://bookreading-app.onrender.com/api/book/displayAllBook",
//           {
//             method: "GET",
//             headers: {
//               Authorization: token,
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch books");
//         }
//         const data = await response.json();
//         setBooks(data);
//         setLoading(false);
//         setFilteredBooks(data); // Initialize filtered books with all books
//       } catch (error) {
//         console.error("Error fetching the books", error);
//         setLoading(false);
//         setBooks([]);
//         setFilteredBooks([]);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const handleShowDetails = (bookId) => {
//     navigate(`/bookdetails/${bookId}`);
//   };

//   const handleSearch = (searchValue) => {
//     if (searchValue.trim() === "") {
//       setFilteredBooks(books); // Reset to all books if search is empty
//     } else {
//       const filtered = books.filter((book) =>
//         book.book_title.toLowerCase().includes(searchValue.toLowerCase()) ||
//         (book.authorDetails && book.authorDetails.name.toLowerCase().includes(searchValue.toLowerCase()))
//       );
//       setFilteredBooks(filtered);
//     }
//   };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <DashboardNavbar onSearch={handleSearch} />
//         <MDBox mt={6} mb={3} sx={{ display: "flex", justifyContent: "center" }}>
//           <CircularProgress />
//         </MDBox>
//         <Footer />
//       </DashboardLayout>
//     );
//   }

//   const columns = [
//     {
//       Header: "Book",
//       accessor: "book_title",
//       Cell: ({ row }) => (
//         <>
//           <img
//             src={row.original.book_cover_photo}
//             style={{
//               width: "50px",
//               height: "50px",
//               borderRadius: "50%",
//               objectFit: "cover",
//               marginBottom: "5px",
//             }}
//           />
//           <div>{row.original.book_title}</div>
//         </>
//       ),
//     },
//     {
//       Header: "Author",
//       accessor: "authorDetails",
//       Cell: ({ row }) => (
//         row.original.authorDetails && (
//           <>
//             <img
//               src={row.original.authorDetails.photo}
//               style={{
//                 width: "50px",
//                 height: "50px",
//                 borderRadius: "50%",
//                 objectFit: "cover",
//                 marginBottom: "5px",
//               }}
//             />
//             <div>{row.original.authorDetails.name}</div>
//           </>
//         )
//       ),
//     },
//     {
//       Header: "Category",
//       accessor: "categoryDetails",
//       Cell: ({ row }) => (
//         row.original.categoryDetails && <div>{row.original.categoryDetails.category_name}</div>
//       ),
//     },
//     {
//       Header: "Description",
//       accessor: "book_description",
//     },
//     {
//       Header: "Created At",
//       accessor: "createdAt",
//       Cell: ({ value }) => {
//         const date = new Date(value);
//         const formattedDate = date.toLocaleDateString();
//         const formattedTime = date.toLocaleTimeString();
//         return (
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//             <div>{formattedDate}</div>
//             <div>{formattedTime}</div>
//           </div>
//         );
//       },
//     },
//     {
//       Header: "Status",
//       accessor: "status",
//       Cell: ({ value }) => <span>{value}</span>,
//     },
//     {
//       Header: "Show Details",
//       accessor: "_id",
//       Cell: ({ value }) => (
//         <VisibilityIcon
//           sx={{ fontSize: "100px", cursor: "pointer", color: "blue" }}
//           onClick={() => handleShowDetails(value)}
//         />
//       ),
//     },
//   ];

//   const rows = filteredBooks.map((book) => ({
//     book_title: book.book_title,
//     book_description: book.book_description,
//     book_cover_photo: book.book_cover_photo,
//     createdAt: book.createdAt,
//     updatedAt: book.updatedAt,
//     status: book.status,
//     authorDetails: book.authorDetails ? {
//       name: book.authorDetails.name,
//       photo: book.authorDetails.photo,
//     } : null,
//     categoryDetails: book.categoryDetails ? {
//       name: book.categoryDetails.category_name,
//     } : null,
//     _id: book._id,
//   }));

//   return (
//     <DashboardLayout>
//       <DashboardNavbar onSearch={handleSearch} />
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
//                   Book List
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3} style={{ maxHeight: "400px", overflowY: "auto" }}>
//                 <DataTable
//                   table={{ columns, rows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Booklist;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Booklist() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://bookreading-app.onrender.com/api/book/displayAllBook",
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
        setLoading(false);
        setFilteredBooks(data); // Initialize filtered books with all books
      } catch (error) {
        console.error("Error fetching the books", error);
        setLoading(false);
        setBooks([]);
        setFilteredBooks([]);
      }
    };

    fetchBooks();
  }, []);

  const handleShowDetails = (bookId) => {
    navigate(`/bookdetails/${bookId}`);
  };

  const handleSearch = (searchValue) => {
    if (searchValue.trim() === "") {
      setFilteredBooks(books); // Reset to all books if search is empty
    } else {
      const filtered = books.filter((book) =>
        book.book_title.toLowerCase().includes(searchValue.toLowerCase()) ||
        (book.authorDetails && book.authorDetails.name.toLowerCase().includes(searchValue.toLowerCase()))
      );
      setFilteredBooks(filtered);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar onSearch={handleSearch} />
        <MDBox mt={6} mb={3} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  const columns = [
    {
      Header: "Book",
      accessor: "book_title",
      Cell: ({ row }) => (
        <>
          <img
            src={row.original.book_cover_photo}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "5px",
            }}
          />
          <div>{row.original.book_title}</div>
        </>
      ),
    },
    {
      Header: "Author",
      accessor: "authorDetails",
      Cell: ({ row }) => (
        row.original.authorDetails && (
          <>
            <img
              src={row.original.authorDetails.photo}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "5px",
              }}
            />
            <div>{row.original.authorDetails.name}</div>
          </>
        )
      ),
    },
    {
      Header: "Category",
      accessor: "categoryDetails",
      Cell: ({ row }) => (
        row.original.categoryDetails && <div>{row.original.categoryDetails.name}</div>
      ),
    },
    {
      Header: "Description",
      accessor: "book_description",
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      Cell: ({ value }) => {
        const date = new Date(value);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div>{formattedDate}</div>
            <div>{formattedTime}</div>
          </div>
        );
      },
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => <span>{value}</span>,
    },
    {
      Header: "Show Details",
      accessor: "_id",
      Cell: ({ value }) => (
        <VisibilityIcon
          sx={{ fontSize: "100px", cursor: "pointer", color: "blue" }}
          onClick={() => handleShowDetails(value)}
        />
      ),
    },
  ];

  const rows = filteredBooks.map((book) => ({
    book_title: book.book_title,
    book_description: book.book_description,
    book_cover_photo: book.book_cover_photo,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt,
    status: book.status,
    authorDetails: book.authorDetails ? {
      name: book.authorDetails.name,
      photo: book.authorDetails.photo,
    } : null,
    categoryDetails: book.categoryDetails ? {
      name: book.categoryDetails[0].category_name, // Assuming there's only one category per book
    } : null,
    _id: book._id,
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar onSearch={handleSearch} />
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
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Book List
                </MDTypography>
              </MDBox>
              <MDBox pt={3} style={{ maxHeight: "400px", overflowY: "auto" }}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Booklist;
