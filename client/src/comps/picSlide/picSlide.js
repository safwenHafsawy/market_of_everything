import React, { useState, useRef } from "react";
import "./picSlide.scss";

function Slider(props) {
  const [currentPic, setCurrentPic] = useState(0);
  const pictures = useRef([...props.images]);
  const changePic = () => {
    setCurrentPic((prevState) => {
      if (prevState < pictures.current.length - 1) return prevState + 1;
      return 0;
    });
  };

  return (
    <div id="slider">
      <button className="slider-btn" onClick={changePic} autoFocus>
        &#10094;
      </button>
      <img
        name={currentPic}
        className="image"
        src={pictures.current[currentPic]}
        alt="Pictures of the product"
      />
      <button className="slider-btn" onClick={changePic}>
        &#10095;
      </button>
    </div>
  );
}

export default Slider;
