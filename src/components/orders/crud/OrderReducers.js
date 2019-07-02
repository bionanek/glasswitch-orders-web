import OrdersApiService from '../../../utils/api/ordersApiService'

const initializeQuantityInProducts = productsList => {
	return productsList.map(productElement => {
		const product = productElement

		if (product.products_orders === undefined) {
			product.quantity = 0
		} else {
			product.quantity = product.products_orders.quantity
		}

		return productElement
	})
}

const removeSelectedProductsFromAvailable = (productsInOrder, remainingProducts, state) => {
	const allSelected = [...productsInOrder]
	let allAvailable = [...remainingProducts]

	for (const product of allSelected) {
		allAvailable = allAvailable.filter(prod => {
			return prod.id !== product.id
		})
	}

	return {
		...state,
		availableProducts: allAvailable,
	}
}

export const OrderReducers = (state, action) => {
	switch (action.type) {
		case 'ORDER_CREATE_INIT':
			return {
				...state,
				isLoaded: true,
				isCreateViewRequested: true,
				availableProducts: initializeQuantityInProducts(action.products),
				order: {
					wantedProducts: [],
				},
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
				selectedProducts: initializeQuantityInProducts(action.order.products),
				selectedCustomer: action.order.customer,
				availableProducts: initializeQuantityInProducts(action.products),
			}

		case 'REMOVE_SELECTED_PRODUCTS_FROM_AVAILABLE':
			return removeSelectedProductsFromAvailable(
				state.selectedProducts,
				state.availableProducts,
				state,
			)

		case 'CONFIRMATION_SENT_STATUS':
			return {
				...state,
				isConfirmationSent: action.status,
			}

		case 'PROFORMA_SENT_STATUS':
			return {
				...state,
				isProformaSent: action.status,
			}

		case 'INVOICE_SENT_STATUS':
			return {
				...state,
				isInvoiceSent: action.status,
			}

		case 'SETTLED_PAYMENT_STATUS':
			return {
				...state,
				isPaymentSettled: action.status,
			}

		case 'DEADLINE_SET':
			return {
				...state,
				date: action.deadline,
			}

		case 'CURRENCY_PICKER':
			return {
				...state,
				selectedCurrency: action.currency,
			}

		case 'CUSTOMER_SEARCH_EMPTY':
			return {
				...state,
				availableCustomers: [],
			}

		case 'CUSTOMER_SEARCH_RESULTS':
			return {
				...state,
				availableCustomers: action.foundCustomers,
			}

		case 'CUSTOMER_SET':
			return {
				...state,
				availableCustomers: [],
				selectedCustomer: action.customer,
			}

		case 'PRODUCTS_SEARCH_RESULTS':
			return {
				...state,
				availableProducts: action.foundProducts,
			}

		case 'ADD_PRODUCT_TO_ORDER':
			return {
				...state,
				order: action.currentOrder,
				selectedProducts: action.allSelected,
				availableProducts: action.allAvailable,
			}

		case 'AVAILABLE_PRODUCTS_SETTER':
			return {
				...state,
				availableProducts: action.allProducts,
			}

		case 'SELECTED_PRODUCTS_SETTER':
			return {
				...state,
				selectedProducts: action.selectedProds,
			}

		case 'HANDLE_FORM_CHANGE':
			return {
				...state,
				order: action.currentOrder,
			}

		default:
			return state
	}
}

export const InitialOrderState = {
	isLoaded: false,
	isCreateViewRequested: false,
	isDeleteModalOpen: false,
	isConfirmationSent: false,
	isProformaSent: false,
	isInvoiceSent: false,
	isPaymentSettled: false,
	isDetailsViewRequested: false,
	order: null,
	date: new Date(),
	selectedCurrency: 'Currency Picker',
	availableProducts: [],
	availableCustomers: [],
	selectedProducts: [],
	selectedCustomer: {},
}

export const getCurrentProduct = (id, state) => {
	return [...state.availableProducts].find(product => product.id === id)
}

export const onDeleteConfirm = async (url, id) => {
	await OrdersApiService.deleteOrder(id)
	url.push(`/orders/`)
}
