import React from 'react'
import CustomersList from './list/CustomersList'
import './Customers.scss'

const Customers = () => {
	return (
		<div className="customers">
			<CustomersList className="customers-list" />
		</div>
	)
}

export default Customers
