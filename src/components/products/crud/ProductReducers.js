import ProductsApiService from '../../../utils/api/productsApiService'

export const ProductReducers = (state, action) => {
	switch (action.type) {
		case 'PRODUCT_DATA_INIT':
			return {
				...state,
				isLoaded: true,
				product: action.product,
				isDetailsViewRequested: action.detailsView,
			}

		case 'HANDLE_FORM_CHANGE':
			return {
				...state,
				product: action.currentProduct,
			}

		default:
			return state
	}
}

export const InitialProductState = {
	isLoaded: false,
	isDetailsViewRequested: false,
	product: null,
}

export const onDeleteConfirm = async (url, id) => {
	await ProductsApiService.deleteProduct(id)
	url.push(`/products/`)
}
