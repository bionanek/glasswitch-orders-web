import Axios from 'axios'

const apiUrl = 'http://localhost:3001/customers/'
const apiHeader = {
	headers: { 'Access-Control-Allow-Origin': '*' },
	crossorigin: true,
}

export default class CustomersApiService {
	static async getAllCustomers() {
		try {
			const response = await Axios.get(apiUrl, apiHeader)
			return response
		} catch (ex) {
			throw Error(ex.message)
		}
  }
  
  static async getCustomer(id) {
    try {
      const response = await Axios.get(apiUrl + id.toString(), apiHeader)
      return response.data
    } catch (ex) {
      throw Error(ex.message)
    }
  }

  static async updateCustomer(id, customer) {
    try {
      const response = await Axios.patch(apiUrl + id.toString(), customer, apiHeader)
      return response.data
    } catch (ex) {
      throw Error(ex.message)
    }
  }

  static async createCustomer(customer) {
    try {
      const response = await Axios.post(apiUrl, customer, apiHeader)
      return response.data
    } catch (ex) {
      throw Error(ex.message)
    }
  }

	static async deleteCustomer(id) {
		try {
			const response = await Axios.delete(apiUrl + id.toString(), apiHeader)
			return response
		} catch (ex) {
			throw Error(ex.message)
		}
	}
}
