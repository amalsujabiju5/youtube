import React, { useEffect, useState } from "react";

import "./ResultPlay.css";
import Like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import userProfile from "../../assets/user_profile.jpg";
import { API_KEY } from "../../data";
import moment from "moment";
import { Value_Convertor } from "../../data";

const ResultPlay = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  // Get Video apiData From API

  const fetchdetails = async () => {
    const videoDetialsURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetialsURL)
      .then((response) => response.json())
      .then((apiData) => {
        console.log("Fetched apiData:", apiData); // Log fetched apiData to console
        setApiData(apiData.items[0]);
      });
  };

  ///API FOR THE CHANNEL apiData///

  const fetchOtherData = async () => {
    const ChannelDataURL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(ChannelDataURL)
      .then((response) => response.json())
      .then((data) => setChannelData(data.items[0]));
  };

  ///for coments//

  const fetchComments = async () => {
    const CommentURL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=54&videoId=${videoId}&key=${API_KEY}`;
    await fetch(CommentURL)
      .then((response) => response.json())
      .then((data) => setCommentData(data.items || []))
      .catch((error) => console.error("Error fetching comments:", error));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    fetchdetails();
  }, []);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>

      <h3>{apiData ? apiData.snippet.title : "Title"}</h3>

      <div className="playvideo-info">
        <p>
          {" "}
          {Value_Convertor(
            apiData ? apiData.statistics.viewCount : "views"
          )}{" "}
          &bull;
          {"  "}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "5 days"}
        </p>
        <div className="impression">
          <span>
            <img src={Like} />
            {Value_Convertor(apiData ? apiData.statistics.likeCount : "views")}
          </span>
          <span>
            <img src={dislike} />
          </span>
          <span>
            <img src={share} />
            Share
          </span>
          <span>
            <img src={save} />
            Save
          </span>
        </div>
      </div>

      <hr />
      <div className="publisher">
        <img
          src={
            channelData && channelData.snippet
              ? channelData.snippet.thumbnails.default.url
              : "Nul"
          }
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Publisher"}</p>
          <span>
            {" "}
            {channelData
              ? Value_Convertor(channelData.statistics.subscriberCount)
              : "M"}{" "}
            {"Subscribers "}
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {" "}
          {apiData ? apiData.snippet.description.slice(0, 500) : "Description"}
        </p>
        <br />
        <p>Subscribe for more videos</p>
        <hr />
        <h4>
          {"Comments "}
          25k views
        </h4>

        {commentData.map((item, index) => {
          return (
            <div key={index} className="comments">
              <img
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt=""
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                  <span>1 day ago</span>
                </h3>
                <p className="p">
                  {item.snippet.topLevelComment.snippet.textDisplay}{" "}
                </p>
                <div className="comment-action">
                  <img src={Like} alt="" />
                  <span>
                    {" "}
                    {Value_Convertor(
                      item.snippet.topLevelComment.snippet.likeCount
                    )}{" "}
                  </span>
                  <img src={dislike} alt="" />
                  <span>
                    {" "}
                    {Value_Convertor(
                      item.snippet.topLevelComment.snippet.dislikeCount
                    )}{" "}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultPlay;
