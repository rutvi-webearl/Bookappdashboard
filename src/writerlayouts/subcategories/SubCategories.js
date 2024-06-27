// import React, { useEffect, useState } from "react";
// import {
//   Grid,
//   Card,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   ButtonGroup,
// } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

// function SubCategories() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [subcategories, setSubcategories] = useState([]);
//   const [openSubcategoryForm, setOpenSubcategoryForm] = useState(false);
//   const [subcategoryName, setSubcategoryName] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [editSubcategoryId, setEditSubcategoryId] = useState("");

//   const getCategories = async () => {
//     try {
//       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
//       const response = await fetch(
//         "https://chemical-api-usa2.onrender.com/api/category/categories",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       setCategories(jsonData.categories);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getSubcategories = async (categoryId) => {
//     try {
//       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
//       const response = await fetch(
//         `https://chemical-api-usa2.onrender.com/api/subcategory/allsubcategories`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       console.log(jsonData);
//       setSubcategories(jsonData.subcategoriesWithCategories);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleCategoryChange = (event) => {
//     const categoryId = event.target.value;
//     setSelectedCategory(categoryId);
//     getSubcategories(categoryId);
//   };

//   const handleSubcategoryInsert = async () => {
//     try {
//       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
//       const response = await fetch(
//         `https://chemical-api-usa2.onrender.com/api/subcategory/subcategories`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             subcategory_name: subcategoryName,
//             category_id: selectedCategory,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       setSubcategoryName("");
//       setOpenSubcategoryForm(false);
//       getSubcategories(selectedCategory);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubcategoryUpdate = async () => {
//     try {
//       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
//       const response = await fetch(
//         `https://chemical-api-usa2.onrender.com/api/subcategory/subcategories/${editSubcategoryId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ subcategory_name: subcategoryName }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       console.log(jsonData);
//       setSubcategoryName("");
//       setEditMode(false);
//       setEditSubcategoryId("");
//       setOpenSubcategoryForm(false);
//       getSubcategories(selectedCategory);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubcategoryDelete = async (subcategoryId) => {
//     try {
//       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
//       const response = await fetch(
//         `https://chemical-api-usa2.onrender.com/api/subcategory/subcategories/${subcategoryId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       getSubcategories(selectedCategory);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const openForm = () => {
//     setOpenSubcategoryForm(true);
//     setEditMode(false);
//     setSubcategoryName("");
//   };

//   const openEditForm = (subcategory) => {
//     setOpenSubcategoryForm(true);
//     setEditMode(true);
//     setSubcategoryName(subcategory.subcategory_name);
//     setEditSubcategoryId(subcategory._id);
//   };

//   useEffect(() => {
//     getCategories();
//     getSubcategories();
//   }, []);

//   const subcategoryRows = subcategories
//     ? subcategories.map((subcategory) => ({
//         subcategory_name: subcategory.subcategory_name,
//         actions: (
//           <ButtonGroup variant="outlined" aria-label="button group">
//             <IconButton
//               aria-label="edit"
//               size="medium"
//               onClick={() => openEditForm(subcategory)}
//             >
//               <EditIcon color="success" />
//             </IconButton>
//             <IconButton
//               aria-label="delete"
//               size="medium"
//               onClick={() => handleSubcategoryDelete(subcategory._id)}
//             >
//               <DeleteIcon color="error" />
//             </IconButton>
//           </ButtonGroup>
//         ),
//       }))
//     : [];

//   const subcategoryColumns = [
//     { Header: "Subcategory Name", accessor: "subcategory_name", width: "70%" },
//     { Header: "Category Name", accessor: "category_name", width: "70%" },
//     { Header: "Created At", accessor: "created_at", width: "70%" },
//     { Header: "Actions", accessor: "actions", width: "30%" },
//   ];

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
//                   Subcategories Table
//                 </MDTypography>
//                 <Button
//                   variant="contained"
//                   color="info"
//                   startIcon={<AddCircleOutlineIcon />}
//                   onClick={openForm}
//                 >
//                   Add Subcategory
//                 </Button>
//               </MDBox>
//               <MDBox pt={3} px={2}></MDBox>
//               <MDBox pt={3}>
//                 <DataTable
//                   table={{ columns: subcategoryColumns, rows: subcategoryRows }}
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

