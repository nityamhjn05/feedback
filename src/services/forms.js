import api from './api';

export const createForm = async (formData) => {
  try {
    const res = await api.post('/forms', formData);
    return res.data;
  } catch (err) {
    console.error('Error creating form:', err);
    throw err;
  }
};

export const getFormsForUser = async (userId) => {
  try {
    const res = await api.get(`/forms/user/${userId}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching user forms:', err);
    throw err;
  }
};

export const submitResponse = async (formId, responseData) => {
  try {
    const res = await api.post(`/forms/${formId}/response`, responseData);
    return res.data;
  } catch (err) {
    console.error('Error submitting response:', err);
    throw err;
  }
};
