// import { useNavigate } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import { Button, IconButton, ButtonGroup } from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import React, { useEffect, useState } from 'react';
// import MDBox from 'components/MDBox';
// import MDTypography from 'components/MDTypography';
// import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
// import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
// import Footer from 'examples/Footer';
// import DataTable from 'examples/Tables/DataTable';
// import MDAvatar from 'components/MDAvatar';

// const Author = ({ image, name, email }) => (
//   <MDBox display="flex" alignItems="center" lineHeight={1}>
//     <MDAvatar src={image} name={name} size="sm" />
//     <MDBox ml={2} lineHeight={1}>
//       <MDTypography display="block" variant="button" fontWeight="medium">
//         {name}
//       </MDTypography>
//       <MDTypography variant="caption">{email}</MDTypography>
//     </MDBox>
//   </MDBox>
// );

// function Writers() {
//   const navigate = useNavigate();
//   const [writers, setWriters] = useState([]);

//   useEffect(() => {
//     const fetchWriters = async () => {
//       try {
//         const authToken = localStorage.getItem('token');
//         if (!authToken) {
//           console.error('No auth token found in local storage');
//           return;
//         }
//         const response = await fetch('https://bookingreadingapp.onrender.com/api/author/allAuthor', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': authToken
//           }
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setWriters(data); // Assuming data is an array of author objects
//         } else {
//           console.error('Failed to fetch writers:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Failed to fetch writers:', error);
//       }
//     };

//     fetchWriters();
//   }, []);

//   const columns = [
//     { Header: 'Name', accessor: 'name', width: '15%' },
//     { Header: 'DOB', accessor: 'dob', width: '10%' },
//     { Header: 'City', accessor: 'city', width: '10%' },
//     { Header: 'State', accessor: 'state', width: '10%' },
//     { Header: 'Country', accessor: 'country', width: '10%' },
//     { Header: 'Gender', accessor: 'gender', width: '10%' },
//     { Header: 'Photo', accessor: 'photo', width: '10%' },
//     { Header: 'Status', accessor: 'status', width: '10%' },
//     { Header: 'Mobile', accessor: 'mobile', width: '10%' },
//     { Header: 'Email', accessor: 'email', width: '10%' },
//     { Header: 'Actions', accessor: 'actions', width: '10%' }
//   ];

//   const rows = writers.map((writer) => ({
//     name: <Author image={writer.photo} name={writer.name} email={writer.email} />,
//     dob: writer.dob,
//     city: writer.city,
//     state: writer.state,
//     country: writer.country,
//     gender: writer.gender,
//     photo: writer.photo,
//     status: writer.status,
//     mobile: writer.mobile,
//     email: writer.email,
//     actions: (
//       <ButtonGroup>
//         <IconButton color="success" onClick={() => navigate(`/edit-writer/${writer._id}`)}>
//           <EditIcon />
//         </IconButton>
//         <IconButton color="error" onClick={() => navigate(`/delete-writer/${writer._id}`)}>
//           <DeleteIcon />
//         </IconButton>
//       </ButtonGroup>
//     )
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
//                   Writers
//                 </MDTypography>
//                 {/* <Button
//                   variant="contained"
//                   color="info"
//                   startIcon={<AddCircleOutlineIcon />}
//                   onClick={() => navigate('/add-writer')}
//                 >
//                   Add Writer
//                 </Button> */}
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
//     </DashboardLayout>
//   );
// }

// export default Writers;

// import { useNavigate } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import { Button, IconButton, ButtonGroup } from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import React, { useEffect, useState } from 'react';
// import MDBox from 'components/MDBox';
// import MDTypography from 'components/MDTypography';
// import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
// import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
// import Footer from 'examples/Footer';
// import DataTable from 'examples/Tables/DataTable';
// import MDAvatar from 'components/MDAvatar';

// const Author = ({ image, name, email }) => (
//   <MDBox display="flex" alignItems="center" lineHeight={1}>
//     {image && <MDAvatar src={image} name={name} size="sm" />}
//     {/* <MDAvatar src={image} name={name} size="sm" /> */}
//     <MDBox ml={2} lineHeight={1}>
//       <MDTypography display="block" variant="button" fontWeight="medium">
//         {name}
//       </MDTypography>
//       <MDTypography variant="caption">{email}</MDTypography>
//     </MDBox>
//   </MDBox>
// );

// function Writers() {
//   const navigate = useNavigate();
//   const [writers, setWriters] = useState([]);

