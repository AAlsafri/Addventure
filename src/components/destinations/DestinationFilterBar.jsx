import { Link } from "react-router-dom";

export const DestinationFilterBar = ({ setShowLiked, setSearchTerm }) => {
  return (
    <div className="filter-bar">
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        type="text"
        placeholder="Search Destinations"
        className="destination-search"
      />
      <button
        className="filter-btn btn-primary"
        onClick={() => {
          setShowLiked(true);
        }}
      >
        Liked Destinations
      </button>
      <button
        className="filter-btn btn-info"
        onClick={() => {
          setShowLiked(false);
        }}
      >
        Show All Destinations
      </button>
      {/* <Link to="/destinations/add" className="filter-btn btn-primary">
        Add Destination
      </Link> */}
    </div>
  );
};