//       {/* Subcategory Form Dialog */}
//       <Dialog open={openSubcategoryForm} onClose={() => setOpenSubcategoryForm(false)}>
//         <DialogTitle>{editMode ? "Edit Subcategory" : "Insert Subcategory"}</DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth>
//             <InputLabel id="category-select-label">Select Category</InputLabel>
//             <Select
//               labelId="category-select-label"
//               value={selectedCategory}
//               label="Select Category"
//               onChange={handleCategoryChange}
//             >
//               {categories.map((category) => (
//                 <MenuItem key={category._id} value={category._id}>
//                   {category.category_name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="subcategoryName"
//             label="Subcategory Name"
//             type="text"
//             fullWidth
//             value={subcategoryName}
//             onChange={(e) => setSubcategoryName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenSubcategoryForm(false)}>Cancel</Button>
//           <Button onClick={editMode ? handleSubcategoryUpdate : handleSubcategoryInsert} color="primary">
//             {editMode ? "Update" : "Insert"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </DashboardLayout>
//   );
// }

// export default SubCategories;







//CARDSSSSSSSSSSSSSSSSSSSSSS
// import React, { useEffect, useState } from "react";
// import {
//   Grid,
//   Card,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   ButtonGroup,
//   CardContent,
//   CardActions,
//   Typography,
// } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";

// function SubCategories() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [subcategories, setSubcategories] = useState([]);
//   const [openSubcategoryForm, setOpenSubcategoryForm] = useState(false);
//   const [subcategoryName, setSubcategoryName] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [editSubcategoryId, setEditSubcategoryId] = useState("");

//   const getCategories = async () => {
//     try {
//       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
//       const response = await fetch(
//         "https://chemical-api-usa2.onrender.com/api/category/categories",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       setCategories(jsonData.categories);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getSubcategories = async (categoryId) => {
//     try {
//       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
//       const response = await fetch(
//         `https://chemical-api-usa2.onrender.com/api/subcategory/allsubcategories`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       console.log(jsonData);
//       setSubcategories(jsonData.subcategoriesWithCategories);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleCategoryChange = (event) => {
//     const categoryId = event.target.value;
//     setSelectedCategory(categoryId);
//     getSubcategories(categoryId);
//   };

//   const handleSubcategoryInsert = async () => {
//     try {
//       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
//       const response = await fetch(
//         `https://chemical-api-usa2.onrender.com/api/subcategory/subcategories`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             subcategory_name: subcategoryName,
//             category_id: selectedCategory,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       setSubcategoryName("");
//       setOpenSubcategoryForm(false);
//       getSubcategories(selectedCategory);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubcategoryUpdate = async () => {
//     try {
//       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
//       const response = await fetch(
//         `https://chemical-api-usa2.onrender.com/api/subcategory/subcategories/${editSubcategoryId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ subcategory_name: subcategoryName }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       console.log(jsonData);
//       setSubcategoryName("");
//       setEditMode(false);
//       setEditSubcategoryId("");
//       setOpenSubcategoryForm(false);
//       getSubcategories(selectedCategory);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubcategoryDelete = async (subcategoryId) => {
//     try {
//       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MTAxNzl9.X56jSoZUouwPcQAw6cg6o8pwjNgBjnkYe5rqkMtgCvc";
//       const response = await fetch(
//         `https://chemical-api-usa2.onrender.com/api/subcategory/subcategories/${subcategoryId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       getSubcategories(selectedCategory);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const openForm = () => {
//     setOpenSubcategoryForm(true);
//     setEditMode(false);
//     setSubcategoryName("");
//   };

//   const openEditForm = (subcategory) => {
//     setOpenSubcategoryForm(true);
//     setEditMode(true);
//     setSubcategoryName(subcategory.subcategory_name);
//     setEditSubcategoryId(subcategory._id);
//   };

