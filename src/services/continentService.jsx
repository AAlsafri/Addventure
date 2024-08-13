export const getAllContinents = async () => {
  const response = await fetch("http://localhost:8088/continents");
  if (!response.ok) {
    throw new Error("Failed to fetch continents");
  }
  return response.json();
};
