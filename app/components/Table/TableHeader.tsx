import { TableColumnInterface } from "@/app/utils/constants/types";
import React from "react";

interface TableHeaderProps {
  cols: TableColumnInterface[];
}
const TableHeader: React.FC<TableHeaderProps> = ({ cols }) => {
  return (
    <thead className="border-b bg-green-300 font-medium">
      <tr>
        <th scope="col" className="px-6 py-4">
          No.
        </th>
        {cols.map((column) => (
          <th scope="col" className="px-6 py-4" key={column.label}>
            {column.label}
          </th>
        ))}
        <th scope="col" className="px-6 py-4">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
