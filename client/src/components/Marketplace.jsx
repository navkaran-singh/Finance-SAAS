import React, { use, useEffect, useState } from "react";
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
import FilterMenu from "./FilterMenu";

const Marketplace = ({ refinedData }) => {
  const [type, setType] = useState("All");
  const [moreFilters, setMoreFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [filterMenu, setFilterMenu] = useState(false);

  const [curr, setCurr] = useState(0);
  const [showData, setShowData] = useState(refinedData);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleTypeChange = (type) => {
    setType(type);
    setActiveFilters((prev) => {
      const newPrev = prev?.filter((item) => {
        return (
          item[0]?.startsWith("Categories:") ||
          item[0]?.startsWith("Date:") ||
          !item[0]?.startsWith("Type:")
        );
      });
      // if (type !== "All") {
      return [...newPrev, ["Type: " + type]];
      // }
      return [...newPrev];
    });
  };

  useEffect(() => {
    let filtered = [...refinedData];

    if (activeFilters.length > 0) {
      switch (activeFilters[activeFilters.length - 1][0].split(":")[0]) {
        case "Amount":
          setSortBy("amount");
          break;
        case "Date":
          setSortBy("date");
          break;
        default:
          break;
      }
    } else setSortBy("date");

    activeFilters.forEach((filter) => {
      const [typeKey, valueRaw] = filter[0].split(":");
      const values = valueRaw.split(",").map((v) => v.trim());

      switch (typeKey) {
        case "Type":
          if (values[0] === "Spent") {
            filtered = filtered.filter((item) => item.amount < 0);
          } else if (values[0] === "Received") {
            filtered = filtered.filter((item) => item.amount > 0);
          }
          break;

        case "Date":
          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();

          if (values[0] === "This Month") {
            filtered = filtered.filter((item) => {
              const d = new Date(item.date);
              return (
                d.getMonth() === currentMonth && d.getFullYear() === currentYear
              );
            });
          } else if (values[0] === "Last Month") {
            let lastMonth = currentMonth - 1;
            let year = currentYear;
            if (lastMonth < 0) {
              lastMonth = 11;
              year -= 1;
            }
            filtered = filtered.filter((item) => {
              const d = new Date(item.date);
              return d.getMonth() === lastMonth && d.getFullYear() === year;
            });
          } else if (values[0] === "Last 90 Days") {
            const cutoff = new Date();
            cutoff.setDate(now.getDate() - 90);
            filtered = filtered.filter((item) => new Date(item.date) >= cutoff);
          } else if (values[0] === "This Year") {
            filtered = filtered.filter(
              (item) => item.date.split("-")[0] === currentYear
            );
          }
          break;

        case "Categories":
          filtered = filtered.filter((item) => values.includes(item.category));
          break;

        case "Amount":
          const [minStr, maxStr] = values[0].replace("$", "").split("-");
          const min = Math.abs(parseFloat(minStr));
          const max = Math.abs(parseFloat(maxStr.replace("$", "")));
          console.log(values[0]);
          filtered = filtered.filter(
            (item) =>
              (!isNaN(min) ? Math.abs(item.amount) >= min : true) &&
              (!isNaN(max) ? Math.abs(item.amount) <= max : true)
          );
          break;

        case "Tags":
          filtered = filtered.filter((item) =>
            item.tags?.some((tag) => values.includes(tag))
          );
          break;

        default:
          break;
      }
    });

    // 🔽 Finally, apply sorting after all filters
    // console.log(filtered);

    const sorted = sortData(filtered, sortBy, sortOrder);
    setShowData(sorted);
  }, [activeFilters, sortBy, sortOrder, refinedData]);

  useEffect(() => {
    const isType = activeFilters.filter((filter) =>
      filter[0].startsWith("Type: ")
    );
    if (isType.length == 0) setType("All");

    const isAmount = activeFilters.filter((filter) =>
      filter[0].startsWith("Amount: ")
    );
    if (isAmount.length == 0) {
      setMinAmount("");
      setMaxAmount("");
    }
  }, [activeFilters]);

  const sortData = (data, key, order = "asc") => {
    return [...data].sort((a, b) => {
      let valA = a[key] ?? "";
      let valB = b[key] ?? "";

      if (key === "tags") {
        valA = (valA && valA.join(",").toLowerCase()) || "";
        valB = (valB && valB.join(",").toLowerCase()) || "";
      } else if (key === "date") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      } else if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  useEffect(() => {
    console.log(maxAmount);
    if (!minAmount && !maxAmount) {
      setActiveFilters((prev) => {
        const newPrev = prev.filter((item) => {
          return !item[0]?.startsWith("Amount:");
        });
        return [...newPrev];
      });
      return;
    }

    setActiveFilters((prev) => {
      const newPrev = prev.filter((item) => {
        return !item[0]?.startsWith("Amount:");
      });
      newPrev.push(["Amount: $" + minAmount + " - $" + maxAmount]);
      return [...newPrev];
    });
  }, [minAmount, maxAmount]);

  useEffect(() => {
    console.log(curr);
  }, [curr]);

  return (
    <div className="w-full mt-5 px-5">
      {filterMenu && <div className="bg-black/50 fixed inset-0 z-10"></div>}
      <div className="flex w-full justify-center">
        <FilterMenu
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          filterMenu={filterMenu}
          setFilterMenu={setFilterMenu}
          type={type}
          setType={setType}
          moreFilters={moreFilters}
          setMoreFilters={setMoreFilters}
          minAmount={minAmount}
          setMinAmount={setMinAmount}
          maxAmount={maxAmount}
          setMaxAmount={setMaxAmount}
          refinedData={refinedData}
          setShowData={setShowData}
          handleTypeChange={handleTypeChange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>

      <Toaster richColors />
      {/* Top Section */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ amount: 0.1, once: true }}
        exit={{ opacity: 0, x: 30 }}
        className="flex max-md:flex-col mb-10 max-sm:mb-5 justify-between"
      >
        <div className="max-sm:mt-5">
          <h1 className="text-2xl max-sm:text-[30px] font-bold mb-1 max-sm:text-center">
            Transaction History
          </h1>
          <p className="max-md:text-sm max-md:mb-5 max-sm:text-center max-sm:text-[18px]">
            View and manage all your transactions
          </p>
        </div>

        <div className="flex gap-2 items-center max-sm:px-5 max-sm:justify-between">
          <span className="rounded-3xl bg-black flex p-3 px-4 gap-2 items-center">
            <SubmitImage size={20} color="#ffffff" />
            <span className="text-white">Export</span>
          </span>
          <div className="flex flex-row gap-1 max-sm:items-center">
            <span className="p-2 aspect-square relative cursor-pointer bg-[#efeef1] flex items-center rounded-full w-14 h-14 max-md:w-12 max-md:h-12 justify-center">
              <NotiImage size={17} />
              <span className="bg-red-500 w-[6px] h-[6px] rounded-full absolute right-1 top-1"></span>
            </span>
            <img src={PersonImage} className="w-14 h-14 rounded-full" alt="" />
          </div>
        </div>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ amount: 0.1, once: true }}
        exit={{ opacity: 0, y: 30 }}
        className="flex flex-col bg-white rounded-2xl p-3 px-5 max-sm:hidden"
      >
        <motion.div className="w-full flex justify-between mb-2 items-center rounded-2xl bg-white p-3">
          <span className="bg-[#f9fafb] p-3 rounded-3xl h-[40px] flex justify-center items-center">
            <SearchImage size={20} color="#727272" />
          </span>
          <div className="bg-[#f9fafb] flex items-center justify-between h-[40px] p-2 w-[200px] rounded-3xl">
            <CalendarImage />
            <DateRangeSelect
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
            <DownImage />
          </div>
          <div className="bg-[#f9fafb] cursor-pointer  h-[40px] flex gap-2 items-center justify-between  rounded-3xl">
            <span
              onClick={() => handleTypeChange("All")}
              className={`flex items-center p-2 h-[40px] rounded-3xl gap-1 ${
                type === "All" && "text-white bg-black"
              }`}
            >
              <span className="pb-2 font-bold">...</span>
              <span>All</span>
            </span>
            <span
              onClick={() => handleTypeChange("Spent")}
              className={`flex items-center p-2 rounded-3xl gap-1 ${
                type === "Spent" && "text-white bg-black"
              }`}
            >
              {type === "Spent" ? (
                <ArrowSingleImage rotate={65} size={15} color="#ffffff" />
              ) : (
                <ArrowSingleImage rotate={65} size={15} />
              )}
              <span>Spent</span>
            </span>
            <span
              onClick={() => handleTypeChange("Received")}
              className={`flex items-center p-2 rounded-3xl gap-1 ${
                type === "Received" && "text-white bg-black"
              }`}
            >
              {type === "Received" ? (
                <ArrowSingleImage size={15} color="#ffffff" />
              ) : (
                <ArrowSingleImage size={15} />
              )}
              <span>Received</span>
            </span>
          </div>
          <div className="bg-[#f9fafb] flex items-center h-[40px] justify-between p-2 w-[200px] rounded-3xl">
            <FilterImage />
            <CategoryDropdown
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
            <DownImage />
          </div>
          <div
            onClick={() => setMoreFilters(!moreFilters)}
            className="bg-white h-[40px] hover:bg-[#eaebec] cursor-pointer transition duration-200 flex items-center justify-between p-4 w-[200px] rounded-3xl"
          >
            <span className="flex gap-2 items-center">
              <Filter2Image size={15} />
              More Filters
            </span>

            <motion.span
              animate={{ rotate: moreFilters ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <DownImage />
            </motion.span>
          </div>
        </motion.div>

        <AnimatePresence>
          {moreFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className={`w-full pt-4 flex justify-between bg-white gap-5 p-3 border-t-[1px] border-gray-200`}
            >
              <div className="w-full flex-1/3">
                <p className=" text-[#485160] mb-2">Amount</p>
                <div className="flex gap-2">
                  <input
                    className="bg-[#f9fafb] flex-1/2 p-2 rounded-3xl focus:outline:none"
                    placeholder="Min Amount"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    type="text"
                    name=""
                    id=""
                  />
                  <input
                    className="bg-[#f9fafb] flex-1/2 p-2 rounded-3xl focus:outline:none"
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
                    activeFilters={activeFilters}
                    setActiveFilters={setActiveFilters}
                  />
                  <DownImage />
                </div>
              </div>
              <div className="flex-1/3 flex flex-col">
                <p className=" text-[#485160] mb-2">Tags</p>
                <div className="bg-[#f9fafb] flex items-center justify-between w-full rounded-3xl">
                  <TagsDropdown
                    activeFilters={activeFilters}
                    setActiveFilters={setActiveFilters}
                  />
                  <DownImage />
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {activeFilters?.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="mt-3 flex gap-3 border-t-[1px] border-gray-200 p-3"
              >
                <p>Active filters:</p>
                <div className="flex gap-2 font-bold text-sm items-center">
                  {activeFilters?.map((filter) => (
                    <span className="bg-[#dbeafe] flex gap-2 items-center text-[#3050b7] px-2 rounded-4xl">
                      {filter}
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          setActiveFilters(
                            activeFilters.filter((item) => {
                              console.log(item[0], filter[0]);
                              // if (filter[0].split(":")[0] === "Type") {
                              //   setType("All");
                              //   return false;
                              // } else if (filter[0].split(":")[0] === "Amount") {
                              //   setMaxAmount("");
                              //   setMinAmount("");
                              //   return false;
                              // }
                              return item[0] !== filter[0];
                            })
                          );
                          console.log(filter[0].split(":")[0]);
                        }}
                      >
                        <CrossImage color="#3050b7" size={12} />
                      </span>
                    </span>
                  ))}
                  <p
                    onClick={() => {
                      setActiveFilters([]);
                      setMinAmount("");
                      setMaxAmount("");
                      setType("All");
                      setShowData(refinedData);
                    }}
                    className="text-gray-600 font-normal font-stretch-90% transition duration-75 text-[15px] hover:scale-105 cursor-pointer hover:bg-gray-100 rounded-4xl px-2"
                  >
                    Clear All
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatePresence>
      </motion.div>

      {/* Transactions Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ amount: 0.1, once: true }}
        exit={{ opacity: 0, y: 30 }}
        className="flex flex-col bg-white rounded-2xl p-3 px-5 mt-5"
      >
        <div className="max-sm:flex max-sm:items-center max-sm:gap-1 max-sm:justify-between">
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.1, once: true }}
            exit={{ opacity: 0, x: 30 }}
            className="font-semibold text-2xl mt-5"
          >
            Transactions ({showData.length})
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ amount: 0.1, once: true }}
            exit={{ opacity: 0, x: 30 }}
            onClick={() => setFilterMenu(!filterMenu)}
            className="font-semibold sm:hidden text-xl mt-5 flex items-center"
          >
            <FilterImage />
          </motion.p>
        </div>
        <div>
          {showData.slice(curr, curr + 10).map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8 }}
              // viewport={{ amount: 0.1, once: true }}
              exit={{ opacity: 0, y: 30 }}
              key={idx}
              className="flex hover:bg-gray-100 hover:shadow-2xl hover:translate-y-1 transition duration-75 justify-between items-center mb-3 p-3 mt-3 rounded-2xl cursor-pointer"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <div className="flex gap-2 items-center">
                  <p className="text-sm text-gray-600">{item.date}</p>
                  <p className="text-sm bg-[#f1f5f9] p-1 rounded-2xl">
                    {item.category}
                  </p>
                </div>
                <div className="flex gap-1">
                  {item.tags && item.tags?.length > 0 && (
                    <p className="font-semibold rounded-xl border-1 p-1 border-gray-200 text-xs mt-1">
                      #vacation2024
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p
                  className={`text-xl tracking-tight ${
                    item.amount > 0 ? "text-green-400" : "text-red-500"
                  }`}
                >
                  {item.amount}$
                </p>
                <p className="text-[#808693]">{item?.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ amount: 0.1, once: true }}
          exit={{ opacity: 0, y: 30 }}
          className="flex justify-between items-center mt-5"
        >
          <p className="text-[#878d98]">
            Showing {curr + 10 > showData.length ? showData.length : curr + 10}{" "}
            of {showData.length} transactions
          </p>
          <div className="flex gap-2 items-center">
            <p
              onClick={() => curr > 0 && setCurr(curr - 10)}
              className={`p-2 rounded-3xl transition duration-100 ${
                curr == 0
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : " cursor-pointer hover:bg-black hover:text-white "
              }`}
            >
              Previous
            </p>

            <div className="flex gap-1">
              {Array.from({ length: showData.length / 10 + 1 }, (_, i) => (
                <span
                  onClick={() => setCurr(i * 10)}
                  className={`w-6 h-6 flex justify-center items-center rounded-full cursor-pointer ${
                    curr / 10 == i
                      ? "bg-black text-white"
                      : "text-black hover:bg-gray-100"
                  }`}
                  key={i}
                >
                  {i}
                </span>
              ))}
            </div>

            <p
              onClick={() => setCurr(curr + 10)}
              className={`p-2 rounded-3xl transition duration-100 ${
                curr >= showData.length - 1
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : " cursor-pointer hover:bg-black hover:text-white "
              }`}
            >
              Next
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Marketplace;
