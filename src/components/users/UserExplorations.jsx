// UserExplorations.jsx
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";
import { getAllDestinations } from "../../services/destinationService";

const UserExplorations = () => {
  const [users, setUsers] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [travelHistory, setTravelHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        const destinationsData = await getAllDestinations();
        const travelHistoryData = await fetch(
          "http://localhost:8088/travelHistory"
        ).then((res) => res.json());
        setUsers(usersData);
        setDestinations(destinationsData);
        setTravelHistory(travelHistoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  const getDestinationName = (destinationId) => {
    const destination = destinations.find(
      (destination) => destination.id === destinationId
    );
    return destination ? destination.name : "Unknown Destination";
  };

  return (
    <div>
      <h2>User Explorations</h2>
      {travelHistory.map((history) => (
        <div key={history.user_id}>
          <h3>{getUserName(history.user_id)}</h3>
          <ul>
            {history.destination_ids.map((destId) => (
              <li key={destId}>{getDestinationName(destId)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserExplorations;
