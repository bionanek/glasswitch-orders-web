import React from 'react'
import Container from 'react-bootstrap/Container'
import CustomersList from './list/CustomersList'
import './Customers.scss'

const Customers = () => {
	return (
		<Container className="customers" fluid>
			<CustomersList className="customers-list" />
		</Container>
	)
}

export default Customers
