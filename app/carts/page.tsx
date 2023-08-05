import React from "react";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { getAllCarts } from "../service/carts/getAllCarts";
import { CART_TABLE_COLUMNS } from "../utils/constants/tableColumns";
import { FaEye } from "react-icons/fa";
import ActionButton from "./actionButton";

interface CartListPageProps {
  params: Record<string, unknown>;
  searchParams: {
    page?: string;
  };
}
const CartListPage = async ({ params, searchParams }: CartListPageProps) => {
  const { cartTableData, limit, skip, total } = await getAllCarts(searchParams.page || "1");
  return (
    <div className="p-4 lg:p-8 w-full">
      <h1 className="text-3xl font-bold mb-8">Cart List page</h1>
      <Table
        cols={CART_TABLE_COLUMNS}
        data={cartTableData}
        renderAction={(rowData) => <ActionButton id={rowData.id as number} />}
      />
      <Pagination
        currentPage={parseInt(searchParams.page || "1")}
        totalPage={Math.ceil(total / limit)}
      />
    </div>
  );
};

export default CartListPage;
