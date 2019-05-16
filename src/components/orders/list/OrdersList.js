import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import SimpleList from '../../common/simpleList/SimpleList'
import OrdersApiService from '../../../utils/api/ordersApiService'

function OrdersList(props) {
	const [orders, setOrders] = useState(null)

	const refreshList = async () => {
		const orders = await getAllOrders()

		setOrders(orders)
	}

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
					refreshList()
				}
			}

			return orderRO
		}, this)
	}

	const getAllOrders = async () => {
		const response = await OrdersApiService.getAllOrders()
		return getOrdersReactiveObjectsList(response.data)
	}

	useEffect(async () => {
		const fetchedOrders = await getAllOrders()
		setOrders(fetchedOrders)
	}, [])

	return (
		<div className="orders-list-wrapper">
			<SimpleList
				elementsList={orders}
				titleFieldName="name"
				subtitleFieldName="deadline"
				deletable
				editable
				clickable
			/>
		</div>
	)
}

export default withRouter(OrdersList)
