import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateDestination } from "../../services/destinationService";
import { getAllContinents } from "../../services/continentService";
import "./Destinations.css";

export const EditDestinationForm = ({ destination, onFormSubmit }) => {
  const navigate = useNavigate();
  const [editedDestination, setEditedDestination] = useState(destination);
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    const fetchContinents = async () => {
      const conts = await getAllContinents();
      setContinents(conts);
    };

    fetchContinents();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditedDestination((prevDestination) => ({
      ...prevDestination,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDestination(editedDestination);
      onFormSubmit(); // Close the form and refresh the list
      navigate("/destinations");
    } catch (error) {
      console.error("Failed to update destination:", error);
    }
  };

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
      <h2>Edit Destination</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedDestination.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={editedDestination.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={editedDestination.state}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="continent_id">Continent:</label>
          <select
            id="continent_id"
            name="continent_id"
            value={editedDestination.continent_id}
            onChange={handleChange}
          >
            <option value="">Select Continent</option>
            {continents.map((continent) => (
              <option key={continent.id} value={continent.id}>
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
            value={editedDestination.details}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isLiked">Liked:</label>
          <input
            type="checkbox"
            id="isLiked"
            name="isLiked"
            checked={editedDestination.isLiked}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="add-form-button">
          Update Destination
        </button>
      </form>
    </div>
  );
};
// Auto Nav to /destination right as you click btn for submit
