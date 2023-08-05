import { TableColumnInterface } from "@/app/utils/types";
import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

interface TableProps<T extends { id: number }> {
  cols: TableColumnInterface[];
  data: T[];
  renderAction?: (rowData: T) => React.ReactNode;
}

function Table<T extends { id: number }>({ cols, data, renderAction }: TableProps<T>) {
  return (
    <div className="overflow-x-scroll">
      <table className="min-w-full text-left text-sm font-light">
        <TableHeader cols={cols} hasAction={Boolean(renderAction)} />
        <TableBody cols={cols} data={data} renderAction={renderAction} />
      </table>
    </div>
  );
}

export default Table;
