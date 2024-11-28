import React from "react";

export const Destination = ({ destination, onDelete, onEditClick }) => {
  const handleDelete = () => {
    onDelete(destination.id);
  };

  return (
    <section className="destination">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Destination Name */}
        <h3
          onClick={onEditClick}
          style={{
            margin: 0,
            fontSize: "1.7rem",
            cursor: "pointer",
            color: "#ffffff",
            textShadow: "2px 2px 4px #ff0000",
          }}
        >
          {destination.name}
        </h3>

        {/* Visited Date */}
        <p
          style={{
            margin: "0 auto",
            fontSize: "1.2rem",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          Visited on:{" "}
          {destination.visitedDate
            ? new Date(destination.visitedDate).toLocaleDateString()
            : "N/A"}
        </p>

        {/* Days Ago */}
        {destination.daysAgo && (
          <p
            style={{
              marginLeft: "1rem",
              fontSize: "1rem",
              color: "#ffeb3b",
            }}
          >
            ({destination.daysAgo} days ago)
          </p>
        )}

        {/* Liked Icon */}
        {destination.isLiked && (
          <span className="heart-emoji" role="img" aria-label="heart">
            ❤️
          </span>
        )}
      </header>

      {/* Destination Details */}
      <div
        className="destination-details"
        style={{
          fontSize: "1.2rem",
          marginTop: "0.5rem",
          color: "#eeeeee",
        }}
      >
        {destination.details || "No additional details available."}
      </div>

      {/* Delete Button */}
      <footer>
        <button onClick={handleDelete} className="button">
          Delete
        </button>
      </footer>
    </section>
  );
};
