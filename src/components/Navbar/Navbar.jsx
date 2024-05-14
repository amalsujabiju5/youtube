import React, { useState } from "react";
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import uploadIcon from "../../assets/upload.png";
import moreIcon from "../../assets/more.png";
import notificationIcon from "../../assets/notification.png";
import profileIcon from "../../assets/user_profile.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = ({ setSidebar, setOpen, setCreate }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query) return;
    navigate(`/search/${encodeURIComponent(query)}`); // use navigate function to redirect
  };

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          className="menu-icon"
          onClick={() => setSidebar((prev) => !prev)}
          src={menu_icon}
          alt=""
        />
        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="searchbox flex-div">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search"
            />
            <button type="submit">
              <img src={search_icon} alt="" />
            </button>
          </form>
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={uploadIcon} alt="" />
        <img onClick={() => setCreate((prev) => !prev)} src={moreIcon} alt="" />
        <img src={notificationIcon} alt="" />
        <img
          onClick={() => setOpen((prev) => !prev)}
          src={profileIcon}
          className="user-icon"
          alt=""
        />
      </div>
    </nav>
  );
};

export default Navbar;
