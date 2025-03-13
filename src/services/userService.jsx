import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/";

// Register a new user
export const register = async (username, password) => {
  const response = await axios.post(`${apiUrl}register/`, {
    username,
    password,
  });
  return response.data;
};

// Login user
export const login = async (username, password) => {
  const response = await axios.post(`${apiUrl}login/`, {
    username,
    password,
  });
  return response.data;
};

// Fetch the user profile
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${apiUrl}me/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

// Fetch all users
export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${apiUrl}users/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

// Fetch users (alias for getAllUsers for clarity)
export const getUsers = getAllUsers;

// Fetch a user by ID
export const getUserById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${apiUrl}users/${id}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

// Delete a user
export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${apiUrl}users/${id}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

// Add a new user
export const addUser = async (userData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${apiUrl}users/`, userData, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

// Update a user
export const updateUser = async (id, updatedData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`${apiUrl}users/${id}/`, updatedData, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

// Fetch a user by email
export const getUserByEmail = async (email) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${apiUrl}users?email=${email}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};
