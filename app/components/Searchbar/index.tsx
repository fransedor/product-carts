"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ButtonHTMLAttributes, useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (props) => {
	const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", searchValue);
    params.set("page", "1");
    router.push(pathname + "?" + params.toString());
  }, [router, searchParams, pathname, searchValue]);

  const handleClickEnter = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleSearch();
      }
    },
    [handleSearch]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleClickEnter);
    return () => {
      document.removeEventListener("keydown", handleClickEnter);
    };
  }, [handleClickEnter]);
  return (
    <div className="rounded-lg py-2 px-4 border border-gray-300 flex items-center gap-2">
      <FaSearch />
      <input
        type="text"
				value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="outline-none"
        placeholder={props.placeholder}
      />
      <button className="py-1 px-2 bg-green-300 rounded-lg">Search</button>
    </div>
  );
};

export default Searchbar;
