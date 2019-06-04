import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import SimpleList from '../../common/simpleList/SimpleList'
import OrdersApiService from '../../../utils/api/ordersApiService'
import './OrdersList.scss'

class OrdersList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			orders: [],
		}

		this.openOrderCreatePage = this.openOrderCreatePage.bind(this)
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

	openOrderCreatePage = () => {
		this.props.history.push('/orders/create')
	}

	async refreshList() {
		const orders = await this.getAllOrders()
		this.setState({ orders })
	}

	render() {
		return (
			<div className="order-list-wrapper">
				<Row>
					<Col>
						<Button
							className="button-create-order"
							variant="primary"
							onClick={this.openOrderCreatePage}
						>
							Put an Order
						</Button>
					</Col>
				</Row>

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
