import React from "react";
import "./categs.scss";
import CategCard from "../card/card";
import { Link } from "react-router-dom";
import CarLogo from "./icons/car.svg";
import HouseLogo from "./icons/house.svg";
import clothesLogo from "./icons/clothes.svg";
import electronicsLogo from "./icons/electronics.svg";
import serviceLogo from "./icons/service.svg";
import otherLogo from "./icons/others.svg";
import CheckAuth from "../checkAuth/checkAuth.js";

const Categ = () => {
  const CATEGORIES = [
    { name: "Cars", image: CarLogo },
    { name: "Houses", image: HouseLogo },
    { name: "Fashion", image: clothesLogo },
    { name: "Electronics", image: electronicsLogo },
    { name: "Service", image: serviceLogo },
    { name: "Other", image: otherLogo },
  ];

  return (
    <>
      <CheckAuth />
      <div id="main-categ">
        {CATEGORIES.map((ele, index) => {
          return (
            <Link
              key={index}
              className="catg-links"
              to={`./${index + 1}`}
              state={{ name: ele.name }}
            >
              <CategCard eleName={ele.name} image={ele.image} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Categ;
