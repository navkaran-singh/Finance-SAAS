import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import HomeImage from "../images/HomeImage";
import WalletImage from "../images/WalletImage";
import MarketImage from "../images/MarketImage";
import ArrowImage from "../images/ArrowImage";
import SettingsImage from "../images/SettingsImage";

const AnimateSidebar = ({ open, curr, setCurr }) => {
  const [idx, setIdx] = useState(0);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 10, opacity: 0, transition: { duration: 0.5 } }}
          // initial={{ y: 100, opacity: 0 }}
          // animate={{ y: 0, opacity: 1 }}
          // exit={{ y: 100, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 2,
            staggerChildren: 0.5,
          }}
          className={`flex flex-col p-2 rounded-4xl gap-5 absolute right-2 top-[300px] bg-[#abc1f4]`}
        >
          {/* Home */}
          <motion.div
            className={`cursor-pointer relative ${curr === "Home"}`}
            onClick={() => setCurr("Home")}
            onHoverStart={() => setIdx(1)}
            onHoverEnd={() => setIdx(0)}
          >
            <span>
              <HomeImage size={20} />
            </span>
            {idx == 1 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 right-10"
              >
                Home
              </motion.span>
            )}
          </motion.div>

          {/* Wallet */}
          <motion.div
            className={`cursor-pointer relative ${curr === "Wallet"}`}
            onClick={() => setCurr("Wallet")}
            onHoverStart={() => setIdx(2)}
            onHoverEnd={() => setIdx(0)}
          >
            <span>
              <WalletImage size={20} />
            </span>
            <span>
              {idx == 2 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 right-10"
                >
                  Wallet
                </motion.span>
              )}
            </span>
          </motion.div>

          {/* Marketplace */}
          <motion.div
            className={`cursor-pointer relative ${curr === "Marketplace"}`}
            onClick={() => setCurr("Marketplace")}
            onHoverStart={() => setIdx(3)}
            onHoverEnd={() => setIdx(0)}
          >
            <span>
              <MarketImage size={20} />
            </span>
            <span>
              {idx == 3 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 right-10"
                >
                  Marketplace
                </motion.span>
              )}
            </span>
          </motion.div>

          {/* Transfer */}
          <motion.div
            className={`cursor-pointer relative ${curr === "Transfer"}`}
            onClick={() => setCurr("Transfer")}
            onHoverStart={() => setIdx(4)}
            onHoverEnd={() => setIdx(0)}
          >
            <span>
              <ArrowImage size={20} />
            </span>
            <span>
              {idx == 4 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 right-10"
                >
                  Transfer
                </motion.span>
              )}
            </span>
          </motion.div>

          {/* Settings */}
          <motion.div
            className={`cursor-pointer relative ${curr === "Settings"}`}
            onClick={() => setCurr("Settings")}
            onHoverStart={() => setIdx(5)}
            onHoverEnd={() => setIdx(0)}
          >
            <motion.span
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="bg-white w-10 h-10"
            >
              <SettingsImage size={20} />
            </motion.span>
            <span>
              {idx == 5 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 right-10"
                >
                  Settings
                </motion.span>
              )}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimateSidebar;
