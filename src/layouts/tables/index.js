
// import React, { useEffect, useState } from "react";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   ButtonGroup,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDSnackbar from "components/MDSnackbar";

// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

// const Author = ({ name }) => (
//   <MDBox display="flex" alignItems="center" lineHeight={1}>
//     <MDTypography display="block" variant="button" fontWeight="medium">
//       {name}
//     </MDTypography>
//   </MDBox>
// );

// function Tables() {
//   const columns = [
//     { Header: "Name", accessor: "category_name", width: "50%" },
//     { Header: "Actions", accessor: "actions", width: "50%" },
//   ];

//   const [openInsertForm, setOpenInsertForm] = useState(false);
//   const [openEditForm, setOpenEditForm] = useState(false);
//   const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
//   const [categoryName, setCategoryName] = useState("");
//   const [categoryNameError, setCategoryNameError] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [filteredCategories, setFilteredCategories] = useState([]);
//   const [categoryId, setCategoryId] = useState("");
//   const [deleteCategoryId, setDeleteCategoryId] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarColor, setSnackbarColor] = useState("info");
//   const [searchValue, setSearchValue] = useState("");

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(
//         "https://bookreading-app.onrender.com/api/category/getAllCategory"
//       );
//       if (response.ok) {
//         const jsonData = await response.json();
//         // Sort categories by a timestamp field (example: createdAt or _id)
//         const sortedCategories = jsonData.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setCategories(sortedCategories);
//         setFilteredCategories(sortedCategories);
//       } else {
//         console.error("Failed to fetch categories");
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const handleSearch = (searchValue) => {
//     const filtered = categories.filter((category) =>
//       category.category_name.toLowerCase().includes(searchValue.toLowerCase())
//     );
//     setFilteredCategories(filtered);
//   };

//   const handleInsert = async () => {
//     if (!validateForm()) return;
//     try {
//       const response = await fetch(
//         "https://bookreading-app.onrender.com/api/category/addCategory",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ category_name: categoryName }),
//         }
//       );
//       if (response.ok) {
//         const jsonData = await response.json();
//         console.log("Category added:", jsonData);

//         // Fetch categories again after adding to get the latest list
//         fetchCategories();

//         setSnackbarMessage("Category added successfully!");
//         setSnackbarColor("success");
//         setSnackbarOpen(true);
//         setCategoryName("");
//         setOpenInsertForm(false);
//       } else {
//         console.error("Failed to add category");
//         setSnackbarMessage("Failed to add category");
//         setSnackbarColor("error");
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error("Error adding category:", error);
//       setSnackbarMessage("Error adding category");
//       setSnackbarColor("error");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleUpdate = async (_id) => {
//     if (!validateForm()) return;
//     try {
//       const response = await fetch(
//         `https://bookreading-app.onrender.com/api/category/updateCategory/${_id}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ category_name: categoryName.trim() }), // Trimmed to avoid leading/trailing spaces
//         }
//       );
//       if (response.ok) {
//         const updatedCategory = { _id, category_name: categoryName.trim() }; // Trimmed
//         setCategories(
//           categories.map((cat) =>
//             cat._id === _id ? updatedCategory : cat
//           )
//         );
//         setFilteredCategories(
//           filteredCategories.map((cat) =>
//             cat._id === _id ? updatedCategory : cat
//           )
//         );
//         console.log("Category updated:", updatedCategory);
//         setSnackbarMessage("Category updated successfully!");
//         setSnackbarColor("success");
//         setSnackbarOpen(true);
//         setCategoryName("");
//         setOpenEditForm(false);
//       } else {
//         console.error("Failed to update category");
//         setSnackbarMessage("Failed to update category");
//         setSnackbarColor("error");
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error("Error updating category:", error);
//       setSnackbarMessage("Error updating category");
//       setSnackbarColor("error");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleDelete = async (_id) => {
//     try {
//       const response = await fetch(
//         `https://bookreading-app.onrender.com/api/category/deleteCategory/${_id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (response.ok) {
//         const jsonData = await response.json();
//         console.log("Category deleted:", jsonData);
//         setSnackbarMessage("Category deleted successfully!");
//         setSnackbarColor("success");
//         setSnackbarOpen(true);
//         fetchCategories();
//       } else {
//         console.error("Failed to delete category");
//         setSnackbarMessage("Failed to delete category");
//         setSnackbarColor("error");
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       setSnackbarMessage("Error deleting category");
//       setSnackbarColor("error");
//       setSnackbarOpen(true);
//     }
//   };

//   const validateForm = () => {
//     let valid = true;
//     if (categoryName.trim() === "") {
//       setCategoryNameError("Category name is required");
//       valid = false;
//     } else if (categoryName.startsWith(" ")) {
//       setCategoryNameError("Category name should not start with a space");
//       valid = false;
//     } else {
//       setCategoryNameError("");
//     }
//     return valid;
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     handleSearch(searchValue);
//   }, [categories, searchValue]);

//   const rows = filteredCategories.map((category) => ({
//     _id: category._id,
//     category_name: <Author name={category.category_name} />,
//     actions: (
//       <ButtonGroup variant="outlined" aria-label="button group">
//         <IconButton
//           aria-label="edit"
//           size="medium"
//           onClick={() => handleEditForm(category._id, category.category_name)}
//         >
//           <EditIcon color="success" />
//         </IconButton>
//         <IconButton
//           aria-label="delete"
//           size="medium"
//           onClick={() => handleDeleteConfirm(category._id)}
//         >
//           <DeleteIcon color="error" />
//         </IconButton>
//       </ButtonGroup>
//     ),
//   }));

//   const handleEditForm = (_id, category_name) => {
//     setCategoryId(_id);
//     setCategoryName(category_name);
//     setOpenEditForm(true);
//   };

//   const handleDeleteConfirm = (_id) => {
//     setDeleteCategoryId(_id);
//     setOpenDeleteConfirm(true);
//   };

//   const confirmDelete = async () => {
//     await handleDelete(deleteCategoryId);
//     setOpenDeleteConfirm(false);
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar onSearch={(value) => setSearchValue(value)} />
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
//                   Category Table
//                 </MDTypography>
//                 <Button
//                   variant="contained"
//                   color="info"
//                   startIcon={<AddCircleOutlineIcon />}
//                   onClick={() => setOpenInsertForm(true)}
//                 >
//                   Add Category
//                 </Button>
//               </MDBox>
//               <MDBox pt={3}>
//                 <DataTable
//                   table={{ columns, rows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                   style={{ width: "100%" }}
//                 />
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
//       <Footer />

//       <Dialog open={openInsertForm} onClose={() => setOpenInsertForm(false)}>
//         <DialogTitle>Insert Category</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Category Name"
//             fullWidth
//             variant="outlined"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             error={!!categoryNameError}
//             helperText={categoryNameError}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenInsertForm(false)}>Cancel</Button>
//           <Button onClick={handleInsert} variant="contained" color="primary">
//             Insert
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
//         <DialogTitle>Edit Category</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Category Name"
//             fullWidth
//             variant="outlined"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             error={!!categoryNameError}
//             helperText={categoryNameError}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenEditForm(false)}>Cancel</Button>
//           <Button
//             onClick={() => handleUpdate(categoryId)}
//             variant="contained"
//             color="primary"
//           >
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog
//         open={openDeleteConfirm}
//         onClose={() => setOpenDeleteConfirm(false)}
//       >
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this category?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDeleteConfirm(false)}>Cancel</Button>
//           <Button onClick={confirmDelete} variant="contained" color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <MDSnackbar
//         color={snackbarColor}
//         icon="notifications"
//         title="Category Management"
//         content={snackbarMessage}
//         open={snackbarOpen}
//         onClose={() => setSnackbarOpen(false)}
//         close={() => setSnackbarOpen(false)}
//       />
//     </DashboardLayout>
//   );
// }

// export default Tables;


import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  ButtonGroup,
  IconButton,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

const Author = ({ name }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDTypography display="block" variant="button" fontWeight="medium">
      {name}
    </MDTypography>
  </MDBox>
);

function Tables() {
  const columns = [
  
    { Header: "Name", accessor: "category_name", width: "25%" },
    { Header: "Actions", accessor: "actions", width: "25%" },
  ];

  const [openInsertForm, setOpenInsertForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryNameError, setCategoryNameError] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [deleteCategoryId, setDeleteCategoryId] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("info");

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://bookreading-app.onrender.com/api/category/getAllCategory"
      );
      if (response.ok) {
        const jsonData = await response.json();
        // Sort categories by a timestamp field (example: createdAt or _id)
        const sortedCategories = jsonData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setCategories(sortedCategories);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInsert = async () => {
    if (!validateForm()) return;
    try {
      const response = await fetch(
        "https://bookreading-app.onrender.com/api/category/addCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category_name: categoryName }),
        }
      );
      if (response.ok) {
        const jsonData = await response.json();
        console.log("Category added:", jsonData);
        
        // Fetch categories again after adding to get the latest list
        fetchCategories();
        
        setSnackbarMessage("Category added successfully!");
        setSnackbarColor("success");
        setSnackbarOpen(true);
        setCategoryName("");
        setOpenInsertForm(false);
      } else {
        console.error("Failed to add category");
        setSnackbarMessage("Failed to add category");
        setSnackbarColor("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      setSnackbarMessage("Error adding category");
      setSnackbarColor("error");
      setSnackbarOpen(true);
    }
  };

  const handleUpdate = async (_id) => {
    if (!validateForm()) return;
    try {
      const response = await fetch(
        `https://bookreading-app.onrender.com/api/category/updateCategory/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category_name: categoryName.trim() }), // Trimmed to avoid leading/trailing spaces
        }
      );
      if (response.ok) {
        const updatedCategory = { _id, category_name: categoryName.trim() }; // Trimmed
        setCategories(categories.map(cat => cat._id === _id ? updatedCategory : cat));
        console.log("Category updated:", updatedCategory);
        setSnackbarMessage("Category updated successfully!");
        setSnackbarColor("success");
        setSnackbarOpen(true);
        setCategoryName("");
        setOpenEditForm(false);
      } else {
        console.error("Failed to update category");
        setSnackbarMessage("Failed to update category");
        setSnackbarColor("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      setSnackbarMessage("Error updating category");
      setSnackbarColor("error");
      setSnackbarOpen(true);
    }
  };
  
  const handleDelete = async (_id) => {
    try {
      const response = await fetch(
        `https://bookreading-app.onrender.com/api/category/deleteCategory/${_id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const jsonData = await response.json();
        console.log("Category deleted:", jsonData);
        setSnackbarMessage("Category deleted successfully!");
        setSnackbarColor("success");
        setSnackbarOpen(true);
        fetchCategories();
      } else {
        console.error("Failed to delete category");
        setSnackbarMessage("Failed to delete category");
        setSnackbarColor("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setSnackbarMessage("Error deleting category");
      setSnackbarColor("error");
      setSnackbarOpen(true);
    }
  };

  const validateForm = () => {
    let valid = true;
    if (categoryName.trim() === "") {
      setCategoryNameError("Category name is required");
      valid = false;
    } else if (categoryName.startsWith(" ")) {
      setCategoryNameError("Category name should not start with a space");
      valid = false;
    } else {
      setCategoryNameError("");
    }
    return valid;
  };
  

  useEffect(() => {
    fetchCategories();
  }, []);

  const rows = categories.map((category) => ({
    _id: category._id,
    category_name: <Author name={category.category_name} />,
    actions: (
      <ButtonGroup variant="outlined" aria-label="button group">
        <IconButton
          aria-label="edit"
          size="medium"
          onClick={() => handleEditForm(category._id, category.category_name)}
        >
          <EditIcon color="success" />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="medium"
          onClick={() => handleDeleteConfirm(category._id)}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </ButtonGroup>
    ),
  }));

  const handleEditForm = (_id, category_name) => {
    setCategoryId(_id);
    setCategoryName(category_name);
    setOpenEditForm(true);
  };

  const handleDeleteConfirm = (_id) => {
    setDeleteCategoryId(_id);
    setOpenDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    await handleDelete(deleteCategoryId);
    setOpenDeleteConfirm(false);
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
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Categories Table
                </MDTypography>
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => setOpenInsertForm(true)}
                >
                  Insert
                </Button>
              </MDBox>
              <MDBox pt={3}>
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

      {/* Snackbar for notifications */}
      <MDSnackbar
        color={snackbarColor}
        icon="notifications"
        title="Notification"
        content={snackbarMessage}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        close={true}
        bgWhite
      />

      {/* Insert Form Dialog */}
      <Dialog open={openInsertForm} onClose={() => setOpenInsertForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Insert Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="categoryName"
            label="Category Name"
            type="text"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            error={!!categoryNameError}
            helperText={categoryNameError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInsertForm(false)}>Cancel</Button>
          <Button onClick={handleInsert} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Form Dialog */}
      <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}
        maxwidth="md"
        fullWidth>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="editCategoryName"
            label="Category Name"
            type="text"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            error={!!categoryNameError}
            helperText={categoryNameError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditForm(false)}>Cancel</Button>
          <Button onClick={() => handleUpdate(categoryId)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
      >
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this category?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirm(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Tables;

