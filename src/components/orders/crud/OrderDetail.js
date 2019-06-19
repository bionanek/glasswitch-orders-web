import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/'
import DetailElement from '../../common/DetailElement'
import OrdersApiService from '../../../utils/api/ordersApiService'
import LoadingView from '../../common/LoadingView'
import SimpleList from '../../common/simpleList/SimpleList'
import './OrderDetail.scss'

export default function OrderDetail(props) {
	const [isLoaded, setIsLoaded] = useState(false)

	const [order, setOrder] = useState(null)
	const [customer, setCustomer] = useState(null)
	const [productsList, setProductsList] = useState([])

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

	const quantityLabel = (productId, product) => {
		return <> Quantity: {product.products_orders.quantity} </>
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

						<Row>
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

						<SimpleList
							elementsList={productsList}
							titleFieldName="name"
							subtitleFieldName="code"
							dynamicElement={quantityLabel}
						/>

						<Row>
							<Col sm>
								<DetailElement header="Total Products Count:" value={order.productsCount} />
							</Col>

							<Col sm>
								<DetailElement
									header="Total Price"
									value={`${order.productsTotalPrice} ${order.currency.toUpperCase()}`}
								/>
							</Col>
						</Row>
					</>
				) : (
					<span>Order with given ID does not exist!</span>
				)}
			</Container>
		)
	}

	return <> {isLoaded ? orderDetailsView() : LoadingView()} </>
}
