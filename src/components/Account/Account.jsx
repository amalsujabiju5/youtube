import React from "react";
import "./Account.css";
import tom from "../../assets/tom.png";
import google from "../../assets/google.png";
import switchaccount from "../../assets/account.png";
import exit from "../../assets/exit.png";
import youtube from "../../assets/youtube-symbol.png";
import crown from "../../assets/crown.png";
import dollar from "../../assets/dollar-symbol.png";
import location from "../../assets/globe.png";
import day from "../../assets/day-and-night.png";
import KeyBoard from "../../assets/keyboard.png";

const Account = ({ open }) => {
  return (
    <div className={`account ${open ? "open" : "close"}`}>
      {/* Use conditional rendering based on the open prop */}
      <div className="profile-picture">
        <img src={tom} alt="" />
        <p>Amal S Biju</p>
      </div>
      <p>amal123@gmail</p>
      <p className="View">View your Channel</p>
      <div className="links">
        <div className="link">
          <img src={google} alt="" />
          <p>Google Account</p>
        </div>
        <br />
        <div className="link">
          <img src={switchaccount} alt="" />
          <p>Switch Account</p>
        </div>
        <br />

        <div className="link">
          <img src={exit} alt="" />
          <p>Sign Out</p>
        </div>
      </div>
      <div className="links">
        <div className="link">
          <img src={youtube} alt="" />
          <p>Youtube studio</p>
        </div>
        <br />
        <div className="link">
          <img src={crown} alt="" />
          <p>Premium and benefits</p>
        </div>
        <br />

        <div className="link">
          <img src={dollar} alt="" />
          <p>Purchase</p>
        </div>
      </div>
      <div className="links">
        <div className="link">
          <img src={day} alt="" />
          <p>Appearance: Theme</p>
        </div>
        <br />
        <div className="link">
          <img src={location} alt="" />
          <p>Location: Canada</p>
        </div>
        <br />

        <div className="link">
          <img src={KeyBoard} alt="" />
          <p>Keyboard</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
