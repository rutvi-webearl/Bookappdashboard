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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";

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
    { Header: "Book ID", accessor: "book_id", width: "10%" },
    { Header: "Category ID", accessor: "category_id", width: "10%" },
    { Header: "Author ID", accessor: "author_id", width: "10%" },
    { Header: "Title", accessor: "book_title", width: "15%" },
    { Header: "Description", accessor: "book_description", width: "25%" },
    { Header: "Cover Photo", accessor: "book_cover_photo", width: "10%" },
    { Header: "Page Count", accessor: "book_page", width: "10%" },
    { Header: "Status", accessor: "status", width: "10%" },
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
    },
  ];

  const [openInsertForm, setOpenInsertForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [bookDetails, setBookDetails] = useState({
    book_title: "",
    book_description: "",
    book_cover_photo: null,
    book_page: "",
    status: "",
  });
  const [bookDetailsError, setBookDetailsError] = useState({});
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState("");

  const id = localStorage.getItem("id");

  // const getBooks = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://bookingreadingapp.onrender.com/api/book/getBooksByAuthor/${id}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const jsonData = await response.json();
  //       console.log(jsonData);
  //       setBooks(jsonData.books);
  //     } else {
  //       throw new Error("Failed to fetch books");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching books:", error);
  //   }
  // };

  const insertBook = async () => {
    // if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("book_title", bookDetails.book_title);
      formData.append("book_description", bookDetails.book_description);
      formData.append("book_page[0][page_no]", "1");
      formData.append("book_page[0][content]", "Initial content");
      formData.append("category_name", "finance");
      formData.append("name", localStorage.getItem("name"));
      formData.append("file", bookDetails.book_cover_photo);

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
          book_page: "",
          status: "",
        });
        setOpenInsertForm(false);
        getBooks();
      } else {
        throw new Error("Failed to add book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };
  
  // const updateBook = async () => {
  //   // if (!validateForm()) return;
  //   try {
  //     const formData = new FormData();
  //     formData.append("book_title", bookDetails.book_title || "");
  //     formData.append("book_description", bookDetails.book_description || "");
  //     formData.append("book_page[0][page_no]", bookDetails.book_page);
  //     formData.append("book_page[0][content]", "Updated content");
  //     formData.append("category_name", "YourCategoryNameHere");
  //     formData.append("name", localStorage.getItem("name"));
  //     if (bookDetails.book_cover_photo) {
  //       formData.append("file", bookDetails.book_cover_photo);
  //     }
  
  //     const response = await fetch(
  //       `https://bookingreadingapp.onrender.com/api/book/editBook/${bookId}`, // Use bookId here instead of id
  //       {
  //         method: "PATCH",
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //         },
  //         body: formData,
  //       }
  //     );
  
  //     if (response.ok) {
  //       const jsonData = await response.json();
  //       console.log(jsonData);
  //       setOpenEditForm(false);
  //       setBookDetails({
  //         book_title: "",
  //         book_description: "",
  //         book_cover_photo: null,
  //         book_page: "",
  //         status: "",
  //       });
  //       getBooks();
  //     } else {
  //       throw new Error("Failed to update book");
  //     }
  //   } catch (error) {
  //     console.error("Error updating book:", error);
  //   }
  // };

  // const updateBook = async () => {
  //   try {
  //     console.log("Updating book with ID:", bookId);
  //     console.log("Updated book details:", bookDetails);
  
  //     const formData = new FormData();
  //     formData.append("book_title", bookDetails.book_title || "");
  //     formData.append("book_description", bookDetails.book_description || "");
  //     formData.append("book_page[0][page_no]", bookDetails.book_page);
  //     formData.append("book_page[0][content]", "Updated content");
  //     formData.append("category_name", "YourCategoryNameHere");
  //     formData.append("name", localStorage.getItem("name"));
  //     if (bookDetails.book_cover_photo) {
  //       formData.append("file", bookDetails.book_cover_photo);
  //     }
  
  //     const response = await fetch(
  //       `https://bookingreadingapp.onrender.com/api/book/editBook/${bookId}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           'Content-Type': "application/json",
  //           Authorization: localStorage.getItem("token"),
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );
  
  //     if (response.ok) {
  //       const jsonData = await response.json();
  //       console.log("Successfully updated book:", jsonData);
  
  //       setOpenEditForm(false);
  //       setBookDetails({
  //         book_title: "",
  //         book_description: "",
  //         book_cover_photo: null,
  //         book_page: "",
  //         status: "",
  //       });
  //       getBooks();
  //     } else {
  //       throw new Error("Failed to update book");
  //     }
  //   } catch (error) {
  //     console.error("Error updating book:", error);
  //   }
  // };
  
  const updateBook = async () => {
    try {
      console.log("Updating book with ID:", bookId);
      console.log("Updated book details:", bookDetails);
  
      const formData = new FormData();
      formData.append("book_title", bookDetails.book_title || "");
      formData.append("book_description", bookDetails.book_description || "");
      formData.append("book_page[0][page_no]", bookDetails.book_page);
      formData.append("book_page[0][content]", "Updated content");
      formData.append("category_name", "YourCategoryNameHere");
      formData.append("name", localStorage.getItem("name"));
      if (bookDetails.book_cover_photo) {
        formData.append("file", bookDetails.book_cover_photo);
      }
  
      const response = await fetch(
        `https://bookingreadingapp.onrender.com/api/book/editBook/${bookId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        }
      );
  
      if (response.ok) {
        const jsonData = await response.json();
        console.log("Successfully updated book:", jsonData);
  
        // Update local state with the updated book data
        const updatedBooks = books.map((book) =>
          book._id === bookId ? jsonData.updatedBook : book
        );
        setBooks(updatedBooks);
  
        setOpenEditForm(false);
        setBookDetails({
          book_title: "",
          book_description: "",
          book_cover_photo: null,
          book_page: "",
          status: "",
        });
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

  
  const validateForm = () => {
    let valid = true;
    let errors = {};
  
    if (!bookDetails.book_title || !bookDetails.book_title.trim()) {
      errors.book_title = "Book title is required";
      valid = false;
    }
    if (!bookDetails.book_description || !bookDetails.book_description.trim()) {
      errors.book_description = "Book description is required";
      valid = false;
    }
    if (!bookDetails.book_cover_photo) {
      errors.book_cover_photo = "Book cover photo is required";
      valid = false;
    }
    if (!bookDetails.book_page) {
      errors.book_page = "Book page count is required";
      valid = false;
    }
    if (!bookDetails.status || !bookDetails.status.trim()) {
      errors.status = "Status is required";
      valid = false;
    }
  
    setBookDetailsError(errors);
    return valid;
  };
  
  // const handleEditForm = (bookId) => {
  //   const bookToEdit = books.find((book) => book._id === bookId);
  //   setBookId(bookId);
  //   setBookDetails({
  //     book_title: bookToEdit.book_title,
  //     book_description: bookToEdit.book_description,
  //     book_cover_photo: null,
  //     book_page: bookToEdit.book_page,
  //     status: bookToEdit.status,
  //   });
  //   setOpenEditForm(true);
  // };

  // const handleEditForm = (bookId) => {
  //   const bookToEdit = books.find((book) => book._id === bookId);
  //   console.log("Editing book with ID:", bookId);
  //   console.log("Book details to edit:", bookToEdit);
  
  //   setBookId(bookId);
  //   setBookDetails({
  //     book_title: bookToEdit.book_title,
  //     book_description: bookToEdit.book_description,
  //     book_cover_photo: null,
  //     book_page: bookToEdit.book_page,
  //     status: bookToEdit.status,
  //   });
  //   setOpenEditForm(true);
  // };
  
  const handleEditForm = (bookId) => {
    const bookToEdit = books.find((book) => book._id === bookId);
    console.log("Editing book with ID:", bookId);
    console.log("Book details to edit:", bookToEdit);
  
    setBookId(bookId);
    // setBookDetails({
    //   book_title: bookToEdit.book_title,
    //   book_description: bookToEdit.book_description,
    //   book_cover_photo: bookToEdit.book_cover_photo, // Retain existing cover photo
    //   book_page: bookToEdit.book_page, // Retain existing page count
    //   status: bookToEdit.status,
    // });
    setOpenEditForm(true);
  
  };
  

  const handleAddPageForm = (bookId) => {
    console.log("Add Book Page for book with ID:", bookId);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const rows = books.map((book) => ({
    book_id: book._id,
    category_id: book.category_id,
    author_id: book.author_id,
    book_title: <Author name={book.book_title} />,
    book_description: book.book_description,
    book_cover_photo: book.book_cover_photo,
    book_page: book.book_page.length,
    status: book.status,
    _id: book._id,
  }));
  

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
        <DialogTitle>Insert Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="bookTitle"
            label="Book Title"
            type="text"
            fullWidth
            value={bookDetails.book_title}
            onChange={(e) =>
              setBookDetails({ ...bookDetails, book_title: e.target.value })
            }
            error={!!bookDetailsError.book_title}
            helperText={bookDetailsError.book_title}
          />
          <TextField
            margin="dense"
            id="bookDescription"
            label="Book Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={bookDetails.book_description}
            onChange={(e) =>
              setBookDetails({
                ...bookDetails,
                book_description: e.target.value,
              })
            }
            error={!!bookDetailsError.book_description}
            helperText={bookDetailsError.book_description}
          />
          <TextField
            margin="dense"
            id="bookPage"
            label="Book Page Count"
            type="number"
            fullWidth
            value={bookDetails.book_page}
            onChange={(e) =>
              setBookDetails({ ...bookDetails, book_page: e.target.value })
            }
            error={!!bookDetailsError.book_page}
            helperText={bookDetailsError.book_page}
          />
          <TextField
            margin="dense"
            id="bookCoverPhoto"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInsertForm(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={insertBook} color="primary">
            Insert
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Form Dialog */}
      <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="editBookTitle"
            label="Book Title"
            type="text"
            fullWidth
            value={bookDetails.book_title}
            onChange={(e) =>
              setBookDetails({ ...bookDetails, book_title: e.target.value })
            }
            error={!!bookDetailsError.book_title}
            helperText={bookDetailsError.book_title}
          />
          <TextField
            margin="dense"
            id="editBookDescription"
            label="Book Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={bookDetails.book_description}
            onChange={(e) =>
              setBookDetails({
                ...bookDetails,
                book_description: e.target.value,
              })
            }
            error={!!bookDetailsError.book_description}
            helperText={bookDetailsError.book_description}
          />
          <TextField
            margin="dense"
            id="editBookPage"
            label="Book Page Count"
            type="number"
            fullWidth
            value={bookDetails.book_page}
            onChange={(e) =>
              setBookDetails({ ...bookDetails, book_page: e.target.value })
            }
            error={!!bookDetailsError.book_page}
            helperText={bookDetailsError.book_page}
          />
          <TextField
            margin="dense"
            id="editBookCoverPhoto"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditForm(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={updateBook} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Tables;













