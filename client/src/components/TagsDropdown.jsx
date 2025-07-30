import { Listbox } from "@headlessui/react";
import { act, useEffect, useState } from "react";

const options = [
  "#vacation2024",
  "#business",
  "#subscription",
  "#entertainment",
  "#commute",
  "#coffee",
  "#household",
  "#salary",
  "#groceries",
  "#fuel",
];

// A checkmark icon component for the selected state
function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="w-4 h-4 text-white rounded-full"
    >
      <path d="M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0Z" />
    </svg>
  );
}

export default function TagsDropdown({ activeFilters, setActiveFilters }) {
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    // Determine what the tags string should be based on local state
    const localTagsString =
      selectedTags.length > 0 ? "tags:" + selectedTags.join(",") : "";

    // Find the current tags string in the parent state
    const parentTagsString =
      activeFilters.find((item) => item[0]?.startsWith("tags:"))?.[0] || "";

    // **THE FIX**: Only update the parent if its state is actually different.
    if (localTagsString !== parentTagsString) {
      if (selectedTags.length > 0) {
        setActiveFilters((prev) => {
          const newPrev = prev.filter((item) => !item[0].startsWith("tags:"));
          return [...newPrev, ["tags:" + selectedTags]];
        });
      } else {
        setActiveFilters((prev) => {
          const newPrev = prev.filter((item) => !item[0].startsWith("tags:"));
          return [...newPrev];
        });
      }
    }
  }, [selectedTags, activeFilters, setActiveFilters]);

  useEffect(() => {
    if (selectedTags.length > 0) {
      const isTags = activeFilters?.filter((item) =>
        item[0]?.startsWith("tags:")
      );
      if (isTags.length === 0 && selectedTags.length > 0) {
        setSelectedTags([]);
      }
    }
  }, [activeFilters]);

  const buttonText =
    selectedTags.length === 0 ? "Select Tags" : `${selectedTags.length} Tags`;

  return (
    <div className="w-60">
      {/* 3. Add the `multiple` prop and update value/onChange */}
      <Listbox value={selectedTags} onChange={setSelectedTags} multiple>
        <div className="relative">
          <Listbox.Button className="p-2 rounded-full flex items-center w-full cursor-pointer justify-between text-left">
            <span>{buttonText}</span>
            {/* You can add an icon here for better UX */}
          </Listbox.Button>

          <Listbox.Options className="absolute border-1 border-gray-200 z-10 mt-2 w-[240px] -right-4 bg-white shadow-lg rounded-xl p-3 focus:outline-none">
            <p className="font-bold p-2 text-gray-900">Select Tags</p>
            {options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className={({ active }) =>
                  `flex items-center p-1 cursor-pointer rounded-lg transition-colors ${
                    active ? "bg-gray-100" : "bg-white"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`w-5 h-5 mr-3 flex items-center justify-center border rounded-full transition-colors ${
                        selected
                          ? "border-black bg-black"
                          : "border-gray-400 bg-white"
                      }`}
                    >
                      {selected && <CheckIcon />}
                    </span>
                    <span
                      className={`flex-1 text-sm ${
                        selected ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {option}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
