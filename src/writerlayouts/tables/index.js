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
//   Box,
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
//     { Header: "Category ID", accessor: "category_id", width: "25%" },
//     { Header: "Name", accessor: "category_name", width: "25%" },
//     { Header: "Actions", accessor: "actions", width: "25%" },
//   ];

//   const [openInsertForm, setOpenInsertForm] = useState(false);
//   const [openEditForm, setOpenEditForm] = useState(false);
//   const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
//   const [categoryName, setCategoryName] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [categoryId, setCategoryId] = useState("");
//   const [deleteCategoryId, setDeleteCategoryId] = useState("");

//   const mockCategories = [
//     { _id: "1", category_name: "Category 1" },
//     { _id: "2", category_name: "Category 2" },
//   ];

//   const mockGetCategories = async () => {
//     // Simulate an API call with mock data
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({ categories: mockCategories });
//       }, 500);
//     });
//   };

//   const mockDeleteCategory = async (_id) => {
//     // Simulate an API call for deletion
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({ message: "Category deleted" });
//       }, 500);
//     });
//   };

//   const mockInsertCategory = async (category_name) => {
//     // Simulate an API call for insertion
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({ category: { _id: Date.now().toString(), category_name } });
//       }, 500);
//     });
//   };

//   const mockUpdateCategory = async (_id, category_name) => {
//     // Simulate an API call for update
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({ category: { _id, category_name } });
//       }, 500);
//     });
//   };

//   const getCategories = async () => {
//     try {
//       const jsonData = await mockGetCategories();
//       console.log(jsonData);
//       setCategories(jsonData.categories);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDelete = async (_id) => {
//     try {
//       const jsonData = await mockDeleteCategory(_id);
//       console.log(jsonData);
//       getCategories();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleInsert = async () => {
//     setCategoryName("");
//     console.log("Category Name:", categoryName);
//     try {
//       const jsonData = await mockInsertCategory(categoryName);
//       console.log(jsonData);
//       setCategoryName("");
//       setOpenInsertForm(false);
//       getCategories();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleUpdate = async (_id) => {
//     console.log("Category Name:", categoryName);
//     try {
//       const jsonData = await mockUpdateCategory(_id, categoryName);
//       console.log(jsonData);
//       setOpenEditForm(false);
//       setCategoryName("");
//       getCategories();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleEditForm = (_id, category_name) => {
//     setOpenEditForm(true);
//     setCategoryName(category_name);
//     setCategoryId(_id);
//   };

//   const handleDeleteConfirm = (_id) => {
//     setDeleteCategoryId(_id);
//     setOpenDeleteConfirm(true);
//   };

//   const confirmDelete = async () => {
//     setOpenDeleteConfirm(false);
//     await handleDelete(deleteCategoryId);
//   };

//   useEffect(() => {
//     getCategories();
//   }, []);

//   const rows = categories.map((el) => ({
//     category_id: el._id,
//     category_name: <Author name={el.category_name} />,
//     actions: (
//       <ButtonGroup variant="outlined" aria-label="button group">
//         <IconButton
//           aria-label="edit"
//           size="medium"
//           onClick={() => handleEditForm(el._id, el.category_name)}
//         >
//           <EditIcon color="success" />
//         </IconButton>
//         <IconButton
//           aria-label="delete"
//           size="medium"
//           onClick={() => handleDeleteConfirm(el._id)}
//         >
//           <DeleteIcon color="error" />
//         </IconButton>
//       </ButtonGroup>
//     ),
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
//                   Categories Table
//                 </MDTypography>
//                 <Button
//                   variant="contained"
//                   color="info"
//                   startIcon={<AddCircleOutlineIcon />}
//                   onClick={() => setOpenInsertForm(true)}
//                 >
//                   Insert
//                 </Button>
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

