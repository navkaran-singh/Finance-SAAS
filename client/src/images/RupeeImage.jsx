import React from "react";

const RupeeImage = ({ size = 20, color = "#000000" }) => {
  return (
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
      />
      <path
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 7h3m5 0h-5m5 3h-2m-6.003 0H14m-3-3c1 0 3 .6 3 3m-1 7-5.003-4H11c1 0 3-.6 3-3"
      />
    </svg>
  );
};

export default RupeeImage;
