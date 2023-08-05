import { SearchParamsInterface } from "@/app/utils/types";
import { fetcher } from "../request";

export interface ProductInterface {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const BE_SERVICE_URL = process.env.BE_SERVICE_URL;
const PRODUCTS_PER_PAGE = 10;

const getProductsByCategory = async (category: string | string[], page: string) => {
  let products = [];
  let totalPage = 0;
  const filteredProductsStartIndex = (parseInt(page) - 1) * 10;
  const filteredProductsEndIndex = parseInt(page) * 10;

  if (typeof category == "string") {
    try {
      const response: { products: ProductInterface[]; total: number } = await fetcher(
        `${BE_SERVICE_URL}/products/category/${category}?skip=${
          (parseInt(page) - 1) * 10
        }&limit=${PRODUCTS_PER_PAGE}`
      );
      products.push(...response.products);
      totalPage = response.total;
    } catch (err) {
      throw new Error(err as string);
    }
  } else {
    // Type of category is an array of string
    for (const singleCategory of category) {
      try {
        const response: { products: ProductInterface[]; total: number } = await fetcher(
          `${BE_SERVICE_URL}/products/category/${singleCategory}`
        );
        products.push(...response.products);
      } catch (err) {
        throw new Error(err as string);
      }
    }
    totalPage = products.length;
  }
  return {
    products: products.slice(filteredProductsStartIndex, filteredProductsEndIndex),
    totalPage: Math.ceil(totalPage / PRODUCTS_PER_PAGE),
  };
};

const getProductsBySearch = async (
  currentProducts: ProductInterface[],
  searchValue: string,
  page: string
) => {
  if (currentProducts.length) {
    const filteredProductsStartIndex = (parseInt(page) - 1) * 10;
    const filteredProductsEndIndex = parseInt(page) * 10;
    const allFilteredProductsBySearch = currentProducts.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return {
      products: allFilteredProductsBySearch.slice(
        filteredProductsStartIndex,
        filteredProductsEndIndex
      ),
      totalPage: Math.ceil(allFilteredProductsBySearch.length / PRODUCTS_PER_PAGE),
    };
  } else {
    try {
      const response: { products: ProductInterface[]; total: number } = await fetcher(
        `${BE_SERVICE_URL}/products/search?q=${searchValue}&skip=${
          (parseInt(page) - 1) * 10
        }&limit=${PRODUCTS_PER_PAGE}`
      );
      return {
        products: response.products,
        totalPage: Math.ceil(response.total / PRODUCTS_PER_PAGE),
      };
    } catch (err) {
      throw new Error(err as string);
    }
  }
};

const getProductsByBrand = (
  currentProducts: ProductInterface[],
  brand: string | string[],
  page: string
) => {
  const filteredProductsStartIndex = (parseInt(page) - 1) * 10;
  const filteredProductsEndIndex = parseInt(page) * 10;
  const allFilteredProductsByBrand = currentProducts.filter((product) =>
    brand.includes(product.brand)
  );
  return {
    products: allFilteredProductsByBrand.slice(
      filteredProductsStartIndex,
      filteredProductsEndIndex
    ),
    totalPage: Math.ceil(allFilteredProductsByBrand.length / PRODUCTS_PER_PAGE),
  };
};

const getProductsByPrice = (
  currentProducts: ProductInterface[],
  price: string | string[],
  page: string
) => {
  // Price range is dash seperated string or string array ("0-100" or ["0-100", "201-300"])
  // there is no guarantee that the price range string is sorted
  const priceArray = typeof price === "string" ? [price] : price;
  const filteredProducts = [];
  for (const range of priceArray) {
    let min = 0;
    let max = Number.MAX_SAFE_INTEGER;
    if (range.includes(">")) {
      min = parseInt(range.split(">")[1]);
    } else {
      min = parseInt(range.split("-")[0]);
      max = parseInt(range.split("-")[1]);
    }
    filteredProducts.push(
      ...currentProducts.filter((product) => product.price >= min && product.price <= max)
    );
  }
  const filteredProductsStartIndex = (parseInt(page) - 1) * 10;
  const filteredProductsEndIndex = parseInt(page) * 10;

  return {
    products: filteredProducts.slice(filteredProductsStartIndex, filteredProductsEndIndex),
    totalPage: Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
  };
};

export const getProducts = async ({
  brand,
  category,
  page = "1",
  price,
  search,
  skip,
}: SearchParamsInterface) => {
  let products: ProductInterface[] = [];
  let total = 0;
  if (category) {
    const { products: productsByCategory, totalPage } = await getProductsByCategory(category, page);
    products = productsByCategory;
    total = totalPage;
  }
  if (search) {
    const { products: productsBySearch, totalPage } = await getProductsBySearch(
      products,
      search,
      page
    );
    products = productsBySearch;
    total = totalPage;
    // IF NOT FOUND ON SEARCH, DO NOT LET IT GO DOWN THE FUNCTION AS ALL PRODUCT WILL GET FETCHED DOWN BELOW
    if (!products.length) {
      return { products, totalPage: 1 };
    }
  }
  // IF THERE IS NO FILTER, RETURN PAGINATED PRODUCTS FROM API 
  if (!products.length && !brand && !price) {
    try {
      const response: { products: ProductInterface[]; total: number } = await fetcher(
        `${BE_SERVICE_URL}/products?limit=${PRODUCTS_PER_PAGE}&skip=${(parseInt(page) - 1) * 10}`
      );
      products = response.products;
      total = Math.ceil(response.total / PRODUCTS_PER_PAGE);
    } catch (err) {
      throw new Error(err as string);
    }
  } else {
		// IF THERE IS FILTER, FETCH ALL PRODUCTS FROM API AND DO CLIENT SIDE PAGINATION
		try {
      const response: { products: ProductInterface[]; total: number } = await fetcher(
        `${BE_SERVICE_URL}/products?limit=2000`
      );
      products = response.products;
      total = Math.ceil(response.total / PRODUCTS_PER_PAGE);

    } catch (err) {
      throw new Error(err as string);
    }
	}
  if (brand) {
    const { products: productsByBrand, totalPage } = getProductsByBrand(products, brand, page);
    products = productsByBrand;
    total = totalPage;
  }
  if (price) {
    const { products: productsByPrice, totalPage } = getProductsByPrice(
      products,
      price,
      page
    );
    products = productsByPrice;
    total = totalPage;
  }
  return { products, totalPage: total === 0 ? 1 : total };
};
