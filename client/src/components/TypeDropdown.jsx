import { Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";

import CalendarImage from "../images/CalendarImage";
import TickImage from "../images/TickImage";

const options = ["All", "Interest", "Service Charge", "Check"];

export default function TypeDropdown({
  activeFilters,
  setActiveFilters,
  detail,
  setDetail,
}) {
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    if (setDetail) setDetail(selected);
    if (selected != options[0]) {
      setActiveFilters((prev) => {
        const newPrev = prev.filter((item) => !item[0].startsWith("Detail:"));
        return [...newPrev, ["Detail:", selected]];
      });
    }
  }, [selected]);

  useEffect(() => {
    const isType = activeFilters.filter((item) => {
      return item[0]?.startsWith("Detail:");
    });
    if (isType.length == 0) setSelected(options[0]);
  }, [activeFilters]);

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className={`relative `}>
            <Listbox.Button className="p-2 rounded-3xl flex items-center w-full cursor-pointer">
              {selected}
            </Listbox.Button>
            <Listbox.Options className="absolute w-[175px] right-10 top-12 bg-white shadow rounded-3xl mt-1">
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  value={option}
                  className="hover:bg-gray-100 p-2 cursor-pointer flex gap-2 rounded-3xl"
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
