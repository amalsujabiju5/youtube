import React, { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY, Value_Convertor } from "../../data";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState({ items: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=52&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
        const response = await fetch(videoUrl);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.items &&
        data.items.map((item, index) => (
          <Link
            to={`video/${item.snippet.categoryId}/${item.id}`}
            className="card"
            key={index}
          >
            <img src={item.snippet.thumbnails?.medium?.url || ""} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {Value_Convertor(item.statistics?.viewCount || 0)} views &bull;{" "}
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        ))}
    </div>
  );
};

export default Feed;
