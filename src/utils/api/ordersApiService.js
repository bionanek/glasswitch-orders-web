import Axios from 'axios'

const apiUrl = 'http://localhost:3001/orders/'
const apiHeader = {
	headers: { 'Access-Control-Allow-Origin': '*' },
	crossorigin: true,
}

export default class OrdersApiService {
	static async getAllOrders() {
		try {
			const response = await Axios.get(apiUrl, apiHeader)
			return response
		} catch (ex) {
			throw Error(ex.message)
		}
	}

	static async getOrderById(id) {
		try {
			const response = await Axios.get(apiUrl + id.toString(), apiHeader)
			return response
		} catch (ex) {
			throw Error(ex.message)
		}
	}

	static async deleteOrder(id) {
		try {
			const response = await Axios.delete(apiUrl + id.toString(), apiHeader)
			return response
		} catch (ex) {
			throw Error(ex.message)
		}
	}
}
