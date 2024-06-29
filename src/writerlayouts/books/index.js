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
  Snackbar,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import MuiAlert from "@mui/material/Alert";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Sidenav from "writerexamples/Sidenav"; // Import Sidenav
import writerroutes from "writerroutes"; // Import routes


const Author = ({ name }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDTypography display="block" variant="button" fontWeight="medium">
      {name}
    </MDTypography>
  </MDBox>
);

function Tables() {
  const columns = [
    {
      Header: "Cover Photo",
      accessor: "book_cover_photo",
      width: "10%",
      Cell: ({ value }) => (
        <img
          src={value}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
      )
    },

    { Header: "Title", accessor: "book_title", width: "15%" },
    { Header: "Description", accessor: "book_description", width: "25%" },
    { 
      Header: "Book Content",  
      accessor: "book_page",  
      Cell: ({ value }) => (
        <div>
          {value.map((page, index) => (
            <div key={index}>
              <p>Page No: {page.page_no}</p>
              <p>Content: {page.content}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      Header: "Actions",
      accessor: "_id",
      width: "10%",
      Cell: ({ value }) => (
        <ButtonGroup variant="outlined" aria-label="button group">
          <IconButton
            aria-label="edit"
            size="medium"
            onClick={() => handleEditForm(value)}
          >
            <EditIcon color="success" />
          </IconButton>
          <Button
            variant="contained"
            color="info"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => handleAddPageForm(value)}
          >
            Add Page
          </Button>
        </ButtonGroup>
      ),
    }
  ];

  const [snackbarMessage, setSnackbarMessage] = useState({ message: "", severity: "success" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openInsertForm, setOpenInsertForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [bookDetails, setBookDetails] = useState({
    book_title: "",
    book_description: "",
    book_cover_photo: null,
    book_page: [{ page_no: "", content: "" }],
    category_name: "",
    name: "",
  });
  const [bookDetailsError, setBookDetailsError] = useState({});
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState("");

  const id = localStorage.getItem("id");

  const validateForm = (bookDetails) => {
    if (!bookDetails.book_title || !bookDetails.book_title.trim()) {
      handleSnackbarOpen("Book title cannot be empty.", "error");
      return false;
    }
    if (!bookDetails.book_description || !bookDetails.book_description.trim()) {
      handleSnackbarOpen("Book description cannot be empty.", "error");
      return false;
    }
    if (!bookDetails.category_name || !bookDetails.category_name.trim()) {
      handleSnackbarOpen("Category name cannot be empty.", "error");
      return false;
    }
    if (!bookDetails.book_cover_photo) {
      handleSnackbarOpen("Book cover photo cannot be empty.", "error");
      return false;
    }
    if (!bookDetails.book_page || bookDetails.book_page.length === 0) {
      handleSnackbarOpen("Book pages cannot be empty.", "error");
      return false;
    }
    for (let i = 0; i < bookDetails.book_page.length; i++) {
      if (!bookDetails.book_page[i].page_no || !bookDetails.book_page[i].page_no.trim()) {
        handleSnackbarOpen(`Page number cannot be empty for page ${i + 1}.`, "error");
        return false;
      }
      if (!bookDetails.book_page[i].content || !bookDetails.book_page[i].content.trim()) {
        handleSnackbarOpen(`Page content cannot be empty for page ${i + 1}.`, "error");
        return false;
      }
      if (bookDetails.book_page[i].content.startsWith(' ')) {
        handleSnackbarOpen(`Page content cannot start with a space for page ${i + 1}.`, "error");
        return false;
      }
    } 
    return true;
  };

  const insertBook = async () => {
        if (!validateForm(bookDetails)) {
          return; }
        try {
          const formData = new FormData();
          formData.append("book_title", bookDetails.book_title);
          formData.append("book_description", bookDetails.book_description);
          bookDetails.book_page.forEach((page, index) => {
            formData.append(`book_page[${index}][page_no]`, page.page_no);
            formData.append(`book_page[${index}][content]`, page.content);
          });
          formData.append("category_name", bookDetails.category_name);
          formData.append("name", localStorage.getItem("name"));
          formData.append("file", bookDetails.book_cover_photo);
    
          // Log the FormData content for debugging
          for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
          }
    
          const response = await fetch(
            `https://bookingreadingapp.onrender.com/api/book/addBook`,
            {
              method: "POST",
              headers: {
                Authorization: localStorage.getItem("token"),
              },
              body: formData,
            }
          );
    
          if (response.ok) {
            const jsonData = await response.json();
            console.log(jsonData);
            setBookDetails({
              book_title: "",
              book_description: "",
              book_cover_photo: null,
              book_page: [{ page_no: "", content: "" }],
              category_name: "",
              name: "",
            });
            setOpenInsertForm(false);
            getBooks();
            handleSnackbarOpen("Book inserted successfully");
          } else {
            const errorData = await response.json();
            console.error("Failed to add book:", errorData);
            handleSnackbarOpen(`Failed to add book: ${errorData.message}`);
          }
        } catch (error) {
          console.error("Error adding book:", error);
          handleSnackbarOpen(`Error adding book: ${error.message}`);
        }
      };
    
      const updateBook = async () => {
      
        try {
          const formData = new FormData();
          formData.append("book_title", bookDetails.book_title || "");
          formData.append("book_description", bookDetails.book_description || "");
          bookDetails.book_page.forEach((page, index) => {
            formData.append(`book_page[${index}][page_no]`, page.page_no);
            formData.append(`book_page[${index}][content]`, page.content);
          });
          formData.append("category_name", bookDetails.category_name);
          formData.append("name", localStorage.getItem("name"));
          if (bookDetails.book_cover_photo) {
            formData.append("file", bookDetails.book_cover_photo);
          }
    
          const response = await fetch(
            `https://bookingreadingapp.onrender.com/api/book/editBook/${bookId}`,
            {
              method: "PUT",
              headers: {
                Authorization: localStorage.getItem("token"),
              },
              body: formData,
            }
          );
    
          if (response.ok) {
            const jsonData = await response.json();
            console.log(jsonData);
            setOpenEditForm(false);
            setBookDetails({
              book_title: "",
              book_description: "",
              book_cover_photo: null,
              book_page: [{ page_no: "", content: "" }],
              category_name: "",
              name: "",
            });
            getBooks();
            handleSnackbarOpen("Book updated successfully" , "success");
          } else {
            throw new Error("Failed to update book");
          }
        } catch (error) {
          console.error("Error updating book:", error);
    
        }
      };
      
      const getBooks = async () => {
        try {
          const response = await fetch(
            `https://bookingreadingapp.onrender.com/api/book/getBooksByAuthor/${id}`,
            {
              method: "GET",
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
    
          if (response.ok) {
            const jsonData = await response.json();
            console.log(jsonData);
            setBooks(jsonData.books);
          } else {
            throw new Error("Failed to fetch books");
          }
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };
    
      const getCategories = async () => {
        try {
          const response = await fetch(
            `https://bookingreadingapp.onrender.com/api/category/getAllCategory`,
            {
              method: "GET",
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
    
          if (response.ok) {
            const jsonData = await response.json();
            console.log(jsonData);
            setCategories(jsonData);
          } else {
            throw new Error("Failed to fetch categories");
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
    
    const handleEditForm = (bookId) => {
    const bookToEdit = books.find((book) => book._id === bookId);
    setBookId(bookId);
    setBookDetails({
      book_title: bookToEdit.book_title,
      book_description: bookToEdit.book_description,
      book_cover_photo: null,
      book_page: bookToEdit.book_page,
      category_name: bookToEdit.category_name,
      name: bookToEdit.name,
    });
    setOpenEditForm(true);
  };

    const handleAddPageForm = (bookId) => {
    console.log("Add Book Page for book with ID:", bookId);
  };

  useEffect(() => {
    getBooks();
    getCategories();
  }, []);

    const rows = books.map((book) => ({
    book_id: book._id,
    category_id: book.category_id,
    author_id: book.author_id,
    book_title: <Author name={book.book_title} />,
    book_description: book.book_description,
    book_cover_photo: book.book_cover_photo,  // Ensure this is a URL to the image
    book_page: book.book_page.length,
    status: book.status,
    _id: book._id,
  }));

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message, severity = "success") => {
    setSnackbarMessage({ message, severity });
    setSnackbarOpen(true);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };


  const handlePageChange = (index, e) => {
    const { name, value } = e.target;
    const newBookPage = [...bookDetails.book_page];
    newBookPage[index][name] = value;
    setBookDetails({ ...bookDetails, book_page: newBookPage });
  };



  const handleAddPage = () => {
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      book_page: [...prevDetails.book_page, { page_no: "", content: "" }],
    }));
  };

  const handleFileChange = (e) => {
    setBookDetails({ ...bookDetails, book_cover_photo: e.target.files[0] });
  };
  


  return (
    <DashboardLayout>
      <Sidenav routes={writerroutes} brandName="Writer Dashboard" />
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
               Books Table
             </MDTypography>
                  <Button
                   variant="contained"
                   color="info"
                   startIcon={<AddCircleOutlineIcon />}
                   onClick={() => setOpenInsertForm(true)}
                 >
                   Insert Book
                 </Button>
            </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: columns, rows: books }}
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

      <Dialog open={openInsertForm} onClose={() => setOpenInsertForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>Insert Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Book Title"
            type="text"
            fullWidth
            name="book_title"
            value={bookDetails.book_title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Book Description"
            type="text"
            fullWidth
            name="book_description"
            value={bookDetails.book_description}
            onChange={handleInputChange}
          />
          {/* <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Book Cover Photo
            <input type="file" hidden onChange={handleFileChange} />
          </Button> */}

       <TextField
            margin="dense"
            id="book_cover_photo"
            label="Book Cover Photo"
            type="file"
            fullWidth
            onChange={(e) =>
              setBookDetails({
                ...bookDetails,
                book_cover_photo: e.target.files[0],
              })
            }
            error={!!bookDetailsError.book_cover_photo}
            helperText={bookDetailsError.book_cover_photo}
          />

          {bookDetails.book_cover_photo && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {bookDetails.book_cover_photo.name}
            </Typography>
          )}
          {bookDetails.book_page.map((page, index) => (
            <React.Fragment key={index}>
              <TextField
                margin="dense"
                label={`Page Number ${index + 1}`}
                type="text"
                fullWidth
                name="page_no"
                value={page.page_no}
                onChange={(e) => handlePageChange(index, e)}
              />
              <TextField
                margin="dense"
                label={`Content ${index + 1}`}
                type="text"
                fullWidth
                name="content"
                value={page.content}
                onChange={(e) => handlePageChange(index, e)}
              />
            </React.Fragment>
          ))}
          <IconButton onClick={handleAddPage} color="primary" sx={{ mt: 2 }}>
            <AddCircleOutlineIcon />
          </IconButton>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category_name"
              value={bookDetails.category_name}
              onChange={handleInputChange}
              sx={{ height: "40px", 
                    '.MuiInputBase-root': { height: '100%' }, 
                    '.MuiSelect-select': { height: '100%', display: 'flex', alignItems: 'center' } 
                              }}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.category_name}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInsertForm(false)}>Cancel</Button>
          <Button onClick={insertBook} variant="contained" color="primary" style={{ color: "white" }}>
            Insert
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Book Title"
            type="text"
            fullWidth
            name="book_title"
            value={bookDetails.book_title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Book Description"
            type="text"
            fullWidth
            name="book_description"
            value={bookDetails.book_description}
            onChange={handleInputChange}
          />
          {/* <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Book Cover Photo
            <input type="file" hidden onChange={handleFileChange} />
          </Button> */}
          <TextField
              margin="dense"
              // style={{ height: "60px" }}
              id="book_cover_photo"
              label="Book Cover Photo"
              type="file"
              fullWidth
              onChange={(e) =>
                setBookDetails({
                  ...bookDetails,
                  book_cover_photo: e.target.files[0],
                })
              }
              error={!!bookDetailsError.book_cover_photo}
              helperText={bookDetailsError.book_cover_photo}
            />
          {bookDetails.book_cover_photo && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {bookDetails.book_cover_photo.name}
            </Typography>
          )}
          {bookDetails.book_page.map((page, index) => (
            <React.Fragment key={index}>
              <TextField
                margin="dense"
                label={`Page Number ${index + 1}`}
                type="text"
                fullWidth
                name="page_no"
                value={page.page_no}
                onChange={(e) => handlePageChange(index, e)}
              />
              <TextField
                margin="dense"
                label={`Content ${index + 1}`}
                type="text"
                fullWidth
                name="content"
                value={page.content}
                onChange={(e) => handlePageChange(index, e)}
              />
            </React.Fragment>
          ))}
          <IconButton onClick={handleAddPage} color="primary" sx={{ mt: 2 }}>
            <AddCircleOutlineIcon />
          </IconButton>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category_name"
              value={bookDetails.category_name}
              onChange={handleInputChange}
              sx={{ height: "40px", 
                '.MuiInputBase-root': { height: '100%' }, 
                '.MuiSelect-select': { height: '100%', display: 'flex', alignItems: 'center' } 
                          }}
            >
              
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.category_name}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditForm(false)}>Cancel</Button>
          <Button onClick={updateBook} variant="contained" color="primary" style={{ color: "white" }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
      >
  <MuiAlert
    elevation={6}
    variant="filled"
    onClose={handleSnackbarClose}
    severity={snackbarMessage.severity}
  >
    {snackbarMessage.message}
  </MuiAlert>
</Snackbar>
    </DashboardLayout>
  );
}

export default Tables;