//       {/* Insert Form Dialog */}
//       <Dialog open={openInsertForm} onClose={() => setOpenInsertForm(false)}>
//         <DialogTitle>Insert Category</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="categoryName"
//             label="Category Name"
//             type="text"
//             fullWidth
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenInsertForm(false)}>Cancel</Button>
//           <Button onClick={handleInsert} color="primary">
//             Ok
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Form Dialog */}
//       <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
//         <DialogTitle>Edit Category</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="categoryName"
//             label="Category Name"
//             type="text"
//             fullWidth
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenEditForm(false)}>Cancel</Button>
//           <Button onClick={() => handleUpdate(categoryId)} color="primary">
//             Ok
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={openDeleteConfirm}
//         onClose={() => setOpenDeleteConfirm(false)}
//       >
//         <DialogTitle>Delete Category</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this category?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDeleteConfirm(false)}>Cancel</Button>
//           <Button onClick={confirmDelete} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
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
  Box,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "writerexamples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "writerexamples/Navbars/DashboardNavbar";
import Footer from "writerexamples/Footer";
import DataTable from "writerexamples/Tables/DataTable";

const Author = ({ name }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDTypography display="block" variant="button" fontWeight="medium">
      {name}
    </MDTypography>
  </MDBox>
);

function Tables() {
  const columns = [
    { Header: "Category ID", accessor: "category_id", width: "25%" },
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

  const mockCategories = [
    { _id: "1", category_name: "Category 1" },
    { _id: "2", category_name: "Category 2" },
  ];

  const mockGetCategories = async () => {
    // Simulate an API call with mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ categories: mockCategories });
      }, 500);
    });
  };

  const mockDeleteCategory = async (_id) => {
    // Simulate an API call for deletion
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: "Category deleted" });
      }, 500);
    });
  };

  const mockInsertCategory = async (category_name) => {
    // Simulate an API call for insertion
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ category: { _id: Date.now().toString(), category_name } });
      }, 500);
    });
  };

  const mockUpdateCategory = async (_id, category_name) => {
    // Simulate an API call for update
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ category: { _id, category_name } });
      }, 500);
    });
  };

  const getCategories = async () => {
    try {
      const jsonData = await mockGetCategories();
      console.log(jsonData);
      setCategories(jsonData.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const jsonData = await mockDeleteCategory(_id);
      console.log(jsonData);
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
    let valid = true;
    if (categoryName.trim() === "") {
      setCategoryNameError("Category name is required");
      valid = false;
    } else {
      setCategoryNameError("");
    }
    return valid;
  };

  const handleInsert = async () => {
    if (!validateForm()) return;
    try {
      const jsonData = await mockInsertCategory(categoryName);
      console.log(jsonData);
      setCategoryName("");
      setOpenInsertForm(false);
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (_id) => {
    if (!validateForm()) return;
    try {
      const jsonData = await mockUpdateCategory(_id, categoryName);
      console.log(jsonData);
      setOpenEditForm(false);
      setCategoryName("");
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditForm = (_id, category_name) => {
    setOpenEditForm(true);
    setCategoryName(category_name);
    setCategoryId(_id);
  };

  const handleDeleteConfirm = (_id) => {
    setDeleteCategoryId(_id);
    setOpenDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setOpenDeleteConfirm(false);
    await handleDelete(deleteCategoryId);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const rows = categories.map((el) => ({
    category_id: el._id,
    category_name: <Author name={el.category_name} />,
    actions: (
      <ButtonGroup variant="outlined" aria-label="button group">
        <IconButton
          aria-label="edit"
          size="medium"
          onClick={() => handleEditForm(el._id, el.category_name)}
        >
          <EditIcon color="success" />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="medium"
          onClick={() => handleDeleteConfirm(el._id)}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </ButtonGroup>
    ),
  }));

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

      {/* Insert Form Dialog */}
      <Dialog open={openInsertForm} onClose={() => setOpenInsertForm(false)}>
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
      <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
        <DialogTitle>Edit Category</DialogTitle>
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
          <Typography>Are you sure you want to delete this category?</Typography>
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
