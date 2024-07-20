
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Button, IconButton, ButtonGroup } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'examples/Tables/DataTable';
import MDAvatar from 'components/MDAvatar';
import MDBadge from 'components/MDBadge';

const Author = ({ image, name, email, mobile }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    {image ? (
      <MDAvatar src={image} name={name} size="sm" />
    ) : (
      <MDAvatar name={name} size="sm" />
    )}
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
      <MDTypography display="block" variant="caption">
        {email}
      </MDTypography>
      <MDTypography display="block" variant="caption">
        {mobile}
      </MDTypography>
    </MDBox>
  </MDBox>
);

function Writers() {
  const navigate = useNavigate();
  const [writers, setWriters] = useState([]);
  const [filteredWriters, setFilteredWriters] = useState([]);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          console.error('No auth token found in local storage');
          return;
        }
        const response = await fetch('https://bookreading-app.onrender.com/api/author/allAuthor', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
          }
        });

        if (response.ok) {
          const data = await response.json();
          const sortedWriters = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setWriters(sortedWriters);
          setFilteredWriters(sortedWriters); // Set the initial filtered writers
        } else {
          console.error('Failed to fetch writers:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch writers:', error);
      }
    };

    fetchWriters();
  }, []);

  const handleSearch = (searchValue) => {
    const filtered = writers.filter((writer) =>
      writer.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredWriters(filtered);
  };

  const columns = [
    {
      Header: 'Photo',
      accessor: 'photo',
      width: '10%',
      Cell: ({ value }) => (
        <img
          src={value} 
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
      )
    },
    { Header: 'Name', accessor: 'name', width: '15%' },
    { Header: "Created At", accessor: "createdAt", width: '15%'},
    { Header: 'DOB', accessor: 'dob', width: '10%' },
    { Header: 'City', accessor: 'city', width: '10%' },
    { Header: 'State', accessor: 'state', width: '10%' },
    { Header: 'Country', accessor: 'country', width: '10%' },
    { Header: 'Gender', accessor: 'gender', width: '10%' },
    { Header: 'Status', accessor: 'status', width: '10%' },
    { Header: 'Actions', accessor: 'actions', width: '10%' }
  ];

  const rows = filteredWriters.map((writer) => {
    console.log(`Writer: ${writer.name}, Status: ${writer.status}`); // Debug log
    return {
      name: <Author name={writer.name} email={writer.email} mobile={writer.mobile} />,
      createdAt: (
        <MDBox>
          <MDTypography display="block" variant="caption">{new Date(writer.createdAt).toLocaleDateString()}</MDTypography>
          <MDTypography display="block" variant="caption">{new Date(writer.createdAt).toLocaleTimeString()}</MDTypography>
        </MDBox>
      ),
      dob: writer.dob,
      city: writer.city,
      state: writer.state,
      country: writer.country,
      gender: writer.gender,
      photo: writer.photo,
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={writer.status} color={writer.status === "active" ? "success" : "info"} variant="gradient" size="sm" />
        </MDBox>
      ),
      actions: (
        <ButtonGroup>
          <IconButton color="success" onClick={() => navigate(`/edit-writer/${writer._id}`)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => navigate(`/delete-writer/${writer._id}`)}>
            <DeleteIcon />
          </IconButton>
        </ButtonGroup>
      )
    };
  });

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
                  Writers
                </MDTypography>
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => navigate('/add-writer')}
                >
                  Add Writer
                </Button>
              </MDBox>
              <MDBox pt={3} style={{ maxHeight: '400px', overflowY: 'auto' }}>
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

export default Writers;
