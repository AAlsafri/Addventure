const apiUrl = "http://localhost:8088";

export const getTravelHistoryByUserId = (userId) => {
  return fetch(`${apiUrl}/travelHistory?userId=${userId}`).then((res) =>
    res.json()
  );
};

export const deleteTravelEntry = (entryId) => {
  return fetch(`${apiUrl}/travelHistory/${entryId}`, {
    method: "DELETE",
  });
};
