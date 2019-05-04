import dummyCustomers from './CustomersData'

export default class CustomersService {
	static getCustomer(id) {
		const customer = dummyCustomers.find(cust => {
			return cust.id === id
		})
		return customer
	}
}
