import { Navigate, useLocation } from "react-router-dom";

export const Authorized = ({ children }) => {
  let location = useLocation();

  const token = localStorage.getItem("token");

  if (token) {
    return children; // If token exists, render children
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />; // Redirect to login
  }
};
