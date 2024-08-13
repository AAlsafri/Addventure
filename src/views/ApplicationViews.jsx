import { useEffect, useState } from "react";
import { UserViews } from "./UserViews";
import {
  getAllDestinations,
  getDestinationsByUserId,
} from "../services/destinationService";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [userDestinations, setUserDestinations] = useState([]);

  useEffect(() => {
    const localTripifyUser = localStorage.getItem("trip-ify_user");
    const tripifyUserObject = JSON.parse(localTripifyUser);

    if (tripifyUserObject) {
      setCurrentUser(tripifyUserObject);

      // Fetch destinations by user ID
      getDestinationsByUserId(tripifyUserObject.id).then((destinations) => {
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
