"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
}
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPage }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handlePreviousPage = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(currentPage - 1));
    router.push(pathname + "?" + params.toString());
  };

  const handleNextPage = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(currentPage + 1));
    router.push(pathname + "?" + params.toString());
  };
  return (
    <div className="flex items-center gap-4 my-8">
      <FaChevronLeft
        onClick={handlePreviousPage}
        className={`${currentPage === 1 ? "invisible" : "visible"} hover:cursor-pointer`}
      />
      <p>
        Page {currentPage}/{totalPage}
      </p>
      <FaChevronRight
        onClick={handleNextPage}
        className={`${currentPage === totalPage ? "invisible" : "visible"} hover:cursor-pointer`}
      />
    </div>
  );
};

export default Pagination;
