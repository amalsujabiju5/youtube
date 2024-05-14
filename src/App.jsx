import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Account from "./components/Account/Account";

import Video from "./pages/video/Video";
import SearchPage from "./pages/SearchPage/SearchPage";
import SearchResults from "./components/SearchResults/SearchResults";
import SearchPlay from "./pages/SearchPlay/SearchPlay";

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [open, setOpen] = useState(() => {
    // Retrieve the value from sessionStorage if it exists, otherwise default to true
    const storedOpenState = sessionStorage.getItem("accountOpen");
    return storedOpenState ? JSON.parse(storedOpenState) : true;
  });
  const [create, setCreate] = useState(true);

  useEffect(() => {
    // Save the state of open variable to sessionStorage whenever it changes
    sessionStorage.setItem("accountOpen", JSON.stringify(open));
  }, [open]);

  useEffect(() => {
    // Close the Account page when clicking anywhere else on the document
    const handleClickOutside = () => {
      setOpen(false);
      setCreate(true);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Navbar setSidebar={setSidebar} setOpen={setOpen} setCreate={setCreate} />
      <Routes>
        <Route
          path="/"
          element={<Home sidebar={sidebar} open={open} create={create} />}
        />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
        <Route path="/search" element={<SearchPage />} />{" "}
        <Route path="/search/:query" element={<SearchPage />} />{" "}
        <Route path="/searchplay/:videoId" element={<SearchPlay />} />
      </Routes>
    </div>
  );
};

export default App;
