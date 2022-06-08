import React, { useState } from "react";
import "./home.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchAddAction } from "../../redux/actions";
import CheckAuth from "../checkAuth/checkAuth.js";

const Home = () => {
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  function submitSearch() {
    dispatcher(searchAddAction(searchVal));
    navigate("/catg/search");
  }

  function handleSearchInput(e) {
    setSearchVal(e.target.value);
  }

  return (
    <div id="home-page">
      <CheckAuth />
      <div id="welcome-banner">
        <div id="welcome-home-content">
          <h1 id="welcome-header">Welcome to your</h1>
          <div id="search-home">
            <h4 id="search-home-header" className="secondary-header">
              What are you looking for today ?
            </h4>
            <div id="search-home-box">
              <input
                id="search-home-input"
                type="text"
                placeholder="Cars,Houses,Fashion..."
                value={searchVal}
                onChange={handleSearchInput}
              />
              <button id="search-home-btn" onClick={submitSearch}>
                Search
              </button>
            </div>
            <h4 id="categ-home-header" className="secondary-header">
              Not Sure ? Check Categories...
            </h4>
            <Link to="/catg" id="home-link-categ">
              Categories
            </Link>
          </div>
          <div id="home-sell">
            <h4 id="home-sell-header" className="secondary-header">
              Looking to sell something ?
            </h4>
            <Link to="/sell" id="home-sell-link">
              Sell Item
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
