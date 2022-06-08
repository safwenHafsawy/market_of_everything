import React, { useState } from "react";
import "./filter.scss";
import FilterOptions from "./filterOptions";

function Filter(props) {
  const [price, setPrice] = useState([0, Number.MAX_SAFE_INTEGER]);
  const [date, setDate] = useState(["", ""]);
  const [region, setRegion] = useState("");

  const checkPrice = () => {
    let res = true;
    price.forEach((prc) => {
      if (isNaN(prc) || prc < 0 || prc > Number.MAX_SAFE_INTEGER) res = false;
    });
    return res;
  };

  const handlePriceChange = (e) => {
    const changedPrice = parseInt(e.target.getAttribute("name"));
    let changedValue = parseFloat(e.target.value);
    if (isNaN(changedValue)) changedValue = 0;
    setPrice((prevState) => {
      const newState = [...prevState];
      newState[changedPrice] = e.target.value;
      return newState;
    });
  };

  const handleRegionChange = (e) => {
		console.log(e.target.value);
    setRegion(e.target.value);
  };

  const handleDateChange = (e) => {
    const changedDate = parseInt(e.target.getAttribute("name"));
    setDate((prevState) => {
      const newState = [...prevState];
      newState[changedDate] = e.target.value;
      return newState;
    });
  };

  const checkDateLimits = () => {
    const defaultDate = [1970, 1];
    //checking if date fileds are populated
    const newDate = date.map((ele, index) => {
      if (ele === "") return defaultDate[index];
      return ele;
    });
    return newDate;
  };

  const sendFilters = () => {
    const dateLim = checkDateLimits();
    const priceCheck = checkPrice();

    if (priceCheck) props.changeFilter(price, dateLim, region);
  };

  const resetFilters = () => {
    setDate(["", ""]);
    setPrice([0, Number.MAX_SAFE_INTEGER]);
    setRegion("");
    sendFilters();
  };

  return (
    <>
      <FilterOptions
        price={price}
        date={date}
        region={region}
        changePrice={handlePriceChange}
        changeDate={handleDateChange}
        changeRegion={handleRegionChange}
      />
      <div id="filter-btns">
        <button id="send-btn" className="filter-btn" onClick={sendFilters}>
          Filter
        </button>
        <button id="reset-btn" className="filter-btn" onClick={props.clearFilters}>
          Clear
        </button>
      </div>
    </>
  );
}

export default Filter;
