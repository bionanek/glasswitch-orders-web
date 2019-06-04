import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/'
import DetailElement from '../../common/DetailElement'
import OrdersApiService from '../../../utils/api/ordersApiService'
import LoadingView from '../../common/LoadingView'
import './OrderDetail.scss'

export default function OrderDetail(props) {
	const [isLoaded, setIsLoaded] = useState(false)

	const [order, setOrder] = useState(null)
	const [customer, setCustomer] = useState(null)
	const [productsList, setProductsList] = useState([])

	const getProductsListElements = () => {
		return productsList.map(product => {
			return (
				<Row style={{ background: 'purple' }} key={product.id}>
					<Col sm>
						<DetailElement header="Product Name:" value={product.name} />
					</Col>

					<Col sm>
						<DetailElement header="Product Code:" value={product.code} />
					</Col>

					<Col sm>
						<DetailElement header="Quantity:" value={product.products_orders.quantity} />
					</Col>
				</Row>
			)
		})
	}

	const orderDetailsView = () => {
		return (
			<Container className="order-detail">
				{order && customer ? (
					<>
						<Row>
							<Col sm>
								<DetailElement header="Shipping Cost:" value={order.shippingCost} />
							</Col>
							<Col sm>
								<DetailElement header="Shipping Company:" value={order.shippingCompany} />
							</Col>
							<Col sm>
								<DetailElement header="Deadline:" value={order.deadline} />
							</Col>
						</Row>

						<Row>
							<Col sm>
								<DetailElement header="Email:" value={order.email} />
							</Col>
							<Col sm>
								<DetailElement header="Currency:" value={order.currency.toUpperCase()} />
							</Col>
							<Col sm>
								<DetailElement header="Notes:" value={order.notes} />
							</Col>
						</Row>

						<Row style={{ background: 'purple' }}>
							<Col sm>
								<DetailElement header="Customer Name:" value={customer.name} />
							</Col>
							<Col sm>
								<DetailElement header="Customer Email:" value={customer.email} />
							</Col>
							<Col sm>
								<DetailElement header="VAT Identification Number:" value={customer.vatNumber} />
							</Col>
						</Row>

						<Row>
							<Col sm>
								{order.confirmationSent ? (
									<DetailElement header="Confirmation Sent?:" value="Sent!" />
								) : (
									<DetailElement header="Confirmation Sent?:" value="Not sent!" />
								)}
							</Col>
							<Col sm>
								{order.proformaSent ? (
									<DetailElement header="Proforma Sent?:" value="Sent!" />
								) : (
									<DetailElement header="Proforma Sent?:" value="Not sent!" />
								)}
							</Col>
							<Col sm>
								{order.invoiceSent ? (
									<DetailElement header="Invoice Sent?:" value="Sent!" />
								) : (
									<DetailElement header="Invoice Sent?:" value="Not sent!" />
								)}
							</Col>
							<Col sm>
								{order.settledPayment ? (
									<DetailElement header="Settled Payment?:" value="Sent!" />
								) : (
									<DetailElement header="Settled Payment?:" value="Not sent!" />
								)}
							</Col>
						</Row>

						{getProductsListElements()}

						<DetailElement header="Total Products Count:" value={order.productsCount} />
						<DetailElement
							header="Total Price"
							value={order.productsTotalPrice + ' ' + order.currency.toUpperCase()}
						/>
					</>
				) : (
					<span>Order with given ID does not exist!</span>
				)}
			</Container>
		)
	}

	useEffect(() => {
		const fetchData = async () => {
			const fetchedOrder = await OrdersApiService.getOrderById(props.match.params.id)

			setOrder(fetchedOrder.data)
			setCustomer(fetchedOrder.data.customer)
			setProductsList(fetchedOrder.data.products)

			setIsLoaded(true)
		}
		fetchData()
	}, [])

	return <>{isLoaded ? orderDetailsView() : LoadingView()} </>
}
