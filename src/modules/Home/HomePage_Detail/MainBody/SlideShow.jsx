import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cartImg from "@assets/cartImg.png";
import cartImg1 from "@assets/cartImg1.png";
import cartImg2 from "@assets/cartImg2.png";
import cartImg3 from "@assets/cartImg3.png";
const SlideShow = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: null,
    nextArrow: null,
    appendDots: (dots) => (
      <div className="dots-container flex items-center justify-center">
        {dots.map((dot, index) => (
          <div
            key={index}
            className={`dot-item w-3 h-3 rounded-full mx-1 ${
              dot.props.className.includes("slick-active")
                ? "bg-black"
                : "bg-white"
            }`}
          ></div>
        ))}
      </div>
    ),
    customPaging: (i) => (
      <div className="bg-black w-5 h-5">
        
      </div>
    ), // Bỏ chấm điều hướng mặc định
  };

  return (
    <Slider {...settings}>
      <div>
        <div className="w-full h-[313px]">
          <img src={cartImg1} alt="Slide 1" />
        </div>
      </div>
      <div>
        <div className="w-full h-[313px]">
          <img src={cartImg2} alt="Slide 2" />
        </div>
      </div>
      <div>
        <div className="w-full h-[313px]">
          <img src={cartImg3} alt="Slide 3" />
        </div>
      </div>
      <div>
        <div className="w-full h-[313px]">
          <img src={cartImg} alt="Slide 4" />
        </div>
      </div>
    </Slider>
  );
};

export default SlideShow;
