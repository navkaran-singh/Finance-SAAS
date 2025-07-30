import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AnimateNumber = ({ num = 2000, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [animatedOnce, setAnimatedOnce] = useState(false);

  // setCount gets called with the new value each frame.
  //   main player here is requestAnimateFrame, which is constantly called till progress becomes 1.
  // after calling it, progress is calculated and based on that progress% of num is displayed so
  // when progress becomes 100% num is displayed
  const incrementCount = () => {
    const startTime = performance.now();

    // raf provides currentTime
    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = Math.floor(progress * num);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(step); // calls step method 60 times a second
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <motion.div
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => {
        if (!animatedOnce) {
          incrementCount();
          setAnimatedOnce(true);
        }
      }}
      transition={{ duration: 0.5 }}
      className="inline"
    >
      ${count}
    </motion.div>
  );
};

export default AnimateNumber;
