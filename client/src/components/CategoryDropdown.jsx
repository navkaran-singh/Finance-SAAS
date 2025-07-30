import { Listbox } from "@headlessui/react";

const options = [
  "Income",
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Travel",
  "Technology",
  "Uncategorized",
];

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

export default function CategoryDropdown({ activeFilters, setActiveFilters }) {
  // Derive selected categories directly from the 'activeFilters' prop on every render
  const categoryFilter = activeFilters.find((item) =>
    item[0]?.startsWith("Categories:")
  );

  const selectedCategories = categoryFilter
    ? categoryFilter[0]
        .replace("Categories: ", "")
        .split(",")
        .map((c) => c.trim())
    : [];

  const handleCategoryChange = (newlySelected) => {
    setActiveFilters((prev) => {
      // 1. Remove the old "Categories" filter
      const otherFilters = prev.filter(
        (item) => !item[0]?.startsWith("Categories:")
      );

      // 2. If new categories are selected, add the updated filter back in
      if (newlySelected.length > 0) {
        return [...otherFilters, [`Categories: ${newlySelected.join(",")}`]];
      }

      // 3. Otherwise, just return the remaining filters
      return otherFilters;
    });
  };

  const buttonText =
    selectedCategories.length === 0
      ? "All Categories"
      : `${selectedCategories.length} Selected`;

  return (
    <div className="w-60">
      <Listbox
        value={selectedCategories}
        onChange={handleCategoryChange}
        multiple
      >
        <div className="relative">
          <Listbox.Button className="p-2 rounded-full flex items-center w-full cursor-pointer justify-between text-left">
            <span>{buttonText}</span>
          </Listbox.Button>

          <Listbox.Options className="absolute z-10 mt-2 w-[240px] right-0 bg-white shadow-lg rounded-xl p-3 focus:outline-none">
            <p className="font-bold p-2 text-gray-900">Select Categories</p>
            {options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className={({ active }) =>
                  `flex items-center p-2 cursor-pointer rounded-lg transition-colors ${
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
                      className={`flex-1 ${
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