//   useEffect(() => {
//     const fetchWriters = async () => {
//       try {
//         const authToken = localStorage.getItem('token');
//         if (!authToken) {
//           console.error('No auth token found in local storage');
//           return;
//         }
//         const response = await fetch('https://bookingreadingapp.onrender.com/api/author/allAuthor', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': authToken
//           }
//         });

//         if (response.ok) {
//           const data = await response.json();
//           // Sort writers by a timestamp field (example: createdAt or _id)
//           const sortedWriters = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//           setWriters(sortedWriters);
//         } else {
//           console.error('Failed to fetch writers:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Failed to fetch writers:', error);
//       }
//     };

//     fetchWriters();
//   }, []);

//   const columns = [
//     { Header: 'Name', accessor: 'name', width: '15%' },
//     { Header: 'DOB', accessor: 'dob', width: '10%' },
//     { Header: 'City', accessor: 'city', width: '10%' },
//     { Header: 'State', accessor: 'state', width: '10%' },
//     { Header: 'Country', accessor: 'country', width: '10%' },
//     { Header: 'Gender', accessor: 'gender', width: '10%' },
//     { Header: 'Photo', accessor: 'photo', width: '10%' },
//     { Header: 'Status', accessor: 'status', width: '10%' },
//     { Header: 'Mobile', accessor: 'mobile', width: '10%' },
//     { Header: 'Email', accessor: 'email', width: '10%' },
//     { Header: 'Actions', accessor: 'actions', width: '10%' }
//   ];

//   const rows = writers.map((writer) => ({
//     name: <Author image={writer.photo} name={writer.name} email={writer.email} />,
//     dob: writer.dob,
//     city: writer.city,
//     state: writer.state,
//     country: writer.country,
//     gender: writer.gender,
//     photo: writer.photo,
//     status: writer.status ? 'true' : 'false',
//     mobile: writer.mobile,
//     email: writer.email,
//     actions: (
//       <ButtonGroup>
//         <IconButton color="success" onClick={() => navigate(`/edit-writer/${writer._id}`)}>
//           <EditIcon />
//         </IconButton>
//         <IconButton color="error" onClick={() => navigate(`/delete-writer/${writer._id}`)}>
//           <DeleteIcon />
//         </IconButton>
//       </ButtonGroup>
//     )
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
//                   Writers
//                 </MDTypography>
//                 {/* <Button
//                   variant="contained"
//                   color="info"
//                   startIcon={<AddCircleOutlineIcon />}
//                   onClick={() => navigate('/add-writer')}
//                 >
//                   Add Writer
//                 </Button> */}
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
//     </DashboardLayout>
//   );
// }

// export default Writers;

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

const Author = ({ image, name, email }) => (
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
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  </MDBox>
);

function Writers() {
  const navigate = useNavigate();
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          console.error('No auth token found in local storage');
          return;
        }
        const response = await fetch('https://bookingreadingapp.onrender.com/api/author/allAuthor', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
          }
        });

        if (response.ok) {
          const data = await response.json();
          // Sort writers by a timestamp field (example: createdAt or _id)
          const sortedWriters = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setWriters(sortedWriters);
        } else {
          console.error('Failed to fetch writers:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch writers:', error);
      }
    };

    fetchWriters();
  }, []);

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
    { Header: 'DOB', accessor: 'dob', width: '10%' },
    { Header: 'City', accessor: 'city', width: '10%' },
    { Header: 'State', accessor: 'state', width: '10%' },
    { Header: 'Country', accessor: 'country', width: '10%' },
    { Header: 'Gender', accessor: 'gender', width: '10%' },
    // { Header: 'Photo', accessor: 'photo', width: '10%' },
    { Header: 'Status', accessor: 'status', width: '10%' },
    { Header: 'Mobile', accessor: 'mobile', width: '10%' },
    { Header: 'Email', accessor: 'email', width: '10%' },
    { Header: 'Actions', accessor: 'actions', width: '10%' }
  ];

  const rows = writers.map((writer) => ({
    name: <Author image={writer.photo} name={writer.name} email={writer.email} />,
    dob: writer.dob,
    city: writer.city,
    state: writer.state,
    country: writer.country,
    gender: writer.gender,
    photo: writer.photo,
    status: writer.status ? 'true' : 'false',
    mobile: writer.mobile,
    email: writer.email,
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
    </DashboardLayout>
  );
}

export default Writers;

