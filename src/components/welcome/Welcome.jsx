import "/src/index.css";

export const Welcome = () => {
  return (
    <div className="welcome-background">
      <div className="welcome-text-box">
        <h1 className="welcome-title">
          <span>Welcome to</span>
          <span>[trip-ify] Global Explorer App</span>
        </h1>
        <div className="welcome-text">
          The best application for recording and tracking your visited
          destinations and sharing them with others!
        </div>
        <p className="welcome-note">
          **Please check out the navigation bar at the top for directions
        </p>
        {""}
        {""}
        {""}
      </div>
    </div>
  );
};
