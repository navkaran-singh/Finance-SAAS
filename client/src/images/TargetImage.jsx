import React from "react";

const TargetImage = ({ size = 20, color = "#000000" }) => {
  return (
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      width={size}
      height={size}
      viewBox="0 0 96 96"
    >
      <title />

      <g>
        <path d="M48,0A48,48,0,1,0,96,48,48.0474,48.0474,0,0,0,48,0Zm0,84A36,36,0,1,1,84,48,36.0393,36.0393,0,0,1,48,84Z" />

        <path d="M48,24A24,24,0,1,0,72,48,24.0312,24.0312,0,0,0,48,24Zm0,36A12,12,0,1,1,60,48,12.0081,12.0081,0,0,1,48,60Z" />
      </g>
    </svg>
  );
};

export default TargetImage;
