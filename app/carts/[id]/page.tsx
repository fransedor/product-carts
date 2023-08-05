import Pagination from '@/app/components/Pagination';
import Table from '@/app/components/Table';
import { getUsernameById } from '@/app/service/carts/getAllCarts';
import { getCartById } from '@/app/service/carts/getCartById'
import { CART_PRODUCTS_TABLE_COLUMNS } from '@/app/utils/constants/tableColumns';
import React from 'react'

interface CartDetailPageProps {
	params: { id: string}
	searchParams: { page?: string}
}
const CartDetailPage:React.FC<CartDetailPageProps> = async ({ params, searchParams }) => {
	const cartDetails = await getCartById(params.id);
	const username = await getUsernameById(cartDetails.userId);

	const PRODUCTS_PER_PAGE = 10;

	const renderedProductsStartIndex = (parseInt(searchParams.page || "1") - 1) * PRODUCTS_PER_PAGE;
	const renderedProductsEndIndex = (parseInt(searchParams.page || "1")) * PRODUCTS_PER_PAGE;

	return (
		<div className="p-4 lg:p-8 w-full">
      <h1 className="text-3xl font-bold mb-8">Cart #{params.id} details</h1>
			<div className="grid grid-cols-1 lg:grid-cols-2 bg-green-100 border border-green-300 mb-4 py-2 px-4">
				<p>Total price: {cartDetails.total}</p>
				<p>Amount of products: {cartDetails.totalProducts}</p>
				<p>Total quantity: {cartDetails.totalQuantity}</p>
				<p>User: {username}</p>
			</div>
      <Table
        cols={CART_PRODUCTS_TABLE_COLUMNS}
        data={cartDetails.products.slice(renderedProductsStartIndex, renderedProductsEndIndex)}
         />
      <Pagination
        currentPage={parseInt(searchParams.page || "1")}
        totalPage={Math.ceil(cartDetails.products.length / PRODUCTS_PER_PAGE)}
      />
    </div>
	)
}

export default CartDetailPage