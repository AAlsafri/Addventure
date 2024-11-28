import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/userService";
import "./Login.css";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    try {
      const response = await register(user.username, user.password, user.email);
      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/destinations");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError("Registration failed. Please check your inputs.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    if (name === "password" || name === "confirmPassword") {
      setPasswordError(""); // Clear password error on input change
    }
  };

  return (
    <main className="page-wrapper">
      <div className="container-login">
        <form onSubmit={handleRegister} className="form-login">
          {/* <h1>Add·venturer</h1> */}
          <h2>Please Register</h2>
          {error && <p className="error-message">{error}</p>}
          {passwordError && <p className="error-message">{passwordError}</p>}
          <fieldset>
            <div className="form-group">
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your username"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Re-enter Password"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn" type="submit">
                Register
              </button>
            </div>
          </fieldset>
        </form>
        <p>
          Already a registered member?{" "}
          <Link to="/login" className="form-link">
            Login here!
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
