import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"; // Adjust path as needed

export const NavBar = () => {
  const navigate = useNavigate();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login", { replace: true }); // Redirect to login page
  };

  return (
    <>
      <div className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/destinations">Destinations</Link>
          </li>
          {localStorage.getItem("token") && (
            <li>
              <Link to="" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
        <div className="menu-button" onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </div>
      </div>
      {/* Sidebar implementation */}
      <ul className={`sidebar ${isSidebarVisible ? "visible" : "hidden"}`}>
        <li>
          <a href="#" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </a>
        </li>
        <li>
          <Link to="/" onClick={toggleSidebar}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/destinations" onClick={toggleSidebar}>
            Destinations
          </Link>
        </li>
        {localStorage.getItem("token") && (
          <li>
            <Link
              to=""
              onClick={() => {
                handleLogout();
                toggleSidebar();
              }}
            >
              Logout
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};
