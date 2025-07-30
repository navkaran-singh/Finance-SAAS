import React from "react";

const SoftGradientBackground = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Soft Blue Radial Gradient Glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(173,216,255,0.3)_0%,_transparent_70%)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(173,216,255,0.15)_0%,_transparent_80%)] blur-2xl"
        aria-hidden="true"
      />
    </div>
  );
};

export default SoftGradientBackground;
