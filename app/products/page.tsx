import React from "react";
import { fetcher } from "../service/request";
import Table from "../components/Table";
import { getProducts } from "../service/products/getProducts";
import { PRODUCT_TABLE_COLUMNS } from "../utils/constants/tableColumns";
import FilterButton from "../components/FilterButton";
import { FaFilter } from "react-icons/fa";
import Pagination from "../components/Pagination";
import { SearchParamsInterface } from "../utils/types";
import { getAllCategories } from "../service/products/getCategories";
import Searchbar from "../components/Searchbar";
import { BRAND_LIST, PRICE_RANGE_LIST } from "../utils/constants/filterBy";

interface ProductListPageProps {
  params: Record<string, unknown>;
  searchParams: SearchParamsInterface;
}
const ProductListPage = async ({ params, searchParams }: ProductListPageProps) => {
  const { products: productList, totalPage } = await getProducts(searchParams);
  const allCategories = await getAllCategories();
  return (
    <div className="p-4 lg:p-8 w-full">
      <h1 className="text-3xl font-bold mb-8">Product List page</h1>
      <div className="flex justify-between items-center flex-col-reverse lg:flex-row">
        <div className="flex items-center">
          <FilterButton icon={<FaFilter />} filterBy="category" filterOptions={allCategories} />
          <FilterButton icon={<FaFilter />} filterBy="brand" filterOptions={BRAND_LIST} />
          <FilterButton icon={<FaFilter />} filterBy="price" filterOptions={PRICE_RANGE_LIST} />
        </div>
        <Searchbar placeholder="Search products"/>
      </div>
      <Table cols={PRODUCT_TABLE_COLUMNS} data={productList} action="product" />
      <Pagination currentPage={parseInt(searchParams.page || "1")} totalPage={totalPage} />
    </div>
  );
};

export default ProductListPage;
