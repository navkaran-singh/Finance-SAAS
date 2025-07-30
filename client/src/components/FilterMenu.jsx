import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";

import CategoryDropdown from "./CategoryDropdown";
import TagsDropdown from "./TagsDropdown";

import LogoImage from "../../public/logo.png";
import HomeImage from "../images/HomeImage";
import WalletImage from "../images/WalletImage";
import MarketImage from "../images/MarketImage";
import ArrowImage from "../images/ArrowImage";
import SettingsImage from "../images/SettingsImage";
import SearchImage from "../images/SearchImage";
import NotiImage from "../images/NotiImage";
import PersonImage from "../../public/person1.webp";
import RadarImage from "../../public/radar.webp";
import BarImage from "../images/BarImage";
import AnimateSidebar from "./AnimateSidebar";
import useWindowWidth from "../hooks/useWindowWidth";
import TargetImage from "../images/TargetImage";
import SubmitImage from "../images/SubmitImage";
import ChartImage from "../images/ChartImage";
import RupeeImage from "../images/RupeeImage";
import CartImage from "../images/CartImage";
import CarImage from "../images/CarImage";
import EatImage from "../images/EatImage";
import CalendarImage from "../images/CalendarImage";
import ArrowSingleImage from "../images/ArrowSingleImage";
import GraphImage from "../images/GraphImage";
import FilterImage from "../images/FilterImage";
import Filter2Image from "../images/Filter2Image";
import DateRangeSelect from "./DateRangeSelect";
import DownImage from "../images/DownImage";
import UpImage from "../images/UpImage";
import CrossImage from "../images/CrossImage";

import TypeDropdown from "./TypeDropdown";

