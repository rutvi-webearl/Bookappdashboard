

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
