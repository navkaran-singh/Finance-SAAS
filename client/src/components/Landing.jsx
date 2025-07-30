import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import LandingImage from "../../public/landing.jpg";
import MarbleImage from "../../public/marble.png";
import UploadImage from "../../public/upload.svg";
import AnalyzeImage from "../../public/analyze.svg";
import MoneyImage from "../../public/money.svg";
// import Person1Image from "../../public/person1.jpg";
// import Person2Image from "../../public/person2.jpg";
// import Person3Image from "../../public/person3.jpg";
// import Person4Image from "../../public/person4.jpg";

// import GradientImage from "../../public/gradient.jpeg";

import StarImage from "../images/StarImage";
import CircleImage from "../images/CircleImage";

const Landing = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 50%", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const z = useTransform(scrollYProgress, [0, 1], [200, 0]);

  const leftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: -700 },
    visible: { opacity: 1, x: 0 },
  };

  const circleVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  const scrollVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const childVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="overflow-x-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={circleVariants}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="p-2"
      >
        <div className="flex w-full px-2 items-center justify-between mb-1">
          <div className="font-bold text-xl max-md:text-lg">FinanceFlow</div>
          <div className="text-white bg-black rounded-2xl px-3 py-2">
            Log In
          </div>
        </div>

        <div className="relative">
          <div>
            <motion.span
              variants={leftVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, ease: "easeInOut" }}
              className="z-30 absolute top-1/2 left-1/12"
            >
              <StarImage />
            </motion.span>

            <motion.span
              variants={leftVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, ease: "easeInOut" }}
              className="z-30 absolute top-1/12 right-16"
            >
              <StarImage size={10} />
            </motion.span>

            <motion.span
              variants={rightVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, ease: "easeInOut" }}
              className="z-30 absolute top-1/6 right-16"
            >
              <CircleImage size={5} />
            </motion.span>

            <motion.span
              variants={circleVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, ease: "easeInOut" }}
              className="z-30 absolute top-52 right-24"
            >
              <CircleImage size={10} />
            </motion.span>

            <motion.span
              variants={circleVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, ease: "easeInOut" }}
              className="z-30 absolute top-60 right-28"
            >
              <CircleImage size={5} />
            </motion.span>

            <motion.span
              variants={circleVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, ease: "easeInOut" }}
              className="z-30 absolute top-64 right-20"
            >
              <CircleImage size={3} />
            </motion.span>

            <motion.span
              variants={circleVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, ease: "easeInOut" }}
              className="z-30 absolute top-[260px] right-[75px]"
            >
              <CircleImage size={3} />
            </motion.span>

            <motion.span
              variants={circleVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, ease: "easeInOut" }}
              className="z-30 absolute top-72 right-12"
            >
              <CircleImage size={3} />
            </motion.span>

            <motion.span
              variants={rightVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, ease: "easeInOut" }}
              className="z-30 absolute top-72 right-20"
            >
              <img
                src={MarbleImage}
                alt=""
                className="w-16 h-16 rotate-y-[-16deg] rotate-[-10deg] -skew-y-6"
              />
            </motion.span>

            <motion.span
              variants={rightVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, ease: "easeInOut" }}
              className="z-30 absolute top-[350px] right-72"
            >
              <CircleImage size={3} />
            </motion.span>

            <motion.span
              variants={rightVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, ease: "easeInOut" }}
              className="z-30 absolute top-[300px] right-64"
            >
              <img
                src={MarbleImage}
                alt=""
                className="w-10 h-10 rotate-y-[-16deg] rotate-[90deg] -skew-y-6"
              />
            </motion.span>

            <motion.span
              variants={rightVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, ease: "easeInOut" }}
              className="z-30 absolute top-20 right-[450px]"
            >
              <img
                src={MarbleImage}
                alt=""
                className="w-12 h-12 rotate-y-[-16deg] rotate-[90deg] -skew-y-6"
              />
            </motion.span>

            <motion.span
              variants={rightVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, ease: "easeInOut" }}
              className="z-30 absolute top-72 right-[880px]"
            >
              <img
                src={MarbleImage}
                alt=""
                className="w-10 h-10 rotate-y-[-16deg] rotate-[90deg] -skew-y-6"
              />
            </motion.span>
          </div>

          <div className=" [perspective:1000px]">
            <motion.div
              style={{
                // scale,
                opacity,
                // z,
                rotateX,
              }}
              ref={targetRef}
              id="gradient"
              className="h-[450px] origin-center transform-style-[preserve-3d] will-change-transform rounded-xl bg-gradient-to-r from-[#765eb7] via-[#5c71be] to-[#E8829F]"
            >
              <div className="flex items-center justify-between w-3/4 mx-auto">
                <div className="mt-10">
                  <p className="text-4xl text-slate-200 font-semibold max-md:text-xl">
                    Take control of
                  </p>
                  <p className="text-4xl text-slate-200 font-semibold max-md:text-xl mb-2">
                    your finances
                  </p>
                  <p>Unlock financial clarity and</p>
                  <p>achieve your goals.</p>

                  <div className="flex gap-2 max-md:justify-center mt-5">
                    <button className="text-white bg-black rounded-2xl max-md:text-sm max-md:px-1 px-3 py-2">
                      Get Started Free
                    </button>
                    <button className="border border-slate-800 rounded-2xl max-md:text-sm max-md:px-1 px-3 py-2">
                      See How It Works
                    </button>
                  </div>
                </div>
                <motion.div
                  initial={{ scale: [0.1, 0.3, 0.5, 1], x: -200, rotateY: 0 }}
                  animate={{ scale: 1, x: 0, rotateY: 360 }}
                  whileInView={{
                    y: [0, -15, 0],
                    transition: {
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                    },
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="flex items-center mt-10"
                >
                  <img
                    className="w-80 h-72 max-md:w-48 max-sm:w-32 -skew-x-12 rounded-2xl shadow-2xl rotate-y-[-16deg] rotate-[8deg] -skew-y-6"
                    src={LandingImage}
                    alt=""
                  />
                  {/* <img src={MarbleImage} className="w-10 h-10" alt="" /> */}
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            style={{ opacity, perspective: "1000px", rotateX }}
            ref={targetRef}
            className="flex max-md:w-full px-2 justify-center gap-10  max-md:gap-3 absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", damping: 20, stiffness: 100 },
              }}
              className="w-64 cursor-pointer max-md:w-full rounded-xl bg-[#d0c1f8] p-5 text-black shadow-sm"
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#a789f8] mb-2">
                <img
                  src={UploadImage}
                  className="w-4 h-4 rounded-full"
                  alt=""
                />
              </span>
              <p className="text-lg max-md:text-sm font-semibold mb-2">
                Upload CSV
              </p>
              <p className="text-sm max-md:text-xs opacity-70">
                Upload your bank CSV files for seamless transaction import.
              </p>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", damping: 20, stiffness: 100 },
              }}
              className="w-64 cursor-pointer max-md:w-full rounded-xl bg-[#c4d7fb] p-5 text-black shadow-sm"
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#95b8fa] mb-2">
                <img
                  src={AnalyzeImage}
                  className="w-4 h-4 rounded-full"
                  alt=""
                />
              </span>
              <p className="text-lg max-md:text-sm font-semibold mb-2">
                Map And Analyze
              </p>
              <p className="text-sm max-md:text-xs opacity-70">
                Automatically categorize and visualize your spending patterns.
              </p>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", damping: 20, stiffness: 100 },
              }}
              className="w-64 cursor-pointer max-md:w-full rounded-xl bg-[#fcdae3] p-5 text-black shadow-sm"
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f8a3ba] mb-2">
                <img src={MoneyImage} className="w-4 h-4 rounded-full" alt="" />
              </span>
              <p className="text-lg max-md:text-sm font-semibold mb-2">
                Budget Suggestions
              </p>
              <p className="text-sm max-md:text-xs max-sm:text-clip opacity-70">
                Get personalized budgeting tips based on your financial
                behavior.
              </p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={scrollVariants}
          whileInView="visible"
          initial="hidden"
          transition={{ duration: 1, ease: "easeInOut", staggerChildren: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex max-w-3xl mx-auto px-5 gap-5 mt-32 justify-center"
        >
          <motion.div variants={childVariants}>
            <p className="font-semibold max-md:text-sm mb-2">
              No bank sync needed
            </p>
            <p className="text-sm max-md:text-xs max-w-60">
              Stay secure — just upload your bank statement CSV, no credentials.
            </p>
          </motion.div>
          <motion.div variants={childVariants}>
            <p className="font-semibold max-md:text-sm mb-2">
              Actionable Insights
            </p>
            <p className="text-sm max-md:text-xs max-w-60">
              Get personalized tips and alerts based on your spending patterns.
            </p>
          </motion.div>
          <motion.div variants={childVariants}>
            <p className="font-semibold max-md:text-sm mb-2">
              Control Your Spending
            </p>
            <p className="text-sm max-md:text-xs max-w-60">
              Set clear goals and see how your spending aligns, every month.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-4xl tracking-tight max-md:text-2xl mx-auto max-w-[450px] text-center text-clip mt-10 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          The thrill of visiting only accounts you love
        </motion.div>
        {/*
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.2 }}
        className="flex w-full justify-center gap-3"
      >
        {[1, 2, 3, 4].map((num, index) => (
          <div
            key={num}
            onMouseEnter={() => setCurr(num)}
            className="flex gap-2 cursor-pointer max-md:justify-center"
          >
            <img
              src={
                num === 1
                  ? Person1Image
                  : num === 2
                  ? Person2Image
                  : num === 3
                  ? Person3Image
                  : Person4Image
              }
              className="w-14 h-14 object-cover rounded-full"
              loading="lazy"
              alt=""
            />
            {curr === num && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col"
              >
                <p className="font-semibold">Somali Gor</p>
                <p className="w-80 text-sm">
                  Lead frontend developer. Passionate about building beautiful,
                  user-friendly interfaces.
                </p>
              </motion.div>
            )}
          </div>
        ))}

        <motion.button
          initial={{ scale: 1 }}
          whileHover={{ scale: [1.01, 1.03, 1.05] }}
          className="text-white cursor-pointer bg-black px-6 h-12 mt-1 rounded-3xl py-2 text-sm"
        >
          Get Started
        </motion.button>
      </motion.div> */}
      </motion.div>

      <div className="h-[100vh]"></div>
    </div>
  );
};

export default Landing;
