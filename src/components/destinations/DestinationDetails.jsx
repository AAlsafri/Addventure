import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getDestinationById,
  updateDestination,
} from "../../services/destinationService";
import "./Destinations.css";

export const DestinationDetails = () => {
  const { destinationId } = useParams();
  console.log("Destination ID from URL:", destinationId);
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDestination, setEditedDestination] = useState({
    name: "",
    country: "",
    state: "",
    continent: "",
    details: "",
    isLiked: false,
    visitedDate: "",
  });

  useEffect(() => {
    getDestinationById(destinationId)
      .then((data) => {
        setDestination(data);
        setEditedDestination({
          ...data,
          state: data.state || "",
          continent: data.continent || "",
          visitedDate: data.visitedDate || "",
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

    console.log("Updating destination with ID:", destinationId); // Debugging line

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
              <input
                type="text"
                id="continent"
                name="continent"
                value={editedDestination.continent}
                onChange={handleChange}
              />
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
            <div>
              <label htmlFor="visitedDate">Visited Date:</label>
              <input
                type="date"
                id="visitedDate"
                name="visitedDate"
                value={editedDestination.visitedDate}
                onChange={handleChange}
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
            <strong>Continent:</strong> {destination.continent || "N/A"}
          </p>
          <p>
            <strong>Details:</strong> {destination.details}
          </p>
          <p>
            <strong>Liked:</strong> {destination.isLiked ? "Yes" : "No"}
          </p>
          <p>
            <strong>Visited On:</strong> {destination.visitedDate || "N/A"}
          </p>
          <button onClick={handleEditToggle}>Edit</button>
        </div>
      )}
    </div>
  );
};
