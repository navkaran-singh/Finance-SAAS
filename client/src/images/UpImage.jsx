import React from "react";

const UpImage = ({ size = 20, color = "#000000" }) => {
  return (
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className="mr-1 font-bold"
    >
      <path d="M 16 6.59375 L 15.28125 7.28125 L 2.78125 19.78125 L 4.21875 21.21875 L 16 9.4375 L 27.78125 21.21875 L 29.21875 19.78125 L 16.71875 7.28125 Z" />
    </svg>
  );
};

export default UpImage;
