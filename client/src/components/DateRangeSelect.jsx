import { Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";

import CalendarImage from "../images/CalendarImage";
import TickImage from "../images/TickImage";

const options = [
  "All Time",
  "This Month",
  "Last Month",
  "Last 90 Days",
  "This Year",
];

export default function DateRangeSelect({
  activeFilters,
  setActiveFilters,
  date,
  setDate,
}) {
  const [selected, setSelected] = useState(date ? date : options[0]);
  const [activeDate, setActiveDate] = useState();

  useEffect(() => {
    if (activeDate) {
      console.log("ACTIVE DATE USE EFFECT");
      activeFilters?.length > 0 &&
        setActiveFilters(
          activeFilters?.filter((item) => {
            return !item[0]?.startsWith("Date:");
          })
        );

      setActiveFilters((p) => [...p, activeDate]);
    }
  }, [activeDate]);

  useEffect(() => {
    const isActiveDate = activeFilters?.filter((item) => {
      return item[0]?.startsWith("Date:");
    });
    // console.log(isActiveDate);
    if (isActiveDate?.length == 0) {
      setSelected("All Time");
    }
  }, [activeFilters]);

  useEffect(() => {
    if (setDate) setDate(selected);
    if (date) console.log("Date is: " + date);
  }, [selected, date]);

  return (
    <div className="w-full z-50">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className={`relative`}>
            <Listbox.Button className="p-2 rounded-3xl flex items-center w-full cursor-pointer">
              {date ? date : selected}
            </Listbox.Button>
            <Listbox.Options className="absolute w-[150px] -right-10 top-12 bg-white shadow rounded-3xl mt-1">
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  value={option}
                  className="hover:bg-gray-100 p-2 cursor-pointer flex gap-2 rounded-3xl"
                  onClick={() => option !== setActiveDate(["Date: " + option])}
                >
                  {selected == option && <TickImage className="w-6 h-6" />}
                  <p className={`w-full ${selected == option ? "" : "ml-6"}`}>
                    {option}
                  </p>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
    </div>
  );
}
