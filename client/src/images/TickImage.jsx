import React from "react";

const TickImage = ({ className = "", color = "currentColor" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={`${className}`}
    >
      <rect width="16" height="16" fill="none" />
      <path
        d="M2,9.014L3.414,7.6L6.004,10.189L12.593,3.6L14.007,5.014L6.003,13.017L2,9.014Z"
        fill={color}
      />
    </svg>
  );
};

export default TickImage;