const FilterMenu = ({
  filterMenu,
  setFilterMenu,
  activeFilters,
  setActiveFilters,
  type,
  setType,
  moreFilters,
  setMoreFilters,
}) => {
  const [detail, setDetail] = useState("All");
  const [demoFilters, setDemoFilters] = useState(activeFilters);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState([]);

  const handleTypeChange = (type) => {
    setType(type);
    setDemoFilters((prev) => {
      const newPrev = prev?.filter((item) => {
        return (
          item[0]?.startsWith("Categories:") ||
          item[0]?.startsWith("Date:") ||
          !item[0]?.startsWith("Type:")
        );
      });

      return [...newPrev, ["Type: " + type]];
    });
  };
  const handleSubmitFilters = () => {
    setActiveFilters(demoFilters);
    setFilterMenu(false);
  };
  useEffect(() => {
    console.log(maxAmount);
    if (!minAmount && !maxAmount) {
      setDemoFilters((prev) => {
        const newPrev = prev.filter((item) => {
          return !item[0]?.startsWith("Amount:");
        });
        return [...newPrev];
      });
      return;
    }

    setDemoFilters((prev) => {
      const newPrev = prev.filter((item) => {
        return !item[0]?.startsWith("Amount:");
      });
      newPrev.push(["Amount: $" + minAmount + " - $" + maxAmount]);
      return [...newPrev];
    });
  }, [minAmount, maxAmount]);
  useEffect(() => {
    console.log(demoFilters);
  }, [demoFilters]);

  return (
    <AnimatePresence>
      {filterMenu && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ amount: 0.1, once: true }}
          exit={{ opacity: 0, y: 30 }}
          className="flex flex-col h-auto w-[350px] rounded-3xl absolute top-[100px] bg-white z-20 p-3 px-5"
        >
          <div className="flex w-full justify-between items-center mb-3 mt-2 px-3">
            <p className="text-3xl">Filters</p>
            {demoFilters?.length == 0 ? (
              <span
                className="cursor-pointer"
                onClick={() => setFilterMenu(false)}
              >
                <CrossImage />
              </span>
            ) : (
              <span
                onClick={() => setFilterMenu(false)}
                className="w-12 h-12 relative bg-black rounded-full flex items-center justify-center cursor-pointer"
              >
                <FilterImage color="#ffffff" />
                <span className="absolute top-0 left-8 flex items-center justify-center text-white bg-red-500 rounded-full w-4 h-4">
                  {demoFilters.length}
                </span>
              </span>
            )}
          </div>
          <motion.div className="w-full  gap-5 flex flex-col mb-2 rounded-2xl bg-white p-3">
            <div className="flex flex-col">
              <div>Time</div>
              <div className="flex border-1 border-[#f2f2f2] items-center justify-between h-[40px] p-2 w-full rounded-3xl">
                <CalendarImage size={25} color="#c5c5c6" />
                <span className="h-[30px] ml-2 w-[2px] bg-[#d7d6d6]"></span>
                <DateRangeSelect
                  activeFilters={demoFilters}
                  setActiveFilters={setDemoFilters}
                  date={date}
                  setDate={setDate}
                />
                <DownImage />
              </div>
            </div>
            <div className="">
              <div>Money</div>
              <div className="border-1 border-[#f2f2f2] cursor-pointer  h-[40px] flex gap-2 items-center justify-between  rounded-3xl">
                <span
                  onClick={() => handleTypeChange("All")}
                  className={`flex items-center p-2 h-[40px] rounded-3xl gap-1 ${
                    type === "All" && "text-black bg-[#f9fafb]"
                  }`}
                >
                  <span className="pb-2 font-bold">...</span>
                  <span>All</span>
                </span>
                <span
                  onClick={() => handleTypeChange("Spent")}
                  className={`flex items-center p-2 rounded-3xl gap-1 ${
                    type === "Spent" && "text-black bg-[#f9fafb]"
                  }`}
                >
                  <ArrowSingleImage rotate={65} size={15} />
                  <span>Spent</span>
                </span>
                <span
                  onClick={() => handleTypeChange("Received")}
                  className={`flex items-center p-2 rounded-3xl gap-1 ${
                    type === "Received" && "text-black bg-[#f9fafb]"
                  }`}
                >
                  <ArrowSingleImage size={15} />
                  <span>Received</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div>Categories</div>
              <div className="flex border-1 border-[#f2f2f2] items-center justify-between h-[40px] p-2 w-full rounded-3xl">
                <FilterImage size={25} color="#c5c5c6" />
                <span className="h-[30px] ml-2 w-[1.5px] bg-[#d7d6d6]"></span>
                <CategoryDropdown
                  activeFilters={demoFilters}
                  setActiveFilters={setDemoFilters}
                  categories={categories}
                  setCategories={setCategories}
                />
                <DownImage />
              </div>
            </div>

            {/* More Filters Section */}
            <div className="border-t-2 border-[#e6e7e8] mt-2">
              <div
                onClick={() => setMoreFilters(!moreFilters)}
                className="flex mt-3 border-1 border-[#f2f2f2] items-center justify-between h-[40px] p-2 w-full rounded-3xl"
              >
                <div className="flex items-center">
                  <Filter2Image size={20} color="#c5c5c6" />
                  <span className="h-[30px] ml-[10px] mr-2 w-[1.5px] bg-[#d7d6d6]"></span>
                  <span className="flex gap-2 items-center">More Filters</span>
                </div>
                <motion.span
                  animate={{ rotate: moreFilters ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <DownImage />
                </motion.span>
              </div>

              {moreFilters && (
                <AnimatePresence>
                  {
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className={`flex flex-col gap-3 mt-3`}
                    >
                      <div className="w-full">
                        <p className=" text-[#485160] mb-2">Amount</p>
                        <div className="flex gap-2 w-[300px]">
                          <input
                            className="bg-[#f9fafb] w-[150px] p-2 rounded-3xl focus:outline:none"
                            placeholder="Min Amount"
                            value={minAmount}
                            onChange={(e) => setMinAmount(e.target.value)}
                            type="text"
                            name=""
                            id=""
                          />
                          <input
                            className="bg-[#f9fafb] w-[150px] p-2 rounded-3xl focus:outline:none"
                            placeholder="Max Amount"
                            value={maxAmount}
                            onChange={(e) => setMaxAmount(e.target.value)}
                            type="text"
                            name=""
                            id=""
                          />
                        </div>
                      </div>
                      <div className="flex-1/3 flex flex-col">
                        <p className=" text-[#485160] mb-2">Type</p>
                        <div className="bg-[#f9fafb] flex items-center justify-between w-full rounded-3xl">
                          <TypeDropdown
                            activeFilters={demoFilters}
                            setActiveFilters={setDemoFilters}
                            detail={detail}
                            setDetail={setDetail}
                          />
                          <DownImage />
                        </div>
                      </div>
                      <div className="flex-1/3 flex flex-col">
                        <p className=" text-[#485160] mb-2">Tags</p>
                        <div className="bg-[#f9fafb] flex items-center justify-between w-full rounded-3xl">
                          <TagsDropdown
                            activeFilters={demoFilters}
                            setActiveFilters={setDemoFilters}
                          />
                          <DownImage />
                        </div>
                      </div>
                    </motion.div>
                  }
                </AnimatePresence>
              )}
            </div>
            <AnimatePresence>
              {demoFilters?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  onClick={handleSubmitFilters}
                  className=""
                >
                  <div className="w-full rounded-4xl text-center p-3 bg-black text-white">
                    Apply Filters
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterMenu;
