import React from "react";

const ArrowSingleImage = ({ size = 20, color = "#000000", rotate = 0 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill={color}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path d="M3.293,20.707a1,1,0,0,1,0-1.414L17.586,5H12a1,1,0,0,1,0-2h8a1,1,0,0,1,1,1v8a1,1,0,0,1-2,0V6.414L4.707,20.707a1,1,0,0,1-1.414,0Z" />
    </svg>
  );
};

export default ArrowSingleImage;
