import React from "react";

function ItemCard(props) {
  return (
    <div className="itemCard">
      <h3 id="item-card-header">{props.eleName}</h3>
      <img id="item-card-img" src={props.image[0]} alt="" />
      <div id="item-card-footer">
        {props.footerContent.map((ele, i) => (
          <p key={i} className="footer-content">
            <span>{ele[0]}</span> : {ele[1]} &nbsp;
          </p>
        ))}
      </div>
    </div>
  );
}

export default ItemCard;
