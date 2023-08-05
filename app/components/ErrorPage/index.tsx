import React from 'react'

const ErrorPage = (props: { errorMessage: string }) => {
	return (
		<div className='flex items-center justify-center h-screen'>
			<h1 className='text-2xl font-bold'>There is something wrong</h1>
			<p className=''>Please retry soon</p>
			<p className=''>Error: {props.errorMessage}</p>
		</div>
	)
}

export default ErrorPage