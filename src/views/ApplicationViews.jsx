import { useEffect, useState } from "react";
import { UserViews } from "./UserViews";
import { getDestinationsByUserId } from "../services/destinationService";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [userDestinations, setUserDestinations] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const user = { id: parseInt(userId), username: "current_user" };
      setCurrentUser(user);

      getDestinationsByUserId(user.id).then((destinations) => {
        setUserDestinations(destinations);
      });
    }
  }, []);

  return currentUser.id ? (
    <UserViews
      currentUser={currentUser}
      destinations={userDestinations}
      setCurrentUser={setCurrentUser}
    />
  ) : (
    <div>Loading...</div>
  );
};
