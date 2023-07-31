import React from "react";
import { fetcher } from "../service/request";

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
  const response = await fetcher("https://dummyjson.com/products?limit=100");
  console.log(response.products.map((product: any) => product.brand));
  return <div>ProductListPage</div>;
};

export default ProductListPage;
