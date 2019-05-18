import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SimpleList from '../../common/simpleList/SimpleList'
import OrdersApiService from '../../../utils/api/ordersApiService'

class OrdersList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			orders: [],
		}
	}

	async componentDidMount() {
		const orders = await this.getAllOrders()
		this.setState({ orders: orders })
	}

	async getAllOrders() {
		const response = await OrdersApiService.getAllOrders()
		return this.getOrdersReactiveObjectsList(response.data)
	}

	getOrdersReactiveObjectsList(ordersList) {
		return ordersList.map(order => {
			const orderRO = { ...order }

			orderRO.editHandler = event => {
				event.stopPropagation()
				const editUrl = `orders/${order.id}/edit`
				this.props.history.push(editUrl)
			}

			orderRO.clickHandler = () => {
				this.props.history.push(`orders/${order.id}`)
			}

			orderRO.deleteHandler = async orderId => {
				const deleteResult = await OrdersApiService.deleteOrder(orderId)

				if (deleteResult !== undefined && deleteResult.status === 200) {
					this.refreshList()
				}
			}

			return orderRO
		}, this)
	}

	async refreshList() {
		const orders = await this.getAllOrders()
		this.setState({ orders })
	}

	render() {
		return (
			<div className="orders-list-wrapper">
				<SimpleList
					elementsList={this.state.orders}
					titleFieldName="email"
					subtitleFieldName="deadline"
					deletable
					editable
					clickable
				/>
			</div>
		)
	}
}

export default withRouter(OrdersList)
