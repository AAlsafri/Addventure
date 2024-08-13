import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserById } from "../../services/userService";
// import { getUserById } from "../../services/userService";

export const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(userId).then(setUser);
  }, [userId]);

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Joined:</strong> {user.joinedDate}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
