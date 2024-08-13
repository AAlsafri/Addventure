import { useEffect, useRef, useState } from "react";
import {
  getAllDestinations,
  deleteDestination,
  getDestinationById,
  updateDestination,
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
  const [showForm, setShowForm] = useState(false); // State for add form visibility
  const [editDestination, setEditDestination] = useState(null); // State for edit form

  const headerRef = useRef(null); // Reference to the header
  const containerRef = useRef(null); // Reference to the container

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

    setTimeout(() => {
      header.style.animation = "splitBorders 1s forwards";
      bottomRightBorders.style.animation = "moveBottomRight 1s forwards";

      setTimeout(() => {
        destinations.style.opacity = 1;
      }, 1000); // Delay to match the animation duration
    }, 500); // Delay before starting the animation
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
    setEditDestination(null); // Hide the edit form if it's showing
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditDestination(null); // Hide the edit form
    fetchDestinations(); // Refresh the list after adding/editing a destination
  };

  const handleEditClick = async (id) => {
    const destinationToEdit = await getDestinationById(id);
    setEditDestination(destinationToEdit); // Set the destination to edit
    setShowForm(false); // Hide the add form if it's showing
  };

  return (
    <div className="destinations-page">
      <div className="bottom-right-borders">
        <div ref={headerRef} className="destinations-header">
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
      </div>
      <div ref={containerRef} className="destinations-container">
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
