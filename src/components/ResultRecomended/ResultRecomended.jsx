import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ResultRecomeded.css";
import thumbnail from "../../assets/thumbnail1.png";
import { API_KEY } from "../../data";
import { Value_Convertor } from "../../data";

const ResultRecomended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const relatedVideoURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=10&key=${API_KEY}`;
        const response = await fetch(relatedVideoURL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setApiData(data.items || []); // Ensure data.items is an array, or default to empty array
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, e.g., display an error message to the user
      }
    };
    fetchData();
  }, [categoryId]);

  return (
    <div className="recommended">
      {apiData.map((item, index) => (
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
      ))}
    </div>
  );
};

export default ResultRecomended;
