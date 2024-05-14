import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Recomended.css";
import { API_KEY, Value_Convertor } from "../../data";

const Recomended = ({ categoryId }) => {
  //making the state functions

  const [apiData, setApiData] = useState([]);

  //fetchng the api

  const fetcData = async () => {
    const relatedVideoURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(relatedVideoURL)
      .then((response) => response.json())
      .then((data) => setApiData(data.items));
  };

  useEffect(() => {
    fetcData();
  }, [apiData]);

  return (
    <div className="recommended">
      {apiData.map((item, index) => {
        return (
          <Link
            to={`/video/${item.snippet.categoryId}/${item.id}`}
            key={index}
            className="sidevideo-list"
          >
            <img src={item.snippet.thumbnails.standard.url} alt="" />
            <div className="video-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{Value_Convertor(item.statistics.viewCount)} views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Recomended;
