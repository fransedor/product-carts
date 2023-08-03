import { TableColumnInterface } from "@/app/utils/types";
import React from "react";
import { FaEye, FaPlusCircle } from "react-icons/fa";

interface TableBodyProps<T extends Record<string, unknown>> {
  cols: TableColumnInterface[];
  data: T[];
  action: "product" | "cart";
}
const TableBody: <T extends Record<string, unknown>>(
  props: TableBodyProps<T>
) => React.ReactElement = ({ cols, data, action }) => {
  return (
    <tbody>
      {data.map((rowData, index) => (
        <tr className="border-b bg-neutral-100 " key={rowData.id as string}>
          <td className="whitespace-nowrap px-6 py-4 font-medium">{rowData.id as string}</td>
          {cols.map((columnDef) => (
            <td className="whitespace-nowrap px-6 py-4" key={`${rowData.id}-${columnDef.accessor}`}>
              {rowData[columnDef.accessor] as string}
            </td>
          ))}
					<td className="whitespace-nowrap px-6 py-4 font-medium">{action === "product" ? <FaPlusCircle /> : <FaEye />}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
