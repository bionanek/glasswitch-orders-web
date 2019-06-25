export const OrderCreateReducers = async (state, action, props) => {
	switch (action.type) {
		case 'DATA_IS_READY':
			return {
				...state,
				isLoaded: true,
			}

		default:
			break
	}
	return state
}

export const InitialOrderCreateState = {
	isLoaded: false,
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
