import Axios from "axios";
const apiUrl = "http://localhost:3001/customers/";

export default class CustomersApiService {
  async getAllCustomers() {
    try {
      const data = await Axios.get(apiUrl, {
        headers: { "Access-Control-Allow-Origin": "*" },
        crossorigin: true
      });
      return data;
    } catch (ex) {
      console.log(ex);
    }
  }
}
