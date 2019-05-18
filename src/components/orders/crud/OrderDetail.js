import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/'
import DetailElement from '../../common/DetailElement'
import OrdersApiService from '../../../utils/api/ordersApiService'
import './OrderDetail.scss'

export default function OrderDetail(props) {
	const [order, setOrder] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const fetchedOrder = await OrdersApiService.getOrderById(props.match.params.id)
			setOrder(fetchedOrder.data)
		}
		fetchData()
	}, [])

	return (
		<div className="order-detail">
			{order ? (
				<Container>
					<Row>
						<Col>
							<DetailElement header="Shipping Cost:" value={order.shippingCost} />
						</Col>

						<Col>
							<DetailElement header="Shipping Company:" value={order.shippingCompany} />
						</Col>
					</Row>
				</Container>
			) : (
				<span>Order with given ID does not exist!</span>
			)}
		</div>
	)
}
