import { TableColumnInterface } from "@/app/utils/types";
import React from "react";

interface TableHeaderProps {
  cols: TableColumnInterface[];
  hasAction?: boolean;
}
const TableHeader: React.FC<TableHeaderProps> = ({ cols, hasAction }) => {
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
				{hasAction && (
        <th scope="col" className="px-6 py-4">
          Actions
        </th>
				)}
      </tr>
    </thead>
  );
};

export default TableHeader;
