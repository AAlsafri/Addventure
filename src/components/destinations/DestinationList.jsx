import { useEffect, useState } from "react";
import {
  getAllDestinations,
  deleteDestination,
  getDestinationById,
} from "../../services/destinationService";
import { Destination } from "./Destination";
import { DestinationFilterBar } from "./DestinationFilterBar";
import "./Destinations.css";
import { AddDestinationPage } from "./AddDestinationForm";
import { EditDestinationForm } from "./EditDestination";

export const DestinationList = ({ currentUser }) => {
  const [allDestinations, setAllDestinations] = useState([]);
  const [showLiked, setShowLiked] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editDestination, setEditDestination] = useState(null);

  const fetchDestinations = () => {
    getAllDestinations()
      .then((destinationsArray) => {
        if (Array.isArray(destinationsArray)) {
          const userDestinations = destinationsArray.filter(
            (destination) => destination.user_id === currentUser.id
          );
          setAllDestinations(userDestinations);
        } else {
          console.error(
            "Unexpected response from getAllDestinations:",
            destinationsArray
          );
        }
      })
      .catch((error) => {
        console.error("Failed to fetch destinations:", error);
      });
  };

  useEffect(() => {
    fetchDestinations();
  }, [currentUser]);

  useEffect(() => {
    let destinationsToFilter = allDestinations;

    if (showLiked) {
      destinationsToFilter = destinationsToFilter.filter(
        (destination) => destination.isLiked === true
      );
    }

    const foundDestinations = destinationsToFilter.filter((destination) =>
      (destination.name + " " + destination.country + " " + destination.details)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setFilteredDestinations(foundDestinations);
  }, [searchTerm, showLiked, allDestinations]);

  useEffect(() => {
    const header = document.querySelector(".destinations-header");
    const bottomRightBorders = document.querySelector(".bottom-right-borders");
    const destinations = document.querySelector(".destinations");

    if (header) {
      header.style.animation = "splitBorders 1s forwards";
    } else {
      console.warn(".destinations-header not found in the DOM.");
    }

    if (bottomRightBorders) {
      bottomRightBorders.style.animation = "moveBottomRight 1s forwards";
    } else {
      console.warn(".bottom-right-borders not found in the DOM.");
    }

    if (destinations) {
      setTimeout(() => {
        destinations.style.opacity = 1;
      }, 1000);
    } else {
      console.warn(".destinations not found in the DOM.");
    }
  }, []);

  const handleDelete = (id) => {
    deleteDestination(id)
      .then(() => {
        setAllDestinations((prevDestinations) =>
          prevDestinations.filter((destination) => destination.id !== id)
        );
      })
      .catch((error) => {
        console.error("Failed to delete destination:", error);
      });
  };

  const handleAddClick = () => {
    setShowForm(true);
    setEditDestination(null);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditDestination(null);
    fetchDestinations();
  };

  const handleEditClick = async (id) => {
    const destinationToEdit = await getDestinationById(id);
    setEditDestination(destinationToEdit);
    setShowForm(false);
  };

  return (
    <div className="destinations-page">
      <div className="bottom-right-borders">
        <div className="destinations-header">
          <h2>Destinations</h2>
          <DestinationFilterBar
            setShowLiked={setShowLiked}
            setSearchTerm={setSearchTerm}
          />
          {!showForm && !editDestination && (
            <button onClick={handleAddClick} className="add-form-button">
              Add Destination
            </button>
          )}
        </div>
        <div className="hint-section">
          <h3>💡Tips</h3>
          <ul>
            <li>
              Click on the "Add Destination" button to add a few destinations
              and watch the cards appear.
            </li>
            <li>Click on the destination's name to edit its fields or info.</li>
          </ul>
        </div>
      </div>
      <div className="destinations-container">
        {showForm ? (
          <AddDestinationPage
            currentUser={currentUser}
            onFormSubmit={handleFormSubmit}
          />
        ) : editDestination ? (
          <EditDestinationForm
            currentUser={currentUser}
            destination={editDestination}
            onFormSubmit={handleFormSubmit}
          />
        ) : (
          <article className="destinations">
            {filteredDestinations.map((destinationObj) => (
              <Destination
                key={destinationObj.id}
                destination={destinationObj}
                onDelete={handleDelete}
                onEditClick={() => handleEditClick(destinationObj.id)}
              />
            ))}
          </article>
        )}
      </div>
    </div>
  );
};
