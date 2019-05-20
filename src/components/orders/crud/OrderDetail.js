import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/'
import DetailElement from '../../common/DetailElement'
import OrdersApiService from '../../../utils/api/ordersApiService'
import './OrderDetail.scss'

export default function OrderDetail(props) {
	const [order, setOrder] = useState(null)
	const [customer, setCustomer] = useState(null)
	const [productsList, setProductsList] = useState([])

	const IsConfirmationSent = () => {
		if (order.confirmationSent === false) {
			return <DetailElement header="Confirmation Sent?:" value="Not sent!" />
		}
		return <DetailElement header="Confirmation Sent?:" value="Sent!" />
	}

	const IsProformaSent = () => {
		if (order.proformaSent === false) {
			return <DetailElement header="Proforma Sent?:" value="Not sent!" />
		}
		return <DetailElement header="Proforma Sent?:" value="Sent!" />
	}

	const IsInvoiceSent = () => {
		if (order.invoiceSent === false) {
			return <DetailElement header="Invoice Sent?:" value="Not sent!" />
		}
		return <DetailElement header="Invoice Sent?:" value="Sent!" />
	}

	const IsPaymentSettled = () => {
		if (order.settledPayment === false) {
			return <DetailElement header="Settled Payment?:" value="Not sent!" />
		}
		return <DetailElement header="Settled Payment?:" value="Sent!" />
	}

	useEffect(() => {
		const fetchData = async () => {
			const fetchedOrder = await OrdersApiService.getOrderById(props.match.params.id)

			setOrder(fetchedOrder.data)
			setCustomer(fetchedOrder.data.customer)
			setProductsList(fetchedOrder.data.products)
		}
		fetchData()
	}, [])

	return (
		<div className="order-detail">
			{order && customer ? (
				<Container>
					<Row>
						<Col>
							<DetailElement header="Shipping Cost:" value={order.shippingCost} />
						</Col>
						<Col>
							<DetailElement header="Shipping Company:" value={order.shippingCompany} />
						</Col>
						<Col>
							<DetailElement header="Deadline:" value={order.deadline} />
						</Col>
					</Row>

					<Row>
						<Col>
							<DetailElement header="Email:" value={order.email} />
						</Col>
						<Col>
							<DetailElement header="Currency:" value={order.currency.toUpperCase()} />
						</Col>
						<Col>
							<DetailElement header="Notes:" value={order.notes} />
						</Col>
					</Row>

					<Row>
						<Col>
							<DetailElement header="Customer Name:" value={customer.name} />
						</Col>
						<Col>
							<DetailElement header="Customer Email:" value={customer.email} />
						</Col>
						<Col>
							<DetailElement header="VAT Identification Number:" value={customer.vatNumber} />
						</Col>
					</Row>

					<Row>
						<Col>{IsConfirmationSent()}</Col>
						<Col>{IsProformaSent()}</Col>
						<Col>{IsInvoiceSent()}</Col>
						<Col>{IsPaymentSettled()}</Col>
					</Row>

					<Col>
						{productsList.map(product => {
							return (
								<Row>
									<DetailElement header="Product Name:" value={product.name} />
									<DetailElement header="Product Code:" value={product.code} />
									<DetailElement header="Quantity:" value={product.products_orders.quantity} />
								</Row>
							)
						})}
					</Col>

					<DetailElement header="Total Products Count:" value={order.productsCount} />
					<DetailElement
						header="Total Price"
						value={order.productsTotalPrice + ' ' + order.currency.toUpperCase()}
					/>
				</Container>
			) : (
				<span>Order with given ID does not exist!</span>
			)}
		</div>
	)
}
