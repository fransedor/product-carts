"use client";

import useClickOutside from "@/app/utils/hooks/useClickOutside";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface FilterButtonProps {
  icon: React.ReactNode;
  filterBy: "category" | "brand" | "price";
  filterOptions: string[];
}
const FilterButton: React.FC<FilterButtonProps> = ({ icon, filterBy, filterOptions }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useClickOutside(ref, () => setOpenDropdown(false));
  return (
    <div ref={ref} className="relative my-8">
      <button
        className="flex items-center rounded-lg relative z-0 py-2 px-4 gap-2 border border-gray-300 shadow-md "
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        {icon}
        <p className="capitalize">{filterBy}</p>
      </button>
      {openDropdown && (
        <div  className="absolute top-12 left-0 flex flex-col bg-white rounded-lg border-gray-300 shadow-md z-10 max-h-96 overflow-y-scroll">
          {filterOptions.map((filterValue) => (
            <FilterOption filterBy={filterBy} value={filterValue} key={filterValue} />
          ))}
        </div>
      )}
    </div>
  );
};

interface FilterOptionsProps {
  filterBy: "category" | "brand" | "price";
  value: string;
}
const FilterOption: React.FC<FilterOptionsProps> = ({ filterBy, value }) => {
  const searchParams = useSearchParams();
  const [isChecked, setIsChecked] = useState(searchParams.getAll(filterBy).includes(value));
  const router = useRouter();
  const pathname = usePathname();

  const handleClickOption = () => {
    const params = new URLSearchParams(searchParams.toString());
    const currentFilterParams = searchParams.getAll(filterBy);
    // Remove current option from searchParams
    if (currentFilterParams.includes(value)) {
      params.delete(filterBy);
      currentFilterParams.forEach((currentFilterParamsValue) => {
        if (currentFilterParamsValue !== value) {
          params.append(filterBy, currentFilterParamsValue);
        }
      });
    } else {
      params.append(filterBy, value);
    }
		params.set("page", "1");
    router.push(pathname + "?" + params.toString());
  };

  useEffect(() => {
    setIsChecked(searchParams.getAll(filterBy).includes(value));
  }, [searchParams, filterBy, value]);
  return (
    <button className="flex py-2 px-4 gap-2 items-center" onClick={handleClickOption}>
      <input type="checkbox" checked={isChecked} readOnly />
      <p className="py-2 px-4 text-start">{value}</p>
    </button>
  );
};

export default FilterButton;
