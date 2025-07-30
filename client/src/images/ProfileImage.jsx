import React from "react";

const ProfileImage = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      width={size}
      height={size}
      viewBox="0 -0.08 20 20"
      data-name="Capa 1"
      id="Capa_1"
    >
      <path d="M12.41,9.06a3,3,0,1,0-4.82,0,6.55,6.55,0,0,0-3.74,6,.38.38,0,1,0,.75,0A5.6,5.6,0,0,1,10,9.29a5.6,5.6,0,0,1,5.4,5.77.38.38,0,1,0,.75,0A6.55,6.55,0,0,0,12.41,9.06ZM8.32,8.79a2.21,2.21,0,1,1,3.89-1.43,2.16,2.16,0,0,1-.5,1.4l0,0a5.8,5.8,0,0,0-3.37,0Z" />
    </svg>
  );
};

export default ProfileImage;
