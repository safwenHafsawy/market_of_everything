import React from "react";
const REGIONS = ["Tunis", "Sidi Bouzid", "Zaghwen", "Sfax", "Gabes"];

function RegionFilterOptions(props) {
  return (
    <div className="options">
      <select
        className="input-options"
        value={props.region}
        onChange={props.changeRegion}
      >
        <option value="" selected disabled>
          Region
        </option>
        {REGIONS.map((ele, index) => (
          <option key={index} value={ele}>
            {ele}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RegionFilterOptions;
