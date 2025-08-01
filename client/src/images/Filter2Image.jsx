import React from "react";

const Filter2Image = ({ size = 20, color = "#000000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      enable-background="new 0 0 32 32"
      id="Stock_cut"
      version="1.1"
      xml:space="preserve"
    >
      <desc />

      <g>
        <circle
          cx="5"
          cy="8"
          fill="none"
          r="2"
          stroke={color}
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />

        <line
          fill="none"
          stroke={color}
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
          x1="7"
          x2="32"
          y1="8"
          y2="8"
        />

        <circle
          cx="5"
          cy="24"
          fill="none"
          r="2"
          stroke={color}
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />

        <line
          fill="none"
          stroke={color}
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
          x1="7"
          x2="32"
          y1="24"
          y2="24"
        />

        <circle
          cx="27"
          cy="16"
          fill="none"
          r="2"
          stroke={color}
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />

        <line
          fill="none"
          stroke={color}
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
          x1="25"
          x2="0"
          y1="16"
          y2="16"
        />

        <line
          fill="none"
          stroke={color}
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
          x1="3"
          x2="0"
          y1="8"
          y2="8"
        />

        <line
          fill="none"
          stroke={color}
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
          x1="29"
          x2="32"
          y1="16"
          y2="16"
        />

        <line
          fill="none"
          stroke={color}
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
          x1="3"
          x2="0"
          y1="24"
          y2="24"
        />
      </g>
    </svg>
  );
};

export default Filter2Image;
