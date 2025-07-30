import React, { useEffect, useState } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { motion } from "motion/react";
import axios from "axios";

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
import AirBnb from "../images/AirBnb";

import GradientText from "../templates/GradientText";
import BarGraph from "./BarGraph";
import CalendarDataView from "./CalendarDataView";
import GradientComponent from "./GradientComponent";
import UploadModal from "./UploadModal";
import AnimateLoading from "./AnimateLoading";
import Marketplace from "./Marketplace";

import {
  calculateBiggest,
  calculateDayFromDate,
  calculateLatest,
  calculateRatio,
  calculateReceive,
  calculateSpend,
} from "../utils/totalSpend";
import AnimateNumber from "./AnimateNumber";

const data = [
  { title: "Goals", image: <TargetImage color="#ffffff" /> },
  { title: "Upload", image: <SubmitImage color="#ffffff" /> },
  { title: "Analytics", image: <ChartImage color="#ffffff" /> },
  { title: "Budget", image: <RupeeImage color="#ffffff" /> },
];

const Home = () => {
  const [curr, setCurr] = useState("Home");
  const [open, setOpen] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [stat, setStat] = useState("Weekly");
  const [layout, setLayout] = useState("Bar");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [confirm, setConfirm] = useState(false);
  const [start, setStart] = useState(0);

  const [totalSpend, setTotalSpend] = useState(0);
  const [totalReceive, setTotalReceive] = useState(0);
  const [ratio, setRatio] = useState(0);
  const [latestData, setLatestData] = useState();
  const [biggestData, setBiggestData] = useState();
  const [dayData, setDayData] = useState();
  const [refinedData, setRefinedData] = useState([
    {
      name: "POS PURCHASE",
      amount: -4.23,
      date: "2023-10-02",
      type: "debit",
      category: "POS Purchase",
    },
    {
      name: "PREAUTHORIZED CREDIT",
      amount: 763.01,
      date: "2023-10-03",
      type: "credit",
      category: "Credit",
    },
    {
      name: "POS PURCHASE",
      amount: -11.68,
      date: "2023-10-04",
      type: "debit",
      category: "POS Purchase",
    },
    {
      name: "CHECK 1234",
      amount: -9.98,
      date: "2023-10-05",
      type: "debit",
      category: "Check",
    },
    {
      name: "POS PURCHASE",
      amount: -25.5,
      date: "2023-10-05",
      type: "debit",
      category: "POS Purchase",
    },
    {
      name: "POS PURCHASE",
      amount: -59.08,
      date: "2023-10-08",
      type: "debit",
      category: "POS Purchase",
    },
    {
      name: "CHECK 1236",
      amount: -69,
      date: "2023-10-12",
      type: "debit",
      category: "Check",
    },
    {
      name: "CHECK 1237",
      amount: -180.63,
      date: "2023-10-14",
      type: "debit",
      category: "Check",
    },
    {
      name: "POS PURCHASE",
      amount: -18.96,
      date: "2023-10-14",
      type: "debit",
      category: "POS Purchase",
    },
    {
      name: "PREAUTHORIZED CREDIT",
      amount: 1216.92,
      date: "2023-10-16",
      type: "credit",
      category: "Credit",
    },
    {
      name: "ATM WITHDRAWAL",
      amount: -140,
      date: "2023-10-22",
      type: "debit",
      category: "ATM Withdrawal",
    },
    {
      name: "CHECK 1238",
      amount: -91.06,
      date: "2023-10-28",
      type: "debit",
      category: "Check",
    },
    {
      name: "CHECK 1239",
      amount: -451.2,
      date: "2023-10-30",
      type: "debit",
      category: "Check",
    },
    {
      name: "CHECK 1246",
      amount: -37.07,
      date: "2023-10-30",
      type: "debit",
      category: "Check",
    },
    {
      name: "POS PURCHASE",
      amount: -18.67,
      date: "2023-10-30",
      type: "debit",
      category: "POS Purchase",
    },
    {
      name: "CHECK 1247",
      amount: -100,
      date: "2023-10-31",
      type: "debit",
      category: "Check",
    },
    {
      name: "CHECK 1248",
      amount: -78.24,
      date: "2023-10-31",
      type: "debit",
      category: "Check",
    },
    {
      name: "PREAUTHORIZED CREDIT",
      amount: 650.68,
      date: "2023-10-31",
      type: "credit",
      category: "Credit",
    },
    {
      name: "CHECK 1249",
      amount: -52.23,
      date: "2023-11-02",
      type: "debit",
      category: "Check",
    },
    {
      name: "INTEREST CREDIT",
      amount: 0.26,
      date: "2023-11-09",
      type: "credit",
      category: "Interest",
    },
    {
      name: "SERVICE CHARGE",
      amount: -12,
      date: "2023-11-09",
      type: "debit",
      category: "Service Charge",
    },
  ]);
  const transactions = [
    {
      company: "Airbnb",
      date: "July 10, 2024",
      amount: "$967.40",
      time: "4:31 PM",
      icon: <AirBnb />,
    },
    {
      company: "Apple",
      date: "July 7, 2024",
      amount: "$1200",
      time: "7:55 PM",
      icon: <AirBnb />,
    },
    {
      company: "Cab",
      date: "July 13, 2024",
      amount: "$200",
      time: "9:30 PM",
      icon: <AirBnb />,
    },
  ];
  const width = useWindowWidth();

  useEffect(() => {
    setTotalSpend(calculateSpend(refinedData));
    setTotalReceive(calculateReceive(refinedData));
    setRatio(calculateRatio(refinedData));
    setLatestData(calculateLatest(refinedData));
    setBiggestData(calculateBiggest(refinedData));
    setDayData(
      refinedData.map((item) => ({
        ...item,
        day: calculateDayFromDate(item.date),
      }))
    );
  }, [refinedData]);

  useEffect(() => {
    if (width > 768) setOpen(false);
  }, [width]);

  useEffect(() => {
    // Hide scrollbar when the modal is open
    if (openUpload) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset the style when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openUpload]);

  useEffect(() => {
    console.log(layout);
  }, [layout]);

  return (
    <div className="relative w-full bg-white overflow-hidden">
      {/* Gradient generated by perplexity */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(173,216,255,0.3)_0%,_transparent_70%)] blur-2xl z-0"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(173,216,255,0.15)_0%,_transparent_80%)] blur-2xl z-0"
        aria-hidden="true"
      />

      {openUpload && (
        <>
          <div
            onClick={() => setOpenUpload(!openUpload)}
            className="fixed inset-0 bg-black/80 z-40"
          />
        </>
      )}
      <div className="flex w-full justify-center">
        <UploadModal
          open={openUpload}
          setOpen={setOpenUpload}
          file={file}
          setFile={setFile}
          fileName={fileName}
          setFileName={setFileName}
          confirm={confirm}
          setConfirm={setConfirm}
          refinedData={refinedData}
          setRefinedData={setRefinedData}
        />
      </div>

      {/* Content */}
      <div id="home" className={`relative z-10 `}>
        <div className="w-full flex justify-center"></div>
        <div className="p-2 flex w-full overflow-x-visible overflow-y-scroll scrollbar-hide min-h-[100vh] flex-row max-md:flex-col">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 2 }}
            viewport={{ amount: 0.1, once: true }}
            exit={{ opacity: 0, x: -30 }}
            className="bg-gradient-to-br h-[640px] from-[#96b6f5] via-[#b1c6f9] to-[#dfe8fe]  relative max-md:flex max-md:justify-between max-md:items-center max-md:w-full max-sm:h-[75px] max-md:h-[150px] w-[200px] flex-none rounded-3xl p-5"
          >
            <div className="flex items-center">
              <span>
                <img
                  src={LogoImage}
                  className="w-32 h-32 max-sm:w-24 max-sm:h-24 max-sm:-ml-6 md:-ml-10 md:-mt-4"
                  alt=""
                />
              </span>

              <span className="md:hidden text-sm font-semibold -ml-10">
                <GradientText
                  colors={[
                    "#8fcbf8", // deep blue
                    "#6a7fd6", // steel lavender
                    "#3767ed", // medium muted purple
                    "#6a7fd6",
                    "#8fcbf8",
                  ]}
                  animationSpeed={4.9}
                  showBorder={false}
                  className="custom-class"
                >
                  Finally feel in control of your money
                </GradientText>
              </span>
            </div>

            <span
              onClick={() => setOpen(!open)}
              className="md:hidden mr-1 cursor-pointer"
            >
              <BarImage />
            </span>

            <motion.div className={`flex flex-col gap-5 mt-10 max-md:hidden`}>
              {/* Home */}
              <div
                className={`${
                  curr === "Home"
                    ? "bg-black text-white flex cursor-pointer items-center p-3 gap-3 rounded-3xl"
                    : "flex items-center p-3 gap-3 cursor-pointer"
                }`}
                onClick={() => setCurr("Home")}
              >
                <span>
                  <HomeImage
                    size={35}
                    color={curr === "Home" ? "#ffffff" : "#000000"}
                  />
                </span>
                <span>Home</span>
              </div>

              {/* Wallet */}
              <div
                className={`${
                  curr === "Wallet"
                    ? "bg-black text-white flex cursor-pointer items-center p-3 gap-3 rounded-3xl"
                    : "flex items-center p-3 gap-3 cursor-pointer"
                }`}
                onClick={() => setCurr("Wallet")}
              >
                <span>
                  <WalletImage
                    size={35}
                    color={curr === "Wallet" ? "#ffffff" : "#000000"}
                  />
                </span>
                <span>Wallet</span>
              </div>

              {/* Marketplace */}
              <div
                className={`${
                  curr === "Marketplace"
                    ? "bg-black text-white flex cursor-pointer items-center p-3 gap-3 rounded-3xl"
                    : "flex items-center p-3 gap-3 cursor-pointer"
                }`}
                onClick={() => setCurr("Marketplace")}
              >
                <span>
                  <MarketImage
                    size={35}
                    color={curr === "Marketplace" ? "#ffffff" : "#000000"}
                  />
                </span>
                <span>Marketplace</span>
              </div>

              {/* Transfer */}
              <div
                className={`${
                  curr === "Transfer"
                    ? "bg-black text-white flex cursor-pointer items-center p-3 gap-3 rounded-3xl"
                    : "flex items-center p-3 gap-3 cursor-pointer"
                }`}
                onClick={() => setCurr("Transfer")}
              >
                <span>
                  <ArrowImage
                    size={35}
                    color={curr === "Transfer" ? "#ffffff" : "#000000"}
                  />
                </span>
                <span>Transfer</span>
              </div>

              {/* Settings */}
              <div
                className={`${
                  curr === "Settings"
                    ? "bg-black text-white flex cursor-pointer items-center p-3 gap-3 rounded-3xl"
                    : "flex items-center p-3 gap-3 cursor-pointer"
                }`}
                onClick={() => setCurr("Settings")}
              >
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                >
                  <SettingsImage
                    size={35}
                    color={curr === "Settings" ? "#ffffff" : "#000000"}
                  />
                </motion.span>
                <span>Settings</span>
              </div>
            </motion.div>

            <AnimateSidebar open={open} curr={curr} setCurr={setCurr} />
          </motion.div>

          {curr === "Home" && (
            <div className="w-full mt-5 px-5">
              {/* Top Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 2 }}
                viewport={{ amount: 0.1, once: true }}
                exit={{ opacity: 0, x: 30 }}
                className="flex max-md:flex-col justify-between"
              >
                <div>
                  <h1 className="text-2xl max-sm:text-[24px] font-bold mb-3 max-sm:text-center">
                    Hello, John!
                  </h1>
                  <p className="max-md:text-sm max-md:mb-5 max-sm:text-center max-sm:14px max-sm:mb-10">
                    From CSV to clarity — see where your money goes.
                  </p>
                </div>

                <div className="flex gap-2 items-center ">
                  <span className="rounded-3xl md:h-[60px] max-md:w-full md:w-[350px] focus-within:border-gray-400 focus-within:border-1 bg-[#efeef1] flex p-3 gap-2 items-center">
                    <SearchImage size={25} color="#000000" />
                    <input
                      type="text"
                      className="focus:outline-none text-sm h-full w-full"
                      placeholder="Search something"
                    />
                  </span>
                  <span className="p-2 aspect-square relative cursor-pointer bg-[#efeef1] flex items-center rounded-full w-14 h-14 max-md:w-12 max-md:h-12 justify-center">
                    <NotiImage size={17} />
                    <span className="bg-red-500 w-[6px] h-[6px] rounded-full absolute right-1 top-1"></span>
                  </span>
                  <img
                    src={PersonImage}
                    className="w-14 h-14 rounded-full"
                    alt=""
                  />
                </div>
              </motion.div>

              {/* Body Section */}
              <div className="relative mt-5">
                {confirm && (
                  <>
                    <AnimateLoading />
                  </>
                )}
                {/* First Row */}
                <div className="flex max-sm:mt-5 max-sm:overflow-x-auto max-sm:scrollbar-hide w-full md:max-w-[calc(100vw-280px)]">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 2 }}
                    viewport={{ amount: 0.1, once: true }}
                    exit={{ opacity: 0, x: 30 }}
                    className="bg-[#b4c8ff] flex-shrink-0 md:min-w-[400px] max-sm:ml-2 w-[250px] items-center p-5 flex flex-col rounded-3xl"
                  >
                    <p className="text-center mb-2">Spend Ratio</p>
                    <h1 className="text-5xl max-sm:hidden font-semibold">
                      {ratio}%
                    </h1>
                    <span className="w-full block mt-2 mb-3 h-2 rounded-lg bg-white">
                      <span
                        className="h-2 block rounded-lg bg-black"
                        style={{ width: `${ratio}%` }}
                      ></span>
                    </span>
                    <p className="max-sm:text-sm max-sm:mt-2 max-sm:text-center">
                      <span className="max-sm:text-[20px] font-bold">
                        Money Spent: ${totalSpend}
                      </span>{" "}
                      <br />
                      <span className="max-sm:text-[20px] font-bold">
                        Money Received: ${totalReceive}
                      </span>{" "}
                    </p>

                    <div className="grid grid-rows-1 mt-5 grid-cols-4 gap-2 max-sm:gap-4 max-sm:grid-cols-4 max-md:grid-cols-2">
                      {data.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col justify-center items-center"
                        >
                          <span
                            onClick={() => {
                              item.title === "Upload" &&
                                setOpenUpload(!openUpload);
                            }}
                            className="bg-black cursor-pointer rounded-full flex max-sm:w-8 max-sm:h-8 w-12 h-12 justify-center items-center"
                          >
                            {item.image}
                          </span>
                          <p className="text-sm max-sm:text-[12px]">
                            {item.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <div className="flex gap-5 ml-10 sm:overflow-x-auto scrollbar-hide">
                    {latestData &&
                      latestData.slice(0, start + 5).map((item, idx) => {
                        return (
                          <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 2 }}
                            viewport={{ amount: 0.1, once: true }}
                            className={`${
                              idx % 2 == 0 ? "bg-[#efeef1]" : "bg-[#b4c8ff]"
                            } flex-shrink-0 max-sm:w-[200px] w-[260px] rounded-4xl p-5`}
                          >
                            <div className="flex mb-14 items-center justify-between">
                              <p className="font-bold text-xl max-sm:text-lg hover:line-clamp-2 line-clamp-1">
                                {item.name}
                              </p>
                            </div>
                            <div className="mb-5">
                              <p className="max-sm:text-sm font-bold">
                                {item.type.toLocaleUpperCase()}
                              </p>
                              <p className="font-semibold text-2xl max-sm:text-lg">
                                {item.amount}$
                              </p>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="font-semibold max-sm:text-sm">
                                {item.category}
                              </p>
                              <p className="text-sm font-semibold max-sm:text-xs">
                                {item.date}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    {start + 5 <= latestData?.length && (
                      <motion.span
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 2 }}
                        viewport={{ amount: 0.1, once: true }}
                        className="flex items-center flex-shrink-0 w-[100px] "
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="flex gap-2 items-center cursor-pointer"
                          onClick={() => setStart(start + 5)}
                        >
                          See More
                          <ArrowSingleImage rotate={45} />
                        </motion.button>
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Second Row */}
                <div className="flex max-md:flex-col sm:mt-10">
                  {/* First Column */}
                  <motion.div
                    viewport={{ amount: 0.1, once: true }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 2 }}
                    className="sm:mr-[50px] pt-2 max-sm:mb-10 max-sm:mt-5"
                  >
                    <h1 className="font-bold max-sm:hidden text-2xl max-sm:text-lg sm:mb-3">
                      Personalized Tips
                    </h1>
                    <div className="bg-[#efeef1] max-sm:hidden max-md:w-full p-5 rounded-2xl flex-shrink-0 md:min-w-[400px] w-[200px]">
                      <GradientText
                        colors={[
                          "#476fcf", // deep blue
                          "#6a7fd6", // steel lavender
                          "#b4c8ff", // medium muted purple
                          "#6a7fd6",
                          "#476fcf",
                        ]}
                        animationSpeed={5}
                        showBorder={false}
                        className="custom-class"
                      >
                        ✨Consider moving your $200 surplus this month to
                        Savings✨
                      </GradientText>
                    </div>

                    <h1 className="font-bold text-2xl sm:mt-5 max-sm:text-lg max-sm:text-center mb-1">
                      Top 3 Transactions
                    </h1>
                    <div className="w-full mt-5">
                      {biggestData?.slice(0, 3).map((item, idx) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ amount: 0.1, once: true }}
                          transition={{ duration: 2 }}
                          key={idx}
                          className={`p-5 ${
                            idx % 2 == 0 ? "bg-[#efeef1]" : "bg-[#b4c8ff]"
                          } rounded-4xl mb-2 flex items-center gap-3 max-sm:w-full`}
                        >
                          {/* <span className="w-12 h-12 rounded-full aspect-square flex items-center justify-center bg-white">
                          {item.icon}
                        </span> */}
                          <div className="w-full flex justify-between">
                            <div className="flex flex-col gap-1">
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-gray-400">{item.date}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="font-semibold">{item.amount}</p>
                              <p className="text-gray-400">{item.date}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-md max-sm:text-center mt-5">
                      <span className="font-semibold">Note:</span> Check
                      marketplace for in depth analysis!
                    </p>
                  </motion.div>
                  {/* Second Column */}
                  <div className="w-full">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1 }}
                      viewport={{ amount: 0.1, once: true }}
                      className="w-full max-sm:gap-2 max-sm:mb-5 flex justify-between items-center mb-3"
                    >
                      <h1 className="font-bold mr-1 text-2xl max-sm:text-lg">
                        Statistics
                      </h1>
                      <div className="flex gap-2">
                        <div className="gap-2 cursor-pointer flex items-center rounded-4xl bg-[#f0f0f0]">
                          <div
                            onClick={() => setStat("Weekly")}
                            className={`${
                              stat === "Weekly"
                                ? "bg-black py-2 px-5 max-sm:py-2 max-sm:px-3 text-white rounded-4xl"
                                : "py-2 px-5 max-sm:py-2 max-sm:px-2"
                            }`}
                          >
                            Weekly
                          </div>
                          <div
                            onClick={() => setStat("Monthly")}
                            className={`${
                              stat === "Monthly"
                                ? "bg-black py-2 px-5 max-sm:py-2 max-sm:px-3 text-white rounded-4xl"
                                : "py-2 px-5 max-sm:py-2 max-sm:px-2"
                            }`}
                          >
                            Monthly
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <span
                            onClick={() => setLayout("Bar")}
                            className={`${
                              layout === "Bar"
                                ? "bg-black text-white cursor-pointer"
                                : "bg-[#efeef1] cursor-pointer"
                            } w-12 h-12 max-sm:w-10 max-sm:h-10 rounded-full aspect-square flex items-center justify-center `}
                          >
                            {layout === "Bar" ? (
                              <ChartImage color="#ffffff" />
                            ) : (
                              <ChartImage />
                            )}
                          </span>
                          <span
                            onClick={() => setLayout("Calendar")}
                            className={`${
                              layout === "Calendar"
                                ? "bg-black text-white cursor-pointer"
                                : "bg-[#efeef1] cursor-pointer"
                            } w-12 h-12 max-sm:w-10 max-sm:h-10 rounded-full aspect-square flex items-center justify-center`}
                          >
                            {layout === "Calendar" ? (
                              <CalendarImage color="#ffffff" />
                            ) : (
                              <CalendarImage />
                            )}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 2 }}
                      viewport={{ amount: 0.1, once: true }}
                      className="bg-[#ddecfa] sm:min-h-[350px] rounded-2xl w-full max-sm:p-2 max-md:max-w-[500px] mx-auto"
                    >
                      <div className="flex w-full justify-between p-2">
                        <span className="w-12 h-12 rounded-full flex justify-center items-center border-1 border-[#d6d6d7]">
                          <GraphImage />
                        </span>
                        <span className="flex border-1 px-3 rounded-4xl border-[#d6d6d7] items-center gap-2 p-2">
                          Details
                          <ArrowSingleImage />
                        </span>
                      </div>
                      <h1 className="text-4xl pl-4 pt-5 mb-3 font-bold">
                        Net:{" "}
                        <AnimateNumber
                          num={(totalReceive - totalSpend).toFixed(2)}
                        />
                      </h1>
                      <div className="w-full flex justify-center">
                        {layout === "Calendar" ? (
                          <div>
                            <p className="pl-4 font-bold">
                              Last 7 transactions-
                            </p>
                            <CalendarDataView dayData={dayData} />
                          </div>
                        ) : (
                          <BarGraph dayData={dayData} daysToShow={14} />
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ amount: 0.1, once: true }}
                      transition={{ duration: 2 }}
                      className="w-full flex mt-5 justify-between gap-2"
                    >
                      <div className="w-1/2 p-5 bg-[#ebf3fa] rounded-2xl">
                        <p>Income</p>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="bg-black flex items-center justify-center w-8 h-8 rounded-full">
                            <ArrowSingleImage color="#ffffff" rotate={75} />
                          </span>
                          <p>${totalReceive}</p>
                        </div>
                      </div>
                      <div className="w-1/2 p-5 bg-[#ebf3fa] rounded-2xl">
                        <p>Expenses</p>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="bg-[#d6e1fd] flex items-center justify-center w-8 h-8 rounded-full">
                            <ArrowSingleImage />
                          </span>
                          <p>${totalSpend}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {curr === "Marketplace" && <Marketplace refinedData={refinedData} />}
        </div>
      </div>

      {/* <GradientComponent /> */}
    </div>
  );
};

export default Home;
