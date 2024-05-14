import React from "react";
import "./Add.css";
import movie from "../../assets/reel.png";
import live from "../../assets/live.png";

const Add = ({ create }) => {
  return (
    <div className={`Add ${create ? "hidden" : ""}`}>
      <div className="items">
        <img src={movie} alt="Upload Video" />
        <p>Upload Video</p>
      </div>
      <div className="items">
        <img src={live} alt="Upload Video" />
        <p>Go Live</p>
      </div>
    </div>
  );
};

export default Add;
