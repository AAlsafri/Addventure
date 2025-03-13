import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/userService";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.user_id);
        navigate("/destinations");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <main className="page-wrapper">
      <div className="container-login">
        <form onSubmit={handleSubmit} className="form-login">
          {/* <h1>Add·venturer</h1> */}
          <h2>Please Sign In</h2>
          {error && <p className="error-message">{error}</p>}
          <fieldset>
            <div className="form-group">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="Username"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
        <p>
          Not a member yet?{" "}
          <Link to="/register" className="form-link">
            Register here!
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
