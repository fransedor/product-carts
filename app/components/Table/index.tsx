import { TableColumnInterface } from "@/app/utils/constants/types";
import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

interface TableProps<T extends { id: number }> {
  cols: TableColumnInterface[];
  data: T[];
  action: "product" | "cart";
}

function Table<T extends { id: number }>({ cols, data, action }: TableProps<T>) {
  return (
    <div className="overflow-x-scroll">
      <table className="min-w-full text-left text-sm font-light">
        <TableHeader cols={cols} />
        <TableBody cols={cols} data={data} action={action} />
      </table>
    </div>
  );
}

export default Table;
