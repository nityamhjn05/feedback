import React from 'react';
import { Container, Typography } from '@mui/material';
import Header from '../components/Header';
import FormBuilder from '../components/FormBuilder';

const AdminDashboard = () => {
  const handleFormSubmit = (formData) => {
    console.log("Form submitted to backend:", formData);
  };

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <FormBuilder onSubmit={handleFormSubmit} />
      </Container>
    </>
  );
};

export default AdminDashboard;
