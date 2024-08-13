import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Users.css";
import { addUser } from "../../services/userService";

export const AddUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      address,
      phone,
    };
    addUser(newUser).then(() => {
      navigate("/users");
    });
  };

  return (
    <div className="user-form-container">
      <div className="form-container">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
};
