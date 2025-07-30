import React from "react";

const NotiImage = ({ size = 20, color = "#000000" }) => {
  return (
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <title>i</title>
      <g id="Complete">
        <g id="bell">
          <g>
            <path
              d="M18.9,11.2s0-8.7-6.9-8.7-6.9,8.7-6.9,8.7v3.9L2.5,17.5h19l-2.6-2.4Z"
              fill="none"
              stroke={color}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
            <path
              d="M14.5,20.5s-.5,1-2.5,1-2.5-1-2.5-1"
              fill="none"
              stroke={color}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default NotiImage;
