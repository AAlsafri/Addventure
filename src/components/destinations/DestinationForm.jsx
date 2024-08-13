import { useState } from "react";
import { addNewDestination } from "../../services/destinationService";

export const DestinationForm = ({ onDestinationAdded }) => {
  const [destination, setDestination] = useState({
    name: "",
    country: "",
    state: "",
    continent_id: "",
    details: "",
    isLiked: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDestination((prevDestination) => ({
      ...prevDestination,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addNewDestination(destination);
      if (onDestinationAdded && typeof onDestinationAdded === "function") {
        onDestinationAdded(); // Notify parent component about the new addition
      } else {
        console.error("onDestinationAdded is not a function");
      }
      // Optionally reset the form
      setDestination({
        name: "",
        country: "",
        state: "",
        continent_id: "",
        details: "",
        isLiked: false,
      });
    } catch (error) {
      console.error("Failed to add destination:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Destination Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={destination.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={destination.country}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="state">State (optional):</label>
        <input
          type="text"
          id="state"
          name="state"
          value={destination.state}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="continent_id">Continent:</label>
        <select
          id="continent_id"
          name="continent_id"
          value={destination.continent_id}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a continent</option>
          <option value="1">North America</option>
          <option value="2">Europe</option>
          <option value="3">Asia</option>
          <option value="4">Africa</option>
          <option value="5">Australia</option>
          <option value="6">South America</option>
          <option value="7">Antarctica</option>
        </select>
      </div>
      <div>
        <label htmlFor="details">Details:</label>
        <textarea
          id="details"
          name="details"
          value={destination.details}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="isLiked">Liked:</label>
        <input
          type="checkbox"
          id="isLiked"
          name="isLiked"
          checked={destination.isLiked}
          onChange={() =>
            setDestination((prev) => ({
              ...prev,
              isLiked: !prev.isLiked,
            }))
          }
        />
      </div>
      <button type="submit">Add Destination</button>
    </form>
  );
};
