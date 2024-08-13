import React, { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";
import { getDestinationsByUserId } from "../../services/destinationService";
import "./UserProfile.css"; // Create this CSS file for styling
import { getJournalEntriesByUserId } from "../../services/journalServices";

const UserProfile = ({ currentUser }) => {
  const [profile, setProfile] = useState({});
  const [tripCount, setTripCount] = useState(0);
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    if (currentUser) {
      // Fetch user profile information
      getUserById(currentUser.id).then((userData) => {
        setProfile(userData);
      });

      // Fetch destinations by user ID
      getDestinationsByUserId(currentUser.id).then((destinations) => {
        setTripCount(destinations.length);
      });

      // Fetch journal entries by user ID
      getJournalEntriesByUserId(currentUser.id).then(setJournalEntries);
    }
  }, [currentUser]);

  return (
    <div className="user-profile-container">
      <h2>{profile.name}'s Profile</h2>
      <div className="profile-stats">
        <p>Trips Taken: {tripCount}</p>
        <h3>Journal:</h3>
        <div className="journal-entries">
          {journalEntries.map((entry) => (
            <div key={entry.id} className="journal-entry">
              <h4>{entry.title}</h4>
              <p>Date: {entry.date}</p>
              <p>{entry.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
