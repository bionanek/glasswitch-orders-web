import Axios from 'axios'

const apiUrl = 'http://localhost:3001/products/'
const apiHeader = {
	headers: { 'Access-Control-Allow-Origin': '*' },
	crossorigin: true,
}

export default class ProductsApiService {
	static async postProduct(product) {
		try {
			const response = await Axios.post(apiUrl, product, apiHeader)
			return response
		} catch (ex) {
			throw Error(ex.message)
		}
	}

	static async getAllProducts() {
		try {
			const response = await Axios.get(apiUrl, apiHeader)
			return response
		} catch (ex) {
			throw Error(ex.message)
		}
	}

	static async getProductById(id) {
		try {
			const response = await Axios.get(apiUrl + id.toString(), apiHeader)
			return response
		} catch (ex) {
			throw Error(ex.message)
		}
	}

	static async updateProduct(id, product) {
		try {
			const response = await Axios.patch(apiUrl + id.toString(), product, apiHeader)
			return response
		} catch (ex) {
			throw Error(ex.message)
		}
	}

	static async deleteProduct(id) {
		try {
			const response = await Axios.delete(apiUrl + id.toString(), apiHeader)
			return response
		} catch (ex) {
			throw Error(ex.message)
		}
	}

	static async searchProduct(param) {
		try {
			const response = await Axios.get(`${apiUrl}search?search=${param}`, apiHeader)
			return response
		} catch (ex) {
			throw Error(ex.message)
		}
	}

	static async generateProductsCatalog(data) {
		try {
			const response = await Axios.post(
				`${apiUrl}generateProductsCatalog`,
				data,
				{ responseType: 'blob' },
				apiHeader,
			)
			return response
		} catch (ex) {
			throw Error(ex.message)
		}
	}
}
