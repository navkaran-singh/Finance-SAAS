import React from "react";

const ArrowImage = ({ size = 20, color = "#000000" }) => {
  return (
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
    >
      <rect width="48" height="48" fill="white" fill-opacity="0.01" />
      <path
        d="M42 19H5.99998"
        stroke={color}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M30 7L42 19"
        stroke={color}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.79897 29H42.799"
        stroke={color}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.79895 29L18.799 41"
        stroke={color}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowImage;
