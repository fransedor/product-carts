import React from 'react'

interface FilterButtonProps {
	icon: React.ReactNode;
	filterBy: "category" | "brand" | "price"
}
const FilterButton:React.FC<FilterButtonProps> = ({ icon, filterBy }) => {
	return (
		<button className='flex items-center rounded-lg py-2 px-4 gap-2 border border-gray-300 shadow-md'>
			{icon}
			<p className='capitalize'>{filterBy}</p>
		</button>
	)
}

export default FilterButton