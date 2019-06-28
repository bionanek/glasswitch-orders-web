import React from 'react'
import { Container } from 'react-bootstrap'
import OrdersList from './list/OrdersList'
import './Orders.scss'

export default function Orders() {
	return (
		<Container className="orders" fluid>
			<OrdersList className="orders-list" />
		</Container>
	)
}
