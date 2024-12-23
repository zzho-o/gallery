import axios from 'axios';

const API_TOKEN_AUTH_FORM_DATA = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000 * 10,
  headers: {
    accept: 'multipart/form-data',
    'Content-Type': 'multipart/form-data',
  },
});

export const apiEditor = {
  postImageUpload: async (file) => {
    try {
      const response = await API_TOKEN_AUTH_FORM_DATA.post('/upload', file);
      return response;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },
};