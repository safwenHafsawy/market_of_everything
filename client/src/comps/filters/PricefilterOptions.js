import React from "react";

function PricefilterOptions(props) {
  return (
    <div className="options">
      <input
        name="0"
        type="text"
        className="input-options"
        placeholder="Min Price"
        value={props.price[0] !== 0 ? props.price[0] : ""}
        onChange={(e) => props.changePrice(e)}
      />
      <input
        name="1"
        type="text"
        className="input-options"
        placeholder="Max Price"
        value={
          props.price[1] < Number.MAX_SAFE_INTEGER - 1 ? props.price[1] : ""
        }
        onChange={(e) => props.changePrice(e)}
      />
    </div>
  );
}

export default PricefilterOptions;
