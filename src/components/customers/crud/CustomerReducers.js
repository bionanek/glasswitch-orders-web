import CustomersApiService from "../../../utils/api/customersApiService";

export const CustomerReducers = (state, action) => {
	switch (action.type) {
		case 'CUSTOMER_DATA_INIT':
			return {
				...state,
				isLoaded: true,
				customer: action.customer,
				isDetailsViewRequested: action.detailsView,
			}

    case 'HANDLE_FORM_CHANGE': 
      return {
        ...state,
        customer: action.currentCustomer
      }

		default:
			return state
	}
}

export const InitialCustomerState = {
	isLoaded: false,
	isDetailsViewRequested: false,
	customer: {},
}

export const onDeleteConfirm = async (url, id) => {
	await CustomersApiService.deleteCustomer(id)
	url.push(`/customers/`)
}
