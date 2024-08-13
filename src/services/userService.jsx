// userService.jsx
export const getUsers = () => {
  return fetch("http://localhost:8088/users").then((res) => res.json());
};

// Fetch a user by ID
export const getUserById = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}`).then((res) =>
    res.json()
  );
};

// Fetch a user by email
export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  );
};

// Create a new user
export const addUser = async (user) => {
  const response = await fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

// Update an existing user
export const updateUser = (userId, updatedUser) => {
  return fetch(`http://localhost:8088/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  }).then((res) => res.json());
};

// Delete a user
export const deleteUser = async (id) => {
  await fetch(`http://localhost:8088/users/${id}`, {
    method: "DELETE",
  });
};

// NEW: Fetch all users
export const getAllUsers = () => {
  return fetch("http://localhost:8088/users").then((res) => res.json());
};
