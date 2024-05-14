import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../components/sidebar/sidebar";
import Account from "../../components/Account/Account";
import Add from "../../components/AddVideo/Add";
import Feed from "../../components/Feed/Feed";
import Video from "../video/Video";

const Home = ({ sidebar, open, create }) => {
  //this is for the API
  const [category, setCategory] = useState(0);

  return (
    <div className="home-container">
      <Sidebar //for accesing the api passing the useState to the side bar  category={category}, setCategory={setCategory}
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
      />
      <div className="container">
        <Feed category={category} />
      </div>
      <Account open={open} />
      <Add create={create} />
    </div>
  );
};

export default Home;
