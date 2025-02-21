import React from "react";
import banner from '../../assets/images/banner.jpg';

const Banner = () => {
  return (
    <div
      className="hero font2 h-[500px]"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div
        className="hero-overlay"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Adjust opacity here (0.5 is a good starting point)
        }}
      ></div>
      <div className="hero-content text-white text-center">
        <div className="">
          <h1 className="mb-5 text-6xl font-bold">Stay Organized, Stay Productive</h1>
          <p className="mb-5 ">
            Empower yourself to stay on top of your to-dos and reach your goals.
          </p>
          <button className="btn bg-purple-900 text-white">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
