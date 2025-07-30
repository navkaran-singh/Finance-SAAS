import React from "react";

const CopyImage = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      viewBox="0 0 512 512"
    >
      <title>ionicons-v5-e</title>
      <rect
        x="128"
        y="128"
        width="336"
        height="336"
        rx="57"
        ry="57"
        style={{
          fill: "none",
          stroke: "#4e92b0",
          strokeLinejoin: "round",
          strokeWidth: 32,
        }}
      />
      <path
        d="M383.5,128l.5-24a56.16,56.16,0,0,0-56-56H112a64.19,64.19,0,0,0-64,64V328a56.16,56.16,0,0,0,56,56h24"
        style={{
          fill: "none",
          stroke: "#4e92b0",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 32,
        }}
      />
    </svg>
  );
};

export default CopyImage;
