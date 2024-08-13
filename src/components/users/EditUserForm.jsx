import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Users.css";
import { getUserById, updateUser } from "../../services/userService";

export const EditUserForm = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(userId).then(setUser);
  }, [userId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(userId, user)
      .then(() => {
        navigate(`/users/${userId}`);
      })
      .catch((error) => {
        console.error("Failed to update user:", error);
      });
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-form-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};
