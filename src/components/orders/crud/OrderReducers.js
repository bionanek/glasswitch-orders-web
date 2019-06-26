import React from 'react'
import OrdersApiService from '../../../utils/api/ordersApiService'

const getCurrentProduct = (id, state) => {
	return [...state.availableProducts].find(product => product.id === id)
}

const quantitySetter = (event, state) => {
	let targetProduct = [...state.selectedProducts].find(product => product.id === +event.target.id)
	let isAvailable = false

	if (!targetProduct) {
		targetProduct = getCurrentProduct(+event.target.id, state)
		isAvailable = true
	}
	targetProduct.quantity = +event.target.value

	if (isAvailable) {
		const allProducts = [...state.availableProducts]
		allProducts[targetProduct] = targetProduct

		return {
			...state,
			availableProducts: allProducts,
		}
	}

	const selectedProds = [...state.selectedProducts]
	selectedProds[selectedProds.indexOf(targetProduct)] = targetProduct

	return {
		...state,
		selectedProducts: selectedProds,
	}
}

const handleAvailableProductSelection = (product, state) => {
	const allSelected = [...state.selectedProducts]
	const allAvailable = [...state.availableProducts]
	const selectedProduct = allAvailable.find(el => el.id === product.id)
	const currentOrder = { ...state.order }

	allAvailable.splice(allAvailable.indexOf(selectedProduct), 1)
	allSelected.push(selectedProduct)

	currentOrder.wantedProducts.push({
		id: selectedProduct.id,
		quantity: selectedProduct.quantity,
	})

	return {
		...state,
		order: currentOrder,
		selectedProducts: allSelected,
		availableProducts: allAvailable,
	}
}

const onDeleteConfirm = async (url, id) => {
	await OrdersApiService.deleteOrder(id)
	url.push(`/orders/`)
}

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

export const OrderReducers = (state, action) => {
	switch (action.type) {
		case 'ORDER_CREATE_INIT':
			return {
				...state,
				isLoaded: true,
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
				availableProducts: initializeQuantityInProducts(action.products),
			}

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

		case 'ADD_PRODUCT':
			return {
				...state,
				selectedProducts: action.product,
			}

		case 'PRODUCTS_SEARCH_EMPTY':
			return {
				...state,
				availableProducts: action.availableProducts,
			}

		case 'PRODUCTS_SEARCH_RESULTS':
			return {
				...state,
				availableProducts: initializeQuantityInProducts(action.foundProducts),
			}

		case 'OPEN_DELETE_MODAL':
			return {
				...state,
				isDeleteModalOpen: true,
			}

		case 'CLOSE_DELETE_MODAL':
			return {
				...state,
				isDeleteModalOpen: false,
			}

		case 'HANDLE_ORDER_DELETE':
			return onDeleteConfirm(action.url, action.id)

		default:
			return state
	}
}

export const InitialOrderState = {
	isLoaded: false,
	isDeleteModalOpen: false,
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
