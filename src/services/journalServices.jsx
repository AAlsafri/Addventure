const apiUrl = "http://localhost:8088";

// Fetch journal entries by user ID
export const getJournalEntriesByUserId = async (userId) => {
  const response = await fetch(`${apiUrl}/journalEntries?user_id=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch journal entries");
  }
  return response.json();
};

// Add a new journal entry
export const addJournalEntry = async (entry) => {
  const response = await fetch(`${apiUrl}/journalEntries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  if (!response.ok) {
    throw new Error("Failed to add journal entry");
  }
  return response.json();
};

// Update an existing journal entry
export const updateJournalEntry = async (id, entry) => {
  const response = await fetch(`${apiUrl}/journalEntries/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  if (!response.ok) {
    throw new Error("Failed to update journal entry");
  }
  return response.json();
};

// Delete a journal entry
export const deleteJournalEntry = async (id) => {
  const response = await fetch(`${apiUrl}/journalEntries/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete journal entry");
  }
};
