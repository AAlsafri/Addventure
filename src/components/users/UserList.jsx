import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Users.css";
import { deleteUser, getUsers } from "../../services/userService";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    getUsers().then((userArray) => {
      const ids = userArray.map((user) => parseInt(user.id, 10));
      setNextId(ids.length > 0 ? Math.max(...ids) + 1 : 1);
      setUsers(userArray);
    });
  }, []);

  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Failed to delete user:", error);
      });
  };

  return (
    <div className="users-container">
      <h2>Users</h2>
      <Link to="/users/add" className="add-user-button">
        Add User
      </Link>
      <div className="users">
        {users.map((userObj) => (
          <div key={userObj.id} className="user-card">
            <Link to={`/users/${userObj.id}`}>
              <div>Username: {userObj.name}</div>
              <div>Email: {userObj.email}</div>
            </Link>
            <button onClick={() => handleDelete(userObj.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
