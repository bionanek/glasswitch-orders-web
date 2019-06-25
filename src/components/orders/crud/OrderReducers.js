import CustomersApiService from '../../../utils/api/customersApiService'

const handleCustomerSearch = async (state, event) => {
	const customerSearch = event.target.value

	if (customerSearch === '') {
		return {
			...state,
			availableCustomers: [],
		}
	}

	const foundCustomers = await CustomersApiService.searchCustomer(customerSearch)
	return {
		...state,
		availableCustomers: foundCustomers.data,
	}
}

export const OrderReducers = (state, action) => {
	switch (action.type) {
		case 'ORDER_CREATE_INITIAL':
			return {
				...state,
				isLoaded: true,
				availableCustomers: action.customers,
				availableProducts: action.products,
			}

		case 'ORDER_DATA_INIT':
			const deadline = action.order.deadline.split('/')

			return {
				...state,
				order: action.order,
				isLoaded: true,
				isDetailsViewRequested: action.isDetailsViewRequested,
				isConfirmationSent: action.order.confirmationSent,
				isProformaSent: action.order.proformaSent,
				isInvoiceSent: action.order.invoiceSent,
				isPaymentSettled: action.order.settledPayment,
				date: new Date(deadline[2], deadline[1] - 1, deadline[0]),
				selectedCurrency: action.order.currency,
				selectedProducts: action.order.products,
				selectedCustomer: action.order.customer,
				availableProducts: action.products,
				availableCustomers: action.customers,
			}

		case 'CUSTOMER_SEARCH':
			return handleCustomerSearch(state, action.event)

		default:
			break
	}
	return state
}

export const InitialOrderState = {
	isLoaded: false,
	isConfirmationSent: false,
	isProformaSent: false,
	isInvoiceSent: false,
	isPaymentSettled: false,
	isValidated: false,
	isDetailsViewRequested: false,
	order: null,
	date: new Date(),
	selectedCurrency: 'Currency Picker',
	availableProducts: [],
	availableCustomers: [],
	selectedProducts: [],
	selectedCustomer: {},
}
