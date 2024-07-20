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
import Sidenav from "writerexamples/Sidenav"; 
import writerroutes from "writerroutes"; 
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const Author = ({ name }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDTypography display="block" variant="button" fontWeight="medium">
      {name}
    </MDTypography>
  </MDBox>
);

function Tables() {
  const sanitizeText = (htmlString) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText || ""; 
  };

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

    // { Header: "Description", accessor: "book_description", width: "25%" },

    {
      Header: "Description",
      accessor: "book_description",
      width: "25%",
      Cell: ({ value }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const maxChars = 10; // Adjust the maximum number of characters
        const truncatedValue = value.length > maxChars ? `${value.slice(0, maxChars)}...` : value;
  
        const toggleExpand = () => {
          setIsExpanded(!isExpanded);
        };
  
        return (
          <div
            style={{
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: isExpanded ? 'none' : 3, // Adjust the number of lines before cutting off
              maxHeight: isExpanded ? 'none' : '150px' // Optional: restrict the maximum height
            }}
          >
            {isExpanded ? value : truncatedValue}
            {value.length > maxChars && (
              <button onClick={toggleExpand} style={{ marginLeft: '10px', cursor: 'pointer', background: 'none', border: 'none', color: 'blue', textDecoration: 'underline' }}>
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        );
      }
    },
  

//  {
//     Header: "Book Content",
//     accessor: "book_page",
//     Cell: ({ value }) => (
//       <div>
//         {value.map((page, index) => (
//           <div key={index}>
//             <p>Page No: {page.page_no}</p>
//             <p>Content: {sanitizeText(page.content)}</p>
//           </div>
//         ))}
//       </div>
//     ),
//   },

{
  Header: "Book Content",
  accessor: "book_page",
  Cell: ({ value }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePreviousPage = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleNextPage = () => {
      if (currentPage < value.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    };

    return (
      <div>
        <p>Page No: {value[currentPage].page_no}</p>
        <p>Content: {sanitizeText(value[currentPage].content)}</p>
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 0}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton onClick={handleNextPage} disabled={currentPage === value.length - 1}>
          <NavigateNextIcon />
        </IconButton>
      </div>
    );
  }
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
          {/* <Button
            variant="contained"
            color="info"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => handleAddPageForm(value)}
          >
            Add Page
          </Button> */}
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
    book_page: [{ content: "" }],
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
      return;
    }
    console.log("Sending book details:", bookDetails);
    console.log("Author ID:", id);
    try {
      const formData = new FormData();
      formData.append("book_title", bookDetails.book_title);
      formData.append("book_description", bookDetails.book_description);
      bookDetails.book_page.forEach((page, index) => {
        formData.append(`book_page[${index}][content]`, page.content);
      });
      formData.append("category_name", bookDetails.category_name);
      formData.append("name", localStorage.getItem("name"));
      formData.append("file", bookDetails.book_cover_photo);
      formData.append("author_id", id);


      // // Log the FormData content for debugging
      // for (let pair of formData.entries()) {
      //   console.log(`${pair[0]}: ${pair[1]}`);
      // }


      const response = await fetch(
        `https://bookreading-app.onrender.com/api/book/addBook`,
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
          book_page: [{ content: "" }],
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
        formData.append(`book_page[${index}][content]`, page.content);
      });
      formData.append("category_name", bookDetails.category_name);
      formData.append("name", localStorage.getItem("name"));
      if (bookDetails.book_cover_photo) {
        formData.append("file", bookDetails.book_cover_photo);
      }
      formData.append("author_id", id);
      const response = await fetch(
        `https://bookreading-app.onrender.com/api/book/editBook/${bookId}`,
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
          book_page: [{ content: "" }],
          category_name: "",
          name: "",
        });
        getBooks();
        handleSnackbarOpen("Book updated successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to update book:", errorData);
        handleSnackbarOpen(`Failed to update book: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating book:", error);
      handleSnackbarOpen(`Error updating book: ${error.message}`);
    }
  };
  const getBooks = async () => {
    try {
      const response = await fetch(
        `https://bookreading-app.onrender.com/api/book/getBooksByAuthor/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const jsonData = await response.json();
  
      // Ensure jsonData.books is an array before setting state
      if (Array.isArray(jsonData.books)) {
        setBooks(jsonData.books);
      } else {
        throw new Error("Books data is not an array");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      // Handle error: show error message, retry, or fallback
    }
  };
  

  const getCategories = async () => {
    try {
      const response = await fetch(
        `https://bookreading-app.onrender.com/api/category/getAllCategory`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCategories(data);
      } else {
        console.error("Failed to fetch categories:", data.message);
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
    setBookId(bookId);
    setOpenInsertForm(true);
  };

  const handleSnackbarOpen = (message, severity = "success") => {
    setSnackbarMessage({ message, severity });
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    getBooks();
    getCategories();
  }, []);

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <Sidenav routes={writerroutes} brandName="Writer Dashboard"/>
      <DashboardNavbar />
      <MDBox pt ={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox  mx={2}
                mt={-3}
                py={3}
                px={2} d variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <MDTypography variant="h6" color="white">
                  Book List
                </MDTypography>
                <Button variant="contained" color="info" startIcon={<AddIcon />} onClick={() => setOpenInsertForm(true)}>
                  Insert Book
                </Button>
              </MDBox>
              <MDBox pt={3}>
              <DataTable
                table={{ columns, rows: books }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
                 </MDBox>
            </Card>
         
          </Grid>
        </Grid>
        {/* Insert Form */}
        <Dialog open={openInsertForm} onClose={() => setOpenInsertForm(false)} maxWidth="md" fullWidth>
          <DialogTitle>Add Book</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Book Title"
                  fullWidth
                  value={bookDetails.book_title}
                  onChange={(e) => setBookDetails({ ...bookDetails, book_title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Book Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={bookDetails.book_description}
                  onChange={(e) => setBookDetails({ ...bookDetails, book_description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={bookDetails.category_name}
                    onChange={(e) => setBookDetails({ ...bookDetails, category_name: e.target.value })}
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
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  color="info"
                >
                  Upload Cover Photo
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setBookDetails({ ...bookDetails, book_cover_photo: e.target.files[0] })}
                  />
                </Button>
                {bookDetails.book_cover_photo && (
                  <Typography variant="body2" style={{ marginTop: "10px" }}>
                    {bookDetails.book_cover_photo.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Book Pages</Typography>
                {bookDetails.book_page.map((page, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Page {index + 1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <CKEditor
                        editor={ClassicEditor}
                        data={page.content}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setBookDetails((prevDetails) => {
                            const updatedPages = [...prevDetails.book_page];
                            updatedPages[index].content = data;
                            return { ...prevDetails, book_page: updatedPages };
                          });
                        }}
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => setBookDetails((prevDetails) => ({
                    ...prevDetails,
                    book_page: [...prevDetails.book_page, { content: "" }]
                  }))}
                  startIcon={<AddIcon />}
                  style={{ marginTop: "10px" }}
                >
                  Add Page
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenInsertForm(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={insertBook} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* Edit Form */}
        <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)} maxWidth="md" fullWidth>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Book Title"
                  fullWidth
                  value={bookDetails.book_title}
                  onChange={(e) => setBookDetails({ ...bookDetails, book_title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Book Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={bookDetails.book_description}
                  onChange={(e) => setBookDetails({ ...bookDetails, book_description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={bookDetails.category_name}
                    onChange={(e) => setBookDetails({ ...bookDetails, category_name: e.target.value })}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category._id} value={category.category_name}>
                        {category.category_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  color="info"
                >
                  Upload Cover Photo
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setBookDetails({ ...bookDetails, book_cover_photo: e.target.files[0] })}
                  />
                </Button>
                {bookDetails.book_cover_photo && (
                  <Typography variant="body2" style={{ marginTop: "10px" }}>
                    {bookDetails.book_cover_photo.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Book Pages</Typography>
                {bookDetails.book_page.map((page, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Page {index + 1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <CKEditor
                        editor={ClassicEditor}
                        data={page.content}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setBookDetails((prevDetails) => {
                            const updatedPages = [...prevDetails.book_page];
                            updatedPages[index].content = data;
                            return { ...prevDetails, book_page: updatedPages };
                          });
                        }}
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => setBookDetails((prevDetails) => ({
                    ...prevDetails,
                    book_page: [...prevDetails.book_page, { content: "" }]
                  }))}
                  startIcon={<AddIcon />}
                  style={{ marginTop: "10px" }}
                >
                  Add Page
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditForm(false)} color="info">
              Cancel
            </Button>
            <Button onClick={updateBook} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarMessage.severity}>
            {snackbarMessage.message}
          </Alert>
        </Snackbar>
      </MDBox>
    </DashboardLayout>
  );
};

export default Tables;

