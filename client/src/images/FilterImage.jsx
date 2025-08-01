import React from "react";

const FilterImage = ({ size = 20, color = "#000000" }) => {
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.73224 5.32873C1.58574 4.03892 2.50136 2 4.22706 2H19.7734C21.4991 2 22.4147 4.03893 21.2682 5.32873L15.0002 12.3802V21C15.0002 21.3466 14.8208 21.6684 14.5259 21.8507C14.2311 22.0329 13.863 22.0494 13.553 21.8944L9.553 19.8944C9.21421 19.725 9.00021 19.3788 9.00021 19V12.3802L2.73224 5.32873ZM19.7734 4H4.22706L10.7476 11.3356C10.9103 11.5187 11.0002 11.7551 11.0002 12V18.382L13.0002 19.382V12C13.0002 11.7551 13.0901 11.5187 13.2528 11.3356L19.7734 4Z"
        fill={color}
      />
    </svg>
  );
};

export default FilterImage;
