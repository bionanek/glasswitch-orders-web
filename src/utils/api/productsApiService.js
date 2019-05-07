import Axios from 'axios'

const apiUrl = 'http://localhost:3001/products/'
const apiHeader = {
    headers: { 'Access-Control-Allow-Origin': "*" },
    crossorigin: true
}

export default class ProductsApiService {
    static async getAllProducts() {
        try {
            const response = await Axios.get(apiUrl, apiHeader)
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
}