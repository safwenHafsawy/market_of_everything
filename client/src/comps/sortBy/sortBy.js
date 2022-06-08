import React, { useState, useEffect } from "react";
import "./sortBy.scss";

function SortBy(props) {
  const [orderSort, setOrderSort] = useState("asc");
  const [typeSort, setTypeSort] = useState("pubDate");

  const { sortBy } = props;

  const changeSort = (event) => {
    const changed = event.target.getAttribute("name");
    if (changed === "order") {
      setOrderSort(event.target.value);
    } else if (changed === "type") {
      setTypeSort(event.target.value);
    }
  };

  useEffect(() => {
    sortBy([typeSort, orderSort]);
  }, [typeSort, orderSort, sortBy]);

  return (
    <div id="sorter">
      <span id="sort-header">Sort by:</span>
      <select
        name="type"
        value={typeSort}
        id="type-select"
        className="select-sort"
        onChange={changeSort}
      >
        <option value="Default" disabled>
          Type
        </option>
        <option className="sort-option" value="pubDate">
          Date
        </option>
        <option className="sort-option" value="price">
          Price
        </option>
        <option className="sort-option" value="name">
          Alphabatic order
        </option>
      </select>
      <select
        name="order"
        value={orderSort}
        id="order-select"
        className="select-sort"
        onChange={changeSort}
      >
        <option className="sort-option" value="default" hidden>
          Order
        </option>
        <option className="sort-option" value="asc">
          Ascending
        </option>
        <option className="sort-option" value="desc">
          Descending
        </option>
      </select>
    </div>
  );
}

export default SortBy;