//   useEffect(() => {
//     getCategories();
//     getSubcategories();
//   }, []);

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox pt={6} pb={3}>
//         <Grid container spacing={6}>
//           <Grid item xs={12}>
//             <MDBox
//               mx={2}
//               mt={-3}
//               py={3}
//               px={2}
//               variant="gradient"
//               bgColor="info"
//               borderRadius="lg"
//               coloredShadow="info"
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//             >
//               <MDTypography variant="h6" color="white">
//                 Subcategories
//               </MDTypography>
//               <Button
//                 variant="contained"
//                 color="info"
//                 startIcon={<AddCircleOutlineIcon />}
//                 onClick={openForm}
//               >
//                 Add Subcategory
//               </Button>
//             </MDBox>
//           </Grid>
//           {subcategories.map((subcategory) => (
//             <Grid item xs={12} sm={6} md={4} key={subcategory._id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6" component="div">
//                     {subcategory.subcategory_name}
//                   </Typography>
//                   <Typography color="textSecondary">
//                     {subcategory.category_name}
//                   </Typography>
//                   <Typography color="textSecondary">
//                     Created At: {new Date(subcategory.created_at).toLocaleDateString()}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <ButtonGroup variant="outlined" aria-label="button group">
//                     <IconButton
//                       aria-label="edit"
//                       size="medium"
//                       onClick={() => openEditForm(subcategory)}
//                     >
//                       <EditIcon color="success" />
//                     </IconButton>
//                     <IconButton
//                       aria-label="delete"
//                       size="medium"
//                       onClick={() => handleSubcategoryDelete(subcategory._id)}
//                     >
//                       <DeleteIcon color="error" />
//                     </IconButton>
//                   </ButtonGroup>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </MDBox>
//       <Footer />

//       {/* Subcategory Form Dialog */}
//       <Dialog open={openSubcategoryForm} onClose={() => setOpenSubcategoryForm(false)}>
//         <DialogTitle>{editMode ? "Edit Subcategory" : "Insert Subcategory"}</DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth>
//             <InputLabel id="category-select-label">Select Category</InputLabel>
//             <Select
//               labelId="category-select-label"
//               value={selectedCategory}
//               label="Select Category"
//               onChange={handleCategoryChange}
//             >
//               {categories.map((category) => (
//                 <MenuItem key={category._id} value={category._id}>
//                   {category.category_name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="subcategoryName"
//             label="Subcategory Name"
//             type="text"
//             fullWidth
//             value={subcategoryName}
//             onChange={(e) => setSubcategoryName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenSubcategoryForm(false)}>Cancel</Button>
//           <Button onClick={editMode ? handleSubcategoryUpdate : handleSubcategoryInsert} color="primary">
//             {editMode ? "Update" : "Insert"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </DashboardLayout>
//   );
// }

// export default SubCategories;










//TABLEEEEEEEEEEEEEEEEEEEEEEEE

import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  ButtonGroup,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

