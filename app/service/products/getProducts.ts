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
export const getProducts = async () => {
  try {
    const response: { products: ProductInterface[] } = await fetcher(BE_SERVICE_URL + "/products?limit=20");
    return response.products;
  } catch (err) {
    throw new Error(err as string);
  }
};
