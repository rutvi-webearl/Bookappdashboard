import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Subcategories() {
  const [products, setProducts] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newProductData, setNewProductData] = useState({
    pcode: "",
    pname: "",
    description: "",
    price: "",
    file: null,
  });

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1OTk4NjZmYWViODhkOTU2MWRiODFlIn0sImlhdCI6MTcxNzE0Nzc1MH0.7tpSAT0XQdtmuOhH_5N3nNObFWypWJIPYarAFOxfrDY";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("https://ecomm-backend-2xs6.onrender.com/api/product/showall", {
      headers: {
        "auth-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Error fetching products:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleDeleteProduct = (prodId) => {
    fetch(`https://ecomm-backend-2xs6.onrender.com/api/product/delete/${prodId}`, {
      method: "DELETE",
      headers: {
        "auth-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product deleted successfully:", data);
        fetchProducts(); 
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleEditProduct = (prodId) => {
    const newName = prompt("Enter new product name:");
    const newCode = prompt("Enter new product code:");
    const newDescription = prompt("Enter new product description:");
    const newPrice = prompt("Enter new product price:");
  
    const formData = new FormData();
    formData.append("pname", newName);
    formData.append("pcode", newCode);
    formData.append("description", newDescription);
    formData.append("price", newPrice);
  
    fetch(`https://ecomm-backend-2xs6.onrender.com/api/product/edit/${prodId}`, {
      method: "PUT",
      headers: {
        "auth-token": token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("Product updated successfully:", data);
          fetchProducts(); 
        } else {
          console.error("Error updating product");
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append("pcode", newProductData.pcode);
    formData.append("pname", newProductData.pname);
    formData.append("description", newProductData.description);
    formData.append("price", newProductData.price);
    if (newProductData.photo) {
      formData.append("file", newProductData.photo);
    }
  
    fetch("https://ecomm-backend-2xs6.onrender.com/api/product/add", {
      method: "POST",
      headers: {
        "auth-token": token,
      },
      body: formData,
    })
      .then(async (response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          const text = await response.text();
          throw new Error(`Unexpected response content type: ${contentType}, response text: ${text}`);
        }
      })
      .then((data) => {
        console.log("Product added successfully:", data);
        fetchProducts();
        setOpenAddDialog(false);
        setNewProductData({ pcode: "", pname: "", description: "", price: "", file: null }); 
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    setNewProductData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };
  
  const columns = [
    { Header: "Name", accessor: "pname", width: "25%", align: "left" },
    { Header: "Code", accessor: "pcode", width: "20%", align: "left" },
    { Header: "Description", accessor: "description", width: "35%", align: "left" },
    { Header: "Price", accessor: "price", width: "20%", align: "center" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ];

  const rows = products.map((product) => ({
    pname: (
      <MDTypography display="block" variant="button" fontWeight="medium">
        {product.pname}
      </MDTypography>
    ),
    pcode: (
      <MDTypography display="block" variant="button" fontWeight="medium">
        {product.pcode}
      </MDTypography>
    ),
    description: (
      <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
        {product.description}
      </MDTypography>
    ),
    price: (
      <MDTypography component="span" variant="caption" color="text" fontWeight="medium">
        {product.price}
      </MDTypography>
    ),
    actions: (
      <MDBox display="flex" justifyContent="center" alignItems="center">
        <IconButton color="primary" onClick={() => handleEditProduct(product._id)}>
          <Icon>edit</Icon>
        </IconButton>
        <IconButton color="secondary" onClick={() => handleDeleteProduct(product._id)}>
          <Icon>delete</Icon>
        </IconButton>
      </MDBox>
    ),
  }));

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
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
              >
                <MDBox display="flex" justifyContent="space-between" alignItems="center">
                  <MDTypography variant="h6" color="white">
                    Products
                  </MDTypography>
                  <Button variant="contained" color="primary" style={{ backgroundColor: "black" }} onClick={handleAddDialogOpen}>
                    Add Product
                  </Button>
                </MDBox>
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
  
      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Code"
                variant="outlined"
                name="pcode"
                value={newProductData.pcode}
               
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                name="pname"
                value={newProductData.pname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                name="description"
                value={newProductData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                name="price"
                type="number"
                value={newProductData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Subcategories;
