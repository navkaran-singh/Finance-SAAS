import React from "react";

const LocationImage = ({ size, color }) => {
  return (
    <svg
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      id="location_pointer_mark"
      data-name="location pointer mark"
    >
      <rect id="Rectangle" width="24" height="24" fill="none" />
      <path
        id="Oval"
        d="M7,19.708S14,13.866,14,7A7,7,0,0,0,0,7C0,13.866,7,19.708,7,19.708Z"
        transform="translate(5 2)"
        fill="none"
        stroke={color}
        stroke-miterlimit="10"
        stroke-width="1.5"
      />
      <circle
        id="Oval_2"
        data-name="Oval 2"
        cx="3"
        cy="3"
        r="3"
        transform="translate(9 6)"
        fill="none"
        stroke={color}
        stroke-miterlimit="10"
        stroke-width="1.5"
      />
    </svg>
  );
};

export default LocationImage;
