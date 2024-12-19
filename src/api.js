import axios from 'axios';

const API_BASE_URL = 'https://assignment.stage.crafto.app';

export const loginUser = async (username, otp) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/login`, { username, otp }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data.token;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const uploadImage = async (formData) => {
  try {
    const response = await axios.post('https://crafto.app/crafto/v1.0/media/assignment/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data[0].url;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

export const getQuotes = async (token, limit = 20, offset = 0) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/getQuotes`, {
      headers: { 'Authorization': token },
      params: { limit, offset }
    });
    return data?.data;
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
    throw error;
  }
};

export const createQuote = async (token, text, mediaUrl) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/postQuote`, {
      text,
      mediaUrl
    }, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    });
    return data;
  } catch (error) {
    console.error("Failed to create quote:", error);
    throw error;
  }
};
