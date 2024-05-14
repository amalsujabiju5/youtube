import React from "react";
import "./SearchPlay.css";
import ResultPlay from "../../components/ResultPlay/ResultPlay";
import ResultRecomended from "../../components/ResultRecomended/ResultRecomended";
import { useParams } from "react-router-dom";

const SearchPlay = () => {
  const { videoId, categoryId } = useParams(); // here the params is used for fetching the video from result page to searchplay
  return (
    <div className="play-container">
      <ResultPlay videoId={videoId} />
      <ResultRecomended categoryId={categoryId} />
    </div>
  );
};

export default SearchPlay;
