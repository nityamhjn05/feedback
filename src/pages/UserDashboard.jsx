import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Container, TextField } from '@mui/material';
import { getFormsForUser, submitResponse } from '../services/forms';

const UserDashboard = () => {
  const [forms, setForms] = useState([]);
  const [userId, setUserId] = useState('');
  const [responses, setResponses] = useState({});

  const handleFetchForms = async () => {
    try {
      const res = await getFormsForUser(userId);
      setForms(res);
    } catch (err) {
      alert('Failed to load forms');
    }
  };

  const handleSubmit = async (formId) => {
    try {
      const res = await submitResponse(formId, { userId, answers: responses[formId] || [] });
      alert('Response submitted!');
    } catch (err) {
      alert('Failed to submit response');
    }
  };

  const handleResponseChange = (formId, index, value) => {
    const formResponses = responses[formId] || [];
    formResponses[index] = value;
    setResponses({ ...responses, [formId]: formResponses });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Enter Your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleFetchForms}>
          Load Assigned Forms
        </Button>
      </Box>

      {forms.map((form) => (
        <Paper key={form._id} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6">{form.title}</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>{form.description}</Typography>

          {form.questions.map((q, idx) => (
            <TextField
              key={idx}
              fullWidth
              label={q.text}
              placeholder={`Answer ${idx + 1}`}
              value={(responses[form._id] && responses[form._id][idx]) || ''}
              onChange={(e) => handleResponseChange(form._id, idx, e.target.value)}
              sx={{ mb: 2 }}
            />
          ))}

          <Button variant="contained" onClick={() => handleSubmit(form._id)}>
            Submit Response
          </Button>
        </Paper>
      ))}
    </Container>
  );
};

export default UserDashboard;
