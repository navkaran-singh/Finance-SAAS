import React from "react";

const SearchImage = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      version="1.1"
    >
      <title>Search</title>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="Search">
          <rect
            id="Rectangle"
            fill-rule="nonzero"
            x="0"
            y="0"
            width="24"
            height="24"
          ></rect>
          <circle
            id="Oval"
            stroke={color}
            stroke-width="2"
            stroke-linecap="round"
            cx="11"
            cy="11"
            r="7"
          ></circle>
          <line
            x1="16"
            y1="17"
            x2="19"
            y2="20"
            id="Path"
            stroke={color}
            stroke-width="2"
            stroke-linecap="round"
          ></line>
        </g>
      </g>
    </svg>
  );
};

export default SearchImage;
