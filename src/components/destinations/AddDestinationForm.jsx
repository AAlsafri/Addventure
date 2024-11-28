import React, { useState } from "react";
import { addNewDestination } from "../../services/destinationService";
import "./Destinations.css";
import { useNavigate } from "react-router-dom";

export const AddDestinationPage = ({ currentUser, onFormSubmit }) => {
  const [newDestination, setNewDestination] = useState({
    name: "",
    country: "",
    state: "",
    continent: "", // Default empty
    details: "",
    isLiked: false,
    visitedDate: "",
    user_id: currentUser ? currentUser.id : null, // Handle undefined user case
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const continents = [
    { id: "1", name: "North America" },
    { id: "2", name: "Europe" },
    { id: "3", name: "Asia" },
    { id: "4", name: "Africa" },
    { id: "5", name: "Australia" },
    { id: "6", name: "South America" },
    { id: "7", name: "Antarctica" },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewDestination((prevDestination) => ({
      ...prevDestination,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setNewDestination((prevDestination) => ({
      ...prevDestination,
      isLiked: !prevDestination.isLiked,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!currentUser) {
      setError("User not logged in");
      return;
    }

    const selectedContinent = continents.find(
      (continent) => continent.name === newDestination.continent
    );

    const payload = {
      ...newDestination,
      continent: selectedContinent ? selectedContinent.id : null,
      location: `${newDestination.country}, ${newDestination.state}, ${newDestination.continent}`,
    };

    try {
      await addNewDestination(payload);
      setNewDestination({
        name: "",
        country: "",
        state: "",
        continent: "",
        details: "",
        isLiked: false,
        visitedDate: "",
        user_id: currentUser.id,
      });

      setError(""); // Clear any existing error
      setSuccessMessage("Destination added successfully!"); // Set success message
      setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 3 seconds
      }, 3000);

      if (onFormSubmit) onFormSubmit(); // Notify parent component
      navigate("/destinations");
    } catch (err) {
      console.error("Error adding destination:", err.response?.data || err);
      setError("Failed to add destination. Please check your form.");
    }
  };

  if (!currentUser) {
    return <div>Please log in to add a new destination.</div>;
  }

  return (
    <div className="add-destination-form">
      <button className="close-button" onClick={onFormSubmit}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#5f6368"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </button>
      <h2>Add New Destination</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newDestination.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={newDestination.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={newDestination.state}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="continent">Continent:</label>
          <select
            id="continent"
            name="continent"
            value={newDestination.continent}
            onChange={handleChange}
            required
          >
            <option value="">Select Continent</option>
            {continents.map((continent) => (
              <option key={continent.id} value={continent.name}>
                {continent.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="details">Details:</label>
          <textarea
            id="details"
            name="details"
            value={newDestination.details}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="isLiked">Liked:</label>
          <input
            type="checkbox"
            id="isLiked"
            name="isLiked"
            checked={newDestination.isLiked}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          <label htmlFor="visitedDate">Visited On:</label>
          <input
            type="date"
            id="visitedDate"
            name="visitedDate"
            value={newDestination.visitedDate || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Destination</button>
      </form>
    </div>
  );
};
