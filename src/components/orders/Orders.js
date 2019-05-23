import React from 'react'
import OrdersList from './list/OrdersList'
import './Orders.scss'

export default function Orders() {
	return (
		<div className="orders">
			<OrdersList className="orders-list" />
		</div>
	)
}
