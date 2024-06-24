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
    { Header: "Category ID", accessor: "_id", width: "25%" },
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

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://bookingreadingapp.onrender.com/api/category/getAllCategory");
      if (response.ok) {
        const jsonData = await response.json();
        setCategories(jsonData);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDelete = async (_id) => {
    // Implement your delete logic here
    console.log("Deleting category with ID:", _id);
    // Example of how you might handle deletion:
    // try {
    //   const response = await fetch(`https://your-api-url/${_id}`, { method: 'DELETE' });
    //   if (response.ok) {
    //     // Update state or perform any other actions after successful deletion
    //   } else {
    //     console.error("Failed to delete category");
    //   }
    // } catch (error) {
    //   console.error("Error deleting category:", error);
    // }
  };

  // Other functions like handleInsert, handleUpdate, handleEditForm, confirmDelete, etc. would remain unchanged

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

      {/* Insert, Edit, Delete Confirmation Dialogs remain unchanged */}
    </DashboardLayout>
  );
}

export default Tables;
