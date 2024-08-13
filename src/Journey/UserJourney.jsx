import React, { useState, useEffect } from "react";
import "./UserJourney.css";
import { getDestinationsByUserId } from "../services/destinationService";
import {
  addJournalEntry,
  getJournalEntriesByUserId,
} from "../services/journalServices";

export const UserJourney = ({ currentUser }) => {
  const [destinations, setDestinations] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: "",
    title: "",
    body: "",
    user_id: currentUser.id,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      getDestinationsByUserId(currentUser.id).then(setDestinations);
      getJournalEntriesByUserId(currentUser.id).then(setJournalEntries);
    }
  }, [currentUser]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const savedEntry = await addJournalEntry(newEntry);
    setJournalEntries((prevEntries) => [...prevEntries, savedEntry]);
    setNewEntry({
      date: "",
      title: "",
      body: "",
      user_id: currentUser.id,
    });
  };

  return (
    <div className="user-journey-container">
      <div className="user-info">
        <h2>Hello, {currentUser.name}</h2>
        <h3 onClick={toggleDropdown}>
          Your Destinations ({destinations.length})
          {dropdownOpen ? (
            <span style={{ marginLeft: "8px", transform: "rotate(180deg)" }}>
              ▼
            </span>
          ) : (
            <span style={{ marginLeft: "8px" }}>▼</span>
          )}
        </h3>
        {dropdownOpen && (
          <ul className="destinations-list">
            {destinations.map((destination) => (
              <li key={destination.id}>
                {destination.name} ({destination.country})
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="journal-entry-form">
        <h3>Log Your Journey</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={newEntry.date}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newEntry.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Note:
            <textarea
              name="body"
              value={newEntry.body}
              onChange={handleInputChange}
              rows="5"
              required
            />
          </label>
          <button type="submit">Add Note</button>
        </form>
        <div className="journal-entries">
          <ul>
            {journalEntries.map((entry, index) => (
              <div key={index} className="journal-entry-box">
                <h4>{entry.title}</h4>
                <p>{entry.body}</p>
                <small>{entry.date}</small>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
