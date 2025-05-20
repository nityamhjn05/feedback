// src/components/FormBuilder.jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  MenuItem,
  Paper,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const questionTypes = [
  'Multiple Choice',
  'Short Choice',
  'Short Answer',
  'Long Answer',
];

const FormBuilder = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [userIds, setUserIds] = useState([]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', type: 'Short Answer', options: [''] },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    if (field === 'type' && value !== 'Multiple Choice') {
      updated[index].options = [];
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (index) => {
    const updated = [...questions];
    updated[index].options.push('');
    setQuestions(updated);
  };

  const handleAddUser = () => {
    setUserIds([...userIds, '']);
  };

  const handleUserChange = (index, value) => {
    const updated = [...userIds];
    updated[index] = value;
    setUserIds(updated);
  };

  const handleFormSubmit = () => {
    const formData = { title, description, questions, userIds };
    if (onSubmit) onSubmit(formData);
    console.log('Form Created:', formData);
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create Feedback Form
      </Typography>

      <TextField
        fullWidth
        label="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Form Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Typography variant="h6">Assign Users</Typography>
      {userIds.map((id, idx) => (
        <TextField
          key={idx}
          fullWidth
          label={`User ID ${idx + 1}`}
          value={id}
          onChange={(e) => handleUserChange(idx, e.target.value)}
          sx={{ mb: 2 }}
        />
      ))}
      <Button startIcon={<AddIcon />} onClick={handleAddUser} sx={{ mb: 3 }}>
        Add User ID
      </Button>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6">Questions</Typography>
      {questions.map((q, idx) => (
        <Box key={idx} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label={`Question ${idx + 1}`}
            value={q.text}
            onChange={(e) => handleQuestionChange(idx, 'text', e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            fullWidth
            label="Question Type"
            value={q.type}
            onChange={(e) => handleQuestionChange(idx, 'type', e.target.value)}
            sx={{ mb: 2 }}
          >
            {questionTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          {q.type === 'Multiple Choice' && (
            <Box>
              {q.options.map((opt, oidx) => (
                <TextField
                  key={oidx}
                  fullWidth
                  label={`Option ${oidx + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, oidx, e.target.value)}
                  sx={{ mb: 1 }}
                />
              ))}
              <Button size="small" onClick={() => addOption(idx)}>
                + Add Option
              </Button>
            </Box>
          )}
        </Box>
      ))}

      <Button startIcon={<AddIcon />} onClick={handleAddQuestion}>
        Add Question
      </Button>

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 4 }}
        onClick={handleFormSubmit}
      >
        Save Form
      </Button>
    </Paper>
  );
};

export default FormBuilder;
