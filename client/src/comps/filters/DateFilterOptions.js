import React from "react";

//creating an array of months
const MONTHS = Array.from({ length: 12 }, (ele, index) => {
  return new Date(0, index).toLocaleString("en-US", { month: "short" });
});

//creating an array of months
const YEARS = Array.from({ length: 5 }, (ele, index) => {
  const currentYear = new Date().getFullYear() - index;
  return currentYear;
});

function DateFilterOptions(props) {
  return (
    <div className="options">
      <select
        name="1"
        className="input-options"
        value={props.date[1]}
        onChange={(e) => props.changeDate(e)}
      >
        <option value="" selected disabled>
          Month
        </option>
        {MONTHS.map((ele, index) => (
          <option key={index} value={index}>
            {ele}
          </option>
        ))}
      </select>
      <select
        name="0"
        className="input-options"
        value={props.date[0]}
        onChange={(e) => props.changeDate(e)}
      >
        <option value="" selected disabled>
          Year
        </option>
        {YEARS.map((ele, index) => (
          <option key={index} value={ele}>
            {ele}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DateFilterOptions;
