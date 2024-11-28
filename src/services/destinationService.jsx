import axios from "axios";

const apiUrl = "http://127.0.0.1:8000/destinations/";

export const getAllDestinations = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(apiUrl, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const addNewDestination = async (destination) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(apiUrl, destination, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json", // Ensure JSON content type
    },
  });
  return response.data;
};

export const updateDestination = async (id, updatedDestination) => {
  if (!id || typeof id !== "number") {
    throw new Error("Invalid destination ID provided");
  }

  const token = localStorage.getItem("token");
  const response = await axios.put(`${apiUrl}${id}/`, updatedDestination, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteDestination = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${apiUrl}${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const getDestinationById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${apiUrl}${id}/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};

export const getDestinationsByUserId = async (userId) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${apiUrl}?user_id=${userId}`, {
    headers: { Authorization: `Token ${token}` },
  });
  return response.data;
};
