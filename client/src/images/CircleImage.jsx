import React from "react";

const CircleImage = ({ size = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
    >
      <circle cx="10" cy="10" r="8" fill="#ffffff" />
    </svg>
  );
};

export default CircleImage;
