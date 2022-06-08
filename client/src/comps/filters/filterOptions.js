import React, { useState } from "react";
import DateFilterOptions from "./DateFilterOptions";
import PricefilterOptions from "./PricefilterOptions";
import RegionFilterOptions from "./RegionFilterOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

function FilterOptions(props) {
  const [showOptions, setShowOptions] = useState({
    Date: false,
    Price: false,
    Region: false,
  });

  const changeShowOptions = (e) => {
    const optionToChange = e.target.getAttribute("name");
    if (Object.keys(showOptions).indexOf(optionToChange) === -1) return;
    setShowOptions((prevState) => {
      const newState = { ...prevState };
      newState[optionToChange] = !newState[optionToChange];
      return newState;
    });
  };

  return (
    <ul id="filter-option-list">
      <li
        name="Region"
        className={`filter-items ${
          showOptions.Region ? "options-shown" : "options-hidden"
        }`}
        onClick={changeShowOptions}
      >
        Region
        <RegionFilterOptions
          region={props.region}
          changeRegion={props.changeRegion}
        />
        <FontAwesomeIcon className="icon" icon={faArrowDown} />
      </li>
      <li
        name="Price"
        className={`filter-items ${
          showOptions.Price ? "options-shown" : "options-hidden"
        }`}
        onClick={changeShowOptions}
      >
        Price
        <PricefilterOptions
          price={props.price}
          changePrice={props.changePrice}
        />
        <FontAwesomeIcon className="icon" icon={faArrowDown} />
      </li>

      <li
        name="Date"
        className={`filter-items ${
          showOptions.Date ? "options-shown" : "options-hidden"
        }`}
        onClick={changeShowOptions}
      >
        Published Date
        <DateFilterOptions date={props.date} changeDate={props.changeDate} />
        <FontAwesomeIcon className="icon" icon={faArrowDown} />
      </li>
    </ul>
  );
}

export default FilterOptions;
