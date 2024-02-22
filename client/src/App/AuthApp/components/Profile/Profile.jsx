import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Container, Paper, TextField, Button } from '@mui/material';
import { useUser } from '../../contexts/UserContext';
import getAxiosClient from '../../../../axios';

const Profile = () => {
    const { user, setUser } = useUser();
    const [userInfo, setUserInfo] = useState({
      username: user?.username,
      name: user?.name,
      // Add the URL of the user's photo
      photoURL: user?.photoURL || 'https://example.com/user-photo.jpg',
    });

  const handleUpdate = async() => {
    await getAxiosClient().put(`api/users/${user._id}`, {...user, ...userInfo});
    localStorage.setItem('user', JSON.stringify({...user, ...userInfo}));
    setUser({...user, ...userInfo});

  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', textAlign: 'center' }}>
        <Avatar alt={userInfo.username} src={userInfo.photoURL} sx={{ width: 100, height: 100, marginBottom: 2 }} />
        <Typography variant="h4" gutterBottom>
          {userInfo.username}
        </Typography>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userInfo.name}
          onChange={handleChange}
        />
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userInfo.username}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Profile
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
