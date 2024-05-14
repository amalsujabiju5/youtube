import React, { useEffect, useState } from "react";
import "./SearchResults.css";
import { Link, useParams } from "react-router-dom";
import { API_KEY } from "../../data";
import moment from "moment";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=15&type=video&key=${API_KEY}`;

        const response = await fetch(apiURL);
        const data = await response.json();
        setResults(data.items);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [query]);

  return (
    <div className="search-results">
      {results.map((item, index) => (
        <Link
          to={`/searchplay/${item.id.videoId}`}
          className="card"
          key={index}
        >
          <div key={index}>
            <div className="contents">
              <img src={item.snippet.thumbnails.high.url} alt="" />
              <div className="contentdetails">
                <h2>{item.snippet.title}</h2>
                <span>|</span>
                <h2>{item.snippet.channelTitle}</h2>
                <span>|</span>
                <h2>{moment(item.snippet.publishedAt).fromNow()}</h2>
              </div>
            </div>
            <div className="amal">
              <h2>1M views</h2>
              <h2>1 day ago</h2>
            </div>
            <div className="channel">
              <img src={item.snippet.thumbnails.default.url} alt="" />
              <h2>{item.snippet.channelTitle}</h2>
            </div>
            <div className="description">
              <h2>{item.snippet.description.slice(0, 250)}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