function SubCategories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [openSubcategoryForm, setOpenSubcategoryForm] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editSubcategoryId, setEditSubcategoryId] = useState("");
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [subcategoryIdToDelete, setSubcategoryIdToDelete] = useState("");

  const getCategories = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MDQ0NzF9.k0uC-bWm5whcYHvYwedtDKYjrALdRlP6B0UjHG37U_4";
      const response = await fetch(
        "https://chemical-api-usa2.onrender.com/api/category/categories",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setCategories(jsonData.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubcategories = async (categoryId) => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MDQ0NzF9.k0uC-bWm5whcYHvYwedtDKYjrALdRlP6B0UjHG37U_4";
      const response = await fetch(
        `https://chemical-api-usa2.onrender.com/api/subcategory/allsubcategories`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setSubcategories(jsonData.subcategoriesWithCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    getSubcategories(categoryId);
  };

  const handleSubcategoryInsert = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MDQ0NzF9.k0uC-bWm5whcYHvYwedtDKYjrALdRlP6B0UjHG37U_4";
      const response = await fetch(
        `https://chemical-api-usa2.onrender.com/api/subcategory/subcategories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            subcategory_name: subcategoryName,
            category_id: selectedCategory,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setSubcategoryName("");
      setOpenSubcategoryForm(false);
      getSubcategories(selectedCategory);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubcategoryUpdate = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MDQ0NzF9.k0uC-bWm5whcYHvYwedtDKYjrALdRlP6B0UjHG37U_4";
      const response = await fetch(
        `https://chemical-api-usa2.onrender.com/api/subcategory/subcategories/${editSubcategoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ subcategory_name: subcategoryName }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log(jsonData);
      setSubcategoryName("");
      setEditMode(false);
      setEditSubcategoryId("");
      setOpenSubcategoryForm(false);
      getSubcategories(selectedCategory);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteConfirmation = (subcategoryId) => {
    setOpenDeleteConfirmation(true);
    setSubcategoryIdToDelete(subcategoryId);
  };

  const handleConfirmDelete = async () => {
    setOpenDeleteConfirmation(false);
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQzMzM4Y2QxMzMwMTMxMDVkOGMyNGYiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6InN1cGVyYWRtaW4iLCJpYXQiOjE3MTc0MDQ0NzF9.k0uC-bWm5whcYHvYwedtDKYjrALdRlP6B0UjHG37U_4";
      const response = await fetch(
        `https://chemical-api-usa2.onrender.com/api/subcategory/subcategories/${subcategoryIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      getSubcategories(selectedCategory);
    } catch (error) {
      console.log(error);
    }
  };

  const openForm = () => {
    setOpenSubcategoryForm(true);
    setEditMode(false);
    setSubcategoryName("");
  };

  const openEditForm = (subcategory) => {
    setOpenSubcategoryForm(true);
    setEditMode(true);
    setSubcategoryName(subcategory.subcategory_name);
    setEditSubcategoryId(subcategory._id);
  };

  useEffect(() => {
    getCategories();
    getSubcategories();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    return formatDate(currentDate);
  };

  const subcategoryRows = subcategories
    ? subcategories.map((subcategory) => {
        const category = categories.find(cat => cat._id === subcategory.category_id);
        return {
          subcategory_name: subcategory.subcategory_name,
          category_name: category ? category.category_name : "N/A",
          created_at: formatDate(subcategory.created_at),
          created_at: subcategory.created_at ? formatDate(subcategory.created_at) : getCurrentDate(),
          actions: (
            <ButtonGroup variant="outlined" aria-label="button group">
              <IconButton
                aria-label="edit"
                size="medium"
                onClick={() => openEditForm(subcategory)}
              >
                <EditIcon color="success" />
              </IconButton>
              <IconButton
                aria-label="delete"
                size="medium"
                onClick={() => handleDeleteConfirmation(subcategory._id)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </ButtonGroup>
          ),
        }
      })
    : [];

  const subcategoryColumns = [
    { Header: "Subcategory Name", accessor: "subcategory_name", width: "25%" },
    { Header: "Category Name", accessor: "category_name", width: "25%" },
    { Header: "Created At", accessor: "created_at", width: "25%" },
    { Header: "Actions", accessor: "actions", width: "25%" },
  ];

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
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Subcategories Table
                </MDTypography>
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={openForm}
                >
                  Add Subcategory
                </Button>
              </MDBox>
              <MDBox pt={3} px={2}></MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: subcategoryColumns, rows: subcategoryRows }}
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

      {/* Subcategory Form Dialog */}
      <Dialog open={openSubcategoryForm} onClose={() => setOpenSubcategoryForm(false)}>
        <DialogTitle>{editMode ? "Edit Subcategory" : "Insert Subcategory"}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Select Category</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              label="Select Category"
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="subcategoryName"
            label="Subcategory Name"
            type="text"
            fullWidth
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubcategoryForm(false)}>Cancel</Button>
          <Button onClick={editMode ? handleSubcategoryUpdate : handleSubcategoryInsert} color="primary">
            {editMode ? "Update" : "Insert"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteConfirmation} onClose={() => setOpenDeleteConfirmation(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <MDTypography variant="body1">
            Are you sure you want to delete this subcategory?
          </MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirmation(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">OK</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default SubCategories;