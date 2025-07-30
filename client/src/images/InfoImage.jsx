import React from "react";

const InfoImage = ({ size = 24, color = "#000" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 10.5H11.5C11.7761 10.5 12 10.7239 12 11V15C12 15.2761 12.2239 15.5 12.5 15.5H13" />
      <path d="M12 8.5H12.01" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};

export default InfoImage;
