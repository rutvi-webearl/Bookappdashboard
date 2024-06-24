import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';

function DeleteWriter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(true);
  const [writer, setWriter] = useState(null);

  useEffect(() => {
    const fetchWriter = async () => {
      try {
        // Placeholder for fetching writer details (you can replace with actual API call)
        const mockWriter = {
          _id: id,
          name: 'Writer ' + id
        };
        setWriter(mockWriter);
      } catch (error) {
        console.error('Failed to fetch writer:', error);
      }
    };

    fetchWriter();
  }, [id]);

  const handleDelete = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('No auth token found in local storage');
        return;
      }

      const response = await fetch(`https://bookingreadingapp.onrender.com/api/author/deleteAuthor/${writer._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken,
        }
      });

      if (response.ok) {
        // Redirect to writers list after successful deletion
        navigate('/writer');
      } else {
        console.error('Failed to delete writer:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to delete writer:', error);
    }
  };

  const handleCloseDeleteDialog = () => {
    setConfirmDeleteOpen(false);
    navigate('/writer');
  };

  return (
    <Dialog open={confirmDeleteOpen} onClose={handleCloseDeleteDialog}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete writer: {writer?.name}?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteWriter;

// Example of storing the token in local storage:
localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc0MjQ5MDc0MTkwOWE0NDA4NTIwOTUiLCJpYXQiOjE3MTkyMzIzMzcsImV4cCI6MTcxOTIzNTkzN30.XWHwx5brR27B1ot_Irf2QZaFvHBNhqKeik_vQ0jiGMk');
