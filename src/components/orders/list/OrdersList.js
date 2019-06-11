import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import SimpleList from '../../common/simpleList/SimpleList'
import OrdersApiService from '../../../utils/api/ordersApiService'
import LoadingView from '../../common/LoadingView'
import './OrdersList.scss'

function OrdersList(props) {
	const [isLoaded, setIsLoaded] = useState(false)
	const [orders, setOrders] = useState([])

	const getOrdersReactiveObjectsList = ordersList => {
		return ordersList.map(order => {
			const orderRO = { ...order }

			orderRO.editHandler = event => {
				event.stopPropagation()
				const editUrl = `orders/${order.id}/edit`
				props.history.push(editUrl)
			}

			orderRO.clickHandler = () => {
				props.history.push(`orders/${order.id}`)
			}

			orderRO.deleteHandler = async orderId => {
				const deleteResult = await OrdersApiService.deleteOrder(orderId)

				if (deleteResult !== undefined && deleteResult.status === 200) {
					const response = await OrdersApiService.getAllOrders()
					setOrders(getOrdersReactiveObjectsList(response.data))
				}
			}

			return orderRO
		})
	}

	useEffect(() => {
		const fetchData = async () => {
			const response = await OrdersApiService.getAllOrders()
			setOrders(getOrdersReactiveObjectsList(response.data))

			setIsLoaded(true)
		}
		fetchData()
	}, [])

	return (
		<Container className="orders-list-wrapper" fluid>
			{isLoaded ? (
				<>
					<Button className="new-order-button">Put an Order</Button>

					<SimpleList
						elementsList={orders}
						titleFieldName="email"
						subtitleFieldName="deadline"
						deletable
						editable
						clickable
					/>
				</>
			) : (
				LoadingView()
			)}
		</Container>
	)
}

export default withRouter(OrdersList)
