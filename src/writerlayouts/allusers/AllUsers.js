import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Allusers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://ecomm-backend-2xs6.onrender.com/api/admin/users', {
        headers: {
          "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY2NTA0MGMxNWMwYjU5YmExOWY1NTBjZSJ9LCJpYXQiOjE3MTY1NDUzOTR9._tKrofYcddY-JGFiHme8nTrZCyXs517HV4PmeZfXnug'
        }
      });
      const data = await response.json();
      console.log(data);
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <Container>
      {users && users.map((user)     => (
        <Card key={user._id} sx={{ minWidth: 275, marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {user.name}
            </Typography>
            <Typography color="text.secondary">
              Email: {user.email}
            </Typography>
            <Typography color="text.secondary">
              Phone: {user.phone}
            </Typography>
            <Typography color="text.secondary">
              Country: {user.country}
            </Typography>
            <Typography color="text.secondary">
              State: {user.state}
            </Typography>
            <Typography color="text.secondary">
              City: {user.city}
            </Typography>
            <Typography color="text.secondary">
              Pincode: {user.pincode}
            </Typography>
            <Typography color="text.secondary">
              Date: {new Date(user.date).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Allusers;







