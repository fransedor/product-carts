import { fetcher } from "../request";

const BE_SERVICE_URL = process.env.BE_SERVICE_URL;

export const getAllCategories = async () => {
	try {
		const response: string[] = await fetcher(
			`${BE_SERVICE_URL}/products/categories`
		);
		return response
	} catch (err) {
		throw new Error(err as string);
	}
}