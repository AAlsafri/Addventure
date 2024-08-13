import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDestinationsByUserId } from "../../services/destinationService";

export const TravelHistory = () => {
  const { userId } = useParams();
  const [destinations, setDestinations] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("trip-ify_user"));

  useEffect(() => {
    getDestinationsByUserId(userId).then((data) => setDestinations(data));
  }, [userId]);

  return (
    <div>
      <h2>Travel History</h2>
      <ul>
        {destinations.map((destination) => (
          <li key={destination.id}>
            {destination.name} - {destination.country}
            {currentUser.id === parseInt(userId) && (
              <button onClick={() => editDestination(destination.id)}>
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const editDestination = (destinationId) => {
  // Navigate to the edit page for the specific destination
};
