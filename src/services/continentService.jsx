export const getAllContinents = async () => {
  const token = localStorage.getItem("token"); // Authentication token
  const response = await fetch("http://127.0.0.1:8000/continents", {
    headers: { Authorization: `Token ${token}` }, // Ensure token is included
  });
  if (!response.ok) {
    throw new Error("Failed to fetch continents");
  }
  return response.json();
};
