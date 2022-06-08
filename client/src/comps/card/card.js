import React from "react";
import "./card.scss";

function CategCard(props) {
  return (
    <div className="card">
      <h2 id="card-header">{props.eleName}</h2>
      <img id="card-img" src={props.image} alt="" />
    </div>
  );
}

export default CategCard;
