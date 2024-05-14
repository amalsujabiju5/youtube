import React from "react";
import "./Searchpage.css";
import Sidebar from "../../components/sidebar/sidebar";
import SearchResults from "../../components/SearchResults/SearchResults";

const SearchPage = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="Result-container">
        <SearchResults />
      </div>
    </div>
  );
};

export default SearchPage;
