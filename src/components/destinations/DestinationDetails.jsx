import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getDestinationById,
  updateDestination,
} from "../../services/destinationService";
import "./Destinations.css";

export const DestinationDetails = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDestination, setEditedDestination] = useState({
    name: "",
    country: "",
    state: "N/A", // Default to N/A
    continent_id: "N/A", // Default to N/A
    details: "",
    isLiked: false,
  });

  useEffect(() => {
    getDestinationById(destinationId)
      .then((data) => {
        setDestination(data);
        // Set default values for missing fields
        setEditedDestination({
          ...data,
          state: data.state || "N/A",
          continent_id: data.continent_id || "N/A",
        });
      })
      .catch((error) => console.error("Failed to fetch destination:", error));
  }, [destinationId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedDestination({ ...editedDestination, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDestination(destinationId, editedDestination)
      .then(() => {
        setDestination(editedDestination);
        setIsEditing(false);
      })
      .catch((error) => console.error("Failed to update destination:", error));
  };

  if (!destination) {
    return <p>Loading...</p>;
  }

  const continents = [
    { id: "1", name: "North America" },
    { id: "2", name: "Europe" },
    { id: "3", name: "Asia" },
    { id: "4", name: "Africa" },
    { id: "5", name: "Australia" },
    { id: "6", name: "South America" },
    { id: "7", name: "Antarctica" },
  ];

  const continentOptions = continents.map((continent) => (
    <option key={continent.id} value={continent.id}>
      {continent.name}
    </option>
  ));

  return (
    <div className="destination-form">
      {isEditing ? (
        <>
          <h1>Update Destination</h1>
          <form onSubmit={handleSubmit} className="destination-form-wrapper">
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
              <label htmlFor="continent">Continent:</label>
              <select
                id="continent"
                name="continent_id"
                value={editedDestination.continent_id}
                onChange={handleChange}
              >
                <option value="N/A">N/A</option>
                {continentOptions}
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
                onChange={() =>
                  setEditedDestination({
                    ...editedDestination,
                    isLiked: !editedDestination.isLiked,
                  })
                }
              />
            </div>
            <button type="submit" className="submit-button">
              Save
            </button>
          </form>
        </>
      ) : (
        <div className="destination-form-wrapper">
          <h2>{destination.name}</h2>
          <p>
            <strong>Country:</strong> {destination.country}
          </p>
          <p>
            <strong>State:</strong> {destination.state || "N/A"}
          </p>
          <p>
            <strong>Continent:</strong>{" "}
            {continents.find((c) => c.id === destination.continent_id)?.name ||
              "N/A"}
          </p>
          <p>
            <strong>Details:</strong> {destination.details}
          </p>
          <p>
            <strong>Liked:</strong> {destination.isLiked ? "Yes" : "No"}
          </p>
          <button onClick={handleEditToggle}>Edit</button>
        </div>
      )}
    </div>
  );
};
