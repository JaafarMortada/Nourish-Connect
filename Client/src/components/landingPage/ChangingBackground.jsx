import { useState, useRef, useEffect } from "react";

import { bg1, bg2, bg3, bg4 } from "../../assets";
const ChangingBackground = () => {
  const images = [bg1, bg2, bg3, bg4];
  const [currentSlide, setCurrentSlide] = useState(0);

  let sliderInterval = useRef();
  let switchImages = () => {
    if (currentSlide < images.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };
  useEffect(() => {
    sliderInterval = setInterval(() => {
      switchImages();
    }, 7500);
    return () => {
      clearInterval(sliderInterval);
    };
  });
  return (
    <div className="imgWrapper">
      {images.map((img, index) => {
        return (
          <img
            src={img}
            className={
              index === currentSlide ? "imageActive homeImage" : "image"
            }
          />
        );
      })}
    </div>
  );
};

export default ChangingBackground;
