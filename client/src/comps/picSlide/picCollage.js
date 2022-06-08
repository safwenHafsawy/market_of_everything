import React, { useState } from "react";
import "./picCollage.scss";

function PicCol(props) {
  const [curentIndex, setCurrentIndex] = useState(0);
  const PICS = [...props.images];
  let displayed = props.displayed;
  const closeDisplay = props.closeDisplay;
  const showPage = props.displayPage;

  return (
    <div className={displayed ? "displayed" : "not-displayed"}>
      <button
        id="close-col-btn"
        onClick={() => {
          closeDisplay(false);
          showPage(true);
        }}
      >
        Close&#10005;
      </button>
      <div id="display-main-image">
        <img
          src={PICS[curentIndex]}
          alt="main-lightbox"
          id="lightbox-main-pic"
        />
      </div>

      <div id="display-other-images">
        {PICS.map((ele, index) => {
          if (index !== curentIndex) {
            return (
              <img
                key={index}
                src={PICS[index]}
                onClick={() => setCurrentIndex(index)}
                alt="other-item-pics"
                className="other-pics"
              />
            );
          }
        })}
      </div>
      <div id="small-devices-collage">
        {PICS.map((ele, index) => {
          return (
            <img
              key={index}
              src={ele}
              onClick={() => setCurrentIndex(index)}
              alt="other-item-pics"
              className="other-pics"
            />
          );
        })}
      </div>
    </div>
  );
}

export default PicCol;
