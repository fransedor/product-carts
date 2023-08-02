import React from "react";
import { fetcher } from "../service/request";
import Table from "../components/Table";
import { getProducts } from "../service/products/getProducts";
import { PRODUCT_TABLE_COLUMNS } from "../utils/constants/tableColumns";
import FilterButton from "../components/FilterButton";
import { FaFilter } from "react-icons/fa";

interface ProductListPageProps {
  params: Record<string, unknown>;
  searchParams: {
    search?: string;
    brand?: string;
    // Dash seperated value e.g.: 0-500
    priceRange?: string;
    category?: string;
    skip?: string;
  };
}
const ProductListPage = async ({ params, searchParams }: ProductListPageProps) => {
  const createFetcherUrl = () => {
    // If user filter by brand or price range, use client side pagination
    if (searchParams.search) {
    }
    // else use server-side pagination
  };
  // BECAUSE FILTER BY BRAND AND PRICE RANGE IS NOT PROVIDED BY DUMMYJSON API,
  // WE MUST RESORT TO CLIENT-BASED PAGINATION AND FILTER, OR
  // USE STATIC BRAND AND PRICE RANGE DATA
  const productList = await getProducts();
  console.log(productList);
  return (
    <div className="p-4 lg:p-8 w-full overflow-x-scroll">
      <h1 className="text-3xl font-bold mb-8">Product List page</h1>
      <FilterButton icon={<FaFilter />} filterBy="category" />
      <Table cols={PRODUCT_TABLE_COLUMNS} data={productList} action="product" />
    </div>
  );
};

export default ProductListPage;
