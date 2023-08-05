import { ProductInterface } from "../products/getProducts";
import { fetcher } from "../request";
import { CartResponseInterface } from "./getAllCarts";

const BE_SERVICE_URL = process.env.BE_SERVICE_URL;

export const getCartById = async (id: string) => {
  try {
    const response: CartResponseInterface = await fetcher(`${BE_SERVICE_URL}/carts/${id}`);
    return response;
  } catch (err) {
    throw new Error(err as string);
  }
};
