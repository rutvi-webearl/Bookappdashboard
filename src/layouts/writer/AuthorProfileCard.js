import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDAvatar from 'components/MDAvatar';

const AuthorProfileCard = ({ authorId }) => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthorProfile = async () => {
      try {
        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjcyZDdhNDZkYzAzZTQ5YWUyYjRlNDciLCJpYXQiOjE3MTg4MDIzNDgsImV4cCI6MTcxODgwNTk0OH0.FFGg6wsz_kyyUXFLSwipzsX14Co23Fx3to869oIYIX4';
        const response = await fetch(`https://bookingreadingapp.onrender.com/api/author/profileDisplay/${authorId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
          }
        });

        if (response.ok) {
          const data = await response.json();
          setAuthor(data); // Assuming data is an object with author details
        } else {
          console.error('Failed to fetch author profile:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch author profile:', error);
      }
    };

    fetchAuthorProfile();
  }, [authorId]);

  if (!author) {
    return <p>Loading...</p>; // Render loading indicator while fetching data
  }

  return (
    <Card>
      <MDBox p={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <IconButton onClick={() => navigate('/writers')}>
            <ArrowBackIcon />
          </IconButton>
          <MDTypography variant="h6">{author.name}</MDTypography>
          <div /> {/* Placeholder for spacing */}
        </MDBox>
        <MDBox display="flex" alignItems="center">
          <MDAvatar src={author.photo} name={author.name} size="lg" />
          <MDBox ml={2}>
            <MDTypography variant="subtitle1">Date of Birth: {author.dob}</MDTypography>
            <MDTypography variant="body1">City: {author.city}</MDTypography>
            <MDTypography variant="body1">State: {author.state}</MDTypography>
            <MDTypography variant="body1">Country: {author.country}</MDTypography>
            <MDTypography variant="body1">Gender: {author.gender}</MDTypography>
            <MDTypography variant="body1">Email: {author.email}</MDTypography>
            <MDTypography variant="body1">Mobile: {author.mobile}</MDTypography>
            <MDTypography variant="body1">Status: {author.status}</MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
};

export default AuthorProfileCard;
