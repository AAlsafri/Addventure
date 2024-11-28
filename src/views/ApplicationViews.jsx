import { useEffect, useState } from "react";
import { UserViews } from "./UserViews";
import { getDestinationsByUserId } from "../services/destinationService";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [userDestinations, setUserDestinations] = useState([]);

  useEffect(() => {
    const localToken = localStorage.getItem("token");

    if (localToken) {
      // Simulate fetching user data
      const user = { id: 1, username: "current_user" }; // Replace with real API call if needed
      setCurrentUser(user);

      getDestinationsByUserId(user.id).then((destinations) => {
        setUserDestinations(destinations);
      });
    }
  }, []);

  return currentUser.id ? (
    <UserViews currentUser={currentUser} destinations={userDestinations} />
  ) : (
    <div>Loading...</div>
  );
};
