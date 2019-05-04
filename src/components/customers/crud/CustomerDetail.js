import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DetailElement from '../../common/DetailElement'
import CustomersService from '../customersService'
import './CustomerDetail.scss'

class CustomerDetail extends Component {
	constructor(props) {
		super(props)

		this.state = {
			customer: null,
		}
	}

	componentDidMount() {
		const customerId = parseInt(this.props.match.params.id)

		this.setState({ customer: CustomersService.getCustomer(customerId) })
	}

	render() {
		const { customer } = this.state

		return (
			<div className="customer-detail">
				{customer ? (
					<Container>
						<Row>
							<Col>
								<h1>{customer.name}</h1>
							</Col>
						</Row>
						<Row>
							<DetailElement header="Email address:" value={customer.email} />
							<DetailElement header="Phone number:" value={customer.phone} />
							<DetailElement header="VAT identification number:" value={customer.vatNumber} />
						</Row>
						<Row>
							<Col>
								<h2>Delivery address</h2>
							</Col>
						</Row>
						<Row>
							<DetailElement header="Street:" value={customer.delivery_street} />
							<DetailElement header="City:" value={customer.delivery_city} />
							<DetailElement header="Country:" value={customer.delivery_country} />
							<DetailElement header="Postcode:" value={customer.delivery_postCode} />
						</Row>
						<Row>
							<Col>
								<h2>Billing address</h2>
							</Col>
						</Row>
						<Row>
							<DetailElement header="Street:" value={customer.billing_street} />
							<DetailElement header="City:" value={customer.billing_city} />
							<DetailElement header="Country:" value={customer.billing_country} />
							<DetailElement header="Postcode:" value={customer.billing_postCode} />
						</Row>
					</Container>
				) : (
					<span>
						Customer with ID:
						{this.props.match.params.id} does not exist!
					</span>
				)}
			</div>
		)
	}
}

export default CustomerDetail
