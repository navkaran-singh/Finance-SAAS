import React, { useMemo } from "react";

// (The animationStyle and Fragment components remain the same as in your code)
const animationStyle = `
  @keyframes float {
    0% {
      transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
      opacity: 0.8;
    }
    50% {
      transform: translateY(-30px) translateX(20px) rotate(180deg) scale(1.1);
      opacity: 1;
    }
    100% {
      transform: translateY(0px) translateX(0px) rotate(360deg) scale(1);
      opacity: 0.8;
    }
  }

  .animate-float {
    animation: float 12s ease-in-out infinite;
  }
`;

const Fragment = () => {
  const style = useMemo(() => {
    const size = Math.random() * 50 + 1;
    const animationDuration = Math.random() * 10 + 10;
    const animationDelay = Math.random() * 5;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    // const blur = Math.random() * 3 + 1;

    return {
      width: `${size}px`,
      height: `${size}px`,
      top: `${top}%`,
      left: `${left}%`,
      animationDuration: `${animationDuration}s`,
      animationDelay: `${animationDelay}s`,
      //   filter: `blur(${blur}px)`,
    };
  }, []);

  return (
    <img
      src="/ai.png"
      alt="Loading Logo"
      className="absolute animate-float"
      style={style}
    ></img>
  );
};

const AIGenerationOverlay = ({ isVisible }) => {
  // This line is why your original code didn't work.
  // isVisible was undefined, so !isVisible was true, and it returned null.
  if (!isVisible) return null;

  const fragments = useMemo(
    () => Array.from({ length: 40 }).map((_, i) => <Fragment key={i} />),
    []
  );

  return (
    <div className="absolute rounded-2xl inset-0 z-50 overflow-hidden">
      {/* Backdrop Blur */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-md"></div>

      {/* Floating Fragments */}
      <div className="relative w-full h-full">{fragments}</div>

      {/* Generating Text & Logo */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-[black] pointer-events-none">
        <p className="mt-4 text-lg font-medium tracking-wider animate-pulse">
          Generating...
        </p>
      </div>
    </div>
  );
};

const AnimateLoading = () => {
  return (
    <>
      <style>{animationStyle}</style>
      <AIGenerationOverlay isVisible={true} />
    </>
  );
};

export default AnimateLoading;
