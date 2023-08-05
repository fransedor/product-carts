import { ProductInterface } from "../products/getProducts";
import { fetcher } from "../request";

const BE_SERVICE_URL = process.env.BE_SERVICE_URL;

export interface CartResponseInterface {
	id: number;
	products: ProductInterface[];
	total: number;
	discountedTotal: number;
	userId: number;
	totalProducts: number;
	totalQuantity: number;
}

export interface GetAllCartsResponseInterface {
	carts: CartResponseInterface[];
	total: number;
	limit: number;
	skip: number;
}

export interface CartTableDataInterface {
	id: number;
	productName: string;
	total: number;
	username: string;
	totalProducts: number;
	totalQuantity: number;
}

const CARTS_PER_PAGE = 10;

export const getAllCarts = async (page: string) => {
	try {
		const response: GetAllCartsResponseInterface = await fetcher(
			`${BE_SERVICE_URL}/carts?limit=${CARTS_PER_PAGE}&skip=${(parseInt(page) - 1) * 10}`
		);
		const cartTableData = await getCartTableData(response.carts);
		return {
			cartTableData,
			total: response.total,
			limit: response.limit,
			skip: response.skip,
		}
	} catch (err) {
		throw new Error(err as string);
	}
}

export const getUsernameById = async (id: number) => {
	try {
		const response = await fetcher(
			`${BE_SERVICE_URL}/users/${id}`
		);
		return response.username
	} catch (err) {
		throw new Error(err as string);
	}
}

const getCartTableData = async (carts: CartResponseInterface[]) => {
	let cartTableData: CartTableDataInterface[] = [];
	const promises:Promise<any>[] = [];
	for (const cart of carts) {
		promises.push(getUsernameById(cart.userId))
	}
	Promise.allSettled(promises).then((usernameList) => {
		usernameList.forEach((username, index) => {
			const usernameFetched = username.status === "fulfilled" ? username as PromiseFulfilledResult<string> : null;
			cartTableData.push({
				id: carts[index].id,
				productName: carts[index].products.map((product) => product.title).toString(),
				total: carts[index].total,
				totalProducts: carts[index].totalProducts,
				totalQuantity: carts[index].totalQuantity,
				username: usernameFetched ? usernameFetched.value : "-",
			})
		})
	})
	return cartTableData
